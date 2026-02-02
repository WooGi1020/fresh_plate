export default function SearchLoadingUI({
  message = "데이터를 불러오고 있습니다...",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen bg-[#FBF8EF]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#3E5329] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#3E5329] font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
}
