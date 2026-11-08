/**
 * #345: the `Metadata` builders return the create payloads with the `@odata.type`, labels
 * (`LanguageCode`), `RequiredLevel` and Dataverse's defaults filled in, and throw
 * `DataverseInvalidRequestError` for input Dataverse would reject. The payloads go straight to
 * `MetadataClient`.
 */
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { DataverseClient, DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { Metadata, MetadataClient } from "../src/index.js";
import type { Label } from "../src/index.js";

const en = (text: string): Label => ({
  "@odata.type": "Microsoft.Dynamics.CRM.Label",
  LocalizedLabels: [
    { "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel", Label: text, LanguageCode: 1033 },
  ],
});

const GLOBAL_ID = "3fd0fdd5-7b1f-4ed1-90bc-b830d3ed1984";

interface Posted {
  path: string;
  body: unknown;
}

function invalidParameter(fn: () => unknown, param: string): void {
  let error: unknown;
  try {
    fn();
  } catch (err) {
    error = err;
  }
  expect(error).toBeInstanceOf(DataverseInvalidRequestError);
  expect((error as Error).message).toContain(`Invalid parameter '${param}'`);
}

describe("Metadata.label", () => {
  it("builds a Label with the @odata.type and LanguageCode, English by default", () => {
    expect(Metadata.label("Name")).toEqual(en("Name"));
    expect(Metadata.label("Nom", 1036).LocalizedLabels).toEqual([
      { "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel", Label: "Nom", LanguageCode: 1036 },
    ]);
  });

  it("takes several languages", () => {
    expect(
      Metadata.label({ 1033: "Name", 1036: "Nom" }).LocalizedLabels?.map((l) => [
        l.LanguageCode,
        l.Label,
      ])
    ).toEqual([
      [1033, "Name"],
      [1036, "Nom"],
    ]);
  });

  it("rejects an empty text, no languages and a language that isn't an LCID", () => {
    invalidParameter(() => Metadata.label(""), "text");
    invalidParameter(() => Metadata.label("  "), "text");
    invalidParameter(() => Metadata.label({}), "texts");
    invalidParameter(() => Metadata.label("Name", 0), "languageCode");
    invalidParameter(() => Metadata.label("Name", 10.5), "languageCode");
  });
});

describe("column builders", () => {
  it("Metadata.string: @odata.type, labels, RequiredLevel None, MaxLength 100, Text format", () => {
    expect(Metadata.string("new_Code", { displayName: "Code" })).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Code",
      DisplayName: en("Code"),
      RequiredLevel: { Value: "None" },
      MaxLength: 100,
      FormatName: { Value: "Text" },
    });
  });

  it("Metadata.string takes a description, the required level, length, format and language", () => {
    const col = Metadata.string("new_Email", {
      displayName: "Email",
      description: Metadata.label("Contact email"),
      requiredLevel: "ApplicationRequired",
      maxLength: 320,
      format: "Email",
    });
    expect(col.Description).toEqual(en("Contact email"));
    expect(col.RequiredLevel).toEqual({ Value: "ApplicationRequired" });
    expect(col.MaxLength).toBe(320);
    expect(col.FormatName).toEqual({ Value: "Email" });

    const fr = Metadata.string("new_Nom", { displayName: "Nom", languageCode: 1036 });
    expect(fr.DisplayName?.LocalizedLabels?.[0]?.LanguageCode).toBe(1036);
  });

  it("Metadata.primaryName is a text column with IsPrimaryName: true", () => {
    expect(Metadata.primaryName("new_Name", { displayName: "Name", maxLength: 200 })).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      SchemaName: "new_Name",
      DisplayName: en("Name"),
      RequiredLevel: { Value: "None" },
      IsPrimaryName: true,
      MaxLength: 200,
      FormatName: { Value: "Text" },
    });
  });

  it("Metadata.memo: MaxLength 2000 and the TextArea format by default", () => {
    expect(Metadata.memo("new_Notes", { displayName: "Notes" })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.MemoAttributeMetadata",
      MaxLength: 2000,
      Format: "TextArea",
    });
  });

  it("Metadata.integer: Format None, and MinValue/MaxValue only when given", () => {
    const col = Metadata.integer("new_Count", { displayName: "Count" });
    expect(col).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
      Format: "None",
    });
    expect(col).not.toHaveProperty("MinValue");
    expect(
      Metadata.integer("new_Count", { displayName: "Count", minValue: 0, maxValue: 10 })
    ).toMatchObject({ MinValue: 0, MaxValue: 10 });
  });

  it("Metadata.decimal and Metadata.double default to 2 decimal places", () => {
    expect(Metadata.decimal("new_Rate", { displayName: "Rate" })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.DecimalAttributeMetadata",
      Precision: 2,
    });
    expect(Metadata.double("new_Score", { displayName: "Score", precision: 5 })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.DoubleAttributeMetadata",
      Precision: 5,
    });
  });

  it("Metadata.money maps the precision to PrecisionSource", () => {
    expect(Metadata.money("new_Budget", { displayName: "Budget" })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
      PrecisionSource: 2,
    });
    expect(
      Metadata.money("new_Budget", { displayName: "Budget", precision: "pricing" })
    ).toMatchObject({ PrecisionSource: 1 });
    const fixed = Metadata.money("new_Budget", { displayName: "Budget", precision: 0 });
    expect(fixed).toMatchObject({ PrecisionSource: 0, Precision: 0 });
  });

  it("Metadata.dateTime: DateAndTime by default, DateTimeBehavior when given", () => {
    const col = Metadata.dateTime("new_Due", { displayName: "Due" });
    expect(col).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata",
      Format: "DateAndTime",
    });
    expect(col).not.toHaveProperty("DateTimeBehavior");
    expect(
      Metadata.dateTime("new_Due", { displayName: "Due", format: "DateOnly", behavior: "DateOnly" })
    ).toMatchObject({ Format: "DateOnly", DateTimeBehavior: { Value: "DateOnly" } });
  });

  it("Metadata.boolean has its two options, Yes (1) and No (0) by default", () => {
    expect(Metadata.boolean("new_Active", { displayName: "Active" })).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanAttributeMetadata",
      SchemaName: "new_Active",
      DisplayName: en("Active"),
      RequiredLevel: { Value: "None" },
      DefaultValue: false,
      OptionSet: {
        "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata",
        OptionSetType: "Boolean",
        TrueOption: { Value: 1, Label: en("Yes") },
        FalseOption: { Value: 0, Label: en("No") },
      },
    });
  });

  it("Metadata.picklist with its own options: a local OptionSet with IsGlobal: false", () => {
    expect(
      Metadata.picklist("new_Size", {
        displayName: "Size",
        options: ["Small", { label: "Large", value: 100000001, color: "#ff0000" }],
      })
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
      SchemaName: "new_Size",
      DisplayName: en("Size"),
      RequiredLevel: { Value: "None" },
      OptionSet: {
        "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
        IsGlobal: false,
        OptionSetType: "Picklist",
        Options: [
          { Label: en("Small") },
          { Value: 100000001, Label: en("Large"), Color: "#ff0000" },
        ],
      },
    });
  });

  it("Metadata.picklist with a global choice binds it by MetadataId", () => {
    const col = Metadata.picklist("new_Priority", {
      displayName: "Priority",
      globalOptionSetId: GLOBAL_ID,
      defaultValue: 1,
    });
    expect(col).toMatchObject({
      "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${GLOBAL_ID})`,
      DefaultFormValue: 1,
    });
    expect(col).not.toHaveProperty("OptionSet");
  });

  it("Metadata.multiSelectPicklist has the multi-select @odata.type", () => {
    expect(
      Metadata.multiSelectPicklist("new_Tags", { displayName: "Tags", options: ["A", "B"] })[
        "@odata.type"
      ]
    ).toBe("Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata");
  });

  it("Metadata.file and Metadata.image have size defaults", () => {
    expect(Metadata.file("new_Doc", { displayName: "Doc" })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.FileAttributeMetadata",
      MaxSizeInKB: 32768,
    });
    expect(Metadata.image("new_Logo", { displayName: "Logo" })).toMatchObject({
      "@odata.type": "Microsoft.Dynamics.CRM.ImageAttributeMetadata",
      MaxSizeInKB: 10240,
      CanStoreFullImage: false,
    });
  });
});

describe("relationship, table and global choice builders", () => {
  it("Metadata.lookup is the 1:N relationship that creates the lookup column", () => {
    expect(
      Metadata.lookup("new_AccountId", {
        displayName: "Account",
        requiredLevel: "Recommended",
        referencingEntity: "new_project",
        referencedEntity: "account",
        relationshipSchemaName: "new_account_project",
        cascade: { Delete: "Restrict" },
      })
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      SchemaName: "new_account_project",
      ReferencedEntity: "account",
      ReferencingEntity: "new_project",
      CascadeConfiguration: { Delete: "Restrict" },
      Lookup: {
        "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
        SchemaName: "new_AccountId",
        DisplayName: en("Account"),
        RequiredLevel: { Value: "Recommended" },
      },
    });
  });

  it("Metadata.manyToMany defaults the intersect table to the schema name, lowercased", () => {
    expect(
      Metadata.manyToMany("new_Project_Contact", {
        entity1LogicalName: "new_project",
        entity2LogicalName: "contact",
      })
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
      SchemaName: "new_Project_Contact",
      Entity1LogicalName: "new_project",
      Entity2LogicalName: "contact",
      IntersectEntityName: "new_project_contact",
    });
  });

  it("Metadata.entity puts the primary name column first", () => {
    const due = Metadata.dateTime("new_Due", { displayName: "Due", format: "DateOnly" });
    expect(
      Metadata.entity("new_Project", {
        displayName: "Project",
        displayCollectionName: "Projects",
        description: "Projects we run",
        primaryName: Metadata.primaryName("new_Name", { displayName: "Name" }),
        attributes: [due],
      })
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
      SchemaName: "new_Project",
      DisplayName: en("Project"),
      DisplayCollectionName: en("Projects"),
      Description: en("Projects we run"),
      OwnershipType: "UserOwned",
      IsActivity: false,
      HasActivities: false,
      HasNotes: false,
      Attributes: [Metadata.primaryName("new_Name", { displayName: "Name" }), due],
    });
  });

  it("Metadata.globalOptionSet is a global Picklist choice", () => {
    expect(
      Metadata.globalOptionSet("new_priority", {
        displayName: "Priority",
        options: [
          { label: "High", value: 1 },
          { label: "Low", value: 2 },
        ],
      })
    ).toEqual({
      "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
      Name: "new_priority",
      DisplayName: en("Priority"),
      IsGlobal: true,
      OptionSetType: "Picklist",
      Options: [
        { Value: 1, Label: en("High") },
        { Value: 2, Label: en("Low") },
      ],
    });
  });
});

describe("the builders reject what Dataverse would", () => {
  it("a schema name without the customization prefix", () => {
    invalidParameter(() => Metadata.string("Code", { displayName: "Code" }), "schemaName");
    invalidParameter(() => Metadata.string("new_Co de", { displayName: "Code" }), "schemaName");
    invalidParameter(
      () =>
        Metadata.lookup("new_AccountId", {
          displayName: "Account",
          referencingEntity: "new_project",
          referencedEntity: "account",
          relationshipSchemaName: "accountproject",
        }),
      "relationshipSchemaName"
    );
  });

  it("an empty display name", () => {
    invalidParameter(() => Metadata.string("new_Code", { displayName: "" }), "displayName");
  });

  it("lengths, precisions and ranges out of bounds, and a minimum above the maximum", () => {
    invalidParameter(
      () => Metadata.string("new_Code", { displayName: "Code", maxLength: 4001 }),
      "maxLength"
    );
    invalidParameter(
      () => Metadata.string("new_Code", { displayName: "Code", maxLength: 0 }),
      "maxLength"
    );
    invalidParameter(
      () => Metadata.decimal("new_Rate", { displayName: "Rate", precision: 11 }),
      "precision"
    );
    invalidParameter(
      () => Metadata.money("new_Budget", { displayName: "Budget", precision: 5 }),
      "precision"
    );
    invalidParameter(
      () => Metadata.integer("new_Count", { displayName: "Count", minValue: 1.5 }),
      "minValue"
    );
    invalidParameter(
      () => Metadata.integer("new_Count", { displayName: "Count", maxValue: 2 ** 31 }),
      "maxValue"
    );
    invalidParameter(
      () => Metadata.integer("new_Count", { displayName: "Count", minValue: 5, maxValue: 1 }),
      "minValue"
    );
  });

  it("a DateOnly behavior without the DateOnly format", () => {
    invalidParameter(
      // A type error too; JavaScript callers get the exception.
      () =>
        Metadata.dateTime("new_Due", {
          displayName: "Due",
          behavior: "DateOnly",
        } as unknown as Parameters<typeof Metadata.dateTime>[1]),
      "behavior"
    );
  });

  it("a choice with both, or neither, of options and a global choice; no options; duplicates", () => {
    const both = {
      displayName: "Size",
      options: ["Small"],
      globalOptionSetId: GLOBAL_ID,
    } as unknown as Parameters<typeof Metadata.picklist>[1];
    invalidParameter(() => Metadata.picklist("new_Size", both), "options");
    const neither = { displayName: "Size" } as unknown as Parameters<typeof Metadata.picklist>[1];
    invalidParameter(() => Metadata.picklist("new_Size", neither), "options");
    invalidParameter(
      () => Metadata.picklist("new_Size", { displayName: "Size", options: [] }),
      "options"
    );
    invalidParameter(
      () =>
        Metadata.picklist("new_Size", {
          displayName: "Size",
          options: [
            { label: "A", value: 1 },
            { label: "B", value: 1 },
          ],
        }),
      "options[1].value"
    );
    invalidParameter(
      () => Metadata.picklist("new_Size", { displayName: "Size", globalOptionSetId: "new_sizes" }),
      "globalOptionSetId"
    );
    invalidParameter(
      () =>
        Metadata.picklist("new_Size", {
          displayName: "Size",
          options: [{ label: "A", value: 1 }],
          defaultValue: 2,
        }),
      "defaultValue"
    );
  });

  it("a SystemRequired column", () => {
    const options = {
      displayName: "Code",
      requiredLevel: "SystemRequired",
    } as unknown as Parameters<typeof Metadata.string>[1];
    invalidParameter(() => Metadata.string("new_Code", options), "requiredLevel");
  });

  it("a table without a primary name column, or with two", () => {
    const name = Metadata.primaryName("new_Name", { displayName: "Name" });
    const notPrimary = Metadata.string("new_Name", { displayName: "Name" });
    invalidParameter(
      () =>
        Metadata.entity("new_Project", {
          displayName: "Project",
          displayCollectionName: "Projects",
          primaryName: notPrimary as unknown as typeof name,
        }),
      "primaryName"
    );
    invalidParameter(
      () =>
        Metadata.entity("new_Project", {
          displayName: "Project",
          displayCollectionName: "Projects",
          primaryName: name,
          attributes: [name as unknown as typeof notPrimary],
        }),
      "attributes"
    );
  });
});

describe("the builders' payloads go to MetadataClient as they are", () => {
  const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
  const ID = "00000000-0000-0000-0000-000000000001";
  const bodies: Posted[] = [];
  const server = setupServer(
    http.post(`${API}/*`, async ({ request }) => {
      const path = decodeURIComponent(new URL(request.url).pathname).replace("/api/data/v9.2", "");
      bodies.push({ path, body: await request.json() });
      return new HttpResponse(null, {
        status: 204,
        headers: { "OData-EntityId": `${API}${path}(${ID})` },
      });
    })
  );
  let metadata: MetadataClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
    metadata = new MetadataClient(
      new DataverseClient({
        baseUrl: "https://contoso.crm.dynamics.com",
        tokenProvider: { getToken: () => Promise.resolve("test-token") },
      })
    );
  });
  afterEach(() => {
    bodies.length = 0;
  });
  afterAll(() => {
    server.close();
  });

  it("creates a table, a column and a lookup from the builders", async () => {
    const table = Metadata.entity("new_Project", {
      displayName: "Project",
      displayCollectionName: "Projects",
      primaryName: Metadata.primaryName("new_Name", { displayName: "Name" }),
    });
    const code = Metadata.string("new_Code", { displayName: "Code" });
    const account = Metadata.lookup("new_AccountId", {
      displayName: "Account",
      referencingEntity: "new_project",
      referencedEntity: "account",
      relationshipSchemaName: "new_account_project",
    });

    expect(await metadata.createEntityDefinition(table)).toBe(ID);
    expect(await metadata.createAttributeDefinition("new_project", code)).toBe(ID);
    expect(await metadata.createOneToManyRelationship(account)).toBe(ID);

    expect(bodies).toEqual([
      { path: "/EntityDefinitions", body: table },
      { path: "/EntityDefinitions(LogicalName='new_project')/Attributes", body: code },
      { path: "/RelationshipDefinitions", body: account },
    ]);
  });
});
