import type { SdkGeneratorConfig } from "./config.js";
import { parseEdmx } from "./parsers/edmx-parser.js";
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

/**
 * Generate all SDK types.
 *
 * @param config - Generator configuration
 * @param dryRun - If true, preview without writing files
 */
export async function generateAll(config: SdkGeneratorConfig, dryRun = false): Promise<void> {
  await generateTargets(config, ["metadata", "messages", "actions", "functions"], dryRun);
}

/**
 * Generate specific SDK types.
 *
 * @param config - Generator configuration
 * @param targets - Which types to generate
 * @param dryRun - If true, preview without writing files
 * @param saveCsdl - If true, save the CSDL XML to a file
 * @param purge - If true, delete existing output before generating
 */
export async function generateTargets(
  config: SdkGeneratorConfig,
  targets: GenerationTarget[],
  dryRun = false,
  saveCsdl = false,
  purge = false
): Promise<void> {
  // 1. Fetch $metadata
  console.log("📥 Fetching $metadata from Dataverse...");
  const metadata = await fetchMetadata(config);
  console.log("✅ $metadata fetched successfully\n");

  // 2. Save CSDL if requested
  if (saveCsdl) {
    const fs = await import("fs/promises");
    const path = await import("path");
    const csdlPath = path.join(process.cwd(), "dataverse-metadata.xml");
    await fs.writeFile(csdlPath, metadata, "utf-8");
    console.log(`💾 Saved CSDL to ${csdlPath}\n`);
  }

  // 3. Parse CSDL
  console.log("🔍 Parsing CSDL...");
  const csdl = parseEdmx(metadata);
  console.log(`✅ Parsed ${String(csdl.entityTypes.length)} entity types`);
  console.log(`✅ Parsed ${String(csdl.complexTypes.length)} complex types`);
  console.log(`✅ Parsed ${String(csdl.enumTypes.length)} enum types`);
  console.log(`✅ Parsed ${String(csdl.actions.length)} actions`);
  console.log(`✅ Parsed ${String(csdl.functions.length)} functions\n`);
  // Operations Dataverse runs but leaves out of $metadata, such as ExportToExcel (#75)
  const operations = withSupplementalMetadata(csdl);

  // 4. Generate each target
  for (const target of targets) {
    const targetConfig = config.targets[target];
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
async function fetchMetadata(config: SdkGeneratorConfig): Promise<string> {
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

export {
  SUPPLEMENTAL_METADATA,
  withSupplementalMetadata,
} from "./supplemental/supplemental-metadata.js";
