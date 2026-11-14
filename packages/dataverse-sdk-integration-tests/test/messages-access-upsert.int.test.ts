/**
 * #435 live: RetrievePrincipalAccessRequest and CheckPrivilegeRequest for the calling user, and
 * UpsertRequest creating then updating an account by its primary key. Creates accounts named with
 * this run's id; afterAll deletes them.
 *
 * Upsert by alternate key isn't tested live: no standard table has an alternate key in a default
 * org, and defining one is an asynchronous index job. The unit tests cover the URL it sends.
 */
import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import {
  AccessRights,
  CheckPrivilegeRequest,
  CreateRequest,
  DeleteRequest,
  RetrievePrincipalAccessRequest,
  RetrieveRequest,
  UpsertRequest,
  WhoAmIRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of created) {
    await client
      .execute(new DeleteRequest({ Target: createEntityReference("account", id) }))
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: RetrievePrincipalAccess, CheckPrivilege and Upsert (#435)", () => {
  it("RetrievePrincipalAccessRequest reads the caller's rights on an account it created", async () => {
    const { client } = liveClient();
    const { UserId } = (await client.execute(new WhoAmIRequest())).result;
    const { id } = await client.execute(
      new CreateRequest({
        Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} access` },
      })
    );
    created.push(id);

    const response = await client.execute(
      new RetrievePrincipalAccessRequest({
        Principal: createEntityReference("systemuser", UserId),
        Target: createEntityReference("account", id),
      })
    );
    // The Web API sends member names; AccessRights is the flags as a number
    expect(response.result.AccessRights).toEqual(expect.stringContaining("ReadAccess"));
    expect(response.AccessRights & AccessRights.ReadAccess).toBe(AccessRights.ReadAccess);
    expect(response.AccessRights & AccessRights.WriteAccess).toBe(AccessRights.WriteAccess);
  });

  it("CheckPrivilegeRequest finds the caller's prvReadAccount", async () => {
    const { client } = liveClient();
    const { UserId } = (await client.execute(new WhoAmIRequest())).result;
    const response = await client.execute(
      new CheckPrivilegeRequest({ UserId, PrivilegeName: "prvReadAccount" })
    );
    expect(response.HasPrivilege).toBe(true);
    expect(response.RolePrivileges.length).toBeGreaterThan(0);
    expect(["Basic", "Local", "Deep", "Global", "RecordFilter"]).toContain(response.Depth);
  });

  it("UpsertRequest creates an account by primary key, then updates it", async () => {
    const { client } = liveClient();
    const id = randomUUID();
    const target = (name: string) => ({
      "@odata.type": "Microsoft.Dynamics.CRM.account",
      name: `${runId} ${name}`,
    });

    const first = await client.execute(new UpsertRequest({ Target: target("upsert"), Key: id }));
    created.push(id);
    expect(first.RecordCreated).toBe(true);
    expect(first.Target.id).toBe(id);
    expect(first.Target.logicalName).toBe("account");

    const second = await client.execute(
      new UpsertRequest({ Target: { ...target("upserted"), accountid: id } })
    );
    expect(second.RecordCreated).toBe(false);
    expect(second.Target.id).toBe(id);

    const { Entity } = await client.execute(
      new RetrieveRequest({ Target: second.Target, ColumnSet: ["name"] })
    );
    expect(Entity.name).toBe(`${runId} upserted`);
  });
});
