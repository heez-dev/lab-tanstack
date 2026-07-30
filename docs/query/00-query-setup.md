# TanStack Query 기반 구성

## 목표

- QueryClient가 Query Cache 관리하는 역할을 이해한다.
- QueryClientProvider가 하위 컴포넌트에 client를 제공하는 구조를 이해한다.
- React Query Devtools의 역할을 이해한다.

## 구성

1. QueryClient는 src/app/query-client.ts에 한 번만 생성한다.
2. QueryClientProvider는 RouterProvider의 상위에 배치한다.
3. React Query Devtools는 src/routes/__root.tsx에 배치한다.
   - 해당 위치에 TanStackRouterDevtools가 이미 배치되어 있기 때문이다.
   - 추가적인 Provider를 사용할 경우 Provider와 관련 요소를 모아 컴포넌트 분리를 하면 관리가 용이할 것이라 예상한다.

## 결과

- 기존 Router 화면은 정상적으로 렌더링 되었다.
- Query Devtools가 정상적으로 동작한다.
- useQuery를 호출하지 않았으므로 Query 목록은 비어있다.
- Provider 연결만으로는 네트워크 요청이 발생하지 않는다.

## 정리

- QueryClient는 Query Cache를 관리하고, 캐시 조회/갱신/무효화 등에 접근하는 중심 객체 역할을 한다.
