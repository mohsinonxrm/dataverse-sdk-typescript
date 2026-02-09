/**
 * AttributeMapping
 */
export interface AttributeMapping {
  AttributeMappingId?: string;
  MappingName?: string;
  AttributeCrmName?: string;
  AttributeExchangeName?: string;
  SyncDirection?: number;
  DefaultSyncDirection?: number;
  AllowedSyncDirection?: number;
  IsComputed?: boolean;
  EntityTypeCode?: number;
  ComputedProperties?: string[];
  AttributeCrmDisplayName?: string;
  AttributeExchangeDisplayName?: string;
}
