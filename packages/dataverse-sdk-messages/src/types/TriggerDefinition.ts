/**
 * TriggerDefinition complex type
 */
export interface TriggerDefinition {
  DisplayName?: string;
  PrimaryEntityLogicalName?: string;
  PrimaryEntityDisplayName?: string;
  SdkMessageId?: string;
  SdkMessageName?: string;
  CatalogUniqueName?: string;
  CatalogDisplayName?: string;
  SubCatalogUniqueName?: string;
  SubCatalogDisplayName?: string;
  EventType?: string;
  PrimaryEntityId?: string;
  CatalogId?: string;
  SubCatalogId?: string;
  OpenApiOperationIdName?: string;
}
