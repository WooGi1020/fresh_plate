import { speechBubbles } from "@/constants/position";
import Image from "next/image";

const SpeechBubbles = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      <div className="relative w-full h-full scale-90 sm:scale-95 md:scale-100 transition-transform duration-300">
        {speechBubbles.map(({ id, left, top, width, height }) => (
          <div
            key={id}
            className="absolute opacity-40 pointer-events-none"
            style={{
              left,
              top,
              width,
              height,
            }}
          >
            <Image
              src="/images/home/section4_background.png"
              fill
              alt="배경 흐린 말풍선 이미지"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeechBubbles;
