import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient } from "../src/client/DataverseClient.js";

const BASE_URL = "https://org.crm.dynamics.com";
const API_URL = `${BASE_URL}/api/data/v9.2`;

const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("Retry behavior", () => {
  it("retries on 429 honoring Retry-After seconds", async () => {
    vi.useFakeTimers();
    let attemptCount = 0;

    server.use(
      http.get(`${API_URL}/accounts`, () => {
        attemptCount++;
        if (attemptCount === 1) {
          return new HttpResponse(JSON.stringify({ error: { message: "Too many requests" } }), {
            status: 429,
            headers: { "retry-after": "2" }, // 2 seconds
          });
        }
        return HttpResponse.json({ value: [] });
      })
    );

    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { maxRetries: 2, jitter: false },
    });

    const promise = client.api("accounts").get();

    // Advance time by 2 seconds (retry-after value)
    await vi.advanceTimersByTimeAsync(2000);

    const result = await promise;
    expect(attemptCount).toBe(2);
    expect(result).toEqual({ value: [] });

    vi.useRealTimers();
  });

  it("retries on 503 with exponential backoff", async () => {
    vi.useFakeTimers();
    let attemptCount = 0;

    server.use(
      http.get(`${API_URL}/accounts`, () => {
        attemptCount++;
        if (attemptCount < 3) {
          return new HttpResponse(null, { status: 503 });
        }
        return HttpResponse.json({ value: [] });
      })
    );

    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { maxRetries: 3, baseDelayMs: 1000, jitter: false },
    });

    const promise = client.api("accounts").get();

    // First retry after 1s
    await vi.advanceTimersByTimeAsync(1000);
    // Second retry after 2s (exponential)
    await vi.advanceTimersByTimeAsync(2000);

    const result = await promise;
    expect(attemptCount).toBe(3);
    expect(result).toEqual({ value: [] });

    vi.useRealTimers();
  });

  it("stops retrying after maxRetries", async () => {
    vi.useFakeTimers();
    let attemptCount = 0;

    server.use(
      http.get(`${API_URL}/accounts`, () => {
        attemptCount++;
        return new HttpResponse(null, { status: 429 });
      })
    );

    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { maxRetries: 2, baseDelayMs: 100, jitter: false },
    });

    const promise = client
      .api("accounts")
      .get()
      .catch((_err: unknown) => _err);

    // Advance through all retry attempts
    for (let i = 0; i < 5; i++) {
      await vi.advanceTimersByTimeAsync(10000);
    }

    const result = await promise;
    expect(attemptCount).toBe(3); // initial + 2 retries
    expect(result.status).toBe(429);

    vi.useRealTimers();
  });

  it("does not retry on 400 client errors", async () => {
    let attemptCount = 0;

    server.use(
      http.get(`${API_URL}/accounts`, () => {
        attemptCount++;
        return new HttpResponse(JSON.stringify({ error: { message: "Bad request" } }), {
          status: 400,
        });
      })
    );

    const client = new DataverseClient({
      baseUrl: BASE_URL,
      retry: { maxRetries: 3 },
    });

    try {
      await client.api("accounts").get();
      expect.fail("Should have thrown error");
    } catch (_err: unknown) {
      expect(attemptCount).toBe(1); // No retries for 400
    }
  });
});
