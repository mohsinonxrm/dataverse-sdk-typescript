/**
 * Live integration tests against a real Dataverse org (see ./env.ts for configuration).
 *
 * Every record created here is named with this run's `runId`, and is deleted in `afterAll`.
 * `it.fails("#NN: …")` pins a bug that is known to reproduce live. The PR that fixes the
 * issue flips it to `it`.
 */
import { afterAll, describe, expect, it } from "vitest";
import { BatchRequestBuilder } from "@mohsinonxrm/dataverse-sdk-batch";
import { MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
import { idFromEntityId, live, liveClient, orgUrl, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const created: string[] = [];

async function createAccount(name: string): Promise<string> {
  const { client } = liveClient();
  const res = await client.send({
    method: "POST",
    url: `${client.getBaseUrl()}/accounts`,
    headers: {},
    body: { name },
  });
  expect(res.status).toBe(204);
  const id = idFromEntityId(res.headers.get("odata-entityid"));
  created.push(id);
  return id;
}

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of created) {
    await client
      .api(`accounts(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: basics", () => {
  it("WhoAmI returns the caller's ids", async () => {
    const { client } = liveClient();
    const me = await client
      .api("WhoAmI")
      .get<{ UserId: string; BusinessUnitId: string; OrganizationId: string }>();
    expect(me.UserId).toMatch(GUID);
    expect(me.BusinessUnitId).toMatch(GUID);
    expect(me.OrganizationId).toMatch(GUID);
  });

  it("RetrieveVersion() returns a 9.x version", async () => {
    const { client } = liveClient();
    const v = await client.api("RetrieveVersion()").get<{ Version: string }>();
    expect(v.Version).toMatch(/^9\.\d+\.\d+\.\d+$/);
  });

  it("responses carry the headers the SDK relies on (#19, #44)", async () => {
    const { client } = liveClient();
    const res = await client.send({
      method: "GET",
      url: `${client.getBaseUrl()}/WhoAmI`,
      headers: { accept: "application/json" },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("x-ms-service-request-id")).toMatch(GUID);
    expect(res.headers.get("odata-version")).toBe("4.0");
    expect(Number(res.headers.get("x-ms-dop-hint"))).toBeGreaterThan(0);
  });

  it("$metadata returns the CSDL document as XML", async () => {
    const { client } = liveClient();
    const res = await client.send({
      method: "GET",
      url: `${client.getBaseUrl()}/$metadata`,
      headers: { accept: "application/xml" },
    });
    expect(res.status).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<edmx:Edmx");
    expect(xml).toContain('Name="WhoAmI"');
  });
});

describe.skipIf(!live)("live: CRUD round trip", () => {
  it("creates, reads, updates and deletes an account", async () => {
    const { client } = liveClient();
    const id = await createAccount(`${runId} crud`);

    const read = await client.api(`accounts(${id})`).select("name").get<{ name: string }>();
    expect(read.name).toBe(`${runId} crud`);

    await client.api(`accounts(${id})`).patch({ name: `${runId} crud renamed` });
    const reread = await client.api(`accounts(${id})`).select("name").get<{ name: string }>();
    expect(reread.name).toBe(`${runId} crud renamed`);

    await client.api(`accounts(${id})`).delete();
    await expect(client.api(`accounts(${id})`).select("name").get()).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe.skipIf(!live)("live: query encoding and URL length", () => {
  it("#52: a $filter literal with spaces still matches when encoded with '+'", async () => {
    const { client } = liveClient();
    const name = `${runId} a b`;
    await createAccount(name);
    const res = await client
      .api("accounts")
      .select("name")
      .filter(`name eq '${name}'`)
      .get<{ value: Array<{ name: string }> }>();
    expect(res.value.map((r) => r.name)).toEqual([name]);
  });

  it("#10: Dataverse accepts a $filter longer than 260 characters", async () => {
    const { client } = liveClient();
    const filter = Array.from({ length: 40 }, (_, i) => `name eq '${runId} n${String(i)}'`).join(
      " or "
    );
    expect(filter.length).toBeGreaterThan(260);
    const res = await client
      .api("accounts")
      .select("name")
      .filter(filter)
      .skipUrlValidation()
      .get<{ value: unknown[] }>();
    expect(res.value).toEqual([]);
  });

  it("#10: the same long $filter passes the SDK's URL validation", async () => {
    const { client } = liveClient();
    const filter = Array.from({ length: 40 }, (_, i) => `name eq '${runId} n${String(i)}'`).join(
      " or "
    );
    const res = await client
      .api("accounts")
      .select("name")
      .filter(filter)
      .get<{ value: unknown[] }>();
    expect(res.value).toEqual([]);
  });
});

describe.skipIf(!live)("live: $batch", () => {
  it("Dataverse's wire format: independent parts have no Content-ID, change-set parts do (#55, #56)", async () => {
    const { client, tokenProvider } = liveClient();
    const api = client.getBaseUrl();
    const token = await tokenProvider.getToken([`${orgUrl}/.default`]);
    const b = "batch_sdkit";
    const cs = "changeset_sdkit";
    const CRLF = "\r\n";
    const body = [
      `--${b}`,
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      "",
      `GET ${api}/WhoAmI HTTP/1.1`,
      "Accept: application/json",
      "",
      `--${b}`,
      `Content-Type: multipart/mixed; boundary=${cs}`,
      "",
      `--${cs}`,
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      "Content-ID: 1",
      "",
      `POST ${api}/accounts HTTP/1.1`,
      "Content-Type: application/json; type=entry",
      "",
      JSON.stringify({ name: `${runId} batch` }),
      `--${cs}--`,
      `--${b}--`,
      "",
    ].join(CRLF);
    const res = await fetch(`${api}/$batch`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": `multipart/mixed; boundary=${b}`,
        accept: "application/json",
        "odata-version": "4.0",
        "odata-maxversion": "4.0",
      },
      body,
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/^multipart\/mixed; ?boundary=batchresponse_/);
    const text = await res.text();
    const entityId = /OData-EntityId: (\S+)/i.exec(text)?.[1] ?? null;
    created.push(idFromEntityId(entityId));

    // The independent GET part answers 200 with no Content-ID; the change-set part answers 204 with Content-ID 1.
    const parts = text.split(/\r\n--batchresponse_[^\r\n]+/);
    const getPart = parts.find((p) => p.includes("HTTP/1.1 200"));
    expect(getPart).toBeDefined();
    expect(getPart).not.toMatch(/Content-ID:/i);
    expect(text).toMatch(/Content-ID: 1\r\n\r\nHTTP\/1\.1 204/i);
  });

  it.fails("#54: BatchRequestBuilder.execute() runs a batch", async () => {
    const { client } = liveClient();
    const batch = new BatchRequestBuilder(client);
    batch.addRequest("whoami", "GET", "/WhoAmI");
    const result = await batch.execute();
    expect(result.success).toBe(true);
  });
});

describe.skipIf(!live)("live: metadata", () => {
  it("reads an entity definition", async () => {
    const { client } = liveClient();
    const def = await client
      .api("EntityDefinitions(LogicalName='account')")
      .select("LogicalName", "EntitySetName", "PrimaryIdAttribute")
      .get<{ EntitySetName: string; PrimaryIdAttribute: string }>();
    expect(def).toMatchObject({ EntitySetName: "accounts", PrimaryIdAttribute: "accountid" });
  });

  it.fails("#62: MetadataClient.retrieveMetadataChanges() succeeds", async () => {
    const { client } = liveClient();
    const metadata = new MetadataClient(client);
    const query = { Properties: { AllProperties: false, PropertyNames: ["LogicalName"] } };
    await metadata.retrieveMetadataChanges(query);
  });

  it.fails("#63: MetadataClient.canBeReferenced('account') succeeds", async () => {
    const { client } = liveClient();
    await expect(new MetadataClient(client).canBeReferenced("account")).resolves.toBe(true);
  });
});
