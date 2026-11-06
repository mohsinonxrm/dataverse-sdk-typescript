/**
 * #272 live: update-style calls on a missing id must fail with 404, never create the record.
 * A PATCH without `If-Match: *` is an upsert in the Web API. Uses random GUIDs; anything that
 * ends up created is deleted in `afterAll`.
 */
import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient, runId } from "./env.js";

const ids: string[] = [];

function service(): OrganizationService {
  return new OrganizationService(liveClient().client);
}

async function exists(id: string): Promise<boolean> {
  const rows = await liveClient()
    .client.api(`accounts?$select=accountid&$filter=accountid eq ${id}`)
    .get<{ value: unknown[] }>();
  return rows.value.length > 0;
}

async function expectNotFoundAndNotCreated(call: (id: string) => Promise<unknown>): Promise<void> {
  const id = randomUUID();
  ids.push(id);
  const err = await call(id).then(
    () => undefined,
    (e: unknown) => e
  );
  const created = await exists(id);
  expect({ created, status: (err as DataverseError | undefined)?.status }).toEqual({
    created: false,
    status: 404,
  });
}

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

describe.skipIf(!live)("live: update-style calls never upsert (#272)", () => {
  it("update() on a missing id rejects with 404", async () => {
    await expectNotFoundAndNotCreated((id) =>
      service().update("accounts", id, { name: `sdk-int upsert ${runId}` })
    );
  });

  it("setState() on a missing id rejects with 404", async () => {
    await expectNotFoundAndNotCreated((id) => service().setState("account", id, 0, 1));
  });

  it("assign() on a missing id rejects with 404", async () => {
    const me = await liveClient().client.api("WhoAmI").get<{ UserId: string }>();
    await expectNotFoundAndNotCreated((id) => service().assign("account", id, me.UserId));
  });
});
