#!/usr/bin/env node

/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { readFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { acquireCliToken } from "./auth.js";
import { generateCode } from "./index.js";
import { ejectTemplates } from "./templates.js";
import type { DataverseGenConfig } from "./types.js";
import { DEFAULT_CONFIG } from "./types.js";

const program = new Command();

// The package's own version (#361): package.json is one folder up from src/ and from dist/.
const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
) as { version: string };

program
  .name("dataverse-gen")
  .description("Generate TypeScript code from Dataverse metadata")
  .version(version)
  // Commander 13+ rejects command-arguments a command doesn't declare ("too many arguments");
  // dataverse-gen has always ignored them, so command lines that pass extra words keep working.
  // Set before the subcommands are added, which inherit it.
  .allowExcessArguments();

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
      strictNulls: DEFAULT_CONFIG.strictNulls,
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
  .option("--token <token>", "Access token to use instead of the configured auth flow")
  .option(
    "--strict-nulls",
    'Type operation responses exactly as $metadata declares them: every property of a returned complex type is there, and "T | null" unless Nullable="false" (the same as "strictNulls": true in the configuration file)'
  )
  .action(async (options: { config: string; token?: string; strictNulls?: boolean }) => {
    const spinner = ora("Loading configuration...").start();

    try {
      // Load configuration
      const configPath = path.resolve(process.cwd(), options.config);
      const configContent = await fs.readFile(configPath, "utf-8");
      const config: DataverseGenConfig = JSON.parse(configContent);
      if (options.strictNulls) config.strictNulls = true;

      spinner.text = "Validating configuration...";

      // Validate required fields
      if (!config.environmentUrl) {
        spinner.fail("Missing environmentUrl in configuration");
        process.exit(1);
      }

      // Get access token: --token, or the configured auth flow (device code or client
      // credentials). It is acquired once, so device code asks for one sign-in per run.
      if (!options.token) spinner.text = "Authenticating...";
      const accessToken = await acquireCliToken(config, options.token, {
        log: (message) => {
          // Device code: stop the spinner so it doesn't overwrite the instructions.
          spinner.stop();
          console.error(chalk.yellow(message));
          spinner.start("Waiting for sign-in...");
        },
      });

      // Generate code
      spinner.text = "Fetching $metadata...";
      const { warnings, unchangedTables, fetchedTables, fetchReasons } = await generateCode(
        config,
        accessToken
      );

      spinner.succeed(chalk.green("✓ Code generation complete!"));
      if (config.output?.incremental === true) {
        const read = fetchedTables.length;
        console.log(
          chalk.dim(
            `Incremental: read the metadata of ${String(read)} table${read === 1 ? "" : "s"}` +
              (read > 0 && read <= 10
                ? ` (${fetchedTables
                    .map((name) => (fetchReasons[name] ? `${name}: ${fetchReasons[name]}` : name))
                    .join("; ")})`
                : "")
          )
        );
        const kept = unchangedTables.length;
        console.log(
          chalk.dim(
            kept > 0
              ? `Incremental: kept ${String(kept)} unchanged table${kept === 1 ? "" : "s"} (${unchangedTables.join(", ")})`
              : "Incremental: every table regenerated"
          )
        );
      }
      for (const warning of warnings) console.error(chalk.yellow(`⚠ ${warning}`));

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
      console.error(chalk.red("\n" + errorMessage(error)));
      if (error instanceof Error && error.stack) {
        console.error(chalk.dim(error.stack));
      }
      process.exit(1);
    }
  });

/**
 * Copy the built-in templates into a directory to customize (#347)
 */
program
  .command("eject")
  .description("Copy the built-in EJS templates into a directory, to customize them")
  .argument("[dir]", "Directory to copy the templates into", "dataverse-gen-templates")
  .option("--force", "Overwrite templates that are already in the directory")
  .action(async (dir: string, options: { force?: boolean }) => {
    try {
      const { written, skipped } = await ejectTemplates(path.resolve(process.cwd(), dir), options);
      for (const file of written)
        console.log(chalk.green(`✓ ${path.relative(process.cwd(), file)}`));
      for (const file of skipped) {
        console.log(
          chalk.yellow(`⚠ ${path.relative(process.cwd(), file)} exists; kept (--force overwrites)`)
        );
      }
      console.log(chalk.dim("\nPoint the configuration at them, then edit the ones to change:"));
      console.log(chalk.cyan(`  "templates": ${JSON.stringify(dir)}\n`));
    } catch (error: unknown) {
      console.error(chalk.red(errorMessage(error)));
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

      if (config.strictNulls !== undefined && typeof config.strictNulls !== "boolean") {
        errors.push("strictNulls must be true or false");
      }

      if (config.formContext !== undefined && typeof config.formContext !== "boolean") {
        errors.push("formContext must be true or false");
      }

      if (config.formLayouts !== undefined && typeof config.formLayouts !== "boolean") {
        errors.push("formLayouts must be true or false");
      }

      if (config.typedClient !== undefined && typeof config.typedClient !== "boolean") {
        errors.push("typedClient must be true or false");
      }

      if (
        config.output?.incremental !== undefined &&
        typeof config.output.incremental !== "boolean"
      ) {
        errors.push("output.incremental must be true or false");
      }

      if (config.templates !== undefined) {
        if (typeof config.templates !== "string") {
          errors.push("templates must be a directory path");
        } else {
          try {
            if (!(await fs.stat(path.resolve(process.cwd(), config.templates))).isDirectory()) {
              errors.push(`templates: ${config.templates} is not a directory`);
            }
          } catch {
            errors.push(`templates: ${config.templates} does not exist`);
          }
        }
      }

      if (config.auth) {
        const flow = config.auth.flow;
        if (flow !== "deviceCode" && flow !== "clientCredentials" && flow !== "clientSecret") {
          errors.push(`auth.flow must be "deviceCode" or "clientCredentials" (got "${flow}")`);
        }
        if (!config.auth.tenantId && !process.env.DATAVERSE_TENANT_ID) {
          errors.push("Missing auth.tenantId (or DATAVERSE_TENANT_ID)");
        }
        if (!config.auth.clientId && !process.env.DATAVERSE_CLIENT_ID) {
          errors.push("Missing auth.clientId (or DATAVERSE_CLIENT_ID)");
        }
        if (
          (flow === "clientCredentials" || flow === "clientSecret") &&
          !config.auth.clientSecret &&
          !process.env.DATAVERSE_CLIENT_SECRET
        ) {
          errors.push("Missing auth.clientSecret (or DATAVERSE_CLIENT_SECRET)");
        }
        if (config.auth.clientSecret) {
          console.log(
            chalk.yellow(
              "⚠ auth.clientSecret is in the configuration file; prefer the DATAVERSE_CLIENT_SECRET environment variable"
            )
          );
        }
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
        chalk.cyan(
          `  Entities: ${String(config.entities?.length ?? 0)} ${config.entities?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        chalk.cyan(
          `  Actions: ${String(config.actions?.length ?? 0)} ${config.actions?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        chalk.cyan(
          `  Functions: ${String(config.functions?.length ?? 0)} ${config.functions?.length === 0 ? "(all)" : ""}`
        )
      );
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        chalk.cyan(`  Output: ${config.output?.outputRoot ?? DEFAULT_CONFIG.output?.outputRoot}`)
      );
      console.log(chalk.cyan(`  Strict nulls: ${config.strictNulls === true ? "on" : "off"}`));
      console.log(
        chalk.cyan(
          `  Form contexts: ${config.formContext === true || config.formLayouts === true ? "on" : "off"}`
        )
      );
      console.log(chalk.cyan(`  Form layouts: ${config.formLayouts === true ? "on" : "off"}`));
      console.log(chalk.cyan(`  Typed client: ${config.typedClient === true ? "on" : "off"}`));
      console.log(
        chalk.cyan(`  Incremental: ${config.output?.incremental === true ? "on" : "off"}`)
      );
      if (config.templates) console.log(chalk.cyan(`  Templates: ${config.templates}`));
    } catch (error: unknown) {
      console.log(chalk.red("✗ Validation failed"));
      console.error(chalk.red(errorMessage(error)));
      process.exit(1);
    }
  });

/** The message of a caught value: an Error's message, or the value as a string. */
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// Awaited, so the process (and a test that imports this module) waits for the command
await program.parseAsync();
