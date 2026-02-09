/**
 * QueryMetadata complex type
 */
export interface QueryMetadata {
  QueryId: string;
  ReturnedTypeCode: string;
  ComponentState: number;
  Name: string;
  Description: string;
  FetchXml: string;
  LayoutXml: string;
  IsDefault: boolean;
  ModifiedOn: string;
  QueryApi: string;
  QueryType: number;
  IsCustomizable: boolean;
}
