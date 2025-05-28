import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          default: "#3E7B27", // 짙은 자연 녹색 (버튼, 포인트 등)
          dark: "#123524", // 더 어두운 포인트 (호버 등)
          light: "#85A947", // 밝은 강조색
        },

        secondary: {
          default: "#CBD2A9", // 연한 올리브 (보조색상)
          light: "#EAEEDB", // 부드러운 민트톤 (배경용)
        },

        neutral: {
          100: "#FFFDF4", // 아이보리 배경
          200: "#FFFFFF", // 완전 흰색
          700: "#927F71", // 연한 브라운 (보조 텍스트 등)
          900: "#504840", // 진한 브라운 (기본 텍스트, 제목 등)
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
