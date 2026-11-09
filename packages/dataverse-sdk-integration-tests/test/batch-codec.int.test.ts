/**
 * #55, #56 live: the batch encoder's output is accepted by Dataverse, and the decoder reads
 * what Dataverse sends back. Sent through `client.send()` so these tests don't depend on
 * `BatchRequestBuilder.execute()`.
 * Creates accounts and contacts, and deletes them afterwards.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  decodeBatchResponse,
  encodeBatchRequest,
  generateBoundary,
  type BatchItem,
} from "@mohsinonxrm/dataverse-sdk-batch";
import { idFromEntityId, live, liveClient, runId } from "./env.js";

const created: Array<{ set: string; id: string }> = [];
const MISSING = "00000000-0000-0000-0000-000000000001";

async function sendBatch(items: BatchItem[], prefer?: string) {
  const { client } = liveClient();
  const boundary = generateBoundary();
  const res = await client.send({
    method: "POST",
    url: "$batch",
    headers: {
      "Content-Type": `multipart/mixed; boundary=${boundary}`,
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: encodeBatchRequest(items, boundary),
  });
  const parts = decodeBatchResponse(await res.text(), res.headers.get("content-type") ?? "");
  for (const p of parts) {
    const entityId = p.headers["odata-entityid"];
    if (p.status === 204 && entityId && /\/(accounts|contacts)\(/.test(entityId)) {
      const set = /\/(accounts|contacts)\(/.exec(entityId)?.[1] ?? "";
      if (!created.some((c) => c.id === idFromEntityId(entityId))) {
        created.push({ set, id: idFromEntityId(entityId) });
      }
    }
  }
  return { status: res.status, parts };
}

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  // Contacts first: deleting an account can cascade to its contacts.
  const order = [...created].sort((a, b) =>
    a.set === "contacts" ? -1 : b.set === "contacts" ? 1 : 0
  );
  for (const { set, id } of order) {
    await client
      .api(`${set}(${id})`)
      .delete()
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: batch codec (#55, #56)", () => {
  it("a GET, then a change set that creates an account, a contact bound to $acct, and updates $acct", async () => {
    const { client } = liveClient();
    const api = client.getBaseUrl();
    const { status, parts } = await sendBatch([
      { id: "who", method: "GET", url: `${api}/WhoAmI`, headers: { Accept: "application/json" } },
      {
        changeset: [
          { id: "acct", method: "POST", url: `${api}/accounts`, body: { name: `${runId} codec` } },
          {
            id: "contact",
            method: "POST",
            url: `${api}/contacts`,
            body: {
              lastname: `${runId} codec`,
              "parentcustomerid_account@odata.bind": "$acct",
            },
          },
          { id: "upd", method: "PATCH", url: "$acct", body: { description: "updated via $acct" } },
        ],
      },
    ]);

    expect(status).toBe(200);
    expect(parts.map((p) => [p.batchIndex, p.inChangeset, p.contentId, p.status])).toEqual([
      [0, false, undefined, 200],
      [1, true, "acct", 204],
      [1, true, "contact", 204],
      [1, true, "upd", 204],
    ]);
    expect(parts[0]?.body).toHaveProperty("UserId");

    const accountId = idFromEntityId(parts[1]?.headers["odata-entityid"] ?? null);
    const contactId = idFromEntityId(parts[2]?.headers["odata-entityid"] ?? null);
    const account = await client
      .api(`accounts(${accountId})`)
      .select("description")
      .get<{ description: string }>();
    expect(account.description).toBe("updated via $acct");
    const contact = await client
      .api(`contacts(${contactId})`)
      .select("_parentcustomerid_value")
      .get<{ _parentcustomerid_value: string }>();
    expect(contact._parentcustomerid_value).toBe(accountId);
  });

  it("a failed change set decodes to its one failing response", async () => {
    const { client } = liveClient();
    const api = client.getBaseUrl();
    const { status, parts } = await sendBatch([
      {
        changeset: [
          { id: "a", method: "POST", url: `${api}/accounts`, body: { name: `${runId} rollback` } },
          {
            id: "b",
            method: "PATCH",
            url: `${api}/accounts(${MISSING})`,
            headers: { "If-Match": "*" },
            body: { name: "x" },
          },
        ],
      },
      { id: "who", method: "GET", url: `${api}/WhoAmI` },
    ]);
    // Dataverse answers with the failing part's status, and stops after the change set.
    expect(status).toBe(404);
    expect(parts).toHaveLength(1);
    expect(parts[0]).toMatchObject({ contentId: "b", status: 404 });
    expect(parts[0]?.body).toMatchObject({ error: { code: "0x80040217" } });

    // The account create was rolled back.
    const left = await client
      .api("accounts")
      .select("accountid")
      .filter(`name eq '${runId} rollback'`)
      .get<{ value: unknown[] }>();
    expect(left.value).toEqual([]);
  });

  it("with odata.continue-on-error, every independent part is answered", async () => {
    const { client } = liveClient();
    const api = client.getBaseUrl();
    const { status, parts } = await sendBatch(
      [
        { id: "del", method: "DELETE", url: `${api}/accounts(${MISSING})` },
        { id: "who", method: "GET", url: `${api}/WhoAmI` },
      ],
      "odata.continue-on-error"
    );
    expect(status).toBe(200);
    expect(parts.map((p) => [p.batchIndex, p.status])).toEqual([
      [0, 404],
      [1, 200],
    ]);
  });
});
