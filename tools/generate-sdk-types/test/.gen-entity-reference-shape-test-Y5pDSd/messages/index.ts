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
export { AddPrincipalToQueueRequest, type AddPrincipalToQueueRequestParameters, AddPrincipalToQueueResponse } from './AddPrincipalToQueueMessage.js';
export { MergeRequest, type MergeRequestParameters, MergeResponse } from './MergeMessage.js';
export { WinOpportunityRequest, type WinOpportunityRequestParameters, WinOpportunityResponse } from './WinOpportunityMessage.js';
