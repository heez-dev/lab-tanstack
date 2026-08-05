// API별 요청 처리 규칙

import type { RequestHandler } from "msw";
import { delay, http, HttpResponse } from "msw";

export const handlers: RequestHandler[] = [
  http.get("/api/posts", async () => {
    await delay(1000); // 1초 지연

    return HttpResponse.json([
      {
        id: 1,
        title: "Query Cache 이해하기",
      },
      {
        id: 2,
        title: "Router Context 이해하기",
      },
    ]);
  }),
];
