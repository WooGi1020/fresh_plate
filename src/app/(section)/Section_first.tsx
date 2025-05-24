import Image from "next/image";

const Section_first = () => {
  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 md:min-h-screen md:max-h-screen flex items-center">
      <div className="w-full flex flex-col justify-center items-center text-center gap-6 sm:gap-8 lg:gap-10 py-10 md:py-0">
        {/* 상단 문구 */}
        <div className="px-2">
          <h2 className="font-normal text-lg sm:text-xl lg:text-[32px] mb-2 sm:mb-3">
            " 비건도, 알러지도, 글루텐도 걱정없는 외식이 가능할까요? "
          </h2>
          <h2 className="font-semibold text-lg sm:text-xl lg:text-[32px]">
            우리 서비스는 사용자에게 맞춘 외식 장소를 찾아드립니다.
          </h2>
        </div>

        {/* 로고 이미지 */}
        <div className="w-full max-w-[586px] aspect-[586/434] relative mx-auto md:min-h-[300px]">
          <Image
            src="/images/home/section1_big_logo.png"
            alt="첫번째 섹션 서비스 로고"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 하단 문구 */}
        <div className="px-2">
          <h3 className="font-normal text-base sm:text-lg lg:text-[28px] mb-2 sm:mb-3">
            " 당신의 건강과 입맛을 맞춘 식당을 찾아보세요. "
          </h3>
          <h3 className="font-semibold text-base sm:text-lg lg:text-[28px]">지금, 당신 주변에서 찾을 수 있어요.</h3>
        </div>
      </div>
    </div>
  );
};

export default Section_first;
