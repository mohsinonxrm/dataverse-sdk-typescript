// Public exports for this package
export { OrganizationService } from "./OrganizationService.js";
export type {
  EntityRecord,
  ExpandOption,
  OrganizationServiceOptions,
  OperationOptions,
  CreateOptions,
  RetrieveOptions,
  RetrieveMultipleOptions,
  RetrieveMultipleResult,
  UpdateOptions,
  DeleteOptions,
  AssociateOptions,
  DisassociateOptions,
} from "./types.js";

// The SDK's one EntityReference (#295), the same one actions, functions and messages export
export {
  type EntityReference,
  type EntityReferenceOptions,
  type WebApiEntityReference,
  createEntityReference,
  getEntitySetNameFromReference,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
