/**
 * Live tests for #96: the generated operations take one parameters object, keyed by the CSDL
 * names, and leave undefined parameters out of the request. Two read-only functions, and an action
 * plus a message whose effect is undone: CreateMultiple creates two accounts (named with this
 * run's id), UpdateMultiple renames them, and afterAll deletes exactly the ids CreateMultiple
 * returned.
 */
import { afterAll, describe, expect, it } from "vitest";
import { CreateMultipleAction } from "@mohsinonxrm/dataverse-sdk-actions";
import { RetrieveEntityFunction, WhoAmIFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { UpdateMultipleRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
const created: string[] = [];

describe.skipIf(!live)("live: options-object constructors (#96)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("WhoAmI takes no arguments", async () => {
    const { client } = liveClient();
    const me = await client.execute(new WhoAmIFunction());
    expect(me.UserId).toMatch(GUID);
  });

  it("RetrieveEntity with named parameters, and with the nullable LogicalName left out", async () => {
    const { client } = liveClient();
    const byName = await client.execute(
      new RetrieveEntityFunction({
        EntityFilters: "Entity",
        LogicalName: "account",
        MetadataId: EMPTY_GUID,
        RetrieveAsIfPublished: false,
      })
    );
    expect(byName.EntityMetadata.LogicalName).toBe("account");
    const metadataId = byName.EntityMetadata.MetadataId;
    expect(metadataId).toMatch(GUID);

    // LogicalName undefined: no LogicalName alias is sent, and the table is found by its id
    const fn = new RetrieveEntityFunction({
      EntityFilters: "Entity",
      LogicalName: undefined,
      MetadataId: metadataId ?? EMPTY_GUID,
      RetrieveAsIfPublished: false,
    });
    expect(fn.toRequestInformation(client.getBaseUrl()).url).not.toContain("LogicalName");
    const byId = await client.execute(fn);
    expect(byId.EntityMetadata.LogicalName).toBe("account");
  });

  it("CreateMultiple (action) and UpdateMultiple (message) take the entity set, then the parameters", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new CreateMultipleAction("accounts", {
        Targets: [
          { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} options 1` },
          { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} options 2` },
        ],
      })
    );
    created.push(...result.Ids);
    expect(result.Ids).toHaveLength(2);

    const update = new UpdateMultipleRequest("accounts", {
      Targets: result.Ids.map((accountid, i) => ({
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        accountid,
        name: `${runId} options renamed ${String(i + 1)}`,
      })),
    });
    expect(update.Parameters.Targets).toHaveLength(2);
    await client.execute(update);

    for (const [i, id] of result.Ids.entries()) {
      const row = await client.api(`accounts(${id})`).select("name").get<{ name: string }>();
      expect(row.name).toBe(`${runId} options renamed ${String(i + 1)}`);
    }
  });
});
