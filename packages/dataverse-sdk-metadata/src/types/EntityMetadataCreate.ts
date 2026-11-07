import type {
  AttributeMetadataCreateTypes,
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { EntityMetadata } from "./EntityMetadata.js";

/**
 * Table properties Dataverse computes (read-only in the SDK's `EntityMetadata`, and ignored in a
 * create); a create must not send them.
 */
export type ServerSetEntityProperty =
  | ServerSetMetadataProperty
  | "CanTriggerWorkflow"
  | "IsAIRUpdated"
  | "IsChildEntity"
  | "IsCustomEntity"
  | "IsEnabledForCharts"
  | "IsEnabledForTrace"
  | "IsImportable"
  | "IsIntersect"
  | "IsLogicalEntity"
  | "IsOptimisticConcurrencyEnabled"
  | "IsPrivate"
  | "IsStateModelAware"
  | "LogicalCollectionName"
  | "ObjectTypeCode"
  | "OwnerId"
  | "OwnerIdType"
  | "OwningBusinessUnit"
  | "PrimaryIdAttribute"
  | "PrimaryImageAttribute"
  | "PrimaryNameAttribute"
  | "Privileges"
  | "RecurrenceBaseEntityLogicalName"
  | "ReportViewName"
  | "ManyToManyRelationships"
  | "ManyToOneRelationships"
  | "OneToManyRelationships"
  | "Keys";

/**
 * EntityMetadataCreate - the payload for creating a table: the server-set properties removed,
 * `SchemaName` required, and `Attributes` (which must include the primary name column) typed as
 * column create payloads. `@odata.type` is optional here: `EntityDefinitions` holds only
 * `EntityMetadata`, so Dataverse reads the body as that type without it. (Columns,
 * relationships and choices need it, and their create types require it.)
 */
export type EntityMetadataCreate = Omit<
  EntityMetadata,
  ServerSetEntityProperty | "@odata.type" | "SchemaName" | "Attributes"
> & {
  "@odata.type"?: MetadataODataType<"EntityMetadata">;
  SchemaName: string;
  Attributes?: AttributeMetadataCreateTypes[];
};
