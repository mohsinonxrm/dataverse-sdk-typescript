/**
 * Web API Action Messages
 *
 * Auto-generated TypeScript wrappers for Dataverse Web API actions.
 * Use with IOrganizationService.execute() for C#-familiar patterns.
 */

// Base classes and types
export { OrganizationRequest, OrganizationResponse } from './OrganizationRequest.js';
export type { OrganizationRequestOptions } from './OrganizationRequest.js';
export type { EntityReference, EntityReferenceOptions } from './EntityReference.js';
export { createEntityReference, type WebApiEntityReference } from './EntityReference.js';
export type { AnyEntityPayload, EntityPayload } from './types/EntityPayload.js';
export type { MessageRequest, MessageResponse } from './types.js';

// Message classes
export { AddToTeam_savedqueryRequest, AddToTeam_savedqueryResponse } from './AddToTeam_savedqueryMessage.js';
export { AddToTeam_systemuserRequest, AddToTeam_systemuserResponse } from './AddToTeam_systemuserMessage.js';
export { ExportToExcelRequest, type ExportToExcelRequestParameters, ExportToExcelResponse } from './ExportToExcelMessage.js';
export { ShareRecordRequest, type ShareRecordRequestParameters, ShareRecordResponse } from './ShareRecordMessage.js';
export { ShareRecord_teamRequest, type ShareRecord_teamRequestParameters, ShareRecord_teamResponse } from './ShareRecord_teamMessage.js';

// Enums
export { AccessRights } from './types/index.js';
