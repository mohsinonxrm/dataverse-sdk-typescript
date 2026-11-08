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
  EntityKeyType,
} from "./types.js";
export type { RetrieveMetadataChangesResponse } from "./metadata-service.js";

export { DEFAULT_CONFIG } from "./types.js";
export type { DataverseGenAuthConfig } from "./types.js";
export { acquireCliToken, createCliTokenProvider, dataverseScope } from "./auth.js";
export type { CliAuthOptions } from "./auth.js";

import type { DataverseGenConfig } from "./types.js";
import { acquireCliToken } from "./auth.js";

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
 *
 * Without an access token, a token is acquired from `config.auth` (device code or client
 * credentials), as the CLI does. The result's `warnings` say what in the configuration was not
 * generated, such as a listed query function.
 */
export async function generateCode(
  config: DataverseGenConfig,
  accessToken?: string
): Promise<{ warnings: string[] }> {
  const { SchemaModel } = await import("./schema-model.js");
  const { TypescriptGenerator } = await import("./typescript-generator.js");
  const { MetadataService } = await import("./metadata-service.js");

  const token = accessToken ?? (config.auth ? await acquireCliToken(config, undefined) : undefined);
  const metadataService = new MetadataService(config, token);
  const model = new SchemaModel(metadataService, config);

  await model.generate();

  const generator = new TypescriptGenerator(model, config);
  await generator.generate();
  return { warnings: model.Warnings };
}
