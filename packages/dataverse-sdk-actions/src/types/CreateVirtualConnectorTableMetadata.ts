import type { VirtualTableColumnCandidate } from "./VirtualTableColumnCandidate.js";

/**
 * CreateVirtualConnectorTableMetadata complex type
 */
export interface CreateVirtualConnectorTableMetadata {
  ConnectionId?: string;
  DatasetValue?: string;
  SolutionId?: string;
  PrimaryFieldName?: string;
  PrimaryKeyName?: string;
  UseEnvironmentVariableForDataset?: boolean;
  VirtualTableColumns?: VirtualTableColumnCandidate[];
  ExternalName?: string;
  Name?: string;
  PluralName?: string;
  SchemaName?: string;
  ConnectionReferenceId?: string;
  ConnectionReferenceDisplayName?: string;
  ConnectionReferenceLogicalName?: string;
  DataSourceId?: string;
  DataSourceName?: string;
}
