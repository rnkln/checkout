import { http ,delay, type DelayMode } from "msw"

export const createDelay = (mode: DelayMode) => [
  http.all('*', async () => {
    await delay(mode)
  }
)]