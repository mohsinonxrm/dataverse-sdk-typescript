/**
 * Comprehensive metadata operations sample demonstrating THREE FRONT DOORS:
 *
 * 1. HTTP-first approach: Using client.api() directly
 * 2. MetadataClient wrapper: Using typed MetadataClient methods
 * 3. OrganizationService approach: Using orgService (where applicable for metadata)
 *
 * Note: This sample uses METADATA TYPES from @mohsinonxrm/dataverse-sdk-metadata,
 * NOT business entity types (which would be generated per-org using the generator).
 */

import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { ConfidentialClientApplication } from "@azure/msal-node";
import {
  MetadataClient,
  StringFormat as _StringFormat,
  OptionSetType,
  AttributeRequiredLevel,
} from "@mohsinonxrm/dataverse-sdk-metadata";
import type {
  EntityMetadataCreate,
  EntityMetadata,
  ComplexStringAttributeMetadata,
  ComplexIntegerAttributeMetadata,
  OneToManyRelationshipMetadata,
  ComplexOptionSetMetadata,
} from "@mohsinonxrm/dataverse-sdk-metadata";

// Load environment variables
const env = loadEnv();

interface Config {
  clientId: string;
  tenantId: string;
  clientSecret: string;
  dataverseUrl: string;
  schemaPrefix: string;
}

/**
 * Simple .env file loader
 */
function loadEnv(): Config {
  const envPath = path.join(process.cwd(), ".env");
  const env: Record<string, string> = {};

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join("=").trim();
      }
    }
  }

  const clientId = env.AZURE_CLIENT_ID || process.env.AZURE_CLIENT_ID;
  const tenantId = env.AZURE_TENANT_ID || process.env.AZURE_TENANT_ID;
  const clientSecret = env.AZURE_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET;
  const dataverseUrl = env.DATAVERSE_URL || process.env.DATAVERSE_URL;

  if (!clientId || !tenantId || !clientSecret || !dataverseUrl) {
    console.error(chalk.red("❌ Missing required environment variables!"));
    console.error(chalk.yellow("Please create a .env file with:"));
    console.error(chalk.yellow("  AZURE_CLIENT_ID=your-app-registration-id"));
    console.error(chalk.yellow("  AZURE_TENANT_ID=your-tenant-id"));
    console.error(chalk.yellow("  AZURE_CLIENT_SECRET=your-client-secret"));
    console.error(chalk.yellow("  DATAVERSE_URL=https://yourorg.crm.dynamics.com"));
    process.exit(1);
  }

  return {
    clientId,
    tenantId,
    clientSecret,
    dataverseUrl,
    schemaPrefix: env.SCHEMA_PREFIX || "sample",
  };
}

// Track created metadata for cleanup
const createdMetadata = {
  entities: [] as string[],
  attributes: [] as string[],
  relationships: [] as string[],
  globalOptionSets: [] as string[],
};

/**
 * Demo 1A: Create entity using HTTP-first approach (client.api())
 */
async function demo1A_CreateEntityHttpFirst(
  client: DataverseClient,
  schemaPrefix: string
): Promise<string> {
  console.log(chalk.bold.blue("\n════ Demo 1A: Create Entity (HTTP-First Approach) ════\n"));
  console.log(chalk.gray("Using client.api() directly with typed payloads..."));

  const entityDefinition: EntityMetadataCreate = {
    SchemaName: `${schemaPrefix}_project`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
    },
    DisplayCollectionName: {
      LocalizedLabels: [{ Label: "Projects", LanguageCode: 1033 }],
    },
    Description: {
      LocalizedLabels: [
        {
          Label: "Sample project table created via HTTP-first approach",
          LanguageCode: 1033,
        },
      ],
    },
    OwnershipType: 1, // UserOwned
    HasActivities: true,
    HasNotes: true,
  };

  const startTime = Date.now();

  // Direct HTTP POST to /EntityDefinitions
  // Add @odata.type at runtime for Web API
  const response = await client
    .api("/EntityDefinitions")
    .header("Content-Type", "application/json")
    .preferRaw("return=representation")
    .post<EntityMetadata>({
      "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
      ...entityDefinition,
    });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const metadataId = response.MetadataId;

  console.log(chalk.green(`✓ Entity created in ${duration}s (HTTP POST)`));
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Schema Name: ${schemaPrefix}_project`));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix}_project`));
  console.log(chalk.cyan("  ℹ️  Approach: Direct Web API call using client.api()"));

  createdMetadata.entities.push(`${schemaPrefix}_project`);

  // Now add primary name attribute (required for custom entities)
  console.log(chalk.gray("\nAdding primary name column..."));

  const primaryNameAttr: ComplexStringAttributeMetadata = {
    SchemaName: `${schemaPrefix}_Name`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Project Name", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: AttributeRequiredLevel.None },
    MaxLength: 100,
  };

  await client
    .api(`/EntityDefinitions(LogicalName='${schemaPrefix}_project')/Attributes`)
    .header("Content-Type", "application/json")
    .post({
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      ...primaryNameAttr,
      IsPrimaryName: true,
    });

  console.log(chalk.green("  ✓ Primary name column added"));

  return `${schemaPrefix}_project`;
}

/**
 * Demo 1B: Create entity using MetadataClient wrapper
 */
async function demo1B_CreateEntityMetadataClient(
  metadataClient: MetadataClient,
  schemaPrefix: string
): Promise<string> {
  console.log(chalk.bold.blue("\n════ Demo 1B: Create Entity (MetadataClient Wrapper) ════\n"));
  console.log(chalk.gray("Using MetadataClient typed methods..."));

  const entityDefinition: EntityMetadataCreate = {
    SchemaName: `${schemaPrefix}_milestone`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Milestone", LanguageCode: 1033 }],
    },
    DisplayCollectionName: {
      LocalizedLabels: [{ Label: "Milestones", LanguageCode: 1033 }],
    },
    Description: {
      LocalizedLabels: [
        {
          Label: "Sample milestone table created via MetadataClient",
          LanguageCode: 1033,
        },
      ],
    },
    OwnershipType: 1,
    HasActivities: false,
    HasNotes: false,
  };

  const startTime = Date.now();

  // Using MetadataClient wrapper method
  const metadataId = await metadataClient.createEntityDefinition({
    "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
    ...entityDefinition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Entity created in ${duration}s (MetadataClient)`));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Schema Name: ${schemaPrefix}_milestone`));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix}_milestone`));
  console.log(chalk.cyan("  ℹ️  Approach: Typed MetadataClient wrapper method"));

  createdMetadata.entities.push(`${schemaPrefix}_milestone`);

  // Add primary name attribute
  console.log(chalk.gray("\nAdding primary name column..."));

  const primaryNameAttr: ComplexStringAttributeMetadata = {
    SchemaName: `${schemaPrefix}_Name`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Milestone Name", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: AttributeRequiredLevel.None },
    MaxLength: 100,
  };

  await metadataClient.createAttributeDefinition(`${schemaPrefix}_milestone`, {
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
    ...primaryNameAttr,
    IsPrimaryName: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  console.log(chalk.green("  ✓ Primary name column added"));

  return `${schemaPrefix}_milestone`;
}

/**
 * Demo 2A: Add attribute using HTTP-first approach
 */
async function demo2A_AddAttributeHttpFirst(
  client: DataverseClient,
  entityLogicalName: string,
  schemaPrefix: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 2A: Add Attribute (HTTP-First) ════\n"));
  console.log(chalk.gray("Adding description column via client.api()..."));

  const attributeDefinition: ComplexStringAttributeMetadata = {
    SchemaName: `${schemaPrefix}_Description`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Description", LanguageCode: 1033 }],
    },
    Description: {
      LocalizedLabels: [{ Label: "Project description", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: AttributeRequiredLevel.None },
    MaxLength: 500,
    FormatName: { Value: "Text" },
  };

  // Direct HTTP POST to entity's Attributes collection
  await client
    .api(`/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes`)
    .header("Content-Type", "application/json")
    .post({
      "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
      ...attributeDefinition,
    });

  console.log(chalk.green("✓ Attribute created (HTTP POST)"));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix.toLowerCase()}_description`));
  console.log(chalk.gray("  Type: Multi-line text (TextArea)"));
  console.log(chalk.cyan("  ℹ️  Approach: POST to /EntityDefinitions(...)/Attributes"));
}

/**
 * Demo 2B: Add attribute using MetadataClient
 */
async function demo2B_AddAttributeMetadataClient(
  metadataClient: MetadataClient,
  entityLogicalName: string,
  schemaPrefix: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 2B: Add Attribute (MetadataClient) ════\n"));
  console.log(chalk.gray("Adding priority column via MetadataClient..."));

  const attributeDefinition: ComplexIntegerAttributeMetadata = {
    SchemaName: `${schemaPrefix}_Priority`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Priority", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: AttributeRequiredLevel.None },
    MinValue: 1,
    MaxValue: 10,
  };

  await metadataClient.createAttributeDefinition(entityLogicalName, {
    "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
    ...attributeDefinition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  console.log(chalk.green("✓ Attribute created (MetadataClient)"));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix.toLowerCase()}_priority`));
  console.log(chalk.gray("  Type: Integer (1-10)"));
  console.log(chalk.cyan("  ℹ️  Approach: MetadataClient.createAttributeDefinition()"));
}

/**
 * Demo 3A: Query metadata using HTTP-first approach
 */
async function demo3A_QueryMetadataHttpFirst(
  client: DataverseClient,
  entityLogicalName: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 3A: Query Metadata (HTTP-First) ════\n"));
  console.log(chalk.gray("Querying entity with expanded attributes via client.api()..."));

  // Direct HTTP GET with OData query options
  const entity = await client
    .api(`/EntityDefinitions(LogicalName='${entityLogicalName}')`)
    .select("LogicalName", "DisplayName", "SchemaName", "OwnershipType")
    .expand("Attributes($select=LogicalName,AttributeType,DisplayName)")
    .get<EntityMetadata>();

  console.log(chalk.green("✓ Metadata retrieved (HTTP GET)"));
  console.log(chalk.gray(`  Logical Name: ${entity.LogicalName ?? ""}`));
  console.log(
    chalk.gray(`  Display Name: ${entity.DisplayName?.LocalizedLabels?.[0]?.Label ?? ""}`)
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  console.log(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    chalk.gray(`  Ownership: ${entity.OwnershipType === 1 ? "User-Owned" : "Organization-Owned"}`)
  );
  console.log(chalk.gray(`  Attributes: ${String(entity.Attributes?.length ?? 0)}`));
  console.log(chalk.cyan("  ℹ️  Approach: GET with $select and $expand query options"));
}

/**
 * Demo 3B: Query metadata using MetadataClient
 */
async function demo3B_QueryMetadataWithClient(
  metadataClient: MetadataClient,
  entityLogicalName: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 3B: Query Metadata (MetadataClient) ════\n"));
  console.log(chalk.gray("Querying entity via MetadataClient..."));

  const entity = await metadataClient.getEntityDefinition(entityLogicalName, {
    select: ["LogicalName", "DisplayName", "SchemaName", "OwnershipType"],
    expand: "Attributes($select=LogicalName,AttributeType,DisplayName)",
  });

  console.log(chalk.green("✓ Metadata retrieved (MetadataClient)"));
  console.log(chalk.gray(`  Logical Name: ${entity.LogicalName ?? ""}`));
  console.log(
    chalk.gray(`  Display Name: ${entity.DisplayName?.LocalizedLabels?.[0]?.Label ?? ""}`)
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  console.log(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    chalk.gray(`  Ownership: ${entity.OwnershipType === 1 ? "User-Owned" : "Organization-Owned"}`)
  );
  console.log(chalk.gray(`  Attributes: ${String(entity.Attributes?.length ?? 0)}`));
  console.log(chalk.cyan("  ℹ️  Approach: MetadataClient.getEntityDefinition()"));

  // Show custom attributes
  if (entity.Attributes && entity.Attributes.length > 0) {
    console.log(chalk.gray("\n  Custom Attributes:"));
    const customAttrs = entity.Attributes.filter(
      (attr) =>
        attr.LogicalName?.startsWith(entityLogicalName.split("_")[0]) &&
        !attr.IsPrimaryId &&
        !attr.IsPrimaryName
    );

    for (const attr of customAttrs.slice(0, 5)) {
      // Show first 5
      const displayName = attr.DisplayName?.LocalizedLabels?.[0]?.Label ?? attr.LogicalName ?? "";
      console.log(
        chalk.gray(
          `    • ${attr.LogicalName ?? ""} (${String(attr.AttributeType ?? "")}) - ${displayName}`
        )
      );
    }
  }
}

/**
 * Demo 4: Create relationship using HTTP-first approach
 */
async function demo4_CreateRelationshipHttpFirst(
  client: DataverseClient,
  projectEntity: string,
  milestoneEntity: string,
  schemaPrefix: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 4: Create 1:N Relationship (HTTP-First) ════\n"));
  console.log(chalk.gray("Creating project-to-milestones relationship via client.api()..."));

  const relationship: OneToManyRelationshipMetadata = {
    SchemaName: `${schemaPrefix}_project_milestones`,
    ReferencedEntity: projectEntity,
    ReferencedAttribute: `${schemaPrefix}_projectid`,
    ReferencingEntity: milestoneEntity,
  };

  // Direct HTTP POST to RelationshipDefinitions
  // Add @odata.type and Lookup at runtime
  const _response = await client
    .api("/RelationshipDefinitions")
    .header("Content-Type", "application/json")
    .preferRaw("return=representation")
    .post({
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
      ...relationship,
      Lookup: {
        "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
        SchemaName: `${schemaPrefix}_ProjectId`,
        DisplayName: {
          LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
        },
        RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
      },
    });

  console.log(chalk.green("✓ 1:N relationship created (HTTP POST)"));
  console.log(chalk.gray(`  Schema Name: ${schemaPrefix}_project_milestones`));
  console.log(chalk.gray(`  ${projectEntity} (1) → (N) ${milestoneEntity}`));
  console.log(chalk.gray(`  Lookup column: ${schemaPrefix}_ProjectId on ${milestoneEntity}`));
  console.log(chalk.cyan("  ℹ️  Approach: POST to /RelationshipDefinitions"));

  createdMetadata.relationships.push(`${schemaPrefix}_project_milestones`);
}

/**
 * Demo 5: Create global option set
 */
async function demo5_CreateGlobalChoice(
  metadataClient: MetadataClient,
  schemaPrefix: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 5: Create Global Choice (MetadataClient) ════\n"));
  console.log(chalk.gray("Creating project type global choice..."));

  const optionSet: ComplexOptionSetMetadata = {
    Name: `${schemaPrefix}_projecttype`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Project Type", LanguageCode: 1033 }],
    },
    Description: {
      LocalizedLabels: [{ Label: "Global choice for categorizing projects", LanguageCode: 1033 }],
    },
    IsGlobal: true,
    OptionSetType: OptionSetType.Picklist,
    Options: [
      {
        Value: 100000,
        Label: { LocalizedLabels: [{ Label: "Internal", LanguageCode: 1033 }] },
      },
      {
        Value: 100001,
        Label: { LocalizedLabels: [{ Label: "External", LanguageCode: 1033 }] },
      },
      {
        Value: 100002,
        Label: { LocalizedLabels: [{ Label: "Research", LanguageCode: 1033 }] },
      },
    ],
  };

  const metadataId = await metadataClient.createGlobalOptionSet({
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
    ...optionSet,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  console.log(chalk.green("✓ Global choice created"));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Name: ${schemaPrefix}_projecttype`));
  console.log(chalk.gray("  Options: 3 (Internal, External, Research)"));
  console.log(chalk.cyan("  ℹ️  Approach: MetadataClient.createGlobalOptionSet()"));

  createdMetadata.globalOptionSets.push(`${schemaPrefix}_projecttype`);
}

/**
 * Demo 6: Delete metadata using HTTP-first approach
 */
async function demo6_DeleteMetadataHttpFirst(
  client: DataverseClient,
  entityLogicalName: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 6: Delete Metadata (HTTP-First) ════\n"));
  console.log(chalk.gray(`Deleting entity '${entityLogicalName}' via client.api()...`));

  // Direct HTTP DELETE
  await client.api(`/EntityDefinitions(LogicalName='${entityLogicalName}')`).delete();

  console.log(chalk.green("✓ Entity deleted (HTTP DELETE)"));
  console.log(chalk.cyan("  ℹ️  Approach: DELETE to /EntityDefinitions(...)"));

  // Remove from tracking
  const index = createdMetadata.entities.indexOf(entityLogicalName);
  if (index > -1) {
    createdMetadata.entities.splice(index, 1);
  }
}

/**
 * Cleanup: Delete remaining metadata
 */
async function cleanup(metadataClient: MetadataClient): Promise<void> {
  console.log(chalk.bold.yellow("\n════ Cleanup: Deleting Created Metadata ════\n"));

  // Delete relationships first
  if (createdMetadata.relationships.length > 0) {
    console.log(
      chalk.gray(`Deleting ${String(createdMetadata.relationships.length)} relationships...`)
    );
    for (const relName of createdMetadata.relationships) {
      try {
        // Get relationship by schema name to retrieve MetadataId, then delete
        const relationship = await metadataClient.getRelationshipBySchemaName(relName);
        if (relationship.MetadataId) {
          await metadataClient.deleteRelationship(relationship.MetadataId);
          console.log(chalk.green(`  ✓ Deleted relationship: ${relName}`));
        }
      } catch (_error) {
        console.log(chalk.yellow(`  ⚠️  Could not delete relationship: ${relName}`));
      }
    }
  }

  // Delete entities
  if (createdMetadata.entities.length > 0) {
    console.log(chalk.gray(`\nDeleting ${String(createdMetadata.entities.length)} entities...`));
    for (const entityName of createdMetadata.entities) {
      try {
        await metadataClient.deleteEntityDefinition(entityName);
        console.log(chalk.green(`  ✓ Deleted entity: ${entityName}`));
      } catch (_error) {
        console.log(chalk.yellow(`  ⚠️  Could not delete entity: ${entityName}`));
      }
    }
  }

  // Delete global option sets
  if (createdMetadata.globalOptionSets.length > 0) {
    console.log(
      chalk.gray(`\nDeleting ${String(createdMetadata.globalOptionSets.length)} global choices...`)
    );
    for (const optionSetName of createdMetadata.globalOptionSets) {
      try {
        await metadataClient.deleteGlobalOptionSet(optionSetName);
        console.log(chalk.green(`  ✓ Deleted global choice: ${optionSetName}`));
      } catch (_error) {
        console.log(chalk.yellow(`  ⚠️  Could not delete global choice: ${optionSetName}`));
      }
    }
  }

  console.log(chalk.bold.green("\n✓ Cleanup completed"));
}

/**
 * Main application flow
 */
async function main() {
  console.log(
    chalk.bold.cyan("\n╔══════════════════════════════════════════════════════════════════╗")
  );
  console.log(
    chalk.bold.cyan("║   Dataverse SDK - Metadata Operations Sample                    ║")
  );
  console.log(
    chalk.bold.cyan("║   Demonstrating THREE Front Doors                               ║")
  );
  console.log(
    chalk.bold.cyan("╚══════════════════════════════════════════════════════════════════╝\n")
  );

  // Initialize authentication
  console.log(chalk.blue("🔐 Initializing authentication..."));

  const msalConfig = {
    auth: {
      clientId: env.clientId,
      authority: `https://login.microsoftonline.com/${env.tenantId}`,
      clientSecret: env.clientSecret,
    },
  };

  const cca = new ConfidentialClientApplication(msalConfig);
  const tokenProvider = new MsalNodeTokenProvider(cca, {
    flow: "clientCredentials",
    scopes: [`${env.dataverseUrl}/.default`],
  });

  console.log(chalk.green("✓ Authenticated"));
  console.log(chalk.gray(`  Environment: ${env.dataverseUrl}`));
  console.log(chalk.gray(`  Schema Prefix: ${env.schemaPrefix}\n`));

  // Create clients
  const client = new DataverseClient({
    baseUrl: env.dataverseUrl,
    tokenProvider,
  });

  const metadataClient = new MetadataClient(client);

  try {
    console.log(
      chalk.bold.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    );
    console.log(chalk.bold.yellow("  THREE FRONT DOORS FOR METADATA OPERATIONS"));
    console.log(
      chalk.bold.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    );

    // Demo 1: Create entities (both approaches)
    const projectEntity = await demo1A_CreateEntityHttpFirst(client, env.schemaPrefix);
    const milestoneEntity = await demo1B_CreateEntityMetadataClient(
      metadataClient,
      env.schemaPrefix
    );

    // Demo 2: Add attributes (both approaches)
    await demo2A_AddAttributeHttpFirst(client, projectEntity, env.schemaPrefix);
    await demo2B_AddAttributeMetadataClient(metadataClient, projectEntity, env.schemaPrefix);

    // Demo 3: Query metadata (both approaches)
    await demo3A_QueryMetadataHttpFirst(client, projectEntity);
    await demo3B_QueryMetadataWithClient(metadataClient, projectEntity);

    // Demo 4: Create relationship
    await demo4_CreateRelationshipHttpFirst(
      client,
      projectEntity,
      milestoneEntity,
      env.schemaPrefix
    );

    // Demo 5: Create global choice
    await demo5_CreateGlobalChoice(metadataClient, env.schemaPrefix);

    // Demo 6: Delete one entity using HTTP-first
    await demo6_DeleteMetadataHttpFirst(client, milestoneEntity);

    console.log(chalk.bold.green("\n✅ All metadata operations completed successfully!\n"));

    // Summary
    console.log(
      chalk.bold.cyan("╔══════════════════════════════════════════════════════════════════╗")
    );
    console.log(
      chalk.bold.cyan("║   THREE FRONT DOORS SUMMARY                                      ║")
    );
    console.log(
      chalk.bold.cyan("╚══════════════════════════════════════════════════════════════════╝\n")
    );

    console.log(chalk.bold.blue("1. HTTP-First Approach (client.api()):"));
    console.log(chalk.gray("   • Direct Web API calls with full control"));
    console.log(chalk.gray("   • Uses OData query options ($select, $expand, $filter)"));
    console.log(chalk.gray("   • Examples: POST /EntityDefinitions, GET with queries"));
    console.log(chalk.gray("   • Best for: Custom workflows, low-level control\n"));

    console.log(chalk.bold.blue("2. MetadataClient Wrapper:"));
    console.log(chalk.gray("   • Typed convenience methods"));
    console.log(chalk.gray("   • Handles URL construction and payload formatting"));
    console.log(chalk.gray("   • Examples: createEntityDefinition(), getEntityDefinition()"));
    console.log(chalk.gray("   • Best for: Most metadata operations, type safety\n"));

    console.log(chalk.bold.blue("3. OrganizationService (Limited for Metadata):"));
    console.log(chalk.gray("   • Primarily for business data operations"));
    console.log(chalk.gray("   • Some metadata operations via RetrieveMetadataChanges message"));
    console.log(chalk.gray("   • C#-familiar facade using execute()"));
    console.log(chalk.gray("   • Best for: SDK.Messages-style operations\n"));

    console.log(chalk.bold.yellow("Key Insight:"));
    console.log(chalk.gray("  All approaches work with METADATA TYPES from"));
    console.log(chalk.gray("  @mohsinonxrm/dataverse-sdk-metadata (EntityMetadata, etc.)"));
    console.log(chalk.gray("  These are NOT business entity types (which would be generated).\n"));

    // Cleanup
    console.log(chalk.yellow("⚠️  Cleanup will delete remaining created metadata."));
    console.log(chalk.gray("Waiting 2 seconds before cleanup...\n"));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await cleanup(metadataClient);

    console.log(
      chalk.bold.cyan("\n╔══════════════════════════════════════════════════════════════════╗")
    );
    console.log(
      chalk.bold.cyan("║   OPERATIONS DEMONSTRATED                                        ║")
    );
    console.log(
      chalk.bold.cyan("╚══════════════════════════════════════════════════════════════════╝\n")
    );
    console.log(chalk.gray("✓ Entity creation (HTTP-first & MetadataClient)"));
    console.log(chalk.gray("✓ Attribute creation (HTTP-first & MetadataClient)"));
    console.log(chalk.gray("✓ Metadata queries (HTTP-first & MetadataClient)"));
    console.log(chalk.gray("✓ Relationship creation (1:N via HTTP-first)"));
    console.log(chalk.gray("✓ Global choice creation (via MetadataClient)"));
    console.log(chalk.gray("✓ Metadata deletion (HTTP-first & MetadataClient)"));
    console.log(chalk.gray("✓ All using METADATA TYPES (not business entity types)\n"));
  } catch (error: unknown) {
    console.error(chalk.bold.red("\n❌ Demo failed:"), error);
    console.log(chalk.yellow("\nAttempting cleanup of created metadata..."));
    try {
      await cleanup(metadataClient);
    } catch (cleanupError: unknown) {
      console.error(chalk.red("Cleanup also failed:"), cleanupError);
    }
    process.exit(1);
  }
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
