/**
 * Live test for #76: bound messages use the CSDL entity set (`opportunities`, not `opportunitys`).
 * Creates one opportunity named with this run's id; afterAll deletes it.
 */
import { afterAll, describe, expect, it } from "vitest";
import { CalculateActualValueOpportunityRequest } from "@mohsinonxrm/dataverse-sdk-messages";
import { live, liveClient, runId } from "./env.js";

const created: string[] = [];

describe.skipIf(!live)("live: message entity sets (#76)", () => {
  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const id of created) await client.api(`opportunities(${id})`).delete();
  });

  it("CalculateActualValueOpportunity runs on /opportunities(id)", async () => {
    const { client } = liveClient();
    const id = await client.api("opportunities").createAndGetId({ name: `${runId} actual value` });
    created.push(id);

    const response = await client.execute(new CalculateActualValueOpportunityRequest(id));

    expect(response.result.Value).toEqual(expect.any(Number));
  });
});
