/**
 * #48: impersonation by systemuserid (`MSCRMCallerID`) or by Microsoft Entra object id
 * (`CallerObjectId`). Each form sends exactly one header; both at once is refused.
 */
import { describe, expect, it } from "vitest";
import { DataverseClient } from "../src/client/DataverseClient.js";

const ORG = "https://contoso.crm.dynamics.com";
const USER = "00000000-0000-0000-0000-0000000000aa";
const OID = "11111111-1111-1111-1111-111111111111";

function setup() {
  const sent: Array<Record<string, string>> = [];
  const client = new DataverseClient({
    baseUrl: ORG,
    retry: { maxRetries: 0 },
    fetchProvider: {
      fetch: (_input, init) => {
        const headers: Record<string, string> = {};
        new Headers(init?.headers).forEach((v, k) => (headers[k] = v));
        sent.push(headers);
        return Promise.resolve(
          new Response("{}", { headers: { "content-type": "application/json" } })
        );
      },
    },
  });
  return { client, sent };
}

const callerHeaders = (h: Record<string, string> | undefined) =>
  Object.keys(h ?? {}).filter((k) => k === "mscrmcallerid" || k === "callerobjectid");

describe("#48: impersonation headers", () => {
  it("impersonate(id) sends only MSCRMCallerID", async () => {
    const { client, sent } = setup();
    await client.api("WhoAmI").impersonate(USER).get();
    expect(callerHeaders(sent[0])).toEqual(["mscrmcallerid"]);
    expect(sent[0]?.mscrmcallerid).toBe(USER);
  });

  it("impersonate(id, { by: 'aadObjectId' }) and impersonateByObjectId() send only CallerObjectId", async () => {
    const { client, sent } = setup();
    await client.api("WhoAmI").impersonate(OID, { by: "aadObjectId" }).get();
    await client.api("WhoAmI").impersonateByObjectId(OID).get();
    for (const h of sent) {
      expect(callerHeaders(h)).toEqual(["callerobjectid"]);
      expect(h.callerobjectid).toBe(OID);
    }
  });

  it("a later impersonate() replaces an earlier one", async () => {
    const { client, sent } = setup();
    await client.api("WhoAmI").impersonate(USER).impersonateByObjectId(OID).get();
    await client
      .api("WhoAmI")
      .impersonateByObjectId(OID)
      .impersonate(USER, { by: "systemuserid" })
      .get();
    expect(callerHeaders(sent[0])).toEqual(["callerobjectid"]);
    expect(callerHeaders(sent[1])).toEqual(["mscrmcallerid"]);
  });

  it("both headers at once (one set by hand) is refused before sending", async () => {
    const { client, sent } = setup();
    await expect(
      client.api("WhoAmI").impersonate(USER).header("CallerObjectId", OID).get()
    ).rejects.toMatchObject({ name: "InvalidParameter" });
    await expect(
      client
        .api("WhoAmI")
        .impersonateByObjectId(OID)
        .get({ headers: { MSCRMCallerID: USER } })
    ).rejects.toMatchObject({ name: "InvalidParameter" });
    expect(sent).toHaveLength(0);
  });
});
