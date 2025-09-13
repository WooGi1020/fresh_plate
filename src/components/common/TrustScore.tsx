import { computeTrust, Restaurant } from "@/utils/trustScroeUtils";
import AwardIcon from "../../icons/award_icon.svg";

export default function TrustScore({
  data,
  size = 6,
}: {
  data: Restaurant;
  size?: number;
}) {
  const enriched = computeTrust(data);
  const score = enriched.trust.score;

  let color = "#aaa";
  if (score >= 0.7) color = "#95CD41";
  else if (score >= 0.5) color = "#F7DC6E";
  else color = "#FBA377";

  return (
    <div title={`데이터 신뢰도 : ${enriched.trust.score}`}>
      <AwardIcon className={`w-${size} h-${size}`} stroke={color} />
    </div>
  );
}
