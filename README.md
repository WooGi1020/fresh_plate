# fresh-plate 🌱
> **비건(Vegan)과 알러지(Allergy) 환자를 위한 맞춤형 식당 큐레이션 플랫폼**
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
프로젝트의 안정성과 확장성을 고려하여 **Next.js (Frontend)**와 **Spring Boot (Backend)** 아키텍처를 채택했습니다.

| Category | Stack | Decision Logic (Why?) |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** | SEO 최적화를 통한 검색 노출 증대 및 SSR을 활용한 초기 로딩 속도 개선 (LCP 최적화) |
| **Language** | **TypeScript** | 컴파일 타임에 타입을 검증하여 런타임 에러 방지 및 유지보수성 확보 |
| **State Mgt** | **React Query** | 서버 상태(Server State)와 클라이언트 상태의 분리, 캐싱을 통한 API 요청 최적화 |
| **Styling** | **Tailwind CSS** | 유틸리티 퍼스트 접근 방식으로 빠른 UI 개발 및 일관된 디자인 시스템 적용 |
| **Package Mgt** | **pnpm** | 효율적인 의존성 관리와 빠른 설치 속도를 위해 npm 대신 채택 |

<br/>

## ✨ Key Features

### 1. 맞춤형 지도 탐색 (Map Curation)
* **Kakao Map API**를 활용하여 마커 기반 위치 서비스 제공
* 클러스터링을 적용하여 지도 축소 시 데이터 시인성 확보

### 2. 듀얼 필터링 시스템 (Dual Filtering)
* **Vegan Filter:** 비건, 락토, 오보, 글루텐프리 등 채식 타입 필터링
* **Allergy Filter:** 식약처 고시 알레르기 유발 물질(난류, 우유, 메밀, 땅콩 등)을 음식점 리스트에서 제외

### 3. 사용자 참여형 리뷰
* 방문자의 후기 리뷰 및 메뉴판 이미지를 통해 지속적으로 데이터 고도화
* LLM 기반 메뉴판 이미지 텍스트 추출을 활용해 데이터 최신화

<br />

## 💻 Architecture Diagram

<img width="1005" height="614" alt="architecture" src="https://github.com/user-attachments/assets/2a39fced-8032-470b-856e-2f2dd00264b8" />
