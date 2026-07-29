import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/query/")({
  component: Query,
});

export function Query() {
  return <div>Hello "/query/"!</div>;
}
