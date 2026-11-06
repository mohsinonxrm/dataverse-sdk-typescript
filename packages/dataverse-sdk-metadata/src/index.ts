/**
 * Public exports for @mohsinonxrm/dataverse-sdk-metadata
 */

// Main client
export { MetadataClient } from "./MetadataClient.js";
export type { MetadataQueryOptions, MetadataWriteOptions } from "./MetadataClient.js";

// All metadata types
export * from "./types/index.js";
