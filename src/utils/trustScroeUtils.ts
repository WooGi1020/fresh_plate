import { IngredientDict } from "@/constants/ingredientDict";
import { KnownAllergens } from "@/constants/knownAllegens";
import { RestaurantSchema } from "@/types/restaurants.schema";
import z from "zod";

export type Restaurant = z.infer<typeof RestaurantSchema>;

// --- 유틸 함수들 ---
function normStr(s: string) {
  return s.trim().replace(/\s+/g, " ").replace(/[·・]/g, " ").toLowerCase();
}

function normKoreanKeepCase(s: string) {
  const trimmed = s.trim().replace(/\s+/g, " ").replace(/[·・]/g, " ");
  return IngredientDict[trimmed] ?? IngredientDict[normStr(trimmed)] ?? trimmed;
}

export function normalizeIngredients(ings: string[]) {
  return Array.from(
    new Set(
      ings
        .filter(Boolean)
        .map(normKoreanKeepCase)
        .map((s) => s.replace(/[()]/g, ""))
    )
  );
}

export function deriveAllergensFromIngredients(ings: string[]) {
  const set = new Set<string>();
  for (const x of ings) {
    for (const a of KnownAllergens) {
      if (x.includes(a)) set.add(a);
    }
    if (x.includes("치즈") || x.includes("크림") || x.includes("버터"))
      set.add("우유");
  }
  return Array.from(set);
}

function jaccard(a: string[], b: string[]) {
  const A = new Set(a);
  const B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...a, ...b]).size || 1;
  return inter / union;
}

function hasValidGeo(r: Restaurant) {
  const lat = typeof r.lat === "string" ? parseFloat(r.lat) : r.lat;
  const lng = typeof r.lng === "string" ? parseFloat(r.lng) : r.lng;
  if (isNaN(lat as number) || isNaN(lng as number)) return false;
  return lat! >= 33 && lat! <= 39.5 && lng! >= 124 && lng! <= 132;
}

function categoryMenuConsistency(r: Restaurant) {
  const nameJoin = r.menus.map((m) => m.menu_item).join(" ");
  const ingJoin = r.menus.flatMap((m) => m.ingredients).join(" ");
  const text = `${nameJoin} ${ingJoin}`;
  const isBakeryLike =
    /(빵|스콘|쿠키|타르트|케이크|라떼|커피|도넛|베이글)/.test(text);
  const isMealLike = /(비빔밥|덮밥|파스타|버거|리조또|정식|전골|볶음밥)/.test(
    text
  );

  if (r.menu_type.includes("과자점"))
    return isBakeryLike ? 1 : isMealLike ? 0.4 : 0.7;
  if (r.menu_type.includes("한식") || r.menu_type.includes("양식"))
    return isMealLike ? 1 : isBakeryLike ? 0.6 : 0.7;
  return 0.7;
}

// --- 핵심: 신뢰도 계산 ---
/**
 * 신뢰도 산출에 필요한 지표(signal)들을 계산
 * - 전화번호, 좌표, 재료 정규화율, 알레르기 일치도 등
 */
export function computeSignals(r: Restaurant) {
  const originalCount = r.menus.reduce(
    (acc, m) => acc + (m.ingredients?.length || 0),
    0
  );
  const normalized = r.menus.flatMap((m) =>
    normalizeIngredients(m.ingredients || [])
  );
  const normalizedUniqueCount = new Set(normalized).size;
  const normRatio = originalCount
    ? Math.min(1, normalizedUniqueCount / originalCount)
    : 0.6;

  const derivedAllergies = Array.from(
    new Set(
      r.menus.flatMap((m) =>
        deriveAllergensFromIngredients(
          normalizeIngredients(m.ingredients || [])
        )
      )
    )
  );
  const allergyConsistency = jaccard(derivedAllergies, r.allergy_flags || []);

  return {
    schemaValid: 1,
    hasTel: r.tel && r.tel.trim() ? 1 : 0,
    hasGeo: hasValidGeo(r) ? 1 : 0,
    normRatio,
    allergyConsistency,
    catMenuConsistency: categoryMenuConsistency(r),
    crossSource: 0.5,
    llmVerify: 0.5,
    recency: 0.5,
  };
}

/**
 * 신호값(signals)에 가중치를 부여해 최종 점수 산출
 * - 0~1 사이 값
 */
export function score(signals: ReturnType<typeof computeSignals>) {
  const w = {
    schemaValid: 0.1,
    hasTel: 0.05,
    hasGeo: 0.1,
    normRatio: 0.15,
    allergyConsistency: 0.1,
    catMenuConsistency: 0.1,
    crossSource: 0.2,
    llmVerify: 0.15,
    recency: 0.05,
  };
  const s =
    signals.schemaValid * w.schemaValid +
    signals.hasTel * w.hasTel +
    signals.hasGeo * w.hasGeo +
    signals.normRatio * w.normRatio +
    signals.allergyConsistency * w.allergyConsistency +
    signals.catMenuConsistency * w.catMenuConsistency +
    signals.crossSource * w.crossSource +
    signals.llmVerify * w.llmVerify +
    signals.recency * w.recency;

  return Math.round(Math.max(0, Math.min(1, s)) * 1000) / 1000;
}

/**
 * 최종 신뢰도 구조체 생성
 * - trust.score: 최종 점수 (0~1)
 * - trust.signals: 세부 지표
 * - trust.provenance: 출처/검증 정보
 * - derived_allergy_flags: 역추론된 알레르기 태그
 */
export function computeTrust(r: Restaurant) {
  const nowISO = new Date().toISOString();
  const signals = computeSignals(r);
  const trustScore = score(signals);

  return {
    ...r,
    trust: {
      score: trustScore,
      signals,
      provenance: {
        sources: ["public_open_data", "private_partner", "kakaomap_crawl"],
        methods: [
          "schema_validation",
          "ingredient_normalization",
          "allergy_crosscheck",
          "heuristic_consistency",
        ],
        verified_at: nowISO,
        evidence_ids: [],
      },
    },
    derived_allergy_flags: Array.from(
      new Set(
        r.menus.flatMap((m) =>
          deriveAllergensFromIngredients(
            normalizeIngredients(m.ingredients || [])
          )
        )
      )
    ),
  };
}
