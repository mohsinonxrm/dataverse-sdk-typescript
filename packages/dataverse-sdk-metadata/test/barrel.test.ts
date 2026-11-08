/**
 * #385: the package re-exported every Microsoft.Dynamics.CRM complex type and enum, about 1,500
 * unrelated message responses (`AIClassifyResponse`, `Mcp*`, `WhoAmIResponse`, …). It exports the
 * metadata types: the definitions, their create and update payloads, and the parameters and
 * responses of the metadata operations `MetadataClient` calls.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const index = readFileSync(new URL("../src/types/index.ts", import.meta.url), "utf8");
const modules = [...index.matchAll(/from ['"]\.\/([\w-]+)\.js['"]/g)].map(([, name]) => name);

describe("the package exports only metadata types (#385)", () => {
  it("has the metadata definitions, payloads and MetadataClient's operation types", () => {
    expect(modules).toEqual(
      expect.arrayContaining([
        "EntityMetadata",
        "StringAttributeMetadata",
        "EntityMetadataCreate",
        "AttributeMetadataCreateTypes",
        "OneToManyRelationshipMetadataCreate",
        "RetrieveMetadataChangesResponse",
        "EntityQueryExpression",
        "InsertOptionValueResponse",
        "OwnershipTypes",
        "DeletedMetadataFilters",
        "Label",
      ])
    );
  });

  it("doesn't re-export other operations' responses and enums", () => {
    for (const name of [
      "AIClassifyResponse",
      "WhoAmIResponse",
      "AccessRights",
      "QueryExpression",
    ]) {
      expect(modules, name).not.toContain(name);
    }
    expect(modules.filter((m) => m.startsWith("Mcp"))).toEqual([]);
    expect(modules.length).toBeLessThan(200);
  });
});
