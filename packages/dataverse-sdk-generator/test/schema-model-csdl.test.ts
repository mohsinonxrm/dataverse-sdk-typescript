import { afterEach, describe, expect, it, vi } from "vitest";
import { MetadataService } from "../src/metadata-service.js";
import { SchemaModel, toEnumMemberName } from "../src/schema-model.js";
import { toDocText, toPropertyKey, toSafeIdentifier } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const baseConfig: DataverseGenConfig = { environmentUrl: "https://contoso.crm.dynamics.com" };

async function modelFor(config: Partial<DataverseGenConfig>): Promise<SchemaModel> {
  const model = new SchemaModel(createFixtureMetadataService(), { ...baseConfig, ...config });
  await model.generate();
  return model;
}

describe("SchemaModel with real-shaped $metadata (#78)", () => {
  it("resolves types written with the mscrm alias", async () => {
    const model = await modelFor({ entities: ["account", "contact"] });
    const account = model.EntityTypes.find((e) => e.LogicalName === "account");
    const primaryContact = account?.NavigationProperties.find((n) => n.Name === "primarycontactid");
    expect(primaryContact?.TargetType).toBe("contact");
    expect(primaryContact?.IsCollection).toBe(false);
    const contacts = account?.NavigationProperties.find(
      (n) => n.Name === "contact_customer_accounts"
    );
    expect(contacts).toMatchObject({ TargetType: "contact", IsCollection: true });
  });

  it("types option-set properties with their enum, except multi-select ones", async () => {
    const model = await modelFor({ entities: ["account"] });
    const account = model.EntityTypes[0];
    const industry = account.Properties.find((p) => p.Name === "industrycode");
    expect(industry?.TypeScriptType).toMatchObject({ name: "account_industrycode" });
    expect(industry?.Type).toBe("Edm.Int32");
    const multi = account.Properties.find((p) => p.Name === "preferredcontactmethodcode");
    expect(multi?.TypeScriptType.name).toBe("number");
  });

  it("gives every option a unique identifier", async () => {
    const model = await modelFor({ entities: ["account"] });
    const industry = model.EnumTypes.find((e) => e.Name === "account_industrycode");
    expect(industry?.Members).toEqual([
      { Name: "Accounting", Value: 1 },
      { Name: "FinancialServices", Value: 2 },
      { Name: "FinancialServices_3", Value: 3 },
      { Name: "_3rdPartyOther", Value: 4 },
      { Name: "Value5", Value: 5 },
    ]);
  });

  it("reads the primary name attribute from RetrieveMetadataChanges", async () => {
    const model = await modelFor({ entities: ["account"] });
    expect(model.EntityTypes[0].PrimaryNameAttribute).toBe("name");
  });

  it("with no entity filter, generates tables only (no abstract types)", async () => {
    const model = await modelFor({ entities: [] });
    expect(model.EntityTypes.map((e) => e.LogicalName).sort()).toEqual([
      "account",
      "contact",
      "import",
      "opportunityclose",
      "task",
    ]);
    expect(model.AllEntityTypeNames.has("crmbaseentity")).toBe(true);
  });
});

describe("query functions (#342)", () => {
  it("does not generate the Web API's query functions, which run only inside $filter", async () => {
    const model = await modelFor({ entities: ["account"] });
    const names = model.Functions.map((f) => f.Name);
    expect(names).not.toContain("LastXDays");
    expect(names).not.toContain("EqualUserId");
    expect(names).toContain("WhoAmI");
    expect([...model.QueryFunctionNames].sort()).toEqual(["EqualUserId", "LastXDays"]);
    expect(model.Warnings).toEqual([]);
  });

  it("still generates a custom API of the same shape", async () => {
    const model = await modelFor({ entities: ["account"] });
    expect(model.Functions.map((f) => f.Name)).toContain("contoso_IsVip");
  });

  it("warns when the configuration lists a query function", async () => {
    const model = await modelFor({
      entities: ["account"],
      functions: ["WhoAmI", "LastXDays", "EqualUserId"],
    });
    expect(model.Functions.map((f) => f.Name)).toEqual(["WhoAmI"]);
    expect(model.Warnings).toHaveLength(1);
    expect(model.Warnings[0]).toContain("LastXDays, EqualUserId");
    expect(model.Warnings[0]).toContain("queryFunctions");
  });
});

describe("MetadataService.getEntityMetadata (#78)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the RetrieveMetadataChanges function with GET and a Query alias", async () => {
    const fetchMock = vi.fn((_input: string, _init?: RequestInit) =>
      Promise.resolve(new Response(JSON.stringify({ EntityMetadata: [] }), { status: 200 }))
    );
    vi.stubGlobal("fetch", fetchMock);

    const service = new MetadataService(baseConfig, "token");
    await service.getEntityMetadata("account");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(init?.method).toBe("GET");
    expect(init?.body).toBeUndefined();
    const parsed = new URL(url);
    expect(decodeURIComponent(parsed.pathname)).toBe(
      "/api/data/v9.2/RetrieveMetadataChanges(Query=@q)"
    );
    const query = JSON.parse(parsed.searchParams.get("@q") ?? "null");
    expect(query.Criteria.Conditions[0]).toEqual({
      PropertyName: "LogicalName",
      ConditionOperator: "Equals",
      Value: { Value: "account", Type: "System.String" },
    });
    expect(query.Properties.PropertyNames).toContain("PrimaryNameAttribute");
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer token");
  });
});

describe("generated-name helpers (#78)", () => {
  it("toSafeIdentifier avoids reserved words and invalid characters", () => {
    expect(toSafeIdentifier("import")).toBe("_import");
    expect(toSafeIdentifier("package")).toBe("_package");
    expect(toSafeIdentifier("Account")).toBe("Account");
    expect(toSafeIdentifier("type")).toBe("type");
    expect(toSafeIdentifier("1abc")).toBe("_1abc");
    expect(toSafeIdentifier("a-b c")).toBe("a_b_c");
  });

  it("toPropertyKey quotes names that are not identifiers", () => {
    expect(toPropertyKey("name")).toBe("name");
    expect(toPropertyKey("\n  msdyn_x")).toBe('"\\n  msdyn_x"');
  });

  it("toDocText keeps comments closed and on one line", () => {
    expect(toDocText("a */ b\nc")).toBe("a *\\/ b c");
  });

  it("toEnumMemberName", () => {
    expect(toEnumMemberName("Financial Services", 2)).toBe("FinancialServices");
    expect(toEnumMemberName("", 7)).toBe("Value7");
    expect(toEnumMemberName("", -1)).toBe("ValueMinus1");
    expect(toEnumMemberName("Café crème", 1)).toBe("CaféCrème");
  });
});
