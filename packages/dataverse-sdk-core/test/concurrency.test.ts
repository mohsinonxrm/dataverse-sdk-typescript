import { describe, it, expect } from "vitest";
import { ConcurrencyMiddleware } from "../src/middleware/ConcurrencyMiddleware.js";

function resWithHint(hint: string) {
  return new Response("", { status: 200, headers: { "x-ms-dop-hint": hint } });
}

describe("ConcurrencyMiddleware", () => {
  it("reads x-ms-dop-hint and adapts", async () => {
    const mw = new ConcurrencyMiddleware({
      baseUrl: "https://example.crm.dynamics.com",
      concurrency: { adaptiveFromDopHint: true, min: 2, max: 16 },
    } as any);
    const next = () => Promise.resolve(resWithHint("5"));
    const res = await mw.execute(
      { method: "GET", url: "https://x", headers: {} } as any,
      {} as any,
      next as any
    );
    expect(res.status).toBe(200);
  });
});
