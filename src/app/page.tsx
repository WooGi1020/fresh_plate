import {
  Section_first,
  Section_second,
  Section_third,
  Section_fourth,
  Section_fifth,
} from "@/app/(section)";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main aria-label="메인 콘텐츠" className="space-y-24">
      <Section_first />
      <Section_second />
      <Section_third />
      <Section_fourth />
      <Section_fifth />
    </main>
  );
}
