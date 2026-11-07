import type { SdkGeneratorConfig } from "./config.js";
import { parseEdmx } from "./parsers/edmx-parser.js";
import { canonicalizeCsdl } from "./parsers/canonical.js";
import { snapshotCsdl } from "./snapshot.js";
import { generateMetadataTypes } from "./generators/metadata-generator.js";
import { generateMessages } from "./generators/messages-generator.js";
import { generateActions } from "./generators/actions-generator.js";
import { generateFunctions } from "./generators/functions-generator.js";
import { generateComplexTypes } from "./generators/complex-types-generator.js";
import { generateEntityTables } from "./generators/references-generator.js";
import {
  SUPPLEMENTAL_METADATA,
  withSupplementalMetadata,
} from "./supplemental/supplemental-metadata.js";
import { type PrebuiltFilter, selectPrebuilt } from "./prebuilt.js";
import { checkQueryFunctions } from "./generators/query-functions-generator.js";
import {
  type CollectionReader,
  operationSolutionsFrom,
  readSolutionData,
  serializeOperationSolutions,
} from "./solutions.js";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { AzureIdentityTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-azure-identity";
import { ClientSecretCredential } from "@azure/identity";

/**
 * What the generator writes: the metadata package's types, the messages, actions and functions
 * packages, and (`references`) the entity tables of entities-runtime's `createEntityReference`.
 */
export type GenerationTarget = "metadata" | "references" | "messages" | "actions" | "functions";

/** Every target, in the order `generate` with no target list runs them. */
export const ALL_TARGETS: readonly GenerationTarget[] = [
  "metadata",
  "references",
  "messages",
  "actions",
  "functions",
];

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
  /**
   * With the fetched `$metadata`, also write which solutions each operation comes from to this
   * path (#304: `metadata/operation-solutions.json`). Read-only queries; needs the org.
   */
  saveSolutions?: string;
  /**
   * Generate only the prebuilt operations (#304) into the actions, functions and messages
   * packages, and only the types they reach. `regen` passes the committed filter.
   */
  prebuilt?: Omit<PrebuiltFilter, "platform">;
}

/**
 * Generate all SDK types.
 *
 * @param config - Generator configuration
 * @param dryRun - If true, preview without writing files
 */
export async function generateAll(config: SdkGeneratorConfig, dryRun = false): Promise<void> {
  await generateTargets(config, [...ALL_TARGETS], { dryRun });
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
  let client: DataverseClient | undefined;
  if (options.saveSolutions && options.fromCsdl) {
    throw new Error("generateTargets: saveSolutions reads the org; it can't be used with fromCsdl");
  }
  if (options.fromCsdl) {
    metadata = snapshotCsdl(await fs.readFile(options.fromCsdl, "utf-8"));
    console.log(`📄 Read CSDL from ${path.basename(options.fromCsdl)}\n`);
  } else {
    if (!config.dataverseUrl || !config.authentication) {
      throw new Error("generateTargets: the Dataverse URL and credentials are required");
    }
    console.log("📥 Fetching $metadata from Dataverse...");
    // Rewritten as it's committed (#293): sorted, one element per line, no org-specific tables
    client = createClient(config as SdkGeneratorConfig);
    metadata = snapshotCsdl(await fetchMetadata(client));
    console.log("✅ $metadata fetched successfully\n");
  }

  if (options.saveCsdl) {
    await fs.mkdir(path.dirname(path.resolve(options.saveCsdl)), { recursive: true });
    await fs.writeFile(options.saveCsdl, metadata, "utf-8");
    console.log(`💾 Saved CSDL to ${options.saveCsdl}\n`);
  }

  if (options.saveSolutions && client) {
    // The operations as the snapshot has them (org-specific ones are already left out)
    const csdl = parseEdmx(metadata);
    const names = [...csdl.actions, ...csdl.functions].map((op) => op.name);
    console.log(`🧩 Reading the solutions of ${String(new Set(names).size)} operations...`);
    const data = await readSolutionData(collectionReader(client));
    const map = operationSolutionsFrom(data, names);
    await fs.mkdir(path.dirname(path.resolve(options.saveSolutions)), { recursive: true });
    // Formatted as the repository's prettier config wants it (format:check covers the file)
    const prettier = await import("prettier");
    const formatted = await prettier.format(serializeOperationSolutions(map), {
      ...(await prettier.resolveConfig(path.resolve(options.saveSolutions))),
      filepath: options.saveSolutions,
    });
    await fs.writeFile(options.saveSolutions, formatted, "utf-8");
    console.log(`💾 Saved operation solutions to ${options.saveSolutions}\n`);
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
  options: Pick<GenerateOptions, "dryRun" | "purge" | "prebuilt"> = {}
): Promise<void> {
  const { dryRun = false, purge = false, prebuilt } = options;
  // 3. Parse CSDL
  console.log("🔍 Parsing CSDL...");
  const csdl = canonicalizeCsdl(parseEdmx(metadata));
  console.log(`✅ Parsed ${String(csdl.entityTypes.length)} entity types`);
  console.log(`✅ Parsed ${String(csdl.complexTypes.length)} complex types`);
  console.log(`✅ Parsed ${String(csdl.enumTypes.length)} enum types`);
  console.log(`✅ Parsed ${String(csdl.actions.length)} actions`);
  console.log(`✅ Parsed ${String(csdl.functions.length)} functions\n`);
  // Operations Dataverse runs but leaves out of $metadata, such as ExportToExcel (#75)
  let operations = withSupplementalMetadata(csdl);
  if (prebuilt) {
    // The query functions (filter helpers, not classes) are exactly the operations with no SDK
    // message (#342)
    checkQueryFunctions(csdl.functions, prebuilt.operationSolutions);
    // Platform + Sales + Customer Service only (#304); the supplemental operations are platform
    const supplemental = parseEdmx(SUPPLEMENTAL_METADATA);
    const platform = [...supplemental.actions, ...supplemental.functions].map((op) => op.name);
    const selection = selectPrebuilt(operations, { ...prebuilt, platform });
    operations = selection.csdl;
    console.log(
      `✅ Prebuilt: ${String(selection.included.length)} operations, ` +
        `${String(selection.excluded.length)} left to dataverse-gen\n`
    );
  }

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
        await generateMetadataTypes(csdl, targetConfig.outputPath, dryRun, purge);
        break;

      case "references":
        // The entity sets and primary keys createEntityReference reads (#295)
        await generateEntityTables(csdl, targetConfig.outputPath, dryRun);
        break;

      case "messages":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge);
        await generateMessages(operations, targetConfig.outputPath, dryRun, purge);
        break;

      case "actions":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge);
        await generateActions(operations, targetConfig.outputPath, dryRun, purge);
        break;

      case "functions":
        // Generate complex types first
        await generateComplexTypes(operations, `${targetConfig.outputPath}/types`, purge);
        await generateFunctions(operations, targetConfig.outputPath, dryRun, purge);
        break;
    }

    console.log(`✅ Generated ${target}\n`);
  }
}

/** A client for the configured environment, signed in with client credentials. */
function createClient(config: SdkGeneratorConfig): DataverseClient {
  // Normalize Dataverse URL (remove trailing slash)
  const dataverseUrl = config.dataverseUrl.replace(/\/$/, "");
  const credential = new ClientSecretCredential(
    config.authentication.tenantId,
    config.authentication.clientId,
    config.authentication.clientSecret
  );
  const scope = `${dataverseUrl}/.default`;
  // The scope contains the environment URL, which isn't printed (public CI logs, #90)
  console.log("🔑 Requesting a token for the Dataverse environment");
  const tokenProvider = new AzureIdentityTokenProvider(credential, { scopes: [scope] });
  return new DataverseClient({ baseUrl: dataverseUrl, tokenProvider, scopes: [scope] });
}

/** GET a Web API collection, every page. The errors don't include the URL. */
function collectionReader(client: DataverseClient): CollectionReader {
  return async (path) => {
    const rows: Array<Record<string, unknown>> = [];
    let url: string | undefined = `${client.getBaseUrl()}/${path}`;
    while (url) {
      const response = await client.send({
        method: "GET",
        url,
        headers: { Accept: "application/json", Prefer: "odata.maxpagesize=5000" },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to read ${path.split("?")[0]} (HTTP ${String(response.status)}): ${await response.text()}`
        );
      }
      const page = (await response.json()) as {
        value: Array<Record<string, unknown>>;
        "@odata.nextLink"?: string;
      };
      rows.push(...page.value);
      url = page["@odata.nextLink"];
    }
    return rows;
  };
}

/**
 * Fetch $metadata from Dataverse.
 *
 * @param source - Generator configuration, or a client for the environment
 * @returns Raw $metadata XML
 */
export async function fetchMetadata(source: SdkGeneratorConfig | DataverseClient): Promise<string> {
  const client = source instanceof DataverseClient ? source : createClient(source);
  // $metadata returns XML, not JSON, so it's a direct request
  const metadataUrl = `${client.getBaseUrl()}/$metadata`;
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

  return response.text();
}

export { canonicalizeCsdl } from "./parsers/canonical.js";
export { ORG_SPECIFIC_PREFIXES, snapshotCsdl } from "./snapshot.js";
export * from "./prebuilt.js";
export {
  checkQueryFunctions,
  isQueryFunction,
  queryFunctionKey,
  queryFunctionsSource,
} from "./generators/query-functions-generator.js";
export * from "./solutions.js";
export {
  SUPPLEMENTAL_METADATA,
  withSupplementalMetadata,
} from "./supplemental/supplemental-metadata.js";
