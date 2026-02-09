export interface PageResponse<T> {
  value: T[];
  "@odata.nextLink"?: string;
}
