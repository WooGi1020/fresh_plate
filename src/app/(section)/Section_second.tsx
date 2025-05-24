import Image from "next/image";

const Section_second = () => {
  return (
    <div className="min-h-screen h-full sm:py-4 flex items-center justify-center bg-[#CBD2A9] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-center gap-10 sm:gap-5">
        {/* 이미지 그룹 */}
        <div className="flex flex-col items-center gap-6">
          {/* 필터 이미지 */}
          <div className="w-full max-w-[500px] h-[300px] aspect-[10/7] relative">
            <Image
              src="/images/home/section2_filter.png"
              alt="2번째 섹션 필터링 이미지"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 사람 이미지 */}
          <div className="w-full max-w-[500px] h-[300px] aspect-[10/9] relative bottom-14">
            <Image
              src="/images/home/section2_person.png"
              alt="2번째 섹션 사람 이미지"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 텍스트 그룹 */}
        <div className="text-center flex flex-col gap-4 sm:gap-6 lg:gap-10">
          <h3 className="text-lg sm:text-2xl lg:text-[32px] font-normal">
            “ 이 식당, 비건 메뉴는 있는데... 땅콩이 들어간다구요? ”
          </h3>
          <h3 className="text-lg sm:text-2xl lg:text-[32px] font-normal">“ 글루텐 프리 메뉴는 어디 있는 거죠? ”</h3>
          <h3 className="text-lg sm:text-2xl lg:text-[32px] font-normal mb-2 sm:mb-4">이제는 검색만으로 걱정 끝!</h3>
          <h2 className="text-xl sm:text-3xl lg:text-[36px] font-semibold space-y-2 leading-relaxed flex flex-col">
            <span>걱정 없이, 당신의 기준에 딱 맞는 식당만</span>
            <span>보여드릴게요.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Section_second;
