import { DietType } from "@/types/onBoard.schema";

export const dietTypeArr: ReadonlyArray<{ key: DietType; label: string }> = [
  { key: "glutenfree", label: "글루텐프리" },
  { key: "lacto", label: "락토" },
  { key: "ovo", label: "오보" },
  { key: "omnivore", label: "딱히 없음" },
];
