import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Sidebar } from "../components/Sidebar";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
  queryClient: QueryClient;
}

export const RootLayout = () => (
  <div className="grid min-h-screen grid-cols-[240px_minmax(0,1fr)] grid-rows-1 bg-slate-50 text-slate-900">
    <Sidebar />
    <main className="min-w-0 p-5 sm:p-8">
      <Outlet />
    </main>
    <TanStackRouterDevtools />
    <ReactQueryDevtools initialIsOpen={false} position="right" />
  </div>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
