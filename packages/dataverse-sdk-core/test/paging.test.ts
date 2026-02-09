import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
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

describe("Paging", () => {
  it("get() returns single page", async () => {
    server.use(
      http.get(`${API_URL}/accounts`, () => {
        return HttpResponse.json({
          value: [{ accountid: "1", name: "Account 1" }],
          "@odata.nextLink": `${API_URL}/accounts?$skiptoken=abc`,
        });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const result: any = await client.api("accounts").get();

    expect(result.value.length).toBe(1);
    expect(result["@odata.nextLink"]).toBeDefined();
  });

  it("getPage() returns page with nextLink", async () => {
    server.use(
      http.get(`${API_URL}/accounts`, () => {
        return HttpResponse.json({
          value: [{ accountid: "1", name: "Account 1" }],
          "@odata.nextLink": `${API_URL}/accounts?$skiptoken=abc`,
        });
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const page = await client.api("accounts").getPage();

    expect(page.value.length).toBe(1);
    expect(page["@odata.nextLink"]).toContain("$skiptoken=abc");
  });

  it("iterate() yields all items across multiple pages", async () => {
    let pageNum = 0;
    server.use(
      http.get(`${API_URL}/accounts`, ({ request }) => {
        const url = new URL(request.url);
        const skiptoken = url.searchParams.get("$skiptoken");

        if (!skiptoken) {
          // Page 1
          pageNum = 1;
          return HttpResponse.json({
            value: [
              { accountid: "1", name: "Account 1" },
              { accountid: "2", name: "Account 2" },
            ],
            "@odata.nextLink": `${API_URL}/accounts?$skiptoken=page2`,
          });
        } else if (skiptoken === "page2") {
          // Page 2
          pageNum = 2;
          return HttpResponse.json({
            value: [
              { accountid: "3", name: "Account 3" },
              { accountid: "4", name: "Account 4" },
            ],
            "@odata.nextLink": `${API_URL}/accounts?$skiptoken=page3`,
          });
        } else {
          // Page 3 (last)
          pageNum = 3;
          return HttpResponse.json({
            value: [{ accountid: "5", name: "Account 5" }],
          });
        }
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const items: any[] = [];

    for await (const item of client.api("accounts").iterate()) {
      items.push(item);
    }

    expect(items.length).toBe(5);
    expect(items[0].accountid).toBe("1");
    expect(items[4].accountid).toBe("5");
    expect(pageNum).toBe(3);
  });

  it("getAll() respects maxItems limit", async () => {
    server.use(
      http.get(`${API_URL}/accounts`, ({ request }) => {
        const url = new URL(request.url);
        const skiptoken = url.searchParams.get("$skiptoken");

        if (!skiptoken) {
          return HttpResponse.json({
            value: Array.from({ length: 100 }, (_, i) => ({
              accountid: String(i + 1),
              name: `Account ${String(i + 1)}`,
            })),
            "@odata.nextLink": `${API_URL}/accounts?$skiptoken=page2`,
          });
        } else {
          return HttpResponse.json({
            value: Array.from({ length: 100 }, (_, i) => ({
              accountid: String(i + 101),
              name: `Account ${String(i + 101)}`,
            })),
          });
        }
      })
    );

    const client = new DataverseClient({ baseUrl: BASE_URL });
    const items = await client.api("accounts").getAll({ maxItems: 50 });

    expect(items.length).toBe(50);
  });
});
