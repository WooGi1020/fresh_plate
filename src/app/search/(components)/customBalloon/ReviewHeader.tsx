import StarRating from "./StarRating";

type ReviewHeaderProps = {
  title: string;
  avgRating: number;
  reviewCount: number;
};

export default function ReviewHeader({
  title,
  avgRating,
  reviewCount,
}: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base sm:text-lg font-semibold text-[#3b3b3b]">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-neutral-700">
        <StarRating rating={avgRating} size={18} />
        <span className="text-sm relative bottom-0.5">
          {avgRating.toFixed(1)}
        </span>
        &#40;
        <span className="text-sm -mx-1.5 relative bottom-0.5">
          {reviewCount}
        </span>
        &#41;
      </div>
    </div>
  );
}
