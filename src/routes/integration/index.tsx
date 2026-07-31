import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/integration/")({
  component: Integration,
});

export function Integration() {
  return <div>Query와 Router 통합 실습</div>;
}
