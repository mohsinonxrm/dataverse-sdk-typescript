/**
 * Live test for #71: a function that returns one entity answers with the entity itself, not
 * `{ value: … }`. Read-only.
 */
import { describe, expect, it } from "vitest";
import { GetPreferredSolutionFunction } from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

describe.skipIf(!live)("live: entity returns (#71)", () => {
  it("GetPreferredSolution returns the solution record itself", async () => {
    const { client } = liveClient();
    const solution = await client.execute(new GetPreferredSolutionFunction());
    expect(solution).not.toHaveProperty("value");
    expect(solution.solutionid).toEqual(expect.any(String));
    expect(solution["@odata.context"]).toContain("solutions/$entity");
  });
});
