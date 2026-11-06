/**
 * #69: actions bound to an entity collection are called on the entity set,
 * `POST /{entityset}/Microsoft.Dynamics.CRM.{Name}`. The bulk messages, bound to
 * `Collection(mscrm.crmbaseentity)`, take the entity set name as their first argument.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as actions from "../src/index.js";

const SRC: string = fileURLToPath(new URL("../src/", import.meta.url));

/** Every generated action whose binding parameter is a Collection(...), by class name. */
function collectionBoundActions(): Array<{ name: string; binding: string }> {
  const files: string[] = readdirSync(SRC);
  return files
    .filter((f) => f.endsWith("Action.ts"))
    .flatMap((f) => {
      const m = /Binding parameter: \w+ \((Collection\([^)]*\))\)/.exec(
        readFileSync(`${SRC}${f}`, "utf8")
      );
      return m?.[1] ? [{ name: f.slice(0, -3), binding: m[1] }] : [];
    });
}

type ActionClass = new (...args: unknown[]) => Executable<unknown>;

describe("#69: collection-bound actions", () => {
  it("every collection-bound action posts to its entity set", () => {
    const urls: Record<string, string> = {};
    for (const { name, binding } of collectionBoundActions()) {
      const Action = (actions as unknown as Record<string, ActionClass | undefined>)[name];
      if (!Action) throw new Error(`${name} isn't exported`);
      // Only the crmbaseentity-bound (bulk) actions take the entity set as an argument; then
      // the parameters object (#96), empty since parameters don't change the URL
      const args = binding === "Collection(mscrm.crmbaseentity)" ? ["accounts", {}] : [{}];
      urls[name] = new Action(...args)
        .toRequestInformation(TEST_API_URL)
        .url.slice(TEST_API_URL.length);
    }
    expect(urls).toEqual({
      CreateExceptionAction: "/recurringappointmentmasters/Microsoft.Dynamics.CRM.CreateException",
      CreateFlowMachineNetworkAction:
        "/flowmachinenetworks/Microsoft.Dynamics.CRM.CreateFlowMachineNetwork",
      CreateMultipleAction: "/accounts/Microsoft.Dynamics.CRM.CreateMultiple",
      DeleteMultipleAction: "/accounts/Microsoft.Dynamics.CRM.DeleteMultiple",
      DeliverIncomingEmailAction: "/emails/Microsoft.Dynamics.CRM.DeliverIncomingEmail",
      ExportTranslationAction: "/solutions/Microsoft.Dynamics.CRM.ExportTranslation",
      FulfillSalesOrderAction: "/salesorders/Microsoft.Dynamics.CRM.FulfillSalesOrder",
      GenerateSocialProfileAction: "/socialprofiles/Microsoft.Dynamics.CRM.GenerateSocialProfile",
      UpdateMultipleAction: "/accounts/Microsoft.Dynamics.CRM.UpdateMultiple",
      UpsertMultipleAction: "/accounts/Microsoft.Dynamics.CRM.UpsertMultiple",
      ValidateSavedQueryAction: "/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery",
      msdyn_AsExchangeEventAction:
        "/bookableresourcebookings/Microsoft.Dynamics.CRM.msdyn_AsExchangeEvent",
    });
  });

  it("CreateMultiple reaches /{entityset}/Microsoft.Dynamics.CRM.CreateMultiple with only Targets", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/contacts/Microsoft.Dynamics.CRM.CreateMultiple", () =>
      jsonResponse({ Ids: ["c1", "c2"] })
    );
    const targets = [
      { "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "One" },
      { "@odata.type": "Microsoft.Dynamics.CRM.contact", lastname: "Two" },
    ];

    const result = await client.execute(
      new actions.CreateMultipleAction("contacts", { Targets: targets })
    );

    expect(result.Ids).toEqual(["c1", "c2"]);
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ Targets: targets });
  });

  it("ValidateSavedQuery reaches /savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery", async () => {
    const { client, fake } = createTestClient();
    fake.on(
      "POST",
      "/savedqueries/Microsoft.Dynamics.CRM.ValidateSavedQuery",
      () => new Response(null, { status: 204 })
    );
    const fetchXml = "<fetch><entity name='account'><attribute name='name'/></entity></fetch>";

    await client.execute(
      new actions.ValidateSavedQueryAction({ FetchXml: fetchXml, QueryType: 0 })
    );

    expect(fake.last().method).toBe("POST");
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({ FetchXml: fetchXml, QueryType: 0 });
  });
});
