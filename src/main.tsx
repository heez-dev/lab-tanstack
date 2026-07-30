import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./styles.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/query-client";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// msw 초기화
async function enableMocking() {
  // Vite가 현재 개발 환경인지 확인, 배포 환경이라면 MSW 실행하지 않음
  if (!import.meta.env.DEV) return;
  // await을 사용한 동적 import
  // 동적 import를 사용하면 개발 환경에서 필요할 때만 MSW 모듈을 불러올 수 있음
  const { worker } = await import("./mocks/browser");
  // 브라우저에서 Service Worker를 등록하고 핸들러를 활성화
  await worker.start();
}

// Enable mocking in development mode
enableMocking().then(() => {
  // Render the app
  const rootElement = document.getElementById("root")!;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
});
