# TanStack Router 기반 구성

## 목표

- TanStack Router의 파일 기반 라우팅 구성을 확인한다.
- route 파일과 URL 경로의 관계를 이해한다.
- Router plugin이 route tree를 생성하는 흐름을 이해한다.

## 구성

1. vite.config.ts에 TanStack Router Plugin을 등록한다.
   - React plugin보다 먼저 실행되도록 배치한다.
   - autoCodeSplitting을 활성화한다.
2. src/routes/__root.tsx에서 최상위 layout을 구성한다.
3. Outlet을 통해 현재 URL과 일치하는 route 컴포넌트를 렌더링한다.
4. src/routes의 파일 구조를 기준으로 URL 경로를 생성한다.
5. Router plugin이 src/routeTree.gen.ts를 자동 생성한다.
   - 자동 생성 파일이므로 직접 수정하지 않는다.
6. src/main.tsx에서 생성된 route tree로 Router 인스턴스를 만들고 RouterProvider에 전달한다.
7. src/routes/__root.tsx에 Router Devtools를 배치한다.
8. Sidebar라는 route 파일 구조를 읽어 navication을 구성한다.

## 결과

- `/`, `/query`, `/query/query-sub`, `/router`, `/router/router-sub` 경로가 정상적으로 렌더링된다.
- URL을 직접 입력하거나 새로고침해도 해당 route가 렌더링된다.
- Sidebar의 Link를 통해 URL을 이동할 수 있다.
- 현재 URL과 일치하는 Sidebar Link에 active 스타일이 적용된다.
- Router Devtools에서 route tree와 현재 match를 확인할 수 있다.

## 정리

- route 파일은 URL 구조와 화면의 연결을 담당한다.
- src/routes/__root.tsx는 모든 route가 공유하는 최상위 layout이다.
- Outlet에는 현재 URL과 일치하는 하위 route가 렌더링된다.
- Router plugin은 route 파일을 읽어 타입 안전한 route tree를 생성한다.
- routeTree.gen.ts는 개발 서버를 시작하거나 개발 서버 실행 중 route 파일이 변경될 때, 빌드를 실행할 때 자동으로 갱신된다.
