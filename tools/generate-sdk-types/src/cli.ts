#!/usr/bin/env node

import { Command } from "commander";
import { config as loadDotenv } from "dotenv";
import { generateAll, generateTargets, type GenerationTarget } from "./index.js";
import { loadConfig, type SdkGeneratorConfig } from "./config.js";
import _path from "path";

// Load .env file
loadDotenv();

const program = new Command();

program
  .name("generate-sdk-types")
  .description("Generate TypeScript types for Dataverse SDK from $metadata")
  .version("1.0.0")
  .argument("[targets...]", "Specific targets to generate (metadata, messages, actions, functions)")
  .option("-c, --config <path>", "Path to config file", "sdk-gen.config.json")
  .option("--url <url>", "Dataverse URL (overrides config/env)")
  .option("--dry-run", "Preview what would be generated without writing files", false)
  .option("--save-csdl", "Save the CSDL/EDMX XML to dataverse-metadata.xml", false)
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
        if (!dataverseUrl) {
          throw new Error(
            "DATAVERSE_URL not configured. Either:\n" +
              "  1. Create .env file with DATAVERSE_URL\n" +
              "  2. Use --url flag\n" +
              "  3. Create sdk-gen.config.json"
          );
        }

        config = {
          dataverseUrl,
          authentication: {
            clientId: process.env.AZURE_CLIENT_ID ?? "",
            tenantId: process.env.AZURE_TENANT_ID ?? "",
            clientSecret: process.env.AZURE_CLIENT_SECRET ?? "",
          },
          targets: {
            metadata: {
              enabled: true,
              outputPath:
                process.env.METADATA_OUTPUT_PATH ??
                "../../packages/dataverse-sdk-metadata/src/types",
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

      // Validate authentication
      if (
        !config.authentication.clientId ||
        !config.authentication.tenantId ||
        !config.authentication.clientSecret
      ) {
        throw new Error(
          "Azure AD credentials not configured. Set in .env:\n" +
            "  AZURE_CLIENT_ID\n" +
            "  AZURE_TENANT_ID\n" +
            "  AZURE_CLIENT_SECRET"
        );
      }

      console.log(`📍 Dataverse URL: ${config.dataverseUrl}`);
      console.log(`🔐 Client ID: ${config.authentication.clientId}\n`);

      if (options.dryRun) {
        console.log("⚠️  DRY RUN MODE - No files will be written\n");
      }

      if (options.saveCsdl) {
        console.log("💾 Will save CSDL/EDMX to dataverse-metadata.xml\n");
      }

      if (options.purge) {
        console.log("🗑️  Will purge existing output files\n");
      }

      // Determine what to generate
      if (targets.length > 0) {
        const validTargets: GenerationTarget[] = [];
        for (const target of targets) {
          if (!["metadata", "messages", "actions", "functions"].includes(target)) {
            console.error(`❌ Invalid target: ${target}`);
            console.error("   Valid targets: metadata, messages, actions, functions");
            process.exit(1);
          }
          validTargets.push(target as GenerationTarget);
        }

        console.log(`🎯 Generating: ${validTargets.join(", ")}\n`);
        await generateTargets(
          config,
          validTargets,
          options.dryRun,
          options.saveCsdl,
          options.purge
        );
      } else {
        console.log("🎯 Generating: all targets\n");
        await generateAll(config, options.dryRun);
      }

      console.log("\n✅ Generation complete!");
    } catch (error) {
      console.error("\n❌ Generation failed:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
