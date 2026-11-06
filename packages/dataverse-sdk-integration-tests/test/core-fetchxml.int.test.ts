/**
 * #51 live: FetchXML through `fetchXml()`, paged with `count="5"` over seven accounts this run
 * creates, the paging annotations, formatted values, and a 40 KB query sent through `$batch`.
 * The accounts are deleted afterwards.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  DataverseClient,
  buildPagedFetchXml,
  parsePagingCookie,
} from "@mohsinonxrm/dataverse-sdk-core";
import { idFromEntityId, live, liveClient, orgUrl, runId } from "./env.js";

const prefix = `sdk-int fetchxml ${runId}`;
const ids: string[] = [];
const sent: Array<{ method: string; url: string }> = [];

/** A client like liveClient(), recording the method and URL of every request. */
function recordingClient(): DataverseClient {
  const { tokenProvider } = liveClient();
  const noop = (): void => undefined;
  return new DataverseClient({
    baseUrl: orgUrl,
    tokenProvider,
    logger: { debug: noop, info: noop, warn: noop, error: noop },
    fetchProvider: {
      fetch: (input, init) => {
        sent.push({
          method: init?.method ?? "GET",
          url: input instanceof Request ? input.url : input.toString(),
        });
        return fetch(input, init);
      },
    },
  });
}

const fetchXml = (extraConditions = "") =>
  `<fetch count="5" returntotalrecordcount="true">` +
  `<entity name="account"><attribute name="name"/><attribute name="statecode"/>` +
  `<order attribute="name"/>` +
  `<filter type="and"><condition attribute="name" operator="like" value="${prefix}%"/>${extraConditions}</filter>` +
  `</entity></fetch>`;

interface Row {
  name: string;
  statecode: number;
  "statecode@OData.Community.Display.V1.FormattedValue"?: string;
}

beforeAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (let i = 1; i <= 7; i++) {
    const res = await client
      .api("accounts")
      .response("POST", { name: `${prefix} ${String(i).padStart(2, "0")}` });
    expect(res.status).toBe(204);
    ids.push(idFromEntityId(res.headers.get("odata-entityid")));
  }
});

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of ids) {
    await client
      .api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: FetchXML (#51)", () => {
  it("pages count=5 over seven rows with the paging cookie", async () => {
    const client = recordingClient();
    const xml = fetchXml();

    const page1 = await client.fetchXml<Row>("accounts", xml);
    expect(page1.value.map((r) => r.name)).toEqual(
      [1, 2, 3, 4, 5].map((i) => `${prefix} 0${String(i)}`)
    );
    expect(page1.moreRecords).toBe(true);
    expect(page1.totalRecordCount).toBe(7);
    expect(page1.totalRecordCountLimitExceeded).toBe(false);
    expect(page1.pagingCookie).toMatch(/^<cookie pagenumber="2" pagingcookie="/);
    // Formatted values come with the default annotations: "*".
    expect(page1.value[0]?.["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");

    const cookie = parsePagingCookie(page1.pagingCookie);
    expect(cookie?.pageNumber).toBe(2);
    expect(cookie?.pagingCookie).toMatch(/^<cookie page="1">/);

    const page2 = await client.fetchXml<Row>(
      "accounts",
      buildPagedFetchXml(xml, { page: 2, pagingCookie: cookie?.pagingCookie })
    );
    expect(page2.value.map((r) => r.name)).toEqual([`${prefix} 06`, `${prefix} 07`]);
    expect(page2.moreRecords).toBe(false);
    expect(page2.pagingCookie).toBeUndefined();
  });

  it("an annotations list still returns the paging annotations", async () => {
    const page = await recordingClient().fetchXml<Row>("accounts", fetchXml(), {
      annotations: ["OData.Community.Display.V1.FormattedValue"],
    });
    expect(page.moreRecords).toBe(true);
    expect(page.totalRecordCount).toBe(7);
    expect(page.value[0]?.["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");
  });

  it("a 40 KB query goes through $batch and returns the same page", async () => {
    const client = recordingClient();
    // 480 conditions: Dataverse allows 500 in a query.
    const conditions = Array.from(
      { length: 480 },
      (_, i) =>
        `<condition attribute="name" operator="neq" value="excluded account name number ${String(i)}"/>`
    ).join("");
    const longXml = fetchXml(conditions);
    expect(longXml.length).toBeGreaterThan(40_000);

    sent.length = 0;
    const viaBatch = await client.fetchXml<Row>("accounts", longXml);
    expect(sent).toHaveLength(1);
    expect(sent[0]?.method).toBe("POST");
    expect(sent[0]?.url.endsWith("/$batch")).toBe(true);

    const direct = await client.fetchXml<Row>("accounts", fetchXml());
    expect(viaBatch.value.map((r) => r.name)).toEqual(direct.value.map((r) => r.name));
    expect(viaBatch.moreRecords).toBe(true);
    expect(viaBatch.totalRecordCount).toBe(7);
    expect(parsePagingCookie(viaBatch.pagingCookie)?.pageNumber).toBe(2);
  });

  it("a failing query sent through $batch rejects with the inner error", async () => {
    // 520 conditions: over Dataverse's limit of 500, and long enough to go through $batch.
    const conditions = Array.from(
      { length: 520 },
      (_, i) =>
        `<condition attribute="name" operator="neq" value="excluded account name number ${String(i)}"/>`
    ).join("");
    const err = await recordingClient()
      .fetchXml("accounts", fetchXml(conditions))
      .catch((e: unknown) => e);
    expect(err).toMatchObject({ status: 400, code: "0x8004430c" });
  });
});
