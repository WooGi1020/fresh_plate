import ArrowIcon from "@/icons/arrow_icon.svg";

interface Props {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export default function SidebarToggleButton({ showSidebar, toggleSidebar }: Props) {
  return (
    <div className="absolute left-[-0.5%] top-1/2 -translate-y-1/2 w-fit h-fit z-30 bg-[#CBD2A9BF] rounded-md border-2 border-neutral-900">
      <button
        role="button"
        className="w-[40px] h-[60px] flex items-center justify-center outline-hidden"
        onClick={toggleSidebar}
      >
        <ArrowIcon className={`${showSidebar ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
