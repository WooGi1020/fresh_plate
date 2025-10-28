const CustomSideListHeader = ({
  count,
  sortOption,
  onSortChange,
  user,
}: {
  count: number;
  sortOption: string;
  onSortChange: (value: string) => void;
  user: boolean;
}) => (
  <div className="py-2 mb-1 flex items-center justify-between shrink-0">
    <p className="relative pl-3 text-[13px] font-semibold tracking-tight text-neutral-800 select-none">
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-linear-to-b from-neutral-500 to-neutral-300"
        aria-hidden
      />
      장소 목록
    </p>

    <div className="flex items-center gap-2 ml-auto">
      {user && (
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-[12px] px-2 py-[3px] rounded border border-neutral-300 bg-white text-neutral-700 cursor-pointer focus:outline-none"
        >
          <option value="기본">기본</option>
          <option value="추천">추천</option>
          <option value="비추천">비추천</option>
        </select>
      )}
      <span className="text-[11px] px-2 py-[3px] rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
        {count}곳
      </span>
    </div>
  </div>
);

export default CustomSideListHeader;
