/**
 * #23: generated actions declare their JSON body with a lower-case `content-type`, the casing the
 * core uses, so exactly one content type is sent.
 */
import { describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { TEST_API_URL, createTestClient, noContent } from "@mohsinonxrm/dataverse-sdk-testing";
import * as actions from "../src/index.js";

type ActionClass = new (...args: unknown[]) => Executable<unknown>;

const actionClasses = Object.entries(actions).filter(
  (entry): entry is [string, ActionClass] =>
    entry[0].endsWith("Action") && typeof entry[1] === "function"
);

describe("#23: generated actions send one lower-case content-type", () => {
  it("finds the generated action classes", () => {
    expect(actionClasses.length).toBeGreaterThan(1000);
  });

  it("every action's request declares only a lower-case content-type header", () => {
    const offenders: string[] = [];
    for (const [name, Action] of actionClasses) {
      // Parameter values don't affect the headers, so construct without arguments.
      const info = new Action().toRequestInformation(TEST_API_URL);
      const headers = info.headers ?? {};
      const contentTypeNames = Object.keys(headers).filter(
        (k) => k.toLowerCase() === "content-type"
      );
      if (contentTypeNames.length !== 1 || contentTypeNames[0] !== "content-type") {
        offenders.push(`${name}: ${JSON.stringify(Object.keys(headers))}`);
      }
      if (headers["content-type"] !== "application/json") {
        offenders.push(`${name}: content-type=${String(headers["content-type"])}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("a generated action reaches fetch with exactly one JSON content-type", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/WinOpportunity", () => noContent());

    await client.execute(
      new actions.WinOpportunityAction(
        {
          "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
          subject: "Won",
        },
        "",
        3
      )
    );

    const r = fake.last();
    // The fake joins duplicate header names with ", ", as fetch would: one value means one header.
    expect(r.headers["content-type"]).toBe("application/json");
    expect(JSON.parse(r.bodyText ?? "")).toMatchObject({ Status: 3 });
  });
});
