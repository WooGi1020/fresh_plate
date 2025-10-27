"use client";

import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardContent } from "./(components)/Card";
import ArrowIcon from "@/icons/arrow_icon.svg";
import sections from "@/constants/myPageSections";
import Image from "next/image";

export default function MyPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#FBF8EF] px-8 py-10 bg-[url('/images/bg2.png')] bg-cover">
      <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, idx) => (
          <Card
            key={section.title}
            className={clsx(
              "lg:min-h-100 sm:relative rounded-2xl border border-gray-100 shadow-sm bg-white/80 backdrop-blur-md",
              idx === 1 ? "top-15" : idx === 0 ? "bottom-15" : "top-0"
            )}
          >
            <div
              className={clsx(
                "relative size-10 -translate-x-1/2 left-1/2 -top-15",
                idx === 1 ? "rotate-6" : idx === 0 ? "rotate-24" : "rotate-64"
              )}
            >
              <Image
                src="/images/tape_img.png"
                alt="테이핑 이미지"
                className="absolute object-cover"
                fill
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mt-8">
              {section.items.map((item) => (
                <button
                  key={item}
                  className="group w-full flex items-center justify-between text-sm text-gray-700 hover:text-green-700 hover:underline transition-all cursor-pointer hover:translate-x-1"
                >
                  {item}
                  <ArrowIcon className="size-4 stroke-black group-hover:stroke-green-700 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
