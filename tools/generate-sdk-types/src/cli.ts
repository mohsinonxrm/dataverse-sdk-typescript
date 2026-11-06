#!/usr/bin/env node

import { Command } from "commander";
import { config as loadDotenv } from "dotenv";
import { ALL_TARGETS, generateTargets, type GenerationTarget } from "./index.js";
import { loadConfig, type SdkGeneratorConfig } from "./config.js";
import _path from "path";

// Load .env file
loadDotenv();

const program = new Command();

program
  .name("generate-sdk-types")
  .description("Generate TypeScript types for Dataverse SDK from $metadata")
  .version("1.0.0")
  .argument("[targets...]", `Specific targets to generate (${ALL_TARGETS.join(", ")})`)
  .option("-c, --config <path>", "Path to config file", "sdk-gen.config.json")
  .option("--url <url>", "Dataverse URL (overrides config/env)")
  .option("--dry-run", "Preview what would be generated without writing files", false)
  .option(
    "--save-csdl [path]",
    "Also save the fetched CSDL/EDMX XML (default path: dataverse-metadata.xml)"
  )
  .option(
    "--from-csdl <path>",
    "Generate from a saved CSDL/EDMX file instead of the live $metadata (no network, no credentials)"
  )
  .option(
    "--save-solutions <path>",
    "Also save which solutions each operation comes from (read-only queries; not with --from-csdl)"
  )
  .option("--csdl-only", "Only fetch and save the CSDL (with --save-csdl); generate nothing", false)
  .option("--purge", "Delete existing output files before generating", false)
  .action(async (targets: string[], options) => {
    try {
      console.log("🔧 SDK Type Generator\n");

      // Load configuration
      let config: SdkGeneratorConfig;
      try {
        config = await loadConfig(options.config);
      } catch (_error) {
        // If config file doesn't exist, use environment variables
        const dataverseUrl = options.url ?? process.env.DATAVERSE_URL;
        if (!dataverseUrl && !options.fromCsdl) {
          throw new Error(
            "DATAVERSE_URL not configured. Either:\n" +
              "  1. Create .env file with DATAVERSE_URL\n" +
              "  2. Use --url flag\n" +
              "  3. Create sdk-gen.config.json"
          );
        }

        // AZURE_* first, then the DATAVERSE_* names the integration tests use
        config = {
          dataverseUrl: dataverseUrl ?? "",
          authentication: {
            clientId: process.env.AZURE_CLIENT_ID ?? process.env.DATAVERSE_CLIENT_ID ?? "",
            tenantId: process.env.AZURE_TENANT_ID ?? process.env.DATAVERSE_TENANT_ID ?? "",
            clientSecret:
              process.env.AZURE_CLIENT_SECRET ?? process.env.DATAVERSE_CLIENT_SECRET ?? "",
          },
          targets: {
            metadata: {
              enabled: true,
              outputPath:
                process.env.METADATA_OUTPUT_PATH ??
                "../../packages/dataverse-sdk-metadata/src/types",
            },
            references: {
              enabled: true,
              outputPath:
                process.env.REFERENCES_OUTPUT_PATH ??
                "../../packages/dataverse-sdk-entities-runtime/src/generated",
            },
            messages: {
              enabled: true,
              outputPath:
                process.env.MESSAGES_OUTPUT_PATH ?? "../../packages/dataverse-sdk-messages/src",
            },
            actions: {
              enabled: true,
              outputPath:
                process.env.ACTIONS_OUTPUT_PATH ?? "../../packages/dataverse-sdk-actions/src",
            },
            functions: {
              enabled: true,
              outputPath:
                process.env.FUNCTIONS_OUTPUT_PATH ?? "../../packages/dataverse-sdk-functions/src",
            },
          },
        };
      }

      // Override URL if provided
      if (options.url) {
        config.dataverseUrl = options.url;
      }

      // Validate authentication (not needed to generate from a saved CSDL file)
      if (
        !options.fromCsdl &&
        (!config.authentication.clientId ||
          !config.authentication.tenantId ||
          !config.authentication.clientSecret)
      ) {
        throw new Error(
          "Azure AD credentials not configured. Set in .env:\n" +
            "  AZURE_CLIENT_ID\n" +
            "  AZURE_TENANT_ID\n" +
            "  AZURE_CLIENT_SECRET"
        );
      }

      // The environment URL and client id are not printed: this also runs in public CI logs (#90)
      if (options.fromCsdl) console.log("📄 Generating from a saved CSDL file (no network)\n");
      else console.log("🔐 Dataverse environment and credentials configured\n");

      if (options.dryRun) {
        console.log("⚠️  DRY RUN MODE - No files will be written\n");
      }

      // `--save-csdl` alone keeps the old default file name
      const saveCsdl: string | undefined =
        options.saveCsdl === true
          ? "dataverse-metadata.xml"
          : typeof options.saveCsdl === "string"
            ? options.saveCsdl
            : undefined;
      if (saveCsdl) {
        console.log(`💾 Will save CSDL/EDMX to ${saveCsdl}\n`);
      }

      if (options.purge) {
        console.log("🗑️  Will purge existing output files\n");
      }

      // Determine what to generate
      if (options.csdlOnly) {
        if (!saveCsdl) throw new Error("--csdl-only needs --save-csdl <path>");
        await generateTargets(config, [], {
          saveCsdl,
          saveSolutions: options.saveSolutions,
          fromCsdl: options.fromCsdl,
        });
      } else if (targets.length > 0) {
        const validTargets: GenerationTarget[] = [];
        for (const target of targets) {
          if (!(ALL_TARGETS as readonly string[]).includes(target)) {
            console.error(`❌ Invalid target: ${target}`);
            console.error(`   Valid targets: ${ALL_TARGETS.join(", ")}`);
            process.exit(1);
          }
          validTargets.push(target as GenerationTarget);
        }

        console.log(`🎯 Generating: ${validTargets.join(", ")}\n`);
        await generateTargets(config, validTargets, {
          dryRun: options.dryRun,
          saveCsdl,
          saveSolutions: options.saveSolutions,
          purge: options.purge,
          fromCsdl: options.fromCsdl,
        });
      } else {
        console.log("🎯 Generating: all targets\n");
        await generateTargets(config, [...ALL_TARGETS], {
          dryRun: options.dryRun,
          saveCsdl,
          saveSolutions: options.saveSolutions,
          purge: options.purge,
          fromCsdl: options.fromCsdl,
        });
      }

      console.log("\n✅ Generation complete!");
    } catch (error) {
      console.error("\n❌ Generation failed:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
