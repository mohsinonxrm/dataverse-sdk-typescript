import {
  DataverseInvalidRequestError,
  parseODataError,
  type RequestAdapter,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-actions";

/** What a typed entity reference needs: the table's logical name and primary key column. */
interface TableKey {
  logicalName: string;
  primaryIdAttribute: string;
}

/**
 * Looked-up tables, per adapter (a `DataverseClient` is one org) and Web API root. A table's
 * logical name and primary key never change, so one lookup per entity set is enough.
 */
const tables = new WeakMap<RequestAdapter, Map<string, Promise<TableKey>>>();

/**
 * The `Target` of `InitializeFileBlocksUpload` for a record: a typed entity reference such as
 * `{ "@odata.type": "Microsoft.Dynamics.CRM.account", "accountid": "…" }` (#60). The table's
 * logical name and primary key come from its metadata, looked up once by entity set name.
 */
export async function fileTarget(
  adapter: RequestAdapter,
  baseUrl: string,
  entitySetName: string,
  recordId: string
): Promise<EntityReference> {
  const table = await tableFor(adapter, baseUrl, entitySetName);
  const target = {
    "@odata.type": `Microsoft.Dynamics.CRM.${table.logicalName}`,
    [table.primaryIdAttribute]: recordId,
  };
  // The actions package types Target as the (wrong) EntityReference shape; Dataverse wants this.
  return target as unknown as EntityReference;
}

function tableFor(
  adapter: RequestAdapter,
  baseUrl: string,
  entitySetName: string
): Promise<TableKey> {
  let byName = tables.get(adapter);
  if (!byName) {
    byName = new Map();
    tables.set(adapter, byName);
  }
  const key = `${baseUrl}|${entitySetName}`;
  const cached = byName.get(key);
  if (cached) return cached;
  const lookup = lookUpTable(adapter, baseUrl, entitySetName);
  byName.set(key, lookup);
  // Don't remember a failure: the next upload asks again.
  const cache = byName;
  lookup.catch(() => cache.delete(key));
  return lookup;
}

async function lookUpTable(
  adapter: RequestAdapter,
  baseUrl: string,
  entitySetName: string
): Promise<TableKey> {
  const filter = `EntitySetName eq '${entitySetName.replaceAll("'", "''")}'`;
  const res = await adapter.send({
    method: "GET",
    url:
      `${baseUrl}/EntityDefinitions?$select=LogicalName,PrimaryIdAttribute` +
      `&$filter=${encodeURIComponent(filter)}`,
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw await parseODataError(res);
  const body = (await res.json()) as {
    value?: Array<{ LogicalName?: unknown; PrimaryIdAttribute?: unknown }>;
  };
  const row = body.value?.[0];
  if (typeof row?.LogicalName !== "string" || typeof row.PrimaryIdAttribute !== "string") {
    throw DataverseInvalidRequestError.invalidParameter(
      "entitySetName",
      `no table has the entity set name "${entitySetName}"`
    );
  }
  return { logicalName: row.LogicalName, primaryIdAttribute: row.PrimaryIdAttribute };
}
