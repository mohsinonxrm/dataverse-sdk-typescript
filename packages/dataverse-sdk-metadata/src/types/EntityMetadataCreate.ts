import type {
  AttributeMetadataCreateTypes,
  MetadataODataType,
  ServerSetMetadataProperty,
  StringAttributeMetadataCreate,
} from "./AttributeMetadataCreateTypes.js";
import type { EntityMetadata } from "./EntityMetadata.js";
import type { Label } from "./Label.js";
import type { OwnershipTypes } from "./OwnershipTypes.js";

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
 * The primary name column of a table create: a text column (`StringAttributeMetadata`) with
 * `IsPrimaryName: true`. A table has exactly one, and it uses the `Text` format (the default).
 */
export interface PrimaryNameAttributeMetadataCreate extends Omit<
  StringAttributeMetadataCreate,
  "IsPrimaryName"
> {
  IsPrimaryName: true;
}

/**
 * Table properties a create must set: Dataverse rejects a table create without them
 * (Learn: "Create and update table definitions using the Web API").
 */
export type RequiredEntityProperty =
  | "SchemaName"
  | "DisplayName"
  | "DisplayCollectionName"
  | "OwnershipType"
  | "IsActivity"
  | "HasActivities"
  | "HasNotes";

/**
 * EntityMetadataCreate - the payload for creating a table: the server-set properties removed, and
 * what Dataverse needs required: `SchemaName`, `DisplayName`, `DisplayCollectionName`,
 * `OwnershipType`, `IsActivity`, `HasActivities`, `HasNotes`, and `Attributes` with the
 * primary name column. `Description` is optional but recommended.
 *
 * `Attributes` is a tuple: the primary name column first (a text column with
 * `IsPrimaryName: true`), then any other columns, none of them a primary name. So a table always
 * has exactly one. A lookup column isn't created here: create the relationship
 * (`createOneToManyRelationship`) after the table.
 *
 * `@odata.type` is optional here: `EntityDefinitions` holds only `EntityMetadata`, so
 * Dataverse reads the body as that type without it. (Columns, relationships and choices need it,
 * and their create types require it.)
 */
export interface EntityMetadataCreate extends Omit<
  EntityMetadata,
  ServerSetEntityProperty | RequiredEntityProperty | "@odata.type" | "Attributes"
> {
  "@odata.type"?: MetadataODataType<"EntityMetadata">;
  /** With the publisher's customization prefix, e.g. `"new_BankAccount"`. */
  SchemaName: string;
  DisplayName: Label;
  DisplayCollectionName: Label;
  OwnershipType: OwnershipTypes;
  IsActivity: boolean;
  HasActivities: boolean;
  HasNotes: boolean;
  /** The primary name column first, then any other columns. */
  Attributes: [PrimaryNameAttributeMetadataCreate, ...AttributeMetadataCreateTypes[]];
}
