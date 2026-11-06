/**
 * OrganizationService against a real DataverseClient and a recording fake fetch, so the tests
 * assert what reaches the wire (method, URL, query, headers, body) and what comes back.
 * (The previous suite mocked `client.api()` with a builder contract the real one doesn't have,
 * which is how #83 shipped; see #39.)
 */
import { describe, it, expect } from "vitest";
import { DataverseDuplicateError, DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  TEST_API_URL,
  createTestClient,
  createdResponse,
  jsonResponse,
  noContent,
  odataError,
} from "@mohsinonxrm/dataverse-sdk-testing";
import type { RecordedRequest } from "@mohsinonxrm/dataverse-sdk-testing";
import { OrganizationService } from "../src/index.js";

const ID = "12345678-1234-1234-1234-123456789012";
const ID2 = "22222222-2222-2222-2222-222222222222";
const USER = "99999999-9999-9999-9999-999999999999";

/** Entity set names the fake metadata endpoint knows (#76: they are looked up, not guessed). */
const ENTITY_SETS: Record<string, string> = {
  account: "accounts",
  contact: "contacts",
  lead: "leads",
  opportunity: "opportunities",
  systemuser: "systemusers",
  team: "teams",
};

function setup() {
  const { client, fake } = createTestClient();
  fake.on("GET", /^\/EntityDefinitions\(LogicalName='[^']+'\)$/, (req) => {
    const logicalName = /LogicalName='([^']+)'/.exec(decodeURIComponent(req.path))?.[1] ?? "";
    const entitySetName = ENTITY_SETS[logicalName];
    return entitySetName
      ? jsonResponse({ EntitySetName: entitySetName, MetadataId: ID })
      : odataError(404, "0x80060888", "Could not find an entity with the specified name.");
  });
  return { client, fake, service: new OrganizationService(client) };
}

function query(req: RecordedRequest, name: string): string | null {
  return new URL(req.url).searchParams.get(name);
}

function body(req: RecordedRequest): unknown {
  return JSON.parse(req.bodyText ?? "");
}

describe("OrganizationService", () => {
  describe("create", () => {
    it("POSTs the entity and returns the id from OData-EntityId", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/accounts", () => createdResponse("accounts", ID));

      const id = await service.create("accounts", { name: "Contoso" });

      expect(id).toBe(ID);
      const req = fake.last();
      expect(req.method).toBe("POST");
      expect(body(req)).toEqual({ name: "Contoso" });
      expect(req.headers.prefer).toBeUndefined();
      // Web API default: no duplicate detection, so no header is needed.
      expect(req.headers["mscrm.suppressduplicatedetection"]).toBeUndefined();
    });

    it("rejects when the response has no OData-EntityId", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/accounts", () => noContent());
      await expect(service.create("accounts", { name: "Contoso" })).rejects.toThrow(
        /OData-EntityId/
      );
    });

    it("returnRepresentation sends Prefer and $select and returns the record", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/accounts", () =>
        jsonResponse({ accountid: ID, name: "Contoso" }, { status: 201 })
      );

      const account = await service.create<{ accountid: string; name: string }>(
        "accounts",
        { name: "Contoso" },
        { returnRepresentation: true, select: ["accountid", "name"] }
      );

      expect(account).toEqual({ accountid: ID, name: "Contoso" });
      const req = fake.last();
      expect(req.headers.prefer).toBe("return=representation");
      expect(query(req, "$select")).toBe("accountid,name");
    });

    it("sends impersonation, duplicate detection and custom headers", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/contacts", () => createdResponse("contacts", ID));

      await service.create(
        "contacts",
        { lastname: "Doe" },
        { impersonateUserId: USER, detectDuplicates: true, headers: { "X-Custom": "1" } }
      );

      const req = fake.last();
      expect(req.headers.mscrmcallerid).toBe(USER);
      expect(req.headers["mscrm.suppressduplicatedetection"]).toBe("false");
      expect(req.headers["x-custom"]).toBe("1");
    });

    it("suppressDuplicateDetection: false turns duplicate detection on", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/contacts", () => createdResponse("contacts", ID));
      await service.create("contacts", { lastname: "Doe" }, { suppressDuplicateDetection: false });
      expect(fake.last().headers["mscrm.suppressduplicatedetection"]).toBe("false");
    });

    it("suppressDuplicateDetection: true keeps the default (no header)", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/contacts", () => createdResponse("contacts", ID));
      await service.create("contacts", { lastname: "Doe" }, { suppressDuplicateDetection: true });
      expect(fake.last().headers["mscrm.suppressduplicatedetection"]).toBeUndefined();
    });

    it("rejects with DataverseDuplicateError when detection finds a duplicate", async () => {
      const { fake, service } = setup();
      fake.on("POST", "/contacts", () =>
        odataError(412, "0x80040333", "A record was not created or updated because a duplicate")
      );
      await expect(
        service.create("contacts", { lastname: "Doe" }, { detectDuplicates: true })
      ).rejects.toBeInstanceOf(DataverseDuplicateError);
    });
  });

  describe("retrieve", () => {
    it("GETs the record with $select and returns it", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID, name: "Contoso" }));

      const account = await service.retrieve("accounts", ID, { select: ["name", "revenue"] });

      expect(account).toEqual({ accountid: ID, name: "Contoso" });
      expect(query(fake.last(), "$select")).toBe("name,revenue");
    });

    it("normalizes braced, upper-case ids", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID }));
      await service.retrieve("accounts", `{${ID.toUpperCase()}}`);
      expect(fake.last().path).toBe(`/accounts(${ID})`);
    });

    it("passes a string expand through", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID }));
      await service.retrieve("accounts", ID, {
        expand: "primarycontactid($select=fullname)",
      });
      expect(query(fake.last(), "$expand")).toBe("primarycontactid($select=fullname)");
    });

    it("combines every expand option into one $expand", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID }));

      await service.retrieve("accounts", ID, {
        expand: [
          { navigationProperty: "primarycontactid", select: ["fullname", "emailaddress1"] },
          {
            navigationProperty: "Account_Tasks",
            select: ["subject"],
            filter: "statecode eq 0",
            orderBy: "createdon desc",
            top: 5,
          },
          { navigationProperty: "createdby" },
        ],
      });

      expect(query(fake.last(), "$expand")).toBe(
        "primarycontactid($select=fullname,emailaddress1)," +
          "Account_Tasks($select=subject;$filter=statecode eq 0;$orderby=createdon desc;$top=5)," +
          "createdby"
      );
    });

    it("sends impersonation and custom headers", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () => jsonResponse({ accountid: ID }));
      await service.retrieve("accounts", ID, {
        impersonateUserId: USER,
        headers: { Prefer: 'odata.include-annotations="*"' },
      });
      expect(fake.last().headers.mscrmcallerid).toBe(USER);
      expect(fake.last().headers.prefer).toBe('odata.include-annotations="*"');
    });

    it("rejects with a DataverseError for a missing record", async () => {
      const { fake, service } = setup();
      fake.on("GET", `/accounts(${ID})`, () =>
        odataError(404, "0x80040217", "account With Id = … Does Not Exist")
      );
      await expect(service.retrieve("accounts", ID)).rejects.toBeInstanceOf(DataverseError);
    });
  });

  describe("retrieveMultiple", () => {
    it("sends every query option and returns the page", async () => {
      const { fake, service } = setup();
      const page = {
        value: [{ accountid: ID }, { accountid: ID2 }],
        "@odata.count": 2,
        "@odata.nextLink": `${TEST_API_URL}/accounts?$skiptoken=abc`,
      };
      fake.on("GET", "/accounts", () => jsonResponse(page));

      const result = await service.retrieveMultiple("accounts", {
        select: ["name", "revenue"],
        filter: "revenue gt 1000000",
        orderBy: ["revenue desc", "name"],
        top: 10,
        skip: 5,
        count: true,
        expand: [{ navigationProperty: "primarycontactid", select: ["fullname"] }],
        impersonateUserId: USER,
      });

      expect(result).toEqual(page);
      const req = fake.last();
      expect(query(req, "$select")).toBe("name,revenue");
      expect(query(req, "$filter")).toBe("revenue gt 1000000");
      expect(query(req, "$orderby")).toBe("revenue desc,name");
      expect(query(req, "$top")).toBe("10");
      expect(query(req, "$skip")).toBe("5");
      expect(query(req, "$count")).toBe("true");
      expect(query(req, "$expand")).toBe("primarycontactid($select=fullname)");
      expect(req.headers.mscrmcallerid).toBe(USER);
    });

    it("accepts a single orderBy string and no options", async () => {
      const { fake, service } = setup();
      fake.on("GET", "/contacts", () => jsonResponse({ value: [] }));
      await expect(service.retrieveMultiple("contacts")).resolves.toEqual({ value: [] });
      await service.retrieveMultiple("contacts", { orderBy: "createdon desc" });
      expect(query(fake.last(), "$orderby")).toBe("createdon desc");
    });
  });

  describe("update", () => {
    it("PATCHes with If-Match: * so a missing record is not created", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () => noContent());

      await expect(service.update("accounts", ID, { name: "Renamed" })).resolves.toBeUndefined();

      const req = fake.last();
      expect(req.method).toBe("PATCH");
      expect(body(req)).toEqual({ name: "Renamed" });
      expect(req.headers["if-match"]).toBe("*");
      expect(req.headers.prefer).toBeUndefined();
    });

    it("rejects with 404 instead of upserting a missing record", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, (req) =>
        req.headers["if-match"] === "*"
          ? odataError(404, "0x80040217", "account With Id = … Does Not Exist")
          : createdResponse("accounts", ID)
      );
      await expect(service.update("accounts", ID, { name: "x" })).rejects.toMatchObject({
        status: 404,
      });
    });

    it("sends the etag as If-Match, and impersonation", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () => noContent());
      await service.update(
        "accounts",
        ID,
        { name: "Renamed" },
        { etag: 'W/"1"', impersonateUserId: USER }
      );
      expect(fake.last().headers["if-match"]).toBe('W/"1"');
      expect(fake.last().headers.mscrmcallerid).toBe(USER);
    });

    it("rejects with 412 when the etag is stale", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () =>
        odataError(412, "0x80060882", "The version of the existing record doesn't match")
      );
      await expect(
        service.update("accounts", ID, { name: "x" }, { etag: 'W/"1"' })
      ).rejects.toMatchObject({ status: 412 });
    });

    it("returnRepresentation sends Prefer and $select and returns the record", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () => jsonResponse({ accountid: ID, name: "Renamed" }));

      const updated = await service.update(
        "accounts",
        ID,
        { name: "Renamed" },
        { returnRepresentation: true, select: ["name"] }
      );

      expect(updated).toEqual({ accountid: ID, name: "Renamed" });
      expect(fake.last().headers.prefer).toBe("return=representation");
      expect(query(fake.last(), "$select")).toBe("name");
    });

    it("detectDuplicates sends MSCRM.SuppressDuplicateDetection: false", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/contacts(${ID})`, () => noContent());
      await service.update("contacts", ID, { lastname: "Doe" }, { detectDuplicates: true });
      expect(fake.last().headers["mscrm.suppressduplicatedetection"]).toBe("false");
    });
  });

  describe("delete", () => {
    it("sends a DELETE to the record", async () => {
      const { fake, service } = setup();
      fake.on("DELETE", `/accounts(${ID})`, () => noContent());
      await service.delete("accounts", `{${ID}}`);
      expect(fake.last().method).toBe("DELETE");
      expect(fake.last().path).toBe(`/accounts(${ID})`);
      expect(fake.last().headers["if-match"]).toBeUndefined();
    });

    it("sends the etag, impersonation and custom headers", async () => {
      const { fake, service } = setup();
      fake.on("DELETE", `/accounts(${ID})`, () => noContent());
      await service.delete("accounts", ID, {
        etag: 'W/"7"',
        impersonateUserId: USER,
        headers: { "X-Custom": "1" },
      });
      const req = fake.last();
      expect(req.headers["if-match"]).toBe('W/"7"');
      expect(req.headers.mscrmcallerid).toBe(USER);
      expect(req.headers["x-custom"]).toBe("1");
    });
  });

  describe("associate", () => {
    it("POSTs one $ref per related record, with an absolute @odata.id", async () => {
      const { fake, service } = setup();
      fake.on("POST", `/accounts(${ID})/contact_customer_accounts/$ref`, () => noContent());

      await service.associate(
        "accounts",
        ID,
        "contact_customer_accounts",
        [
          { logicalName: "contact", id: ID2 },
          { logicalName: "contact", id: `{${USER.toUpperCase()}}` },
        ],
        { impersonateUserId: USER }
      );

      const refs = fake.requests.filter((r) => r.method === "POST");
      expect(refs).toHaveLength(2);
      expect(body(refs[0])).toEqual({
        "@odata.id": `${TEST_API_URL}/contacts(${ID2})`,
      });
      expect(body(refs[1])).toEqual({
        "@odata.id": `${TEST_API_URL}/contacts(${USER})`,
      });
      expect(refs[0].headers.mscrmcallerid).toBe(USER);
    });
  });

  describe("disassociate", () => {
    it("DELETEs the collection $ref of one related record", async () => {
      const { fake, service } = setup();
      fake.on("DELETE", `/accounts(${ID})/contact_customer_accounts(${ID2})/$ref`, () =>
        noContent()
      );
      await service.disassociate("accounts", ID, "contact_customer_accounts", ID2, {
        impersonateUserId: USER,
      });
      expect(fake.last().method).toBe("DELETE");
      expect(fake.last().headers.mscrmcallerid).toBe(USER);
    });

    it("DELETEs a single-valued $ref without a related id", async () => {
      const { fake, service } = setup();
      fake.on("DELETE", `/accounts(${ID})/primarycontactid/$ref`, () => noContent());
      await service.disassociate("accounts", ID, "primarycontactid");
      expect(fake.last().path).toBe(`/accounts(${ID})/primarycontactid/$ref`);
    });
  });

  describe("whoAmI", () => {
    it("returns the caller's ids", async () => {
      const { fake, service } = setup();
      fake.on("GET", "/WhoAmI", () =>
        jsonResponse({
          "@odata.context": `${TEST_API_URL}/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse`,
          UserId: USER,
          BusinessUnitId: ID,
          OrganizationId: ID2,
        })
      );
      await expect(service.whoAmI()).resolves.toEqual({
        UserId: USER,
        BusinessUnitId: ID,
        OrganizationId: ID2,
      });
    });
  });

  describe("assign", () => {
    it("PATCHes ownerid@odata.bind", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () => noContent());
      await service.assign("account", ID, USER);
      expect(body(fake.last())).toEqual({ "ownerid@odata.bind": `/systemusers(${USER})` });

      fake.on("PATCH", `/leads(${ID})`, () => noContent());
      await service.assign("lead", ID, ID2, "team");
      expect(body(fake.last())).toEqual({ "ownerid@odata.bind": `/teams(${ID2})` });
    });

    it("sends If-Match: * so a missing record is a 404, not an upsert (#272)", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/accounts(${ID})`, () => noContent());
      await service.assign("account", ID, USER);
      expect(fake.last().headers["if-match"]).toBe("*");
    });
  });

  describe("setState", () => {
    it("PATCHes statecode and statuscode", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/opportunities(${ID})`, () => noContent());
      await service.setState("opportunity", ID, 2, 5);
      expect(body(fake.last())).toEqual({ statecode: 2, statuscode: 5 });
    });

    it("sends If-Match: * so a missing record is a 404, not an upsert (#272)", async () => {
      const { fake, service } = setup();
      fake.on("PATCH", `/opportunities(${ID})`, () => noContent());
      await service.setState("opportunity", ID, 2, 5);
      expect(fake.last().headers["if-match"]).toBe("*");
    });
  });

  describe("execute", () => {
    it("runs an Executable through the client", async () => {
      const { fake, service } = setup();
      fake.on("GET", "/RetrieveVersion()", () => jsonResponse({ Version: "9.2.0.0" }));
      const request = {
        toRequestInformation: (baseUrl: string) => ({
          method: "GET" as const,
          url: `${baseUrl}/RetrieveVersion()`,
          headers: {},
        }),
        parseResponse: async (res: Response) => (await res.json()) as { Version: string },
      };
      await expect(service.execute(request)).resolves.toEqual({ Version: "9.2.0.0" });
    });

    it("rejects a request that isn't Executable", async () => {
      const { service } = setup();
      // The type rules this out (#284); a JavaScript caller can still pass one.
      // @ts-expect-error -- not an Executable<T>
      await expect(service.execute({ name: "NotExecutable" })).rejects.toThrow(
        /Executable<T> interface/
      );
    });
  });
});
