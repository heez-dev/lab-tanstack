# Router Context와 Query Client 연결

## 목표

- React Query Context와 Router Context의 역할 차이를 이해한다.
- Router의 loader에서 Query Client에 접근할 기반을 구성한다.
- 컴포넌트와 Router가 동일한 Query Cache를 사용하도록 연결한다.

## 구성

1. src/routes/__root.tsx에 Router Context 타입을 정의한다.
2. Router Context의 queryClient 타입으로 QueryClient를 지정한다.
3. createRootRoute를 createRootRouteWithContext로 변경한다.
4. src/main.tsx에서 Router를 생성할 때 queryClient를 context로 전달한다.
5. QueryClientProvider와 Router Context에 동일한 queryClient 인스턴스를 전달한다.

## 결과

- Router 생성 시 정의된 Context 타입에 따라 queryClient 전달이 강제된다.
- 기존 Query와 Router 화면은 정상적으로 렌더링된다.
- 아직 loader에서 queryClient를 사용하지 않으므로 추가 네트워크 요청은 발생하지 않는다.
- Query Devtools의 Cache 상태에는 변화가 없다.

## 정리

- QueryClientProvider는 React 컴포넌트와 useQuery에 Query Client를 제공한다.
- Router Context는 loader와 beforeLoad 같은 route 생명주기 함수에 Query Client를 제공한다.
- createRootRouteWithContext는 Router가 생성될 때 필요한 Context 타입을 강제한다.
- 컴포넌트와 loader가 같은 Query Cache를 사용하려면 동일한 queryClient 인스턴스를 전달해야 한다.
- Router Context에 queryClient를 전달하는 것만으로는 네트워크 요청이 발생하지 않는다.
