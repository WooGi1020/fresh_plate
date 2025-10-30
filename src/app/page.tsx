"use client";

import {
  Section_first,
  Section_second,
  Section_third,
  Section_fourth,
  Section_fifth,
} from "@/app/(section)";
import { useScrollFade } from "@/hooks/useScrollFade";

import ArrowDownIcon from "@/icons/arrow_down_icon.svg";

export default function Home() {
  const sections = [
    Section_first,
    Section_second,
    Section_third,
    Section_fourth,
    Section_fifth,
  ];

  return (
    <div aria-label="메인 콘텐츠">
      {sections.map((Section, idx) => {
        const { ref, isVisible, delayClass } = useScrollFade(idx);
        return (
          <div
            key={idx}
            ref={ref}
            className={`relative fade-up ${delayClass} ${
              isVisible ? "show" : ""
            }`}
          >
            <Section />
            {idx === 0 && (
              <ArrowDownIcon className="absolute size-12 left-1/2 -translate-1/2 animate-bounce bottom-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
