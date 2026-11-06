import type { VirtualTableColumnCandidate } from './VirtualTableColumnCandidate.js';

/**
 * CreateVirtualConnectorTableMetadata complex type
 */
export interface CreateVirtualConnectorTableMetadata {
  ConnectionId?: string;
  ConnectionReferenceDisplayName?: string;
  ConnectionReferenceId?: string;
  ConnectionReferenceLogicalName?: string;
  DataSourceId?: string;
  DataSourceName?: string;
  DatasetValue?: string;
  ExternalName?: string;
  Name?: string;
  PluralName?: string;
  PrimaryFieldName?: string;
  PrimaryKeyName?: string;
  SchemaName?: string;
  SolutionId?: string;
  UseEnvironmentVariableForDataset?: boolean;
  VirtualTableColumns?: VirtualTableColumnCandidate[];
  EnvironmentVariables?: Record<string, unknown>[];
}
