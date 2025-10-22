"use client";

import {
  Section_first,
  Section_second,
  Section_third,
  Section_fourth,
  Section_fifth,
} from "@/app/(section)";
import { useScrollFade } from "@/hooks/useScrollFade";

export const dynamic = "force-static";

export default function Home() {
  const sections = [
    Section_first,
    Section_second,
    Section_third,
    Section_fourth,
    Section_fifth,
  ];

  return (
    <div aria-label="메인 콘텐츠" className="space-y-24">
      {sections.map((Section, idx) => {
        const { ref, isVisible, delayClass } = useScrollFade(idx);
        return (
          <div
            key={idx}
            ref={ref}
            className={`fade-up ${delayClass} ${isVisible ? "show" : ""}`}
          >
            <Section />
          </div>
        );
      })}
    </div>
  );
}
