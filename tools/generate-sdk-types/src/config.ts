import { z } from "zod";
import { readFile } from "fs/promises";
import { resolve } from "path";

/**
 * Configuration schema for SDK type generation.
 */
export const SdkGeneratorConfigSchema = z.object({
  /** Dataverse environment URL */
  dataverseUrl: z.url(),

  /** Azure AD authentication */
  authentication: z.object({
    clientId: z.string(),
    tenantId: z.string(),
    clientSecret: z.string(),
  }),

  /** Target-specific configuration */
  targets: z.object({
    metadata: z
      .object({
        enabled: z.boolean().default(true),
        outputPath: z.string().default("../../packages/dataverse-sdk-metadata/src/types"),
      })
      .optional(),

    messages: z
      .object({
        enabled: z.boolean().default(true),
        outputPath: z.string().default("../../packages/dataverse-sdk-messages/src"),
      })
      .optional(),

    actions: z
      .object({
        enabled: z.boolean().default(true),
        outputPath: z.string().default("../../packages/dataverse-sdk-actions/src"),
      })
      .optional(),

    functions: z
      .object({
        enabled: z.boolean().default(true),
        outputPath: z.string().default("../../packages/dataverse-sdk-functions/src"),
      })
      .optional(),
  }),
});

export type SdkGeneratorConfig = z.infer<typeof SdkGeneratorConfigSchema>;

/**
 * Load configuration from a JSON file.
 *
 * @param configPath - Path to config file
 * @returns Parsed configuration
 */
export async function loadConfig(configPath: string): Promise<SdkGeneratorConfig> {
  const absolutePath = resolve(configPath);
  const content = await readFile(absolutePath, "utf-8");
  const json = JSON.parse(content);

  return SdkGeneratorConfigSchema.parse(json);
}
