import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * RelationshipMetadataBase entity type
 */
export interface RelationshipMetadataBase extends MetadataBase {
  IsCustomRelationship?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsValidForAdvancedFind?: boolean;
  SchemaName?: string;
  SecurityTypes?: SecurityTypes;
  IsManaged?: boolean;
  RelationshipType: RelationshipType;
  IntroducedVersion?: string;
}

/**
 * A RelationshipMetadataBase value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedRelationshipMetadataBase =
  | (ManyToManyRelationshipMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata";
    })
  | (OneToManyRelationshipMetadata & {
      "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata";
    });
