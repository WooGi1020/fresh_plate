// SpeechBubbles.tsx
"use client";

import { speechBubbles } from "@/app/(section)/position";
import Image from "next/image";

const SpeechBubbles = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-[-10]">
      {speechBubbles.map(({ id, left, top, width, height }) => (
        <div key={id} className="absolute opacity-40 pointer-events-none" style={{ left, top, width, height }}>
          <Image
            src="/images/home/section4_background.png"
            fill
            alt="배경 흐린 말풍선 이미지"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default SpeechBubbles;
