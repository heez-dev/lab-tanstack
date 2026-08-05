# Basic Query

## 목표

- useQuery의 기본 동작을 확인한다.
- 동일한 Query를 여러 컴포넌트가 사용할 때 요청이 공유되는지 확인한다.
- Query Cache와 observer의 관계를 확인한다.

## 구성

- `GET /api/posts` 요청을 처리하는 MSW handler를 구성했다.
- 서버 응답을 확인하기 위해 1초 지연을 적용했다.
- 동일한 queryKey와 queryFn을 사용하는 observer 두 개를 렌더링했다.

## 결과

- 1초 동안 Observer A와 Observer B의 loading 화면이 함께 표시됐다.
- Network에서 /api/posts 요청이 한 번 발생했다.
- Query Devtools에서 ["posts"] Query가 한 개 존재했다.
- ["posts"] Query의 observer는 2였다.
- /query로 이동한 후 observer는 0으로 변경됐다.
- observer가 사라진 후 ["posts"] Query는 inactive 상태로 Cache에 남아 있었다.

## 정리

- queryKey는 Query Cache에서 서버 데이터를 식별하는 기준으로 사용된다.
- 같은 queryKey를 사용하는 useQuery는 하나의 Query를 공유한다.
- useQuery를 호출한 컴포넌트마다 observer가 생성되고 동일한 Query의 상태와 데이터를 구독한다.
- 여러 observer가 동시에 같은 Query를 요청하면 진행 중인 요청을 공유하므로 컴포넌트 수만큼 요청이 발생하지 않는다.
- 컴포넌트가 unmount되면 observer는 제거되지만 Cache의 Query와 데이터는 즉시 삭제되지 않는다.
