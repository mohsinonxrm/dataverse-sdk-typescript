/**
 * #435: the hand-written Upsert, RetrievePrincipalAccess and CheckPrivilege messages, run through
 * a real DataverseClient against a recording fake fetch.
 */
import { describe, expect, it } from "vitest";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import {
  TEST_API_URL,
  batchResponse,
  createTestClient,
  jsonResponse,
  noContent,
} from "@mohsinonxrm/dataverse-sdk-testing";
import {
  AccessRights,
  CheckPrivilegeRequest,
  CheckPrivilegeResponse,
  ExecuteTransactionRequest,
  OrganizationRequest,
  PrivilegeDepth,
  RetrievePrincipalAccessRequest,
  RetrievePrincipalAccessResponse,
  UpsertRequest,
  UpsertResponse,
  createEntityReference,
} from "../src/index.js";

const A1 = "00000000-0000-0000-0000-0000000000a1";
const U1 = "00000000-0000-0000-0000-0000000000b1";
const T1 = "00000000-0000-0000-0000-0000000000c1";
const account = { "@odata.type": "Microsoft.Dynamics.CRM.account" } as const;

describe("UpsertRequest (#435)", () => {
  it("patches the record by id without If-Match, asking for its primary key back", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${A1})`, () =>
      jsonResponse({ "@odata.etag": 'W/"1"', accountid: A1 }, { status: 201 })
    );
    const request = new UpsertRequest({ Target: { ...account, name: "Contoso" }, Key: `{${A1}}` });
    expect(request.messageName).toBe("Upsert");
    expect(request).toBeInstanceOf(OrganizationRequest);

    const response = await client.execute(request);
    const sent = fake.last();
    expect(sent.method).toBe("PATCH");
    expect(sent.path).toBe(`/accounts(${A1})?$select=accountid`);
    expect(sent.headers["if-match"]).toBeUndefined();
    expect(sent.headers["if-none-match"]).toBeUndefined();
    expect(sent.headers.prefer).toContain("return=representation");
    expect(sent.headers["content-type"]).toContain("application/json");
    // The table is the URL; @odata.type isn't sent
    expect(JSON.parse(sent.bodyText ?? "")).toEqual({ name: "Contoso" });

    expect(response).toBeInstanceOf(UpsertResponse);
    expect(response.RecordCreated).toBe(true);
    expect(response.Target.logicalName).toBe("account");
    expect(response.Target.id).toBe(A1);
    expect(response.Target.entitySetName).toBe("accounts");
    expect(response.result).toEqual({ RecordCreated: true, Target: response.Target });
  });

  it("reads 200 OK as an update", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${A1})`, () => jsonResponse({ accountid: A1 }));
    const response = await client.execute(
      new UpsertRequest({ Target: { ...account, name: "Contoso" }, Key: A1 })
    );
    expect(response.RecordCreated).toBe(false);
    expect(response.Target.id).toBe(A1);
  });

  it("takes the key from the Target's primary key column, and leaves it out of the body", () => {
    const info = new UpsertRequest({
      Target: { ...account, accountid: A1, name: "Contoso" },
    }).toRequestInformation(TEST_API_URL);
    expect(info.url).toBe(`${TEST_API_URL}/accounts(${A1})?$select=accountid`);
    expect(info.body).toEqual({ name: "Contoso" });
    // Activities' primary key is activityid
    const task = new UpsertRequest({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.task", activityid: A1, subject: "S" },
    }).toRequestInformation(TEST_API_URL);
    expect(task.url).toBe(`${TEST_API_URL}/tasks(${A1})?$select=activityid`);
  });

  it("encodes an alternate key and reads the id from the returned record", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", /^\/accounts\(accountnumber=/, () =>
      jsonResponse({ accountid: A1 }, { status: 201 })
    );
    const response = await client.execute(
      new UpsertRequest({
        Target: { ...account, name: "O'Neil" },
        Key: { accountnumber: "A'1 #2" },
      })
    );
    expect(fake.last().url).toBe(
      `${TEST_API_URL}/accounts(accountnumber='A''1%20%232')?$select=accountid`
    );
    expect(response.RecordCreated).toBe(true);
    expect(response.Target.id).toBe(A1);
  });

  it("takes the entity set and primary key of a table the snapshot doesn't know", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/new_widgetset(${A1})`, () => jsonResponse({ new_key: A1 }));
    const response = await client.execute(
      new UpsertRequest({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.new_widget", new_name: "W" },
        Key: A1,
        EntitySetName: "new_widgetset",
        PrimaryIdAttribute: "new_key",
      })
    );
    expect(fake.last().path).toBe(`/new_widgetset(${A1})?$select=new_key`);
    expect(response.Target.entitySetName).toBe("new_widgetset");
    expect(response.Target.new_key).toBe(A1);
  });

  it("reads a 204 as not created, with the id from OData-EntityId or the key", async () => {
    const { client, fake } = createTestClient();
    fake.on("PATCH", `/accounts(${A1})`, () =>
      noContent({ "odata-entityid": `${TEST_API_URL}/accounts(${A1})` })
    );
    const response = await client.execute(new UpsertRequest({ Target: account, Key: A1 }));
    expect(response.RecordCreated).toBe(false);
    expect(response.Target.id).toBe(A1);

    const bare = await new UpsertRequest({ Target: account, Key: `{${A1}}` }).parseResponse(
      new Response(null, { status: 204 })
    );
    expect(bare.Target.id).toBe(A1);
  });

  it("refuses a Target without a table, or without a key", () => {
    expect(() =>
      new UpsertRequest({ Target: { "@odata.type": "account" }, Key: A1 }).toRequestInformation(
        TEST_API_URL
      )
    ).toThrow(DataverseInvalidRequestError);
    expect(() =>
      new UpsertRequest({ Target: { ...account, name: "No key" } }).toRequestInformation(
        TEST_API_URL
      )
    ).toThrow(/accountid/);
  });

  it("runs inside a change set and reads the part's status", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/$batch", () =>
      batchResponse([
        {
          changeset: [
            { status: 201, contentId: "1", body: { accountid: A1 } },
            { status: 200, contentId: "2", body: { accountid: A1 } },
          ],
        },
      ])
    );
    const upsert = () => new UpsertRequest({ Target: { ...account, name: "C" }, Key: A1 });
    const { Responses } = await client.execute(
      new ExecuteTransactionRequest({ Requests: [upsert(), upsert()] })
    );
    expect(Responses.map((response) => response.RecordCreated)).toEqual([true, false]);
    const body = fake.last().bodyText ?? "";
    expect(body).toContain(`PATCH ${TEST_API_URL}/accounts(${A1})?$select=accountid HTTP/1.1`);
    expect(body).toContain("Prefer: return=representation");
    expect(body).not.toMatch(/If-Match/i);
  });
});

describe("RetrievePrincipalAccessRequest (#435)", () => {
  it("calls the function bound to the principal's table, with the target as @odata.id", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrievePrincipalAccess/, () =>
      jsonResponse({
        "@odata.context": `${TEST_API_URL}/$metadata#Microsoft.Dynamics.CRM.RetrievePrincipalAccessResponse`,
        AccessRights: "ReadAccess, WriteAccess, ShareAccess",
      })
    );
    const request = new RetrievePrincipalAccessRequest({
      Principal: createEntityReference("systemuser", `{${U1}}`),
      Target: createEntityReference("account", A1),
    });
    expect(request.messageName).toBe("RetrievePrincipalAccess");

    const response = await client.execute(request);
    const sent = fake.last();
    expect(sent.method).toBe("GET");
    expect(sent.headers.accept).toContain("application/json");
    expect(decodeURIComponent(sent.url)).toBe(
      `${TEST_API_URL}/systemusers(${U1})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)` +
        `?@p1={"@odata.id":"accounts(${A1})"}`
    );
    // The alias value is URL-encoded
    expect(sent.url).toContain("?%40p1=%7B%22%40odata.id%22%3A%22accounts%28");

    expect(response).toBeInstanceOf(RetrievePrincipalAccessResponse);
    expect(response.result.AccessRights).toBe("ReadAccess, WriteAccess, ShareAccess");
    expect(response.AccessRights).toBe(
      AccessRights.ReadAccess | AccessRights.WriteAccess | AccessRights.ShareAccess
    );
    expect(response.AccessRights & AccessRights.DeleteAccess).toBe(0);
  });

  it("binds to teams and organizations too", () => {
    const target = createEntityReference("contact", A1);
    const team = new RetrievePrincipalAccessRequest({
      Principal: createEntityReference("team", T1),
      Target: target,
    }).toRequestInformation(TEST_API_URL);
    expect(team.url).toMatch(
      new RegExp(
        `^${TEST_API_URL}/teams\\(${T1}\\)/Microsoft\\.Dynamics\\.CRM\\.RetrievePrincipalAccess\\(Target=@p1\\)\\?`
      )
    );
    expect(decodeURIComponent(team.url)).toContain(`{"@odata.id":"contacts(${A1})"}`);
    const organization = new RetrievePrincipalAccessRequest({
      Principal: createEntityReference("organization", T1),
      Target: target,
    }).toRequestInformation(TEST_API_URL);
    expect(organization.url).toContain(`/organizations(${T1})/Microsoft.Dynamics.CRM.`);
  });

  it("refuses a principal that isn't a user, team or organization", () => {
    expect(() =>
      new RetrievePrincipalAccessRequest({
        Principal: createEntityReference("account", U1),
        Target: createEntityReference("account", A1),
      }).toRequestInformation(TEST_API_URL)
    ).toThrow(/systemuser, team and organization/);
  });

  it("reads the rights as a number, names it doesn't know left out", () => {
    const read = (AccessRights: string | number) =>
      new RetrievePrincipalAccessResponse({ AccessRights }).AccessRights;
    expect(read(3)).toBe(3);
    expect(read("6")).toBe(6);
    expect(read("None")).toBe(0);
    expect(read("ReadAccess,AssignAccess, FutureAccess")).toBe(
      AccessRights.ReadAccess | AccessRights.AssignAccess
    );
  });
});

describe("CheckPrivilegeRequest (#435)", () => {
  const grants = (...depths: unknown[]) =>
    jsonResponse({
      RolePrivileges: depths.map((Depth) => ({
        Depth,
        PrivilegeName: "prvCreateAccount",
        PrivilegeId: A1,
      })),
    });

  it("calls RetrieveUserPrivilegeByPrivilegeName on the user, the name a quoted alias", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveUserPrivilegeByPrivilegeName/, () => grants("Basic", "Global"));
    const request = new CheckPrivilegeRequest({
      UserId: `{${U1}}`,
      PrivilegeName: "prvCreateAccount",
    });
    expect(request.messageName).toBe("CheckPrivilege");

    const response = await client.execute(request);
    const sent = fake.last();
    expect(sent.method).toBe("GET");
    expect(decodeURIComponent(sent.url)).toBe(
      `${TEST_API_URL}/systemusers(${U1})/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1)` +
        `?@p1='prvCreateAccount'`
    );
    expect(response).toBeInstanceOf(CheckPrivilegeResponse);
    expect(response.HasPrivilege).toBe(true);
    expect(response.Depth).toBe("Global");
    expect(response.RolePrivileges).toHaveLength(2);
    expect(response.RolePrivileges).toBe(response.result.RolePrivileges);
  });

  it("has no privilege when there is no grant", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveUserPrivilegeByPrivilegeName/, () => grants());
    const response = await client.execute(
      new CheckPrivilegeRequest({ UserId: U1, PrivilegeName: "prvO'Brien" })
    );
    expect(decodeURIComponent(fake.last().url)).toContain(`?@p1='prvO''Brien'`);
    expect(response.HasPrivilege).toBe(false);
    expect(response.Depth).toBeUndefined();
  });

  it("checks the least depth, given as a name or a number", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrieveUserPrivilegeByPrivilegeName/, () => grants("Local", 0));
    const check = async (Depth: CheckPrivilegeRequest["Parameters"]["Depth"]) =>
      (await client.execute(new CheckPrivilegeRequest({ UserId: U1, PrivilegeName: "p", Depth })))
        .HasPrivilege;
    expect(await check("Basic")).toBe(true);
    expect(await check("Local")).toBe(true);
    expect(await check(PrivilegeDepth.Local)).toBe(true);
    expect(await check("Deep")).toBe(false);
    expect(await check(PrivilegeDepth.Global)).toBe(false);
    expect(await check("RecordFilter")).toBe(false);
  });

  it("counts a record-filter grant only for any depth or RecordFilter", () => {
    const result = { RolePrivileges: [{ Depth: "RecordFilter" as const }] };
    expect(new CheckPrivilegeResponse(result).HasPrivilege).toBe(true);
    expect(new CheckPrivilegeResponse(result).Depth).toBe("RecordFilter");
    expect(new CheckPrivilegeResponse(result, "RecordFilter").HasPrivilege).toBe(true);
    expect(new CheckPrivilegeResponse(result, "Basic").HasPrivilege).toBe(false);
    const mixed = {
      RolePrivileges: [{ Depth: "RecordFilter" as const }, { Depth: "Deep" as const }],
    };
    expect(new CheckPrivilegeResponse(mixed).Depth).toBe("Deep");
  });

  it("refuses a user id that isn't a GUID", () => {
    expect(() =>
      new CheckPrivilegeRequest({ UserId: "me", PrivilegeName: "p" }).toRequestInformation(
        TEST_API_URL
      )
    ).toThrow(DataverseInvalidRequestError);
  });
});
