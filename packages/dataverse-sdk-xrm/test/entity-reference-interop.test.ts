/**
 * #295: the actions, functions, messages, entities-runtime and xrm packages each defined their
 * own `EntityReference`, and the branded ones each had their own `unique symbol`, so a reference
 * made by one package's `createEntityReference` didn't type-check where another package wanted
 * one. Now there is one, in entities-runtime, and every package re-exports it.
 *
 * `pnpm typecheck` (tsc over test/**) checks the assignments below; the `it`s check the values.
 */
import { describe, expect, expectTypeOf, it } from "vitest";
import { createTestClient, noContent, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as actions from "@mohsinonxrm/dataverse-sdk-actions";
import * as functions from "@mohsinonxrm/dataverse-sdk-functions";
import * as messages from "@mohsinonxrm/dataverse-sdk-messages";
import * as runtime from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import * as xrm from "../src/index.js";

const ACCOUNT = "11111111-2222-3333-4444-555555555555";
const CONTACT = "6f6a7d4e-1b2c-4d5e-8f90-0123456789ab";

/** Every package's `createEntityReference`, by package. */
const factories = {
  actions: actions.createEntityReference,
  functions: functions.createEntityReference,
  messages: messages.createEntityReference,
  "entities-runtime": runtime.createEntityReference,
  xrm: xrm.createEntityReference,
};

// Compile-time: a reference from any package is every package's EntityReference.
export function referencesAreOneType(): unknown[] {
  const fromActions = actions.createEntityReference("account", ACCOUNT);
  const fromFunctions = functions.createEntityReference("account", ACCOUNT);
  const fromMessages = messages.createEntityReference("account", ACCOUNT);
  const fromRuntime = runtime.createEntityReference("account", ACCOUNT);
  const fromXrm = xrm.createEntityReference("account", ACCOUNT);

  const assigned: unknown[] = [];
  for (const reference of [fromActions, fromFunctions, fromMessages, fromRuntime, fromXrm]) {
    const a: actions.EntityReference = reference;
    const f: functions.EntityReference = reference;
    const m: messages.EntityReference = reference;
    const r: runtime.EntityReference = reference;
    const x: xrm.EntityReference = reference;
    assigned.push(a, f, m, r, x);
  }
  expectTypeOf<actions.EntityReference>().toEqualTypeOf<messages.EntityReference>();
  expectTypeOf<functions.EntityReference>().toEqualTypeOf<runtime.EntityReference>();
  expectTypeOf<xrm.EntityReference>().toEqualTypeOf<runtime.EntityReference>();
  expectTypeOf<actions.WebApiEntityReference>().toEqualTypeOf<messages.WebApiEntityReference>();
  expectTypeOf<actions.EntityReferenceOptions>().toEqualTypeOf<xrm.EntityReferenceOptions>();
  return assigned;
}

// Compile-time: and each package's operations take the others' references.
export function operationsTakeAnyPackagesReference(service: xrm.OrganizationService): unknown[] {
  const fromMessages = messages.createEntityReference("account", ACCOUNT);
  const fromActions = actions.createEntityReference("account", ACCOUNT);
  const fromXrm = xrm.createEntityReference("contact", CONTACT);

  return [
    new actions.GrantAccessAction({ Target: fromMessages }),
    new messages.MergeRequest({
      Target: fromActions,
      Subordinate: fromXrm,
      PerformParentingChecks: false,
    }),
    new functions.CalculateRollupFieldFunction({ Target: fromMessages, FieldName: "x" }),
    service.associate("accounts", ACCOUNT, "contact_customer_accounts", [
      actions.createEntityReference("contact", CONTACT),
      messages.createEntityReference("contact", CONTACT),
    ]),
    runtime.formatEntityForWrite(
      { primarycontactid: functions.createEntityReference("contact", CONTACT) },
      {
        typeName: "Microsoft.Dynamics.CRM.account",
        logicalName: "account",
        collectionName: "accounts",
        primaryIdAttribute: "accountid",
        attributeTypes: {},
        navigation: {},
      }
    ),
    new functions.CalculateRollupFieldFunction({
      // @ts-expect-error a hand-written { logicalName, id } still isn't an EntityReference (#251)
      Target: { logicalName: "account", id: ACCOUNT },
      FieldName: "x",
    }),
  ];
}

describe("#295: one EntityReference across the packages", () => {
  it("every package exports the same createEntityReference and getEntitySetNameFromReference", () => {
    for (const [name, factory] of Object.entries(factories)) {
      expect(factory, name).toBe(runtime.createEntityReference);
    }
    for (const helper of [
      actions.getEntitySetNameFromReference,
      functions.getEntitySetNameFromReference,
      messages.getEntitySetNameFromReference,
      xrm.getEntitySetNameFromReference,
    ]) {
      expect(helper).toBe(runtime.getEntitySetNameFromReference);
    }
    expectTypeOf(referencesAreOneType).toBeFunction();
    expectTypeOf(operationsTakeAnyPackagesReference).toBeFunction();
  });

  it("a messages reference works in an action body, a function parameter and associate()", async () => {
    const { client, fake } = createTestClient();
    fake.on("POST", "/GrantAccess", () => noContent());
    fake.on("GET", /^\/CalculateRollupField/, () => jsonResponse({}));
    fake.on("POST", `/accounts(${ACCOUNT})/contact_customer_accounts/$ref`, () => noContent());

    await client.execute(
      new actions.GrantAccessAction({ Target: messages.createEntityReference("account", ACCOUNT) })
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: ACCOUNT },
    });

    await client.execute(
      new functions.CalculateRollupFieldFunction({
        Target: actions.createEntityReference("account", ACCOUNT),
        FieldName: "new_total",
      })
    );
    expect(decodeURIComponent(fake.last().url)).toContain(
      `@p1={"@odata.id":"accounts(${ACCOUNT})"}`
    );

    await new xrm.OrganizationService(client).associate(
      "accounts",
      ACCOUNT,
      "contact_customer_accounts",
      [messages.createEntityReference("contact", CONTACT)]
    );
    expect(JSON.parse(fake.last().bodyText ?? "")).toEqual({
      "@odata.id": `${client.getBaseUrl()}/contacts(${CONTACT})`,
    });
  });
});
