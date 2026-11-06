import { join, resolve } from "path";
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { writeTypeScriptFile } from "../utils/file-writer.js";
import { ENTITY_TABLES_FILE, entityTable, entityTablesSource } from "../utils/entity-reference.js";

/**
 * Write the entity sets and primary keys that `createEntityReference` in
 * `@mohsinonxrm/dataverse-sdk-entities-runtime` reads (#295), as `<outputPath>/entity-tables.ts`.
 *
 * @param csdl - Parsed CSDL schema
 * @param outputPath - Output directory, entities-runtime's `src/generated`
 * @param dryRun - If true, preview without writing
 */
export async function generateEntityTables(
  csdl: CsdlSchema,
  outputPath: string,
  dryRun: boolean
): Promise<void> {
  const path = join(resolve(outputPath), ENTITY_TABLES_FILE);
  if (dryRun) {
    console.log(`  [DRY RUN] Would write: ${path}`);
    console.log(`  [DRY RUN] Tables: ${String(entityTable(csdl).length)}`);
    return;
  }
  await writeTypeScriptFile(path, entityTablesSource(csdl));
  console.log(`  ✅ ${String(entityTable(csdl).length)} tables`);
}
