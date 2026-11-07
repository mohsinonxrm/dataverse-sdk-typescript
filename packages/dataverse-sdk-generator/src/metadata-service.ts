/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import type { DataverseGenConfig } from "./types.js";

/**
 * Service for retrieving metadata from Dataverse
 */
export class MetadataService {
  private baseUrl: string;
  private accessToken?: string;

  constructor(
    private config: DataverseGenConfig,
    accessToken?: string
  ) {
    const url = config.environmentUrl.replace(/\/$/, "");
    const version = config.apiVersion ?? "v9.2";
    this.baseUrl = `${url}/api/data/${version}`;
    this.accessToken = accessToken;
  }

  /**
   * Set the access token for authenticated requests
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Retrieve the CSDL $metadata document
   */
  async getEdmxMetadata(): Promise<string> {
    const url = `${this.baseUrl}/$metadata`;

    const headers: Record<string, string> = {
      Accept: "application/xml",
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch $metadata: ${String(response.status)} ${response.statusText}`
      );
    }

    return await response.text();
  }

  /**
   * Retrieve entity metadata via RetrieveMetadataChanges for a single entity
   * Used to enrich CSDL data with detailed attribute information
   * Reference: scottdurow/dataverse-gen MetadataService.ts#L47-L79
   *
   * RetrieveMetadataChanges is a function, so it is called with GET and the query is passed as
   * a parameter alias: `RetrieveMetadataChanges(Query=@q)?@q={...}`.
   */
  async getEntityMetadata(logicalName: string): Promise<RetrieveMetadataChangesResponse> {
    const query = {
      Criteria: {
        Conditions: [
          {
            PropertyName: "LogicalName",
            ConditionOperator: "Equals",
            Value: {
              Value: logicalName,
              Type: "System.String",
            },
          },
        ],
        FilterOperator: "And",
      },
      Properties: {
        PropertyNames: [
          "Attributes",
          "SchemaName",
          "EntitySetName",
          "Keys",
          "PrimaryIdAttribute",
          "PrimaryNameAttribute",
        ],
      },
      AttributeQuery: {
        Properties: {
          PropertyNames: [
            "SchemaName",
            "LogicalName",
            "OptionSet",
            "RequiredLevel",
            "AttributeType",
            "AttributeTypeName",
            "SourceType",
            "Targets",
            "DisplayName",
            "Description",
            "AttributeOf",
            "DateTimeBehavior",
            "Format",
            "MaxLength",
            "Precision",
            "IsPrimaryId",
            "IsPrimaryName",
            "IsValidForRead",
            "IsValidForCreate",
            "IsValidForUpdate",
            "IsValidForAdvancedFind",
          ],
        },
      },
    };

    const url = `${this.baseUrl}/RetrieveMetadataChanges(Query=@q)?@q=${encodeURIComponent(JSON.stringify(query))}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve entity metadata for ${logicalName}: ${String(response.status)} ${response.statusText}\n${errorText}`
      );
    }

    const result = await response.json();
    return result as RetrieveMetadataChangesResponse;
  }
}

/**
 * Response from RetrieveMetadataChanges API
 */
export interface RetrieveMetadataChangesResponse {
  EntityMetadata?: EntityMetadataDetail[];
  ServerVersionStamp?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DeletedMetadata?: any;
}

/**
 * Detailed entity metadata from RetrieveMetadataChanges
 */
export interface EntityMetadataDetail {
  LogicalName?: string;
  SchemaName?: string;
  EntitySetName?: string;
  PrimaryIdAttribute?: string;
  PrimaryNameAttribute?: string;
  Attributes?: AttributeMetadataDetail[];
  Keys?: EntityKeyMetadata[];
  ManyToOneRelationships?: RelationshipMetadata[];
  OneToManyRelationships?: RelationshipMetadata[];
  MetadataId?: string;
}

/** `RequiredLevel.Value` as the Web API sends it (the enum member name). */
export type AttributeRequiredLevel =
  "None" | "SystemRequired" | "ApplicationRequired" | "Recommended";

/**
 * Detailed attribute metadata
 */
export interface AttributeMetadataDetail {
  LogicalName?: string;
  SchemaName?: string;
  AttributeType?: string;
  AttributeTypeName?: { Value?: string };
  SourceType?: number; // 0 = simple, 1 = calculated, 2 = rollup
  /** The Web API sends the AttributeRequiredLevel member name, not a number. */
  RequiredLevel?: {
    Value?: AttributeRequiredLevel;
    CanBeChanged?: boolean;
    ManagedPropertyLogicalName?: string;
  };
  AttributeOf?: string; // For 'virtual' attributes that reference a base attribute
  IsPrimaryId?: boolean;
  IsPrimaryName?: boolean;
  IsValidForRead?: boolean;
  IsValidForCreate?: boolean;
  IsValidForUpdate?: boolean;
  IsValidForAdvancedFind?: boolean;
  DisplayName?: Label;
  Description?: Label;
  // Lookup-specific
  Targets?: string[]; // For polymorphic lookups
  // Option Set-specific
  OptionSet?: OptionSetMetadata;
  // DateTime-specific
  DateTimeBehavior?: { Value?: string };
  Format?: string;
  // String-specific
  MaxLength?: number;
  // Decimal/Money-specific
  Precision?: number;
  // Additional type-specific metadata can be added as needed
}

/**
 * Label with localized text
 */
export interface Label {
  LocalizedLabels?: LocalizedLabel[];
  UserLocalizedLabel?: LocalizedLabel;
}

/**
 * Localized label
 */
export interface LocalizedLabel {
  Label?: string;
  LanguageCode?: number;
}

/**
 * Option set metadata
 */
export interface OptionSetMetadata {
  MetadataId?: string;
  Name?: string;
  DisplayName?: Label;
  Description?: Label;
  OptionSetType?: string; // "Picklist" or "State" or "Status"
  IsGlobal?: boolean;
  IsManaged?: boolean;
  IsCustomOptionSet?: boolean;
  Options?: OptionMetadata[];
}

/**
 * Individual option metadata
 */
export interface OptionMetadata {
  Value?: number;
  Label?: Label;
  Color?: string | null;
  IsManaged?: boolean;
  MetadataId?: string | null;
  Description?: Label;
}

/**
 * Entity key (alternate key) metadata
 */
export interface EntityKeyMetadata {
  LogicalName?: string;
  SchemaName?: string;
  DisplayName?: Label;
  KeyAttributes?: string[];
  EntityLogicalName?: string;
  MetadataId?: string;
}

/**
 * Relationship metadata
 */
export interface RelationshipMetadata {
  SchemaName?: string;
  ReferencedEntity?: string;
  ReferencedAttribute?: string;
  ReferencingEntity?: string;
  ReferencingAttribute?: string;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingEntityNavigationPropertyName?: string;
}
