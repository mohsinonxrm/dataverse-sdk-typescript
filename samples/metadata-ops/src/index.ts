/**
 * Comprehensive metadata operations sample demonstrating THREE FRONT DOORS:
 *
 * 1. HTTP-first approach: Using client.api() directly
 * 2. MetadataClient wrapper: Using typed MetadataClient methods
 * 3. OrganizationService approach: Using orgService (where applicable for metadata)
 *
 * Note: This sample uses METADATA TYPES from @mohsinonxrm/dataverse-sdk-metadata,
 * NOT business entity types (which would be generated per-org using the generator).
 *
 * Everything the sample creates is named with this run's tag and deleted at the end, also when a
 * demo fails. New metadata takes a while to reach all of the org's servers, so a read or write
 * right after a create is retried for up to two minutes (`eventually()`).
 */

import { randomBytes } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import chalk from "chalk";
import { DataverseClient, DataverseODataError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";
import { ConfidentialClientApplication } from "@azure/msal-node";
import {
  MetadataClient,
  StringFormat as _StringFormat,
  OptionSetType,
  AttributeRequiredLevel,
  OwnershipTypes,
} from "@mohsinonxrm/dataverse-sdk-metadata";
import type {
  EntityMetadataCreate,
  EntityMetadata,
  OneToManyRelationshipMetadataCreate,
  StringAttributeMetadataCreate,
  IntegerAttributeMetadataCreate,
  OptionSetMetadataCreate,
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

  // AZURE_* (this sample's names) or DATAVERSE_* (the names the repository's live CI uses)
  const setting = (...names: string[]): string | undefined =>
    names.map((name) => env[name] || process.env[name]).find(Boolean);
  const clientId = setting("AZURE_CLIENT_ID", "DATAVERSE_CLIENT_ID");
  const tenantId = setting("AZURE_TENANT_ID", "DATAVERSE_TENANT_ID");
  const clientSecret = setting("AZURE_CLIENT_SECRET", "DATAVERSE_CLIENT_SECRET");
  const dataverseUrl = setting("DATAVERSE_URL");

  if (!clientId || !tenantId || !clientSecret || !dataverseUrl) {
    console.error(chalk.red("❌ Missing required environment variables!"));
    console.error(chalk.yellow("Create a .env file (or set environment variables) with:"));
    console.error(chalk.yellow("  AZURE_CLIENT_ID=your-app-registration-id"));
    console.error(chalk.yellow("  AZURE_TENANT_ID=your-tenant-id"));
    console.error(chalk.yellow("  AZURE_CLIENT_SECRET=your-client-secret"));
    console.error(chalk.yellow("  DATAVERSE_URL=https://yourorg.crm.dynamics.com"));
    console.error(
      chalk.yellow(
        "DATAVERSE_CLIENT_ID, DATAVERSE_TENANT_ID and DATAVERSE_CLIENT_SECRET also work."
      )
    );
    process.exit(1);
  }

  const schemaPrefix = setting("SCHEMA_PREFIX") ?? "sample";
  if (!/^[a-z][a-z0-9]{1,7}$/.test(schemaPrefix)) {
    console.error(
      chalk.red(
        "❌ SCHEMA_PREFIX must be 2 to 8 lowercase letters or digits, starting with a letter."
      )
    );
    process.exit(1);
  }

  return { clientId, tenantId, clientSecret, dataverseUrl, schemaPrefix };
}

/**
 * Every table, relationship and global choice this run creates carries the run's tag in its
 * name, and its display name starts with `sdk-sample-<tag>`. SAMPLE_RUN_TAG sets the tag
 * (lowercase letters and digits); otherwise it's random.
 */
const runTag = process.env.SAMPLE_RUN_TAG ?? randomBytes(3).toString("hex");
if (!/^[a-z0-9]{1,10}$/.test(runTag)) {
  console.error(chalk.red("❌ SAMPLE_RUN_TAG must be 1 to 10 lowercase letters or digits."));
  process.exit(1);
}
const runId = `sdk-sample-${runTag}`;

/** The names of what this run creates (logical names: lowercase schema names). */
const names = {
  project: `${env.schemaPrefix}_project${runTag}`,
  milestone: `${env.schemaPrefix}_milestone${runTag}`,
  relationship: `${env.schemaPrefix}_project${runTag}_milestones`,
  projectType: `${env.schemaPrefix}_projecttype${runTag}`,
};

/** A display label in English, with this run's id in front. */
function label(text: string) {
  return { LocalizedLabels: [{ Label: `${runId} ${text}`, LanguageCode: 1033 }] };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry `fn` until it resolves, for up to `ms`: new metadata reaches the org's servers over
 * several seconds, so a request right after a create can reach a server that doesn't know it yet.
 * An error that `retryIf` rejects is thrown at once.
 */
async function eventually<T>(
  fn: () => Promise<T>,
  ms = 120_000,
  retryIf: (err: unknown) => boolean = () => true
): Promise<T> {
  const deadline = Date.now() + ms;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (Date.now() > deadline || !retryIf(err)) throw err;
      console.log(chalk.gray("  … the org isn't ready yet, retrying in 5 seconds"));
      await sleep(5_000);
    }
  }
}

/**
 * Dataverse refused the request (400 or 404, or a 405 "not found in cache" for a table a server
 * doesn't know yet), so nothing was created and it is safe to send it again. Any other error (a
 * timeout, a 5xx) is thrown, because the component may exist.
 */
const refused = (err: unknown): boolean =>
  err instanceof DataverseODataError &&
  (err.status === 400 ||
    err.status === 404 ||
    (err.status === 405 && /not found in cache/i.test(err.message)));

/**
 * DELETE `apiPath`, retrying for up to four minutes. Only a 204, or several 404s in a row, count
 * as gone: right after a create, a server whose cache is behind answers 404 for a component that
 * still exists.
 */
async function remove(client: DataverseClient, apiPath: string): Promise<boolean> {
  let notFound = 0;
  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      await client.api(apiPath).delete<undefined>();
      return true;
    } catch (err) {
      notFound = err instanceof DataverseODataError && err.status === 404 ? notFound + 1 : 0;
      if (notFound >= 3) return true;
      if (attempt === 24) console.error(chalk.red(`  ❌ DELETE ${apiPath} failed:`), err);
    }
    await sleep(10_000);
  }
  return false;
}

// Track created metadata for cleanup, by MetadataId
const createdMetadata = {
  /** Tables, in the order they were created */
  entities: [] as Array<{ logicalName: string; metadataId: string }>,
  relationships: [] as Array<{ schemaName: string; metadataId: string }>,
  globalOptionSets: [] as Array<{ name: string; metadataId: string }>,
};
/** Names of what Demo 6 deleted, so cleanup doesn't look for them */
const deletedByDemo = new Set<string>();

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
    "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
    SchemaName: names.project,
    DisplayName: label("Project"),
    DisplayCollectionName: label("Projects"),
    Description: {
      LocalizedLabels: [
        {
          Label: "Sample project table created via HTTP-first approach",
          LanguageCode: 1033,
        },
      ],
    },
    OwnershipType: OwnershipTypes.UserOwned,
    IsActivity: false,
    HasActivities: true,
    HasNotes: true,
    // The primary name column is created with the table, first in Attributes
    Attributes: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
        SchemaName: `${schemaPrefix}_Name`,
        DisplayName: {
          LocalizedLabels: [{ Label: "Project Name", LanguageCode: 1033 }],
        },
        RequiredLevel: { Value: AttributeRequiredLevel.None },
        MaxLength: 100,
        IsPrimaryName: true,
      },
    ],
  };

  const startTime = Date.now();

  // Direct HTTP POST to /EntityDefinitions; createAndGetId reads the new MetadataId from the
  // OData-EntityId response header
  const metadataId = await client
    .api("/EntityDefinitions")
    .header("Content-Type", "application/json")
    .createAndGetId(entityDefinition);
  createdMetadata.entities.push({ logicalName: names.project, metadataId });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Entity created in ${duration}s (HTTP POST)`));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Schema Name: ${names.project}`));
  console.log(chalk.gray(`  Logical Name: ${names.project}`));
  console.log(chalk.cyan("  ℹ️  Approach: Direct Web API call using client.api()"));

  return names.project;
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
    SchemaName: names.milestone,
    DisplayName: label("Milestone"),
    DisplayCollectionName: label("Milestones"),
    Description: {
      LocalizedLabels: [
        {
          Label: "Sample milestone table created via MetadataClient",
          LanguageCode: 1033,
        },
      ],
    },
    OwnershipType: OwnershipTypes.UserOwned,
    IsActivity: false,
    HasActivities: false,
    HasNotes: false,
    // The primary name column is created with the table, first in Attributes
    Attributes: [
      {
        "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
        SchemaName: `${schemaPrefix}_Name`,
        DisplayName: {
          LocalizedLabels: [{ Label: "Milestone Name", LanguageCode: 1033 }],
        },
        RequiredLevel: { Value: AttributeRequiredLevel.None },
        MaxLength: 100,
        IsPrimaryName: true,
      },
    ],
  };

  const startTime = Date.now();

  // Using MetadataClient wrapper method
  const metadataId = await metadataClient.createEntityDefinition({
    "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
    ...entityDefinition,
  });
  createdMetadata.entities.push({ logicalName: names.milestone, metadataId });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.green(`✓ Entity created in ${duration}s (MetadataClient)`));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Schema Name: ${names.milestone}`));
  console.log(chalk.gray(`  Logical Name: ${names.milestone}`));
  console.log(chalk.cyan("  ℹ️  Approach: Typed MetadataClient wrapper method"));

  return names.milestone;
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

  const attributeDefinition: StringAttributeMetadataCreate = {
    "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
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

  // Direct HTTP POST to entity's Attributes collection (retried while the new table is unknown)
  await eventually(
    () =>
      client
        .api(`/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes`)
        .header("Content-Type", "application/json")
        .post(attributeDefinition),
    120_000,
    refused
  );

  console.log(chalk.green("✓ Attribute created (HTTP POST)"));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix}_description`));
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

  const attributeDefinition: IntegerAttributeMetadataCreate = {
    "@odata.type": "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
    SchemaName: `${schemaPrefix}_Priority`,
    DisplayName: {
      LocalizedLabels: [{ Label: "Priority", LanguageCode: 1033 }],
    },
    RequiredLevel: { Value: AttributeRequiredLevel.None },
    MinValue: 1,
    MaxValue: 10,
  };

  await eventually(
    () => metadataClient.createAttributeDefinition(entityLogicalName, attributeDefinition),
    120_000,
    refused
  );

  console.log(chalk.green("✓ Attribute created (MetadataClient)"));
  console.log(chalk.gray(`  Logical Name: ${schemaPrefix}_priority`));
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
  const entity = await eventually(() =>
    client
      .api(`/EntityDefinitions(LogicalName='${entityLogicalName}')`)
      .select("LogicalName", "DisplayName", "SchemaName", "OwnershipType")
      .expand("Attributes($select=LogicalName,AttributeType,DisplayName)")
      .get<EntityMetadata>()
  );

  console.log(chalk.green("✓ Metadata retrieved (HTTP GET)"));
  console.log(chalk.gray(`  Logical Name: ${entity.LogicalName ?? ""}`));
  console.log(
    chalk.gray(`  Display Name: ${entity.DisplayName?.LocalizedLabels?.[0]?.Label ?? ""}`)
  );
  console.log(
    chalk.gray(
      `  Ownership: ${entity.OwnershipType === OwnershipTypes.UserOwned ? "User-Owned" : "Organization-Owned"}`
    )
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

  const entity = await eventually(() =>
    metadataClient.getEntityDefinition(entityLogicalName, {
      select: ["LogicalName", "DisplayName", "SchemaName", "OwnershipType"],
      expand: "Attributes($select=LogicalName,AttributeType,DisplayName)",
    })
  );

  console.log(chalk.green("✓ Metadata retrieved (MetadataClient)"));
  console.log(chalk.gray(`  Logical Name: ${entity.LogicalName ?? ""}`));
  console.log(
    chalk.gray(`  Display Name: ${entity.DisplayName?.LocalizedLabels?.[0]?.Label ?? ""}`)
  );
  console.log(
    chalk.gray(
      `  Ownership: ${entity.OwnershipType === OwnershipTypes.UserOwned ? "User-Owned" : "Organization-Owned"}`
    )
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
        chalk.gray(`    • ${attr.LogicalName ?? ""} (${attr.AttributeType ?? ""}) - ${displayName}`)
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

  const relationship: OneToManyRelationshipMetadataCreate = {
    "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
    SchemaName: names.relationship,
    ReferencedEntity: projectEntity,
    // The project table's primary key: its logical name + "id"
    ReferencedAttribute: `${projectEntity}id`,
    ReferencingEntity: milestoneEntity,
    Lookup: {
      "@odata.type": "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
      SchemaName: `${schemaPrefix}_ProjectId`,
      DisplayName: {
        LocalizedLabels: [{ Label: "Project", LanguageCode: 1033 }],
      },
      RequiredLevel: { Value: AttributeRequiredLevel.ApplicationRequired },
    },
  };

  // Direct HTTP POST to RelationshipDefinitions (retried while either new table is unknown)
  const metadataId = await eventually(
    () =>
      client
        .api("/RelationshipDefinitions")
        .header("Content-Type", "application/json")
        .createAndGetId(relationship),
    120_000,
    refused
  );
  createdMetadata.relationships.push({ schemaName: names.relationship, metadataId });

  console.log(chalk.green("✓ 1:N relationship created (HTTP POST)"));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Schema Name: ${names.relationship}`));
  console.log(chalk.gray(`  ${projectEntity} (1) → (N) ${milestoneEntity}`));
  console.log(chalk.gray(`  Lookup column: ${schemaPrefix}_ProjectId on ${milestoneEntity}`));
  console.log(chalk.cyan("  ℹ️  Approach: POST to /RelationshipDefinitions"));
}

/**
 * Demo 5: Create global option set
 */
async function demo5_CreateGlobalChoice(metadataClient: MetadataClient): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 5: Create Global Choice (MetadataClient) ════\n"));
  console.log(chalk.gray("Creating project type global choice..."));

  const optionSet: OptionSetMetadataCreate = {
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
    Name: names.projectType,
    DisplayName: label("Project Type"),
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

  const metadataId = await metadataClient.createGlobalOptionSet(optionSet);
  createdMetadata.globalOptionSets.push({ name: names.projectType, metadataId });

  console.log(chalk.green("✓ Global choice created"));
  console.log(chalk.gray(`  Metadata ID: ${metadataId}`));
  console.log(chalk.gray(`  Name: ${names.projectType}`));
  console.log(chalk.gray("  Options: 3 (Internal, External, Research)"));
  console.log(chalk.cyan("  ℹ️  Approach: MetadataClient.createGlobalOptionSet()"));
}

/**
 * Demo 6: Delete metadata using HTTP-first approach
 */
async function demo6_DeleteMetadataHttpFirst(
  client: DataverseClient,
  entityLogicalName: string
): Promise<void> {
  console.log(chalk.bold.blue("\n════ Demo 6: Delete Metadata (HTTP-First) ════\n"));

  // The relationship first (deletion order matters), then the table
  for (const relationship of [...createdMetadata.relationships]) {
    console.log(
      chalk.gray(`Deleting relationship '${relationship.schemaName}' via client.api()...`)
    );
    if (!(await remove(client, `/RelationshipDefinitions(${relationship.metadataId})`))) {
      throw new Error(`Could not delete the relationship ${relationship.schemaName}`);
    }
    createdMetadata.relationships.splice(createdMetadata.relationships.indexOf(relationship), 1);
    deletedByDemo.add(relationship.schemaName);
    console.log(chalk.green("✓ Relationship deleted (HTTP DELETE)"));
  }

  console.log(chalk.gray(`Deleting entity '${entityLogicalName}' via client.api()...`));

  // Direct HTTP DELETE (retried while the org's servers catch up with the new table)
  if (!(await remove(client, `/EntityDefinitions(LogicalName='${entityLogicalName}')`))) {
    throw new Error(`Could not delete the entity ${entityLogicalName}`);
  }

  console.log(chalk.green("✓ Entity deleted (HTTP DELETE)"));
  console.log(chalk.cyan("  ℹ️  Approach: DELETE to /EntityDefinitions(...)"));

  // Remove from tracking
  const index = createdMetadata.entities.findIndex((e) => e.logicalName === entityLogicalName);
  if (index > -1) {
    createdMetadata.entities.splice(index, 1);
  }
  deletedByDemo.add(entityLogicalName);
}

/**
 * Cleanup: Delete remaining metadata, by MetadataId: relationships, then entities (the newest
 * first), then global choices. Returns false if anything couldn't be deleted.
 */
async function cleanup(client: DataverseClient): Promise<boolean> {
  console.log(chalk.bold.yellow("\n════ Cleanup: Deleting Created Metadata ════\n"));
  const failures: string[] = [];

  // A create that failed on the client's side (a timeout, say) may still have created its
  // component: look up, by name, anything of this run that isn't tracked and wasn't deleted
  const lookUp = async (apiPath: string): Promise<string | undefined> => {
    try {
      const found = await client.api(apiPath).select("MetadataId").get<{ MetadataId?: string }>();
      return found.MetadataId;
    } catch {
      return undefined; // not there (or not visible yet)
    }
  };
  if (!createdMetadata.relationships.some((r) => r.schemaName === names.relationship)) {
    if (!deletedByDemo.has(names.relationship)) {
      const id = await lookUp(`/RelationshipDefinitions(SchemaName='${names.relationship}')`);
      if (id)
        createdMetadata.relationships.push({ schemaName: names.relationship, metadataId: id });
    }
  }
  for (const logicalName of [names.project, names.milestone]) {
    if (createdMetadata.entities.some((e) => e.logicalName === logicalName)) continue;
    if (deletedByDemo.has(logicalName)) continue;
    const id = await lookUp(`/EntityDefinitions(LogicalName='${logicalName}')`);
    if (id) createdMetadata.entities.push({ logicalName, metadataId: id });
  }
  if (!createdMetadata.globalOptionSets.some((o) => o.name === names.projectType)) {
    const id = await lookUp(`/GlobalOptionSetDefinitions(Name='${names.projectType}')`);
    if (id) createdMetadata.globalOptionSets.push({ name: names.projectType, metadataId: id });
  }

  // Delete relationships first
  for (const { schemaName, metadataId } of createdMetadata.relationships) {
    if (await remove(client, `/RelationshipDefinitions(${metadataId})`)) {
      console.log(chalk.green(`  ✓ Deleted relationship: ${schemaName}`));
    } else {
      failures.push(`relationship ${schemaName}`);
    }
  }

  // Delete entities (deleting a table deletes its columns)
  for (const { logicalName, metadataId } of [...createdMetadata.entities].reverse()) {
    if (await remove(client, `/EntityDefinitions(${metadataId})`)) {
      console.log(chalk.green(`  ✓ Deleted entity: ${logicalName}`));
    } else {
      failures.push(`entity ${logicalName}`);
    }
  }

  // Delete global option sets
  for (const { name, metadataId } of createdMetadata.globalOptionSets) {
    if (await remove(client, `/GlobalOptionSetDefinitions(${metadataId})`)) {
      console.log(chalk.green(`  ✓ Deleted global choice: ${name}`));
    } else {
      failures.push(`global choice ${name}`);
    }
  }

  if (failures.length > 0) {
    console.error(chalk.red(`\n❌ Could not delete: ${failures.join(", ")}. Delete them by hand.`));
    return false;
  }
  console.log(chalk.bold.green("\n✓ Cleanup completed"));
  return true;
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
    scopes: [`${new URL(env.dataverseUrl).origin}/.default`],
  });

  console.log(chalk.green("✓ Authenticated"));
  console.log(chalk.gray(`  Environment: ${env.dataverseUrl}`));
  console.log(chalk.gray(`  Schema Prefix: ${env.schemaPrefix}`));
  console.log(chalk.gray(`  Run id: ${runId} (names end with ${runTag})\n`));

  // Create clients
  const client = new DataverseClient({
    baseUrl: env.dataverseUrl,
    tokenProvider,
  });

  const metadataClient = new MetadataClient(client);

  let failed = false;
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
    await demo5_CreateGlobalChoice(metadataClient);

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

    console.log(
      chalk.bold.cyan("╔══════════════════════════════════════════════════════════════════╗")
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
    console.log(chalk.gray("✓ Metadata deletion (HTTP-first; cleanup deletes the rest)"));
    console.log(chalk.gray("✓ All using METADATA TYPES (not business entity types)\n"));
  } catch (error: unknown) {
    failed = true;
    console.error(chalk.bold.red("\n❌ Demo failed:"), error);
  } finally {
    // Cleanup, also when a demo failed: everything still tracked, by MetadataId
    console.log(chalk.yellow("⚠️  Cleanup will delete remaining created metadata."));
    if (!(await cleanup(client))) failed = true;
  }

  if (failed) process.exit(1);
}

// Run the application
main().catch((error: unknown) => {
  console.error(chalk.bold.red("Unhandled error:"), error);
  process.exit(1);
});
