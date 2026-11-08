/**
 * The schema model must not depend on the order in which RetrieveMetadataChanges lists a table's
 * attributes, keys or lookup targets: Dataverse doesn't guarantee one, and incremental generation
 * (#347) hashes the model, so a different order made every table look changed in a live run.
 */
import { describe, expect, it } from "vitest";
import type { MetadataService, RetrieveMetadataChangesResponse } from "../src/metadata-service.js";
import { SchemaModel } from "../src/schema-model.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const config: DataverseGenConfig = {
  environmentUrl: "https://contoso.crm.dynamics.com",
  entities: ["account", "contact", "incident"],
};

/** The fixture's metadata, with every list the server may order freely reversed. */
function reversedService(): MetadataService {
  const base = createFixtureMetadataService();
  const reverse = (response: RetrieveMetadataChangesResponse): RetrieveMetadataChangesResponse => {
    const copy = structuredClone(response);
    for (const entity of copy.EntityMetadata ?? []) {
      entity.Attributes?.reverse();
      for (const attribute of entity.Attributes ?? []) attribute.Targets?.reverse();
      entity.Keys?.reverse();
    }
    return copy;
  };
  const service: Pick<MetadataService, "getEdmxMetadata" | "getEntityMetadata"> = {
    getEdmxMetadata: () => base.getEdmxMetadata(),
    getEntityMetadata: async (logicalName: string) =>
      reverse(await base.getEntityMetadata(logicalName)),
  };
  return service as MetadataService;
}

async function modelJson(service: MetadataService): Promise<string> {
  const model = new SchemaModel(service, config);
  await model.generate();
  return JSON.stringify({ entities: model.EntityTypes, enums: model.EnumTypes });
}

describe("schema model and metadata order", () => {
  it("is the same whatever order the server lists attributes, keys and targets in", async () => {
    expect(await modelJson(reversedService())).toBe(
      await modelJson(createFixtureMetadataService())
    );
  });
});
