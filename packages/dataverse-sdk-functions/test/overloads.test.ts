/**
 * #75: RetrievePrincipalAccess is bound to systemuser, team and organization. There was one file
 * per name, so only the organization binding survived. Each binding now has its own class, and
 * the plain name is a deprecated alias of the organization one it exported before.
 */
import { describe, expect, it } from "vitest";
import { createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as functions from "../src/index.js";

const target = functions.createEntityReference("account", "a1");

describe("#75: function overloads", () => {
  it("RetrievePrincipalAccess runs on the user, the team or the organization", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", /RetrievePrincipalAccess/, () => jsonResponse({ AccessRights: "ReadAccess" }));
    const path = () => decodeURIComponent(fake.last().path).split("?")[0];

    await client.execute(new functions.RetrievePrincipalAccess_systemuserFunction("u1", target));
    expect(path()).toBe(
      "/systemusers(u1)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)"
    );

    await client.execute(new functions.RetrievePrincipalAccess_teamFunction("t1", target));
    expect(path()).toBe("/teams(t1)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)");

    const response = await client.execute(
      new functions.RetrievePrincipalAccess_organizationFunction("o1", target)
    );
    expect(path()).toBe(
      "/organizations(o1)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)"
    );
    expect(response.AccessRights).toBe("ReadAccess");
  });

  it("every overload of an overloaded name is exported, one class per binding", () => {
    const names = Object.keys(functions);
    expect(names.filter((n) => n.startsWith("RetrievePrincipalAccess_"))).toEqual([
      "RetrievePrincipalAccess_organizationFunction",
      "RetrievePrincipalAccess_systemuserFunction",
      "RetrievePrincipalAccess_teamFunction",
    ]);
    expect(names.filter((n) => n.startsWith("GetQuantityDecimal_"))).toHaveLength(4);
  });

  it("the plain name is still the binding it exported before", () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- checking the alias itself
    expect(functions.RetrievePrincipalAccessFunction).toBe(
      functions.RetrievePrincipalAccess_organizationFunction
    );
  });
});
