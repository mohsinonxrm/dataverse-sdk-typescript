/**
 * Contract tests for FetchXML in @mohsinonxrm/dataverse-sdk-core (#51): a real DataverseClient
 * against the recording fake fetch, with response bodies shaped like a live org's.
 */
import { describe, expect, it } from "vitest";
import { buildPagedFetchXml, parsePagingCookie } from "@mohsinonxrm/dataverse-sdk-core";
import { TEST_API_URL, batchResponse, createTestClient, jsonResponse } from "../src/index.js";

const INNER_COOKIE =
  '<cookie page="1"><name last="Contoso 05" first="Contoso 01" /><accountid last="{00000000-0000-0000-0000-000000000005}" first="{00000000-0000-0000-0000-000000000001}" /></cookie>';
const COOKIE = `<cookie pagenumber="2" pagingcookie="${encodeURIComponent(
  encodeURIComponent(INNER_COOKIE)
)}" istracking="False" />`;

const row = (n: number) => ({
  "@odata.etag": `W/"${String(1000 + n)}"`,
  name: `Contoso 0${String(n)}`,
  "statecode@OData.Community.Display.V1.FormattedValue": "Active",
  statecode: 0,
  accountid: `00000000-0000-0000-0000-00000000000${String(n)}`,
});

const page1 = {
  "@odata.context": `${TEST_API_URL}/$metadata#accounts(name,statecode,accountid)`,
  "@Microsoft.Dynamics.CRM.totalrecordcount": 7,
  "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": false,
  "@Microsoft.Dynamics.CRM.globalmetadataversion": "8881376",
  "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie": COOKIE,
  "@Microsoft.Dynamics.CRM.morerecords": true,
  value: [1, 2, 3, 4, 5].map(row),
};
const page2 = {
  "@odata.context": page1["@odata.context"],
  "@Microsoft.Dynamics.CRM.totalrecordcount": 7,
  "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": false,
  value: [6, 7].map(row),
};

const XML = `<fetch count="5" returntotalrecordcount="true"><entity name="account"><attribute name="name"/><attribute name="statecode"/><order attribute="name"/></entity></fetch>`;

describe("core: FetchXML (#51)", () => {
  it("pages with the paging cookie until moreRecords is false", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", (r) =>
      jsonResponse(
        new URL(r.url).searchParams.get("fetchXml")?.includes('page="2"') ? page2 : page1
      )
    );

    const first = await client.fetchXml<ReturnType<typeof row>>("accounts", XML);
    expect(first).toMatchObject({ moreRecords: true, totalRecordCount: 7, pagingCookie: COOKIE });
    expect(first.value[0]?.["statecode@OData.Community.Display.V1.FormattedValue"]).toBe("Active");

    const next = parsePagingCookie(first.pagingCookie);
    const second = await client.fetchXml(
      "accounts",
      buildPagedFetchXml(XML, { page: next?.pageNumber ?? 2, pagingCookie: next?.pagingCookie })
    );
    expect(second.moreRecords).toBe(false);
    expect(second.value).toHaveLength(2);

    // The second request carried the decoded cookie in the <fetch> element.
    const sentXml = new URL(fake.last().url).searchParams.get("fetchXml") ?? "";
    expect(sentXml).toContain('page="2"');
    expect(sentXml).toContain(
      `paging-cookie="${INNER_COOKIE.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}"`
    );
    expect(fake.last().url).toContain("fetchXml=%3Cfetch%20count%3D%225%22");
    expect(fake.last().headers.prefer).toBe('odata.include-annotations="*"');
  });

  it("a 40 KB FetchXML goes through $batch and returns the same FetchXmlPage", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/accounts", () => jsonResponse(page1));
    fake.on("POST", "/$batch", () => batchResponse([{ status: 200, body: page1 }]));

    const conditions = Array.from(
      { length: 480 },
      (_, i) =>
        `<condition attribute="name" operator="neq" value="excluded account name number ${String(i)}"/>`
    ).join("");
    const longXml = XML.replace("</entity>", `<filter>${conditions}</filter></entity>`);
    expect(longXml.length).toBeGreaterThan(40_000);

    const viaBatch = await client.fetchXml("accounts", longXml);
    const batch = fake.last();
    expect(batch.method).toBe("POST");
    expect(batch.path).toBe("/$batch");
    expect(batch.headers.authorization).toBe("Bearer test-token");
    expect(batch.bodyText).toContain(
      `GET ${TEST_API_URL}/accounts?fetchXml=${encodeURIComponent(longXml)} HTTP/1.1`
    );
    expect(batch.bodyText).not.toContain("test-token");

    const direct = await client.fetchXml("accounts", XML);
    expect(fake.last().method).toBe("GET");
    expect(viaBatch).toEqual(direct);
  });
});
