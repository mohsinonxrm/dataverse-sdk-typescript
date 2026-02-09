// Public exports for this package
/**
 * @mohsinonxrm/dataverse-sdk-generator
 *
 * Code generator for Dataverse entities, actions, and functions.
 * Generates strongly-typed TypeScript code from $metadata.
 *
 * @module
 */

export { SchemaModel } from "./schema-model.js";
export { TypescriptGenerator } from "./typescript-generator.js";
export { MetadataService } from "./metadata-service.js";

export type {
  DataverseGenConfig,
  EntityType,
  EnumType,
  ActionType,
  FunctionType,
  ComplexType,
  PropertyType,
  NavigationPropertyType,
  ParameterType,
  TypeScriptType,
  EnumMember,
} from "./types.js";

export { DEFAULT_CONFIG } from "./types.js";

import type { DataverseGenConfig } from "./types.js";

/**
 * Generate TypeScript code from Dataverse metadata
 *
 * @example
 * ```typescript
 * import { generateCode } from '@mohsinonxrm/dataverse-sdk-generator';
 *
 * const config = {
 *   environmentUrl: 'https://org.crm.dynamics.com',
 *   entities: ['account', 'contact'],
 *   output: { outputRoot: './src/generated' }
 * };
 *
 * await generateCode(config, accessToken);
 * ```
 */
export async function generateCode(
  config: DataverseGenConfig,
  accessToken?: string
): Promise<void> {
  const { SchemaModel } = await import("./schema-model.js");
  const { TypescriptGenerator } = await import("./typescript-generator.js");
  const { MetadataService } = await import("./metadata-service.js");

  const metadataService = new MetadataService(config, accessToken);
  const model = new SchemaModel(metadataService, config);

  await model.generate();

  const generator = new TypescriptGenerator(model, config);
  await generator.generate();
}
