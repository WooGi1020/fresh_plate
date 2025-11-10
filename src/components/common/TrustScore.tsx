import AwardIcon from "../../icons/award_icon.svg";
import { Restaurant } from "@/types/restaurants.schema";

export default function TrustScore({
  data,
  size = 6,
}: {
  data: Restaurant;
  size?: number;
}) {
  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
  const now = new Date();

  let color = "#aaa";
  let label = "업데이트 정보 없음";

  if (updatedAt) {
    const diffDays = Math.floor(
      (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 7) {
      color = "#95CD41"; // 7일 이하 (최신)
      label = "최근 업데이트 7일 이내";
    } else if (diffDays <= 30) {
      color = "#F7DC6E"; // 30일 이하 (보통)
      label = "최근 업데이트 30일 이내";
    } else {
      color = "#FBA377"; // 30일 초과 (오래됨)
      label = "최근 업데이트 30일 초과";
    }
  }

  const px = Math.max(1, Math.round(size * 4)); // w-6 ≈ 24px

  return (
    <div className="relative group cursor-pointer z-50">
      <AwardIcon width={px} height={px} stroke={color} />
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max
             opacity-0 group-hover:opacity-100 transition-opacity
             bg-neutral-900 text-white text-xs px-2 py-1 rounded
             whitespace-nowrap text-center z-50 pointer-events-none"
      >
        {label}
      </span>
    </div>
  );
}
