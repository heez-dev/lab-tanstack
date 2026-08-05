import { createFileRoute } from "@tanstack/react-router";
import BasicQueryLab from "../../labs/query/basic-query/basic-query-lab";

export const Route = createFileRoute("/query/basic")({
  component: BasicQueryLab,
});
