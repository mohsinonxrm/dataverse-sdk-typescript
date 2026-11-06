/**
 * Live tests for #69: operations bound to an entity collection are called on the entity set.
 * CreateMultiple creates two accounts (named with this run's id); afterAll deletes them.
 */
import { afterAll, describe, expect, it } from "vitest";
import {
  CreateMultipleAction,
  UpdateMultipleAction,
  ValidateSavedQueryAction,
} from "@mohsinonxrm/dataverse-sdk-actions";
import { RetrievePrivilegeSetFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

describe.skipIf(!live)("live: collection-bound operations (#69)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`accounts(${id})`).delete();
  });

  it("ValidateSavedQuery runs on /savedqueries", async () => {
    const { client } = liveClient();
    const fetchXml = "<fetch><entity name='account'><attribute name='name'/></entity></fetch>";
    // A valid query: Dataverse answers 204 and the action resolves with no content
    await expect(
      client.execute(new ValidateSavedQueryAction({ FetchXml: fetchXml, QueryType: 0 }))
    ).resolves.toEqual({});
  });

  it("the unbound URL the old code used doesn't exist", async () => {
    const { client } = liveClient();
    const res = await client.send({
      method: "POST",
      url: `${client.getBaseUrl()}/ValidateSavedQuery`,
      headers: { "content-type": "application/json" },
      body: { FetchXml: "<fetch><entity name='account'/></fetch>", QueryType: 0 },
    });
    expect(res.status).toBe(404);
  });

  it("CreateMultiple and UpdateMultiple run on the entity set passed in", async () => {
    const { client } = liveClient();
    const result = await client.execute(
      new CreateMultipleAction("accounts", {
        Targets: [
          { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} bulk 1` },
          { "@odata.type": "Microsoft.Dynamics.CRM.account", name: `${runId} bulk 2` },
        ],
      })
    );
    created.push(...result.Ids);
    expect(result.Ids).toHaveLength(2);

    await client.execute(
      new UpdateMultipleAction("accounts", {
        Targets: result.Ids.map((accountid, i) => ({
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid,
          name: `${runId} bulk ${String(i + 1)} updated`,
        })),
      })
    );
    const first = result.Ids[0] ?? "";
    const account = await client.api(`accounts(${first})`).select("name").get<{ name: string }>();
    expect(account.name).toBe(`${runId} bulk 1 updated`);
  });

  it("RetrievePrivilegeSet runs on /privileges", async () => {
    const { client } = liveClient();
    const result = await client.execute(new RetrievePrivilegeSetFunction());
    expect(result.value.length).toBeGreaterThan(0);
  });
});
