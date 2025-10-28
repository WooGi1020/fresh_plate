import AwardIcon from "../../icons/award_icon.svg";
import NoAwardIcon from "../../icons/award_no_icon.svg";
import { Restaurant } from "@/utils/trustScroeUtils";

export default function TrustScore({
  data,
  size = 6,
}: {
  data: Restaurant;
  size?: number;
}) {
  const score = data.avgRating;
  // Tailwind dynamic classes (w-${size}) won't be generated; compute px instead
  const px = Math.max(1, Math.round(size * 4)); // w-6 ≈ 24px

  let color = "#aaa";
  if (score !== null) {
    if (score >= 0.7) color = "#95CD41";
    else if (score >= 0.5) color = "#F7DC6E";
    else color = "#FBA377";
  }

  return TrustScore_icon({ score, size });
}

function TrustScore_icon({
  score,
  size = 6,
}: {
  score: number | null;
  size?: number;
}) {
  const px = Math.max(1, Math.round(size * 4)); // w-6 ≈ 24px

  let color = "#aaa";
  if (score !== null) {
    if (score >= 0.7) color = "#95CD41";
    else if (score >= 0.5) color = "#F7DC6E";
    else color = "#FBA377";
  }

  return (
    <div className="relative group cursor-pointer z-50">
      <AwardIcon width={px} height={px} stroke={color} />
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max
             opacity-0 group-hover:opacity-100 transition-opacity
             bg-neutral-900 text-white text-xs px-2 py-1 rounded
             whitespace-nowrap text-center z-9999 pointer-events-none"
      >
        {`데이터 최신화 - ${score ?? "최신화되지 않음"}`}
      </span>
    </div>
  );
}
