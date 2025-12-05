# fresh-plate 🌱
> **비건과 알러지 환자를 위한 맞춤형 식당 큐레이션 플랫폼**
> *2025 Hanshin university Capstone Design Project*

![Generic badge](https://img.shields.io/badge/Status-Active-green) ![Generic badge](https://img.shields.io/badge/Version-1.0.0-blue) ![Generic badge](https://img.shields.io/badge/Tech-Next.js%20%7C%20Spring%20Boot-black)

## 📖 Introduction
**"누구나 걱정 없이 한 끼를 즐길 권리가 있습니다."**

`fresh-plate`는 채식주의자뿐만 아니라 특정 식재료에 민감한 알러지 환자들이 안심하고 식당을 찾을 수 있도록 돕는 위치 기반 큐레이션 서비스입니다.

기존 지도 서비스들이 제공하는 단순한 '비건' 키워드 검색을 넘어, **재료 기반의 정밀한 알러지 필터링**과 **단계별 비건 옵션(Flexitarian ~ Vegan)** 정보를 제공하여 사용자의 안전하고 즐거운 식문화 경험을 보장합니다.

### 💡 Core Value
* **Safety:** 알러지 유발 성분(계란, 우유, 견과류 등)을 사전에 차단하는 필터링 시스템
* **Convenience:** Kakao Map API 기반의 직관적인 UI로 개인 데이터 기반 맞춤 식당 탐색
* **Reliability:** 사용자 리뷰와 검증된 데이터를 통한 신뢰도 높은 정보 제공

<br/>

## 🛠 Tech Stack & Decisions

| Category | Stack | Decision Logic (Why?) |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** | SEO 최적화를 통한 검색 노출 증대 및 SSR을 활용한 초기 로딩 속도 개선 (LCP 최적화) |
| **Language** | **TypeScript** | 컴파일 타임에 타입을 검증하여 런타임 에러 방지 및 유지보수성 확보 |
| **State Mgt** | **React Query** | 서버 상태(Server State)와 클라이언트 상태의 분리, 캐싱을 통한 API 요청 최적화 |
| **Styling** | **TailwindCSS** | 유틸리티 퍼스트 접근 방식으로 빠른 UI 개발 및 일관된 디자인 시스템 적용 |
| **Package Mgt** | **pnpm** | 효율적인 의존성 관리와 빠른 설치 속도를 위해 npm 대신 채택 |

<br/>

## ✨ Key Features

### 1. 개인화 기반 식당 추천 리스트
* 온보딩을 통해 입력된 식습관(비건/일반식) 및 알러지 데이터 활용
* 유저 개개인을 위한 추천/비추천 리스트 반환

### 2. 알러지 필터링
* 식약처 고시 알레르기 유발 물질(난류, 우유, 메밀, 땅콩 등)을 음식점 리스트에서 제외

### 3. 사용자 리뷰 기반 데이터 최신화
* 방문자의 후기 리뷰 및 메뉴판 이미지를 통해 지속적으로 데이터 고도화
* LLM 기반 메뉴판 이미지 텍스트 추출을 활용해 데이터 최신화 및 변경 이력 기록 후, 유저에게 시점 고지

<br />

## 💻 Architecture Diagram

<img width="1005" height="614" alt="architecture" src="https://github.com/user-attachments/assets/2a39fced-8032-470b-856e-2f2dd00264b8" />
