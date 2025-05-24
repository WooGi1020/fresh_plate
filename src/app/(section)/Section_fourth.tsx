import SpeechBubbles from "@/app/(section)/SpeechBubbles";
import Image from "next/image";

const Section_fourth = () => {
  return (
    <div className="relative w-full px-4 py-10 xl:p-20 xl:min-h-screen xl:max-h-screen overflow-hidden">
      <SpeechBubbles />

      <div className="z-10 flex flex-col items-center">
        <p className="text-[24px] sm:text-[28px] md:text-[40px] font-normal text-center">
          서울에서 <span className="font-semibold">견과류, 계란, 갑각류 알러지 제외</span>한 식당 검색
        </p>

        {/* 이미지 섹션 */}
        <div className="flex flex-col xl:flex-row justify-center xl:justify-between items-center gap-8 mt-10 w-full max-w-[1640px]">
          {/* 첫 번째 이미지 */}
          <div className="w-full max-w-[820px] aspect-[820/610] relative">
            <Image
              src="/images/home/section4_first.png"
              alt="검색 식당 이미지1"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 820px"
              priority
            />
          </div>

          {/* 두 번째 이미지 + 텍스트 */}
          <div className="flex flex-col items-center w-full max-w-[820px]">
            <div className="w-full aspect-[820/610] relative">
              <Image
                src="/images/home/section4_second.png"
                alt="검색 식당 이미지2"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 820px"
              />
            </div>
            <p className="text-[20px] sm:text-[24px] md:text-[36px] font-medium mt-4">" 추천 식당 7곳 "</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_fourth;
