/**
 * Temporary type definitions for SDK responses while SDK packages are being implemented
 * These will be replaced by actual exports from SDK packages
 */

// API Response base types
export interface ODataResponse<T = any> {
  value: T[];
  "@odata.nextLink"?: string;
  "@odata.count"?: number;
}

// Function responses
export interface WhoAmIResponse {
  UserId: string;
  BusinessUnitId: string;
  OrganizationId: string;
}

export interface RetrieveVersionResponse {
  Version: string;
}

export interface RetrievePrincipalAccessResponse {
  AccessRights: string;
}

// Action responses
export interface CreateMultipleResponse {
  Ids: string[];
}

export interface ExecuteWorkflowResponse {
  asyncoperationid: string;
}

// Message responses
export interface ExportSolutionResponse {
  ExportSolutionFile: string;
}

export interface ImportSolutionResponse {
  importjobid: string;
}

// Metadata responses
export interface CreateEntityResponse {
  MetadataId: string;
}

export interface CreateAttributeResponse {
  MetadataId: string;
}

export interface RetrieveMetadataChangesResponse {
  ServerVersionStamp: string;
  EntityMetadata: any[];
  DeletedMetadata: any;
}

// File operation responses
export interface InitializeFileBlocksUploadResponse {
  FileContinuationToken: string;
}

export interface DownloadFileResponse {
  [columnName: string]: string; // base64 data
  filename: string;
  mimetype: string;
}

// Relationship responses
export interface CreateRecordResponse {
  [idField: string]: string; // e.g., contactid, accountid
}

// General API response
export interface ApiResponse {
  [key: string]: any;
}
