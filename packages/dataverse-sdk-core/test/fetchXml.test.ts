/**
 * #51: FetchXML queries. `fetchXml()`, `savedQuery()`, `userQuery()`, the paging helpers and the
 * `$batch` fallback for long queries. Response bodies follow what a live org returns (values are
 * made up; annotation names and shapes are as recorded).
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";
import { buildPagedFetchXml, parsePagingCookie } from "../src/fetchxml/pagingCookie.js";
import { readSingleBatchResponse } from "../src/fetchxml/singleGetBatch.js";
import { annotationsPreference, toFetchXmlPage } from "../src/fetchxml/page.js";
import { Prefer, type PreferOption } from "../src/abstractions/options.js";
import { DataverseODataError } from "../src/errors/DataverseODataError.js";

const ORG = "https://contoso.crm.dynamics.com";
const API = `${ORG}/api/data/v9.2`;

interface Sent {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

function fakeClient(
  respond: (req: Sent) => Response,
  extra: Partial<ConstructorParameters<typeof DataverseClient>[0]> = {}
) {
  const sent: Sent[] = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (input, init) => {
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
        const req: Sent = {
          method: init?.method ?? "GET",
          url: input instanceof Request ? input.url : input.toString(),
          headers,
          body: typeof init?.body === "string" ? init.body : undefined,
        };
        sent.push(req);
        return Promise.resolve(respond(req));
      },
    },
    ...extra,
  });
  return { client, sent };
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; odata.metadata=minimal", ...headers },
  });

// The cookie Dataverse returns: the inner <cookie> is URL-encoded twice.
const INNER_COOKIE =
  '<cookie page="1"><name last="Fourth &amp; Co" first="A. Datum" /><accountid last="{4D1C6E2B-0000-0000-0000-000000000004}" first="{4D1C6E2B-0000-0000-0000-000000000001}" /></cookie>';
const COOKIE_ANNOTATION = `<cookie pagenumber="2" pagingcookie="${encodeURIComponent(
  encodeURIComponent(INNER_COOKIE)
)}" istracking="False" />`;

/** A first page as a live org returns it with `Prefer: odata.include-annotations="*"`. */
const PAGE_1 = {
  "@odata.context": `${API}/$metadata#accounts(name,statecode,accountid)`,
  "@Microsoft.Dynamics.CRM.totalrecordcount": 7,
  "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": false,
  "@Microsoft.Dynamics.CRM.globalmetadataversion": "8881376",
  "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie": COOKIE_ANNOTATION,
  "@Microsoft.Dynamics.CRM.morerecords": true,
  value: [
    {
      "@odata.etag": 'W/"1001"',
      name: "A. Datum",
      "statecode@OData.Community.Display.V1.FormattedValue": "Active",
      statecode: 0,
      "_ownerid_value@OData.Community.Display.V1.FormattedValue": "Contoso Admin",
      "_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "systemuser",
      "_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "ownerid",
      _ownerid_value: "00000000-0000-0000-0000-0000000000aa",
      accountid: "4d1c6e2b-0000-0000-0000-000000000001",
    },
  ],
};

/** The last page: Dataverse sends neither a cookie nor morerecords. */
const LAST_PAGE = {
  "@odata.context": `${API}/$metadata#accounts(name,accountid)`,
  "@Microsoft.Dynamics.CRM.totalrecordcount": -1,
  "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": false,
  value: [{ name: "Last", accountid: "4d1c6e2b-0000-0000-0000-000000000007" }],
};

const FETCH = `<fetch count="5" returntotalrecordcount="true"><entity name="account"><attribute name="name"/><attribute name="statecode"/><filter><condition attribute="name" operator="like" value="A %"/></filter></entity></fetch>`;

describe("fetchXml(): request", () => {
  it("sends GET {entitySet}?fetchXml= with encodeURIComponent encoding and all annotations", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    await client.api("accounts").fetchXml(FETCH);
    expect(sent).toHaveLength(1);
    const r = sent[0];
    expect(r.method).toBe("GET");
    expect(r.url).toBe(`${API}/accounts?fetchXml=${encodeURIComponent(FETCH)}`);
    expect(r.url).toContain("%20"); // spaces are %20, not "+"
    expect(r.url).not.toContain("+");
    expect(r.headers.prefer).toBe('odata.include-annotations="*"');
  });

  it("client.fetchXml(entitySet, xml) is the same request", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    const page = await client.fetchXml("accounts", FETCH);
    expect(sent[0]?.url).toBe(`${API}/accounts?fetchXml=${encodeURIComponent(FETCH)}`);
    expect(page.moreRecords).toBe(true);
  });

  it("an annotations list gets Microsoft.Dynamics.CRM.* so the paging annotations still come back", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    await client
      .api("accounts")
      .fetchXml(FETCH, { annotations: ["OData.Community.Display.V1.FormattedValue"] });
    expect(sent[0]?.headers.prefer).toBe(
      'odata.include-annotations="OData.Community.Display.V1.FormattedValue,Microsoft.Dynamics.CRM.*"'
    );
  });

  it("sends a single include-annotations preference, replacing the builder's and the client default", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1), {
      defaultPrefer: [Prefer.includeAnnotations("OData.Community.Display.V1.FormattedValue")],
    });
    await client
      .api("accounts")
      .prefer(Prefer.includeAnnotations("Microsoft.Dynamics.CRM.lookuplogicalname"))
      .preferRaw("odata.maxpagesize=10")
      .fetchXml(FETCH, { prefer: ["return=representation" as PreferOption] });
    const prefer = sent[0]?.headers.prefer ?? "";
    expect(prefer.match(/odata\.include-annotations/g)).toHaveLength(1);
    expect(prefer).toContain('odata.include-annotations="*"');
    expect(prefer).toContain("odata.maxpagesize=10");
    expect(prefer).toContain("return=representation");
  });

  it("keeps the builder's headers, impersonation and request options", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    const controller = new AbortController();
    await client
      .api("accounts")
      .impersonate("00000000-0000-0000-0000-0000000000bb")
      .header("X-Custom", "1")
      .fetchXml(FETCH, { headers: { "x-other": "2" }, signal: controller.signal });
    expect(sent[0]?.headers.mscrmcallerid).toBe("00000000-0000-0000-0000-0000000000bb");
    expect(sent[0]?.headers["x-custom"]).toBe("1");
    expect(sent[0]?.headers["x-other"]).toBe("2");
  });

  it("appends to a path that already has a query string", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    await client.api("accounts?x=1").fetchXml(FETCH);
    expect(sent[0]?.url).toBe(`${API}/accounts?x=1&fetchXml=${encodeURIComponent(FETCH)}`);
  });

  it("rejects an empty query, and query options that Dataverse can't combine with fetchXml", async () => {
    const { client, sent } = fakeClient(() => json(PAGE_1));
    await expect(client.api("accounts").fetchXml("  ")).rejects.toMatchObject({
      name: "MissingParameter",
    });
    await expect(client.api("accounts").select("name").fetchXml(FETCH)).rejects.toMatchObject({
      name: "InvalidParameter",
    });
    await expect(client.api("accounts").savedQuery("")).rejects.toMatchObject({
      name: "MissingParameter",
    });
    await expect(client.api("accounts").userQuery("")).rejects.toMatchObject({
      name: "MissingParameter",
    });
    expect(sent).toHaveLength(0);
  });

  it("an error response rejects with the typed OData error", async () => {
    const { client } = fakeClient(() =>
      json(
        {
          error: {
            code: "0x80041103",
            message: "'account' entity doesn't contain attribute with Name = 'nope'.",
          },
        },
        400
      )
    );
    const err = await client
      .api("accounts")
      .fetchXml(FETCH)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(DataverseODataError);
    expect(err).toMatchObject({ status: 400, code: "0x80041103" });
  });
});

describe("fetchXml(): page", () => {
  it("maps every paging annotation and keeps record annotations", async () => {
    const { client } = fakeClient(() => json({ ...PAGE_1, "@odata.count": 1 }));
    const page = await client.api("accounts").fetchXml(FETCH);
    expect(page.pagingCookie).toBe(COOKIE_ANNOTATION);
    expect(page.moreRecords).toBe(true);
    expect(page.totalRecordCount).toBe(7);
    expect(page.totalRecordCountLimitExceeded).toBe(false);
    expect(page.count).toBe(1);
    expect(page.nextLink).toBeUndefined();
    const row = page.value[0] ?? {};
    expect(row["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");
    expect(row["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]).toBe("systemuser");
    expect(row["_ownerid_value@Microsoft.Dynamics.CRM.associatednavigationproperty"]).toBe(
      "ownerid"
    );
  });

  it("the last page has no cookie and moreRecords false", async () => {
    const { client } = fakeClient(() => json(LAST_PAGE));
    const page = await client.api("accounts").fetchXml(FETCH);
    expect(page.pagingCookie).toBeUndefined();
    expect(page.moreRecords).toBe(false);
    expect(page.totalRecordCount).toBe(-1);
  });

  it("toFetchXmlPage tolerates string values and odd bodies", () => {
    expect(
      toFetchXmlPage({
        value: [],
        "@Microsoft.Dynamics.CRM.morerecords": "true",
        "@Microsoft.Dynamics.CRM.totalrecordcount": "12",
        "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": "true",
      })
    ).toEqual({
      value: [],
      moreRecords: true,
      totalRecordCount: 12,
      totalRecordCountLimitExceeded: true,
    });
    expect(toFetchXmlPage(undefined)).toEqual({ value: [], moreRecords: false });
    expect(toFetchXmlPage({ value: "x", "@Microsoft.Dynamics.CRM.totalrecordcount": "" })).toEqual({
      value: [],
      moreRecords: false,
    });
  });

  it("annotationsPreference keeps a list that already covers the paging annotations", () => {
    expect(annotationsPreference()).toBe('odata.include-annotations="*"');
    expect(annotationsPreference(["Microsoft.Dynamics.CRM.*"])).toBe(
      'odata.include-annotations="Microsoft.Dynamics.CRM.*"'
    );
  });
});

describe("savedQuery() and userQuery()", () => {
  it("send ?savedQuery= / ?userQuery= and return the nextLink", async () => {
    const next = `${API}/accounts?savedQuery=00000000-0000-0000-0000-000000000001&$skiptoken=x`;
    const { client, sent } = fakeClient(() =>
      json({ value: [{ name: "a" }], "@odata.nextLink": next })
    );
    const saved = await client.savedQuery("accounts", "00000000-0000-0000-0000-000000000001");
    const user = await client.userQuery("accounts", "00000000-0000-0000-0000-000000000002", {
      annotations: ["OData.Community.Display.V1.FormattedValue"],
    });
    expect(sent[0]?.url).toBe(`${API}/accounts?savedQuery=00000000-0000-0000-0000-000000000001`);
    expect(sent[1]?.url).toBe(`${API}/accounts?userQuery=00000000-0000-0000-0000-000000000002`);
    expect(saved.nextLink).toBe(next);
    expect(user.value).toEqual([{ name: "a" }]);
  });

  it("are never sent as $batch, however long the URL", async () => {
    const { client, sent } = fakeClient(() => json({ value: [] }));
    await client.api("accounts").savedQuery("00000000-0000-0000-0000-000000000001", {
      maxUrlLength: 10,
    });
    expect(sent[0]?.method).toBe("GET");
  });
});

// ─────────────────────────── long queries go through $batch ───────────────────────────

/** A `$batch` response with one part. Dataverse gives it the inner status (a failed query is a 400). */
function batchOf(inner: string, status = 200, boundary = "batchresponse_1f2e") {
  return new Response(
    [
      `--${boundary}`,
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      "",
      inner,
      `--${boundary}--`,
      "",
    ].join("\r\n"),
    { status, headers: { "content-type": `multipart/mixed; boundary=${boundary}` } }
  );
}

const innerOk = (body: unknown) =>
  [
    "HTTP/1.1 200 OK",
    "Content-Type: application/json; odata.metadata=minimal",
    "OData-Version: 4.0",
    'Preference-Applied: odata.include-annotations="*"',
    "",
    JSON.stringify(body),
  ].join("\r\n");

/** A FetchXML document of about 40 KB: 480 conditions (Dataverse allows 500) in one filter. */
function longFetchXml(): string {
  const conditions = Array.from(
    { length: 480 },
    (_, i) =>
      `<condition attribute="name" operator="neq" value="excluded account name number ${String(i)}"/>`
  ).join("");
  return `<fetch count="5"><entity name="account"><attribute name="name"/><filter type="and">${conditions}</filter></entity></fetch>`;
}

describe("fetchXml(): $batch fallback", () => {
  it("a 40 KB query is sent as POST $batch with one inner GET, and returns the same page", async () => {
    const xml = longFetchXml();
    expect(xml.length).toBeGreaterThan(40_000);
    const { client, sent } = fakeClient((req) =>
      req.url.endsWith("/$batch") ? batchOf(innerOk(PAGE_1)) : json(PAGE_1)
    );
    const viaBatch = await client
      .api("accounts")
      .impersonate("00000000-0000-0000-0000-0000000000bb")
      .fetchXml(xml);

    expect(sent).toHaveLength(1);
    const outer = sent[0];
    expect(outer.method).toBe("POST");
    expect(outer.url).toBe(`${API}/$batch`);
    expect(outer.headers["content-type"]).toMatch(/^multipart\/mixed; boundary=batch_/);
    expect(outer.headers.prefer).toBeUndefined(); // the preference belongs to the inner GET
    expect(outer.headers.mscrmcallerid).toBe("00000000-0000-0000-0000-0000000000bb");

    const body = outer.body ?? "";
    expect(body).toContain(`GET ${API}/accounts?fetchXml=${encodeURIComponent(xml)} HTTP/1.1\r\n`);
    expect(body).toContain('prefer: odata.include-annotations="*"\r\n');
    expect(body).toContain("accept: application/json\r\n");
    expect(body).toContain("mscrmcallerid: 00000000-0000-0000-0000-0000000000bb\r\n");
    expect(body).not.toMatch(/authorization/i);
    expect(body).not.toMatch(/^content-type: multipart/im);

    const direct = await client.api("accounts").fetchXml(FETCH);
    expect(viaBatch).toEqual(direct);
  });

  it("maxUrlLength lowers the threshold", async () => {
    const { client, sent } = fakeClient(() => batchOf(innerOk(LAST_PAGE)));
    const page = await client.api("accounts").fetchXml(FETCH, { maxUrlLength: 100 });
    expect(sent[0]?.method).toBe("POST");
    expect(page.moreRecords).toBe(false);
  });

  it("an absolute path uses the $batch of its own Web API root", async () => {
    const { client, sent } = fakeClient(() => batchOf(innerOk(LAST_PAGE)));
    await client.api(`${ORG}/api/data/v9.1/accounts`).fetchXml(FETCH, { maxUrlLength: 1 });
    expect(sent[0]?.url).toBe(`${ORG}/api/data/v9.1/$batch`);
  });

  it.each([400, 200])(
    "an inner error rejects with the inner OData error (outer status %i)",
    async (outerStatus) => {
      const { client } = fakeClient(() =>
        batchOf(
          [
            "HTTP/1.1 400 Bad Request",
            "Content-Type: application/json; odata.metadata=minimal",
            "",
            JSON.stringify({
              error: {
                code: "0x8004430c",
                message: "Number of conditions in query exceeded maximum limit.",
              },
            }),
          ].join("\r\n"),
          outerStatus
        )
      );
      const err = await client
        .api("accounts")
        .fetchXml(FETCH, { maxUrlLength: 1 })
        .catch((e: unknown) => e);
      expect(err).toBeInstanceOf(DataverseODataError);
      expect(err).toMatchObject({
        status: 400,
        code: "0x8004430c",
        message: "Number of conditions in query exceeded maximum limit.",
      });
    }
  );

  it("an outer error rejects with the typed OData error", async () => {
    const { client } = fakeClient(() =>
      json({ error: { code: "0x0", message: "Batch failed." } }, 400)
    );
    await expect(client.api("accounts").fetchXml(FETCH, { maxUrlLength: 1 })).rejects.toMatchObject(
      { status: 400, message: "Batch failed." }
    );
  });
});

describe("readSingleBatchResponse()", () => {
  it("reads a quoted boundary, LF line endings and a 204 part", async () => {
    const text = [
      "--b1",
      "Content-Type: application/http",
      "",
      "HTTP/1.1 204 No Content",
      "OData-Version: 4.0",
      "",
      "",
      "--b1--",
    ].join("\n");
    const res = await readSingleBatchResponse(
      new Response(text, { headers: { "content-type": 'multipart/mixed; boundary="b1"' } })
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("odata-version")).toBe("4.0");
    expect(await res.text()).toBe("");
  });

  it("throws on bodies that aren't a batch response", async () => {
    await expect(readSingleBatchResponse(json({}))).rejects.toThrow(/not multipart/);
    const mp = (t: string) =>
      new Response(t, { headers: { "content-type": "multipart/mixed; boundary=b" } });
    await expect(readSingleBatchResponse(mp("--b--"))).rejects.toThrow(/no parts/);
    await expect(
      readSingleBatchResponse(mp("--b\r\nContent-Type: application/http\r\n\r\nnot http\r\n--b--"))
    ).rejects.toThrow(/status line/);
  });
});

// ─────────────────────────── pure paging helpers ───────────────────────────

describe("parsePagingCookie()", () => {
  it("reads the page number and decodes the cookie twice", () => {
    expect(parsePagingCookie(COOKIE_ANNOTATION)).toEqual({
      pageNumber: 2,
      pagingCookie: INNER_COOKIE,
    });
  });

  it("decodes XML entities in the annotation and '+' as a space", () => {
    const annotation = `<cookie pagenumber="3" pagingcookie="%253ccookie+page%253d%25222%2522%253e&amp;%253c%252fcookie%253e" />`;
    expect(parsePagingCookie(annotation)).toEqual({
      pageNumber: 3,
      pagingCookie: '<cookie page="2">&</cookie>',
    });
    expect(
      parsePagingCookie(
        `<cookie pagenumber='4' pagingcookie='a&#x26;b&#38;c&lt;&gt;&quot;&apos;&#99999999;' />`
      )
    ).toEqual({
      pageNumber: 4,
      pagingCookie: "a&b&c<>\"'&#99999999;",
    });
  });

  it("keeps a cookie that isn't valid percent-encoding as written", () => {
    expect(parsePagingCookie(`<cookie pagenumber="2" pagingcookie="100%" />`)?.pagingCookie).toBe(
      "100%"
    );
  });

  it("returns undefined for missing or unrecognised values", () => {
    expect(parsePagingCookie(undefined)).toBeUndefined();
    expect(parsePagingCookie("")).toBeUndefined();
    expect(parsePagingCookie("not xml")).toBeUndefined();
    expect(parsePagingCookie(`<cookie pagenumber="x" pagingcookie="a" />`)).toBeUndefined();
    expect(parsePagingCookie(`<cookie pagenumber="2" />`)).toBeUndefined();
    expect(parsePagingCookie(`<cookie pagenumber="2" pagingcookie="a`)).toBeUndefined();
    expect(parsePagingCookie(`<cookie pagenumber="2" pagingcookie=a />`)).toBeUndefined();
    expect(parsePagingCookie(`<cookie pagenumber="2"`)).toBeUndefined();
  });
});

describe("buildPagedFetchXml()", () => {
  it("sets page and an XML-escaped paging-cookie on the root element, keeping the rest", () => {
    const out = buildPagedFetchXml(FETCH, { page: 2, pagingCookie: INNER_COOKIE });
    expect(out).toBe(
      `<fetch count="5" returntotalrecordcount="true" page="2" paging-cookie="${INNER_COOKIE.replace(
        /&/g,
        "&amp;"
      )
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")}">${FETCH.slice(FETCH.indexOf("><") + 1)}`
    );
    // The escaped cookie reads back as the original.
    const attr = /paging-cookie="([^"]*)"/.exec(out)?.[1] ?? "";
    expect(
      attr
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
    ).toBe(INNER_COOKIE);
  });

  it("replaces page, count and paging-cookie that are already there, and drops the cookie when omitted", () => {
    const xml = `<?xml version="1.0"?>\n<fetch version='1.0' page='3' Paging-Cookie='old' count="10" mapping="logical"><entity name="account"/></fetch>`;
    expect(buildPagedFetchXml(xml, { page: 1, count: 50 })).toBe(
      `<?xml version="1.0"?>\n<fetch version='1.0' mapping="logical" page="1" count="50"><entity name="account"/></fetch>`
    );
  });

  it("handles '>' inside a quoted attribute and a self-closing root", () => {
    expect(buildPagedFetchXml(`<fetch distinct="a>b"/>`, { page: 2 })).toBe(
      `<fetch distinct="a>b" page="2"/>`
    );
  });

  it("throws when there is no <fetch> element", () => {
    expect(() => buildPagedFetchXml("<fetchx/>", { page: 1 })).toThrow(TypeError);
    expect(() => buildPagedFetchXml(`<fetch count="5"`, { page: 1 })).toThrow(TypeError);
  });
});
