/**
 * `EntityDefinitions` for the demo environment, built from the table definitions in `store.ts`:
 * tables, their attributes (with `Microsoft.Dynamics.CRM.<Type>AttributeMetadata` casts) and the
 * option sets of choice columns.
 */
import {
  DEMO_API_URL,
  json,
  odataError,
  type FakeRequest,
  type FakeResponse,
} from "./fakeDataverse";
import { matches, parseFilter, QuerySyntaxError } from "./odataQuery";
import type { AttributeDef, AttributeType, Row, Schema, TableDef } from "./store";

const label = (text: string) => ({
  LocalizedLabels: [{ Label: text, LanguageCode: 1033 }],
  UserLocalizedLabel: { Label: text, LanguageCode: 1033 },
});

const CAST: Record<AttributeType, string> = {
  Uniqueidentifier: "UniqueIdentifierAttributeMetadata",
  String: "StringAttributeMetadata",
  Memo: "MemoAttributeMetadata",
  Integer: "IntegerAttributeMetadata",
  BigInt: "BigIntAttributeMetadata",
  Money: "MoneyAttributeMetadata",
  Decimal: "DecimalAttributeMetadata",
  Boolean: "BooleanAttributeMetadata",
  DateTime: "DateTimeAttributeMetadata",
  Picklist: "PicklistAttributeMetadata",
  State: "StateAttributeMetadata",
  Status: "StatusAttributeMetadata",
  Lookup: "LookupAttributeMetadata",
  Owner: "LookupAttributeMetadata",
  Image: "ImageAttributeMetadata",
  File: "FileAttributeMetadata",
};

/** A cast also returns the types derived from it, as Dataverse's does. */
function castIncludes(cast: string, type: AttributeType): boolean {
  if (cast === "EnumAttributeMetadata")
    return type === "Picklist" || type === "State" || type === "Status";
  return CAST[type] === cast;
}

function metadataId(seed: string): string {
  let h = 0;
  for (const ch of seed) h = (Math.imul(h, 31) + ch.charCodeAt(0)) | 0;
  const hex = (Math.abs(h) >>> 0).toString(16).padStart(8, "0");
  return `${hex}-0000-4000-8000-${hex.padEnd(12, "0").slice(0, 12)}`;
}

const pascal = (name: string) =>
  name.replace(/(^|_)(\w)/g, (_, sep: string, c: string) => sep + c.toUpperCase());

function entity(table: TableDef): Row {
  return {
    MetadataId: metadataId(table.logicalName),
    LogicalName: table.logicalName,
    SchemaName: pascal(table.logicalName),
    EntitySetName: table.entitySetName,
    LogicalCollectionName: table.entitySetName,
    DisplayName: label(table.displayName),
    DisplayCollectionName: label(table.displayCollectionName),
    Description: label(`Demo ${table.displayName.toLowerCase()} table.`),
    PrimaryIdAttribute: table.primaryIdAttribute,
    PrimaryNameAttribute: table.primaryNameAttribute,
    ObjectTypeCode: table.objectTypeCode,
    IsCustomEntity: table.isCustom,
    IsActivity: false,
    OwnershipType: table.ownership,
  };
}

function attribute(table: TableDef, a: AttributeDef, withOptionSet: boolean): Row {
  const row: Row = {
    "@odata.type": `#Microsoft.Dynamics.CRM.${CAST[a.type]}`,
    MetadataId: metadataId(`${table.logicalName}.${a.logicalName}`),
    LogicalName: a.logicalName,
    SchemaName: pascal(a.logicalName),
    EntityLogicalName: table.logicalName,
    AttributeType: a.type,
    AttributeTypeName: { Value: `${a.type}Type` },
    DisplayName: label(a.displayName),
    RequiredLevel: {
      Value: a.required
        ? "ApplicationRequired"
        : a.type === "Uniqueidentifier"
          ? "SystemRequired"
          : "None",
      CanBeChanged: true,
      ManagedPropertyLogicalName: "canmodifyrequirementlevelsettings",
    },
    IsCustomAttribute: a.logicalName.startsWith("new_"),
    IsPrimaryId: a.logicalName === table.primaryIdAttribute,
    IsPrimaryName: a.logicalName === table.primaryNameAttribute,
    IsValidForCreate: !a.readOnly,
    IsValidForUpdate: !a.readOnly && a.type !== "Uniqueidentifier",
    IsValidForRead: true,
  };
  if (a.maxLength) row.MaxLength = a.maxLength;
  if (a.targets) row.Targets = a.targets;
  if (a.type === "Money")
    Object.assign(row, { Precision: 2, MinValue: 0, MaxValue: 100_000_000_000_000 });
  if (a.type === "Integer")
    Object.assign(row, { MinValue: -2_147_483_648, MaxValue: 2_147_483_647 });
  if (a.type === "Image") Object.assign(row, { MaxSizeInKB: 10_240, CanStoreFullImage: true });
  if (a.type === "File") Object.assign(row, { MaxSizeInKB: 32_768 });
  if (withOptionSet && a.options) {
    row.OptionSet = {
      MetadataId: metadataId(`${table.logicalName}.${a.logicalName}.options`),
      Name: `${table.logicalName}_${a.logicalName}`,
      IsGlobal: false,
      OptionSetType: a.type === "Picklist" ? "Picklist" : a.type,
      Options: a.options.map((o) => ({ Value: o.value, Label: label(o.label) })),
    };
  }
  return row;
}

function select(row: Row, names: string[] | undefined): Row {
  if (!names?.length) return row;
  const out: Row = {};
  for (const name of names) {
    if (!(name in row) && name !== "OptionSet" && name !== "MaxLength" && name !== "Targets") {
      throw new QuerySyntaxError(
        `Could not find a property named '${name}' on type 'Microsoft.Dynamics.CRM.EntityMetadata'.`
      );
    }
    if (name in row) out[name] = row[name];
  }
  for (const key of ["@odata.type", "MetadataId", "OptionSet"]) if (key in row) out[key] = row[key];
  return out;
}

function filterRows(rows: Row[], filter: string | null): Row[] {
  if (!filter) return rows;
  const expr = parseFilter(filter);
  return rows.filter((r) => matches(r, expr, (field) => field in r));
}

export function entityDefinitionsResponse(
  schema: Schema,
  req: FakeRequest,
  path: string
): FakeResponse {
  if (req.method !== "GET")
    return odataError(405, "0x80060888", "Demo mode doesn't change metadata.");
  const q = req.url.searchParams;
  const names = q
    .get("$select")
    ?.split(",")
    .map((s) => s.trim());
  const m =
    /^EntityDefinitions(?:\((?:LogicalName='([^']+)'|([0-9a-f-]{36}))\))?(?:\/Attributes(?:\/Microsoft\.Dynamics\.CRM\.(\w+))?(?:\((?:LogicalName='([^']+)'|([0-9a-f-]{36}))\))?(?:\/Microsoft\.Dynamics\.CRM\.(\w+))?)?$/.exec(
      path
    );
  if (!m) return odataError(404, "0x80060888", `Resource not found for the segment '${path}'.`);
  const [, logicalName, entityId, cast, attrName, attrId, castAfter] = m;
  const tables = [...schema.tables.values()];

  if (logicalName === undefined && entityId === undefined) {
    const rows = filterRows(tables.map(entity), q.get("$filter"));
    return json(200, {
      "@odata.context": `${DEMO_API_URL}/$metadata#EntityDefinitions`,
      value: rows.map((r) => select(r, names)),
    });
  }
  const table = tables.find(
    (t) => t.logicalName === logicalName || metadataId(t.logicalName) === entityId
  );
  if (!table) {
    return odataError(
      404,
      "0x80040217",
      `Could not find an entity with LogicalName = '${logicalName ?? entityId ?? ""}'.`
    );
  }
  if (!path.includes("/Attributes")) {
    return json(200, {
      "@odata.context": `${DEMO_API_URL}/$metadata#EntityDefinitions/$entity`,
      ...select(entity(table), names),
    });
  }

  const withOptionSet = /OptionSet/.test(q.get("$expand") ?? "");
  if (withOptionSet && !cast && !castAfter) {
    return odataError(
      400,
      "0x80060888",
      "Could not find a property named 'OptionSet' on type 'Microsoft.Dynamics.CRM.AttributeMetadata'. Cast to an EnumAttributeMetadata type first."
    );
  }
  const typeCast = cast ?? castAfter;
  if (attrName !== undefined || attrId !== undefined) {
    const a = table.attributes.find(
      (x) =>
        x.logicalName === attrName || metadataId(`${table.logicalName}.${x.logicalName}`) === attrId
    );
    if (!a || (typeCast && !castIncludes(typeCast, a.type))) {
      return odataError(
        404,
        "0x80040217",
        `Could not find attribute '${attrName ?? attrId ?? ""}' of type '${typeCast ?? "AttributeMetadata"}'.`
      );
    }
    return json(200, {
      "@odata.context": `${DEMO_API_URL}/$metadata#EntityDefinitions('${table.logicalName}')/Attributes/$entity`,
      ...select(attribute(table, a, withOptionSet), names),
    });
  }
  const attributes = table.attributes
    .filter((a) => !typeCast || castIncludes(typeCast, a.type))
    .map((a) => attribute(table, a, withOptionSet));
  return json(200, {
    "@odata.context": `${DEMO_API_URL}/$metadata#EntityDefinitions('${table.logicalName}')/Attributes`,
    value: filterRows(attributes, q.get("$filter")).map((r) => select(r, names)),
  });
}
