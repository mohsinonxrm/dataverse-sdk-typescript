import type { SdkGeneratorConfig } from "./config.js";
import { parseEdmx } from "./parsers/edmx-parser.js";
import { canonicalizeCsdl } from "./parsers/canonical.js";
import { snapshotCsdl } from "./snapshot.js";
import { generateMetadataTypes } from "./generators/metadata-generator.js";
import { generateMessages } from "./generators/messages-generator.js";
import { generateActions } from "./generators/actions-generator.js";
import { generateFunctions } from "./generators/functions-generator.js";
import { generateComplexTypes } from "./generators/complex-types-generator.js";
import { withSupplementalMetadata } from "./supplemental/supplemental-metadata.js";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { ClientSecretCredential } from "@azure/identity";

export type GenerationTarget = "metadata" | "messages" | "actions" | "functions";

/** Options for {@link generateTargets} and {@link generateFromCsdl}. */
export interface GenerateOptions {
  /** Preview without writing the operation files. */
  dryRun?: boolean;
  /** Delete the existing output before generating, so removed operations disappear. */
  purge?: boolean;
  /** Also write the fetched `$metadata` to this path (#293: the committed snapshot). */
  saveCsdl?: string;
  /**
   * Read the CSDL from this file instead of fetching it (#293). No network and no credentials:
   * this is how the committed packages are regenerated from `metadata/dataverse-metadata.xml`.
   */
  fromCsdl?: string;
}

/**
 * Generate all SDK types.
 *
 * @param config - Generator configuration
 * @param dryRun - If true, preview without writing files
 */
export async function generateAll(config: SdkGeneratorConfig, dryRun = false): Promise<void> {
  await generateTargets(config, ["metadata", "messages", "actions", "functions"], { dryRun });
}

/**
 * Generate specific SDK types, from the live `$metadata` or from a saved CSDL file.
 *
 * @param config - Generator configuration (the URL and credentials are unused with `fromCsdl`)
 * @param targets - Which types to generate
 * @param options - Dry run, purge, and where the CSDL comes from or goes to
 */
export async function generateTargets(
  config: Pick<SdkGeneratorConfig, "targets"> & Partial<SdkGeneratorConfig>,
  targets: GenerationTarget[],
  options: GenerateOptions = {}
): Promise<void> {
  const fs = await import("fs/promises");
  const path = await import("path");
  let metadata: string;
  if (options.fromCsdl) {
    metadata = snapshotCsdl(await fs.readFile(options.fromCsdl, "utf-8"));
    console.log(`📄 Read CSDL from ${path.basename(options.fromCsdl)}\n`);
  } else {
    if (!config.dataverseUrl || !config.authentication) {
      throw new Error("generateTargets: the Dataverse URL and credentials are required");
    }
    console.log("📥 Fetching $metadata from Dataverse...");
    // Rewritten as it's committed (#293): sorted, one element per line, no org-specific tables
    metadata = snapshotCsdl(await fetchMetadata(config as SdkGeneratorConfig));
    console.log("✅ $metadata fetched successfully\n");
  }

  if (options.saveCsdl) {
    await fs.mkdir(path.dirname(path.resolve(options.saveCsdl)), { recursive: true });
    await fs.writeFile(options.saveCsdl, metadata, "utf-8");
    console.log(`💾 Saved CSDL to ${options.saveCsdl}\n`);
  }

  if (targets.length > 0) await generateFromCsdl(metadata, config.targets, targets, options);
}

/**
 * Generate specific SDK types from CSDL text. The output depends only on `metadata`: the parsed
 * schema is put in a canonical order first (#293), so two fetches that list the same types in a
 * different order generate the same files.
 */
export async function generateFromCsdl(
  metadata: string,
  targetConfigs: SdkGeneratorConfig["targets"],
  targets: GenerationTarget[],
  options: Pick<GenerateOptions, "dryRun" | "purge"> = {}
): Promise<void> {
  const { dryRun = false, purge = false } = options;
  // 3. Parse CSDL
  console.log("🔍 Parsing CSDL...");
  const csdl = canonicalizeCsdl(parseEdmx(metadata));
  console.log(`✅ Parsed ${String(csdl.entityTypes.length)} entity types`);
  console.log(`✅ Parsed ${String(csdl.complexTypes.length)} complex types`);
  console.log(`✅ Parsed ${String(csdl.enumTypes.length)} enum types`);
  console.log(`✅ Parsed ${String(csdl.actions.length)} actions`);
  console.log(`✅ Parsed ${String(csdl.functions.length)} functions\n`);
  // Operations Dataverse runs but leaves out of $metadata, such as ExportToExcel (#75)
  const operations = withSupplementalMetadata(csdl);

  // 4. Generate each target
  for (const target of targets) {
    const targetConfig = targetConfigs[target];
    if (!targetConfig?.enabled) {
      console.log(`⏭️  Skipping ${target} (disabled)\n`);
      continue;
    }

    console.log(`📝 Generating ${target}...`);

    switch (target) {
      case "metadata":
        await generateMetadataTypes(csdl, targetConfig.outputPath, dryRun);
        break;

      case "messages":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge, target);
        await generateMessages(operations, targetConfig.outputPath, dryRun, purge);
        break;

      case "actions":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge, target);
        await generateActions(operations, targetConfig.outputPath, dryRun, purge);
        break;

      case "functions":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge, target);
        await generateFunctions(operations, targetConfig.outputPath, dryRun, purge);
        break;
    }

    console.log(`✅ Generated ${target}\n`);
  }
}

/**
 * Fetch $metadata from Dataverse.
 *
 * @param config - Generator configuration
 * @returns Raw $metadata XML
 */
export async function fetchMetadata(config: SdkGeneratorConfig): Promise<string> {
  // Normalize Dataverse URL (remove trailing slash)
  const dataverseUrl = config.dataverseUrl.replace(/\/$/, "");

  // Create credential
  const credential = new ClientSecretCredential(
    config.authentication.tenantId,
    config.authentication.clientId,
    config.authentication.clientSecret
  );

  // Create scope for Dataverse
  const scope = `${dataverseUrl}/.default`;
  // The scope contains the environment URL, which isn't printed (public CI logs, #90)
  console.log("🔑 Requesting a token for the Dataverse environment");

  // Create token provider
  const tokenProvider = new AzureIdentityTokenProvider(credential, {
    scopes: [scope],
  });

  // Create client
  const client = new DataverseClient({
    baseUrl: dataverseUrl,
    tokenProvider,
    scopes: [scope], // Explicitly pass scopes to client
  });

  // Fetch $metadata (returns XML, not JSON)
  // We need to make a direct request since $metadata returns XML
  const baseUrl = client.getBaseUrl();
  const metadataUrl = `${baseUrl}/$metadata`;

  const response = await client.send({
    method: "GET",
    url: metadataUrl,
    headers: {
      Accept: "application/xml",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch $metadata (HTTP ${String(response.status)}): ${errorText}`);
  }

  const text = await response.text();
  return text;
}

export { canonicalizeCsdl } from "./parsers/canonical.js";
export { ORG_SPECIFIC_PREFIXES, snapshotCsdl } from "./snapshot.js";
export {
  SUPPLEMENTAL_METADATA,
  withSupplementalMetadata,
} from "./supplemental/supplemental-metadata.js";
