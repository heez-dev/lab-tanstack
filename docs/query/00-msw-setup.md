# MSW 기반 구성

## 목표

- MSW가 Service Worker를 통해 네트워크 요청을 가로채는 방식을 이해한다.
- 브라우저 worker와 요청 handler의 역할을 구분한다.
- React 렌더링 전에 MSW를 시작하는 이유를 이해한다.

## 구성

1. `pnpm exec msw init public --save` 명령어를 통해 public/mockServerWorker.js를 생성한다.
2. src/mocks/handlers.ts에서 API별 요청 처리 규칙을 관리한다.
3. src/mocks/browser.ts에서 handler를 모아 브라우저 worker를 생성한다.
4. src/main.tsx에서 개발 환경일 때만 MSW를 시작한다.
5. worker.start()가 완료된 후 React 앱을 렌더링한다.
6. 자동 생성된 mockServiceWorker.js는 ESLint 검사에서 제외한다.

## 결과

- Vite 개발 서버에서 `msw/browser` 의존성을 정상적으로 불러온 것을 확인했다.
- 브라우저 Console에서 `[MSW] Mocking enabled.` 메시지를 확인했다.
- 개발자 도구의 Application 탭에서 mockServiceWorker.js가 등록된 것을 확인했다.
- 등록된 handler가 없으므로 MSW가 반환하는 mock 응답은 아직 없다.

## 정리

- MSW는 fetch를 교체하지 않고 Service Worker에서 요청을 가로챈다.
- handler는 요청과 응답 규칙을 담당한다.
- worker는 등록된 handler를 브라우저에서 활성화한다.
- worker보다 React가 먼저 실행되면 최초 요청을 가로채지 못할 수 있다.
- 개발 환경: enableMocking() 실행 → worker import → worker.start() 대기 → then() 실행 → React 렌더링
  - worker.start() 실패 → enableMocking() Promise rejected → then() 실행 안 됨 → React 렌더링 안 됨
- 배포 환경: enableMocking() 실행 → 즉시 return → then() 실행 → React 렌더링
