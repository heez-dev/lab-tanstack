import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/router/")({
  component: Router,
});

export function Router() {
  return <div>Hello "/router/"!</div>;
}
