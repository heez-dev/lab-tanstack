// handler를 모아 브라우저 worker 생성

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// https://mswjs.io/docs/api/setup-worker/
export const worker = setupWorker(...handlers);
