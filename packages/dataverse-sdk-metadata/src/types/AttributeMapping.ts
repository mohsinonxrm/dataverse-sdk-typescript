/**
 * AttributeMapping
 */
export interface AttributeMapping {
  AllowedSyncDirection?: number;
  AttributeCrmDisplayName?: string;
  AttributeCrmName?: string;
  AttributeExchangeDisplayName?: string;
  AttributeExchangeName?: string;
  AttributeMappingId?: string;
  ComputedProperties?: string[];
  DefaultSyncDirection?: number;
  EntityTypeCode?: number;
  IsComputed?: boolean;
  MappingName?: string;
  SyncDirection?: number;
}
