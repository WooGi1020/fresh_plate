import EmptyStarIcon from "@/icons/empty_star_icon.svg";
import FilledStarIcon from "@/icons/filled_star_icon.svg";

type StarRatingProps = {
  rating: number; // 0 ~ 5
  size?: number; // px 단위 (기본값 24)
};

const StarRating = ({ rating, size = 24 }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1);

    return (
      <div key={i} style={{ position: "relative", width: size, height: size }}>
        {/* 빈 별 */}
        <EmptyStarIcon
          width={size}
          height={size}
          fill="none"
          stroke="#CBD2A9"
          strokeWidth={1.5}
        />

        {/* 채워진 별 */}
        <div
          style={{
            width: `${fill * 100}%`,
            height: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <FilledStarIcon width={size} height={size} fill="#CBD2A9" />
        </div>
      </div>
    );
  });

  return <div style={{ display: "flex", gap: 4 }}>{stars}</div>;
};

export default StarRating;
