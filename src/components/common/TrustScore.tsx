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

  if (score === null) {
    return (
      <div title={`데이터 신뢰도 : 미검증`}>
        <NoAwardIcon width={px} height={px} stroke="#F08080" />
      </div>
    );
  }

  return (
    <div title={`데이터 신뢰도 : ${score}`}>
      <AwardIcon width={px} height={px} stroke={color} />
    </div>
  );
}
