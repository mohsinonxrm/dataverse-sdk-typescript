import { afterAll, describe, expect, it } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { SchemaModel } from "../src/schema-model.js";
import { TypescriptGenerator } from "../src/typescript-generator.js";
import type { DataverseGenConfig } from "../src/types.js";
import { createFixtureMetadataService } from "./fixtures/typecheck-metadata.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Generated code imports @mohsinonxrm/dataverse-sdk-entities-runtime and -core, so it is written
// below this package's node_modules, where Node and TypeScript resolve both packages.
const scratchRoot = path.join(packageRoot, "node_modules", ".cache", "generated-typecheck");

const outputDirs: string[] = [];

afterAll(async () => {
  for (const dir of outputDirs) {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

async function generate(
  config: Omit<DataverseGenConfig, "environmentUrl" | "output">,
  fileSuffix = ""
) {
  await fs.mkdir(scratchRoot, { recursive: true });
  const outputRoot = await fs.mkdtemp(path.join(scratchRoot, "out-"));
  outputDirs.push(outputRoot);
  const fullConfig: DataverseGenConfig = {
    environmentUrl: "https://contoso.crm.dynamics.com",
    ...config,
    output: { outputRoot, fileSuffix },
  };
  const model = new SchemaModel(createFixtureMetadataService(), fullConfig);
  await model.generate();
  await new TypescriptGenerator(model, fullConfig).generate();
  return outputRoot;
}

async function listTsFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath, e.name));
}

/** Type-check a folder the way a strict app would, and return the diagnostics as text. */
async function typecheck(dir: string): Promise<string[]> {
  const program = ts.createProgram(await listTsFiles(dir), {
    strict: true,
    noEmit: true,
    target: ts.ScriptTarget.ES2022,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    verbatimModuleSyntax: true,
    isolatedModules: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitOverride: true,
    skipLibCheck: true,
    types: [],
  });
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${path.relative(dir, d.file.fileName)}:${String(line + 1)} ${message}`;
  });
}

const fixtureConfig = {
  entities: ["account", "contact", "import"],
  actions: [
    "WinOpportunity",
    "ExportSolution",
    "PublishAllXml",
    "CalculatePrice",
    "contoso_Recalculate",
  ],
  functions: ["WhoAmI", "RetrieveTotalRecordCount", "CalculateRollupField", "contoso_GetScore"],
};

// A file an app would write: build entities and pass generated operations to the core client.
const USAGE = `
import { DataverseClient, type AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityMetadata } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type Account, AccountMetadata } from "./entities/index.js";
import { account_industrycode } from "./enums/index.js";
import { type Contact, ContactMetadata } from "./entities/index.js";
import { WhoAmIFunction } from "./functions/index.js";
import type { WhoAmIResponse } from "./complextypes/index.js";
import { ExportSolutionAction, PublishAllXmlAction } from "./actions/index.js";
import { EntityMetadataCache, getEntityMetadata } from "./index.js";

const tokenProvider: AccessTokenProvider = { getToken: () => Promise.resolve("token") };
const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });

export async function run(): Promise<void> {
  const acct: Account = { name: "Contoso", industrycode: account_industrycode.Accounting };
  const person: Contact = { fullname: "Jane" };
  const whoAmI: WhoAmIResponse = await client.execute(new WhoAmIFunction());
  await client.execute(new PublishAllXmlAction());
  await client.execute(new ExportSolutionAction("contoso", false, null));
  const meta: EntityMetadata | undefined = getEntityMetadata("account");
  const all: Record<string, EntityMetadata> = EntityMetadataCache;
  console.log(acct, person, whoAmI, meta, all, AccountMetadata.collectionName, ContactMetadata);
}
`;

describe("generated code type-checks (#78)", () => {
  it("entities, enums, actions, functions, complex types and metadata compile under strict settings", async () => {
    const dir = await generate(fixtureConfig);
    await fs.writeFile(path.join(dir, "usage.ts"), USAGE, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  }, 60_000);

  it("compiles with a fileSuffix (imports include the suffix)", async () => {
    const dir = await generate(fixtureConfig, ".generated");
    expect(await typecheck(dir)).toEqual([]);
  }, 60_000);
});

// Writing records (#79): no logicalName in the payload, lookups set with an EntityReference and
// turned into @odata.bind by formatEntityForWrite().
const WRITE_USAGE = `
import { DataverseClient, type AccessTokenProvider } from "@mohsinonxrm/dataverse-sdk-core";
import { createEntityReference, formatEntityForWrite } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { type Account, AccountMetadata, type Contact, ContactMetadata } from "./entities/index.js";
import { EntityMetadataCache } from "./metadata.js";

const tokenProvider: AccessTokenProvider = { getToken: () => Promise.resolve("token") };
const client = new DataverseClient({ baseUrl: "https://contoso.crm.dynamics.com", tokenProvider });

export async function create(contactId: string, accountId: string): Promise<string> {
  const account: Account = {
    name: "Contoso",
    primarycontactid: createEntityReference("contact", contactId),
    parentaccountid: createEntityReference("account", accountId),
  };
  const contact: Contact = { fullname: "Jane", parentcustomerid: createEntityReference("account", accountId) };
  await client.api("/contacts").post(formatEntityForWrite(contact, ContactMetadata, { metadataCache: EntityMetadataCache }));
  return client
    .api("/" + AccountMetadata.collectionName)
    .createAndGetId(formatEntityForWrite(account, AccountMetadata, { metadataCache: EntityMetadataCache }));
}
`;

describe("generated entities for writes type-check (#79)", () => {
  it("entities need no logicalName and lookups accept an EntityReference", async () => {
    const dir = await generate(fixtureConfig);
    await fs.writeFile(path.join(dir, "write-usage.ts"), WRITE_USAGE, "utf-8");
    expect(await typecheck(dir)).toEqual([]);
  }, 60_000);
});
