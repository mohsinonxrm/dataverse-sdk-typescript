/**
 * #344 live: the function-backed, CRUD and batch messages. Reads WhoAmI and the account table's
 * definition, creates, reads, updates and deletes an account, runs two creates in one
 * ExecuteMultiple and two in one ExecuteTransaction, and deletes every account it made.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  ExecuteMultipleRequest,
  ExecuteTransactionRequest,
  RetrieveEntityRequest,
  RetrieveMultipleRequest,
  RetrieveRequest,
  UpdateRequest,
  WhoAmIRequest,
  createEntityReference,
} from "@mohsinonxrm/dataverse-sdk-messages";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { live, liveClient, runId } from "./env.js";

const EMPTY = "00000000-0000-0000-0000-000000000000";
const created: string[] = [];
const account = (name: string) =>
  new CreateRequest({
    Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} ${name}` },
  });

afterAll(async () => {
  if (!live) return;
  const { client } = liveClient();
  for (const id of created) {
    await client
      .execute(new DeleteRequest({ Target: createEntityReference("account", id) }))
      .catch(() => undefined);
  }
});

describe.skipIf(!live)("live: function-backed, CRUD and batch messages (#344)", () => {
  it("WhoAmIRequest resolves the caller in result", async () => {
    const { client } = liveClient();
    const { result } = await client.execute(new WhoAmIRequest());
    expect(result.UserId).toMatch(/^[0-9a-f-]{36}$/);
    expect(result.OrganizationId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("RetrieveEntityRequest reads the account table's definition", async () => {
    const { client } = liveClient();
    const service = new OrganizationService(client);
    const { result } = await service.execute(
      new RetrieveEntityRequest({
        EntityFilters: "Entity",
        LogicalName: "account",
        MetadataId: EMPTY,
        RetrieveAsIfPublished: false,
      })
    );
    expect(result.EntityMetadata.LogicalName).toBe("account");
    expect(result.EntityMetadata.EntitySetName).toBe("accounts");
  });

  it("Create, Retrieve, Update, RetrieveMultiple and Delete an account", async () => {
    const { client } = liveClient();
    const { id } = await client.execute(account("crud"));
    created.push(id);
    const target = createEntityReference("account", id);

    const { Entity } = await client.execute(
      new RetrieveRequest({ Target: target, ColumnSet: ["name"] })
    );
    expect(Entity.name).toBe(`${runId} crud`);
    expect(Entity["@odata.etag"]).toBeTypeOf("string");

    await client.execute(
      new UpdateRequest({
        Target: target,
        Attributes: { name: `${runId} crud updated` },
        ETag: Entity["@odata.etag"],
      })
    );
    const { EntityCollection } = await client.execute(
      new RetrieveMultipleRequest({
        Query: `<fetch><entity name="account"><attribute name="name" /><filter><condition attribute="accountid" operator="eq" value="${id}" /></filter></entity></fetch>`,
      })
    );
    expect(EntityCollection.value.map((row) => row.name)).toEqual([`${runId} crud updated`]);

    await client.execute(new DeleteRequest({ Target: target }));
    created.splice(created.indexOf(id), 1);
    await expect(client.execute(new RetrieveRequest({ Target: target }))).rejects.toMatchObject({
      status: 404,
    });
  });

  it("ExecuteMultiple runs two creates in one $batch", async () => {
    const { client } = liveClient();
    const response = await client.execute(
      new ExecuteMultipleRequest({
        Requests: [account("multiple 1"), account("multiple 2")],
        Settings: { ContinueOnError: true },
      })
    );
    for (const item of response.Responses) {
      if (item.Response instanceof CreateResponse) created.push(item.Response.id);
    }
    expect(response.IsFaulted).toBe(false);
    expect(response.Responses.map((item) => item.RequestIndex)).toEqual([0, 1]);
    expect(response.Responses.every((item) => item.Response instanceof CreateResponse)).toBe(true);
  });

  it("ExecuteMultiple reports a failed request as a Fault without throwing", async () => {
    const { client } = liveClient();
    const response = await client.execute(
      new ExecuteMultipleRequest({
        Requests: [
          new DeleteRequest({
            Target: createEntityReference("account", "00000000-0000-0000-0000-000000000001"),
          }),
          new WhoAmIRequest(),
        ],
        Settings: { ContinueOnError: true },
      })
    );
    expect(response.IsFaulted).toBe(true);
    expect(response.Responses[0]?.Fault).toMatchObject({ status: 404 });
    expect(response.Responses[1]?.Response).toBeDefined();
  });

  it("ExecuteTransaction runs two creates in one change set", async () => {
    const { client } = liveClient();
    const { Responses } = await client.execute(
      new ExecuteTransactionRequest({
        Requests: [account("transaction 1"), account("transaction 2")],
      })
    );
    const [first, second] = Responses;
    created.push(first.id, second.id);
    expect(first.id).not.toBe(second.id);
  });
});
