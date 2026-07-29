import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/router/router-sub")({
  component: RouterSub,
});

export function RouterSub() {
  return <div>Hello "/router/router-sub"!</div>;
}
