import Image from "next/image";

const Section_third = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 sm:py-6">
      <div className="w-full max-w-[1400px] flex flex-col gap-16">
        {/* 상단 섹션 */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* 첫 번째 이미지 */}
          <div className="relative w-full max-w-[415px] aspect-[4/3] lg:aspect-auto lg:h-[345px]">
            <Image
              src="/images/home/section3_first.png"
              alt="섹션3 첫번째 이미지"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 텍스트 카드 1~2 */}
          <div className="flex flex-1 flex-col gap-6 w-full">
            <TextCard text="① 찾고 싶은 식당을 직접 검색하세요." />
            <TextCard text="② 비건 식단 유형을 고르세요. (비건/락토 등)" />
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* 텍스트 카드 3~4 */}
          <div className="flex flex-1 flex-col gap-6 w-full">
            <TextCard text="③ 피하고 싶은 알러지를 선택하세요." />
            <TextCard text="④ 맞춤 식당 검색 완료 !" />
          </div>

          {/* 두 번째 이미지 */}
          <div className="relative w-full max-w-[550px] aspect-[4/3] lg:aspect-auto lg:h-[345px]">
            <Image
              src="/images/home/section3_second.png"
              alt="섹션3 두번째 이미지"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TextCard = ({ text }: { text: string }) => (
  <div className="bg-[#FFFDF4] rounded-md px-6 sm:px-10 py-5 sm:py-6 shadow-md w-full flex items-center h-[155px]">
    <p className="text-lg sm:text-xl lg:text-[28px] font-normal">{text}</p>
  </div>
);

export default Section_third;
