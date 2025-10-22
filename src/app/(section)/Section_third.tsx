import Image from "next/image";
import AwardIcon from "@/icons/award_icon.svg";
import AllergyIcon from "@/icons/allegy_icon.svg";
import GlutenFreeIcon from "@/icons/gluten_free_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import LacToIcon from "@/icons/lacto_icon.svg";

const icons = [
  { icon: <GlutenFreeIcon className="w-7 h-7" />, label: "글루텐프리" },
  { icon: <LacToIcon className="w-7 h-7" />, label: "락토" },
  { icon: <OvoIcon className="w-7 h-7" />, label: "오보" },
  { icon: <AwardIcon className="w-7 h-7" />, label: "데이터 검증 여부" },
  { icon: <AllergyIcon className="w-7 h-7" />, label: "알러지 유발 위험도" },
];

const Section_third = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 sm:py-6">
      <div className="w-full max-w-[1400px] flex flex-col gap-16">
        {/* 상단 섹션 */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* 첫 번째 이미지 */}
          <div className="relative w-full max-w-[415px] aspect-4/3 lg:aspect-auto lg:h-[345px]">
            <Image
              src="/images/home/section3_first.png"
              alt="섹션3 첫번째 이미지"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 텍스트 카드 1~3 */}
          <div className="flex flex-1 flex-col gap-6 w-full">
            <TextCard text="① 찾고 싶은 식당을 직접 검색하세요." />
            <TextCard text="② 비건 식단 유형을 고르세요. (글루텐프리/락토/오보)" />
            <TextCard text="③ 피하고 싶은 알러지를 선택하세요." />
          </div>
        </div>

        {/* 중간 섹션 */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* 텍스트 카드 4~5 */}
          <div className="flex flex-1 flex-col gap-6 w-full">
            <TextCard text="④ 회원가입 시 간단한 온보딩으로 개인 맞춤 데이터를 설정하세요." />
            <TextCard text="⑤ 맞춤형 추천 알고리즘으로 신뢰도 높은 식당을 확인하세요." />
            <TextCard
              text="⑥ 아이콘을 통해 알러지 유발 가능성, 데이터 검증 여부를 한눈에 확인하세요."
              icon={icons}
            />
          </div>

          {/* 두 번째 이미지 */}
          <div className="relative w-full max-w-[550px] aspect-4/3 lg:aspect-auto lg:h-[345px]">
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

const TextCard = ({
  text,
  icon,
}: {
  text: string;
  icon?: { icon: React.ReactNode; label: string }[];
}) => (
  <div className="bg-[#FFFDF4] rounded-md px-6 sm:px-10 py-5 sm:py-6 shadow-md w-full flex flex-col justify-center h-fit lg:min-h-[80px]">
    <p className="text-lg lg:text-xl font-normal">{text}</p>
    <div className="mx-auto flex gap-10 items-center">
      {icon?.map((item, i) => (
        <div key={i} className="relative group cursor-pointer mt-4">
          {item.icon}
          {/* 툴팁 */}
          <span
            className="absolute bottom-full mb-2 w-max opacity-0 group-hover:opacity-100
                           bg-neutral-900 text-white text-xs px-2 py-1 rounded transition-opacity
                           whitespace-nowrap text-center"
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Section_third;
