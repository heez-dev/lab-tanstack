import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/query/query-sub")({
  component: QuerySub,
});

export function QuerySub() {
  return <div>Hello "/query/query-sub"!</div>;
}
