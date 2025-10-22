import Image from "next/image";
import Link from "next/link";

const Section_fifth = () => {
  return (
    <div className="h-full md:min-h-screen md:max-h-screen flex items-center bg-secondary-default px-4 py-10">
      <div className="flex flex-col xl:flex-row justify-center items-center w-full max-w-[1500px] mx-auto gap-10 max-sm:h-screen">
        {/* 이미지 영역 */}
        <div className="w-full max-w-[600px] aspect-600/578 relative">
          <Image
            src="/images/home/section5_first.png"
            alt="섹션5 이미지"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>

        {/* 텍스트 + 버튼 영역 */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center px-2 w-full max-w-[624px]">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-loose">
            지금 나에게 맞는 식당을 찾아보세요!
          </p>
          <Link
            href="/search"
            className="w-full h-[64px] sm:h-[80px] md:h-[98px] flex justify-center items-center bg-secondary-light rounded-md border-2 border-neutral-900"
          >
            <span className="text-lg sm:text-2xl md:text-[32px] xl:text-[38px] text-[#3E7B27] font-medium">
              맞춤 식당 찾으러 가기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section_fifth;
