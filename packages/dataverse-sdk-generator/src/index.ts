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
export { MetadataService, type MetadataServiceSleep } from "./metadata-service.js";

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
  FormLayoutKind,
  FormLayoutType,
  FormTabType,
  FormSectionType,
  FormControlKind,
  FormControlType,
} from "./types.js";
export type {
  RetrieveMetadataChangesResponse,
  EntityMetadataDetail,
  AttributeRequiredLevel,
  AttributeMetadataDetail,
  Label,
  LocalizedLabel,
  OptionSetMetadata,
  OptionMetadata,
  EntityKeyMetadata,
  RelationshipMetadata,
  SystemFormRecord,
} from "./metadata-service.js";

export { DEFAULT_CONFIG } from "./types.js";
export { ejectTemplates, TEMPLATE_NAMES } from "./templates.js";
export type { EjectTemplatesOptions, TemplateName } from "./templates.js";
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
 * generated, such as a listed query function. With `output.incremental`, `unchangedTables` lists
 * the tables whose files were kept as they were. `fetchedTables` lists the tables whose metadata
 * was read from Dataverse: with `output.incremental`, only the ones that changed since the last
 * run (#429).
 */
export async function generateCode(
  config: DataverseGenConfig,
  accessToken?: string
): Promise<{ warnings: string[]; unchangedTables: string[]; fetchedTables: string[] }> {
  const { SchemaModel } = await import("./schema-model.js");
  const { TypescriptGenerator } = await import("./typescript-generator.js");
  const { MetadataService } = await import("./metadata-service.js");

  const token = accessToken ?? (config.auth ? await acquireCliToken(config, undefined) : undefined);
  const metadataService = new MetadataService(config, token);
  const model = new SchemaModel(metadataService, config);

  await model.generate();

  const generator = new TypescriptGenerator(model, config);
  await generator.generate();
  return {
    warnings: model.Warnings,
    unchangedTables: generator.unchangedTables,
    fetchedTables: model.FetchedTables,
  };
}
