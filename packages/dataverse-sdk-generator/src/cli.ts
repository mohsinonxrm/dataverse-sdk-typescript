#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { generateCode } from "./index.js";
import type { DataverseGenConfig } from "./types.js";
import { DEFAULT_CONFIG } from "./types.js";

const program = new Command();

program
  .name("dataverse-gen")
  .description("Generate TypeScript code from Dataverse metadata")
  .version("1.0.0");

/**
 * Initialize configuration file
 */
program
  .command("init")
  .description("Initialize .dataverse-gen.json configuration file")
  .action(async () => {
    const configPath = path.join(process.cwd(), ".dataverse-gen.json");

    try {
      await fs.access(configPath);
      console.log(chalk.yellow("⚠ Configuration file already exists"));
      return;
    } catch {
      // File doesn't exist, create it
    }

    const defaultConfig: Partial<DataverseGenConfig> = {
      environmentUrl: "https://yourorg.crm.dynamics.com",
      apiVersion: DEFAULT_CONFIG.apiVersion,
      entities: ["account", "contact"],
      actions: [],
      functions: [],
      output: DEFAULT_CONFIG.output,
      auth: {
        tenantId: "your-tenant-id",
        clientId: "your-client-id",
        flow: "deviceCode",
      },
    };

    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");

    console.log(chalk.green("✓ Created .dataverse-gen.json"));
    console.log(chalk.dim("\nEdit .dataverse-gen.json with your configuration, then run:"));
    console.log(chalk.cyan("  dataverse-gen generate\n"));
  });

/**
 * Generate code from configuration
 */
program
  .command("generate")
  .description("Generate TypeScript code from $metadata")
  .option("-c, --config <path>", "Path to configuration file", ".dataverse-gen.json")
  .option("--token <token>", "Access token (if not using auth flow)")
  .action(async (options) => {
    const spinner = ora("Loading configuration...").start();

    try {
      // Load configuration
      const configPath = path.resolve(process.cwd(), options.config);
      const configContent = await fs.readFile(configPath, "utf-8");
      const config: DataverseGenConfig = JSON.parse(configContent);

      spinner.text = "Validating configuration...";

      // Validate required fields
      if (!config.environmentUrl) {
        spinner.fail("Missing environmentUrl in configuration");
        process.exit(1);
      }

      // Get access token
      const accessToken = options.token;

      if (!accessToken && config.auth) {
        spinner.text = "Authenticating...";
        // TODO: Implement MSAL authentication flows
        spinner.warn("Authentication not implemented yet. Please provide --token manually.");
        process.exit(1);
      }

      // Generate code
      spinner.text = "Fetching $metadata...";
      await generateCode(config, accessToken);

      spinner.succeed(chalk.green("✓ Code generation complete!"));

      console.log(chalk.dim("\nGenerated files:"));
      console.log(chalk.cyan(`  ${config.output?.outputRoot ?? "./generated"}/`));
      console.log(chalk.dim("\nImport generated types:"));
      console.log(
        chalk.cyan(
          `  import { Account } from '${config.output?.outputRoot ?? "./generated"}/entities/Account.js';`
        )
      );
    } catch (error: unknown) {
      spinner.fail(chalk.red("Generation failed"));
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-explicit-any
      console.error(chalk.red("\n" + (error as any).message));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).stack) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.error(chalk.dim((error as any).stack));
      }
      process.exit(1);
    }
  });

/**
 * Validate configuration
 */
program
  .command("validate")
  .description("Validate configuration file")
  .option("-c, --config <path>", "Path to configuration file", ".dataverse-gen.json")
  .action(async (options) => {
    try {
      const configPath = path.resolve(process.cwd(), options.config);
      const configContent = await fs.readFile(configPath, "utf-8");
      const config: DataverseGenConfig = JSON.parse(configContent);

      console.log(chalk.blue("Validating configuration..."));

      const errors: string[] = [];

      if (!config.environmentUrl) {
        errors.push("Missing environmentUrl");
      }

      if (config.entities && !Array.isArray(config.entities)) {
        errors.push("entities must be an array");
      }

      if (config.actions && !Array.isArray(config.actions)) {
        errors.push("actions must be an array");
      }

      if (config.functions && !Array.isArray(config.functions)) {
        errors.push("functions must be an array");
      }

      if (errors.length > 0) {
        console.log(chalk.red("✗ Validation failed:"));
        errors.forEach((err) => {
          console.log(chalk.red(`  - ${err}`));
        });
        process.exit(1);
      }

      console.log(chalk.green("✓ Configuration is valid"));

      // Print summary
      console.log(chalk.dim("\nConfiguration summary:"));
      console.log(chalk.cyan(`  Environment: ${config.environmentUrl}`));
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        chalk.cyan(
          `  Entities: ${String(config.entities?.length ?? 0)} ${config.entities?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        chalk.cyan(
          `  Actions: ${String(config.actions?.length ?? 0)} ${config.actions?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        chalk.cyan(
          `  Functions: ${String(config.functions?.length ?? 0)} ${config.functions?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        chalk.cyan(`  Output: ${config.output?.outputRoot ?? DEFAULT_CONFIG.output?.outputRoot}`)
      );
    } catch (error: unknown) {
      console.log(chalk.red("✗ Validation failed"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error(chalk.red((error as any).message));
      process.exit(1);
    }
  });

program.parse();
