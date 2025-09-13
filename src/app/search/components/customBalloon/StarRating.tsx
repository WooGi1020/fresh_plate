import EmptyStarIcon from "@/icons/empty_star_icon.svg";
import FilledStarIcon from "@/icons/filled_star_icon.svg";

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1); // 0 ~ 1
    return (
      <div key={i} className="relative w-6 h-6">
        <EmptyStarIcon
          fill="none"
          stroke="#CBD2A9"
          strokeWidth={1.5}
          className="absolute top-0 left-0 w-full h-full"
        />

        <FilledStarIcon
          fill="#CBD2A9"
          className="absolute top-0 left-0 h-full"
          style={{ width: `${fill * 100}%`, overflow: "hidden" }}
        />
      </div>
    );
  });

  return <div className="flex space-x-1 items-center w-fit">{stars}</div>;
};

export default StarRating;
