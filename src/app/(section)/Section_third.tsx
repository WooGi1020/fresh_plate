import Image from "next/image";
import AwardIcon from "@/icons/award_icon.svg";
import AllergyIcon from "@/icons/allegy_icon.svg";
import GlutenFreeIcon from "@/icons/gluten_free_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import LacToIcon from "@/icons/lacto_icon.svg";

const icons = [
  {
    icon: <GlutenFreeIcon className="w-7 h-7" />,
    title: "글루텐프리",
    description:
      "밀가루나 보리 등 글루텐이 포함되지 않은 식단입니다.\n음식점 상세 말풍선에 표시됩니다.",
  },
  {
    icon: <LacToIcon className="w-7 h-7" />,
    title: "락토",
    description:
      "유제품은 허용하지만 달걀과 육류는 제외하는 채식 형태입니다.\n음식점 상세 말풍선에 표시됩니다.",
  },
  {
    icon: <OvoIcon className="w-7 h-7" />,
    title: "오보",
    description:
      "달걀은 허용하지만 유제품과 육류는 제외하는 채식 형태입니다.\n음식점 상세 말풍선에 표시됩니다.",
  },
  {
    icon: <AwardIcon className="w-7 h-7" />,
    title: "데이터 검증 여부",
    description:
      "메뉴판 AI 추출을 통해 최신화된 시각이 표시됩니다.\n음식점 상세 말풍선 우측 상단에 표시됩니다.",
  },
  {
    icon: <AllergyIcon className="w-7 h-7 stroke-red-500" />,
    title: "알러지 유발 위험도",
    description:
      "메뉴 재료 중 알레르기 유발 가능성이 있는 경우 표시됩니다.\n음식점 상세 말풍선 중앙에 표시됩니다.",
  },
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
          {/* 텍스트 카드 4~6 */}
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
  icon?: { icon: React.ReactNode; title: string; description: string }[];
}) => (
  <div className="bg-[#FFFDF4] rounded-md px-6 sm:px-10 py-5 sm:py-6 shadow-md w-full flex flex-col justify-center h-fit lg:min-h-20 lg:max-h-screen">
    <p className="text-lg lg:text-xl font-normal">{text}</p>

    {icon && (
      <div className="mx-auto flex gap-4 sm:gap-10 items-center flex-wrap">
        {icon.map((item, i) => (
          <div key={i} className="relative group cursor-pointer mt-4">
            {item.icon}
            {/* 툴팁 */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max
                         px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg shadow-md
                         opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
                         transition-all duration-200 pointer-events-none z-10"
            >
              <p className="font-semibold text-[16px] mb-1">{item.title}</p>
              <p className="text-[12px] text-neutral-300 whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Section_third;
