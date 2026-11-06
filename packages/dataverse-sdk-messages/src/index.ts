/**
 * Web API Action Messages
 *
 * Auto-generated TypeScript wrappers for Dataverse Web API actions.
 * Use with IOrganizationService.execute() for C#-familiar patterns.
 */

// Base classes and types
export { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
export type { OrganizationRequestOptions } from "./OrganizationRequest.js";
export type { EntityReference, EntityReferenceOptions } from "./EntityReference.js";
export { createEntityReference, type WebApiEntityReference } from "./EntityReference.js";
export type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
export type { MessageRequest, MessageResponse } from "./types.js";

// Message classes
export {
  _CloneRoutingRuleSetRequest,
  type _CloneRoutingRuleSetRequestParameters,
  _CloneRoutingRuleSetResponse,
} from "./_CloneRoutingRuleSetMessage.js";
export {
  _DownloademailasattachmentRequest,
  type _DownloademailasattachmentRequestParameters,
  _DownloademailasattachmentResponse,
} from "./_DownloademailasattachmentMessage.js";
export {
  _EvaluateRuleAndRouteRequest,
  type _EvaluateRuleAndRouteRequestParameters,
  _EvaluateRuleAndRouteResponse,
} from "./_EvaluateRuleAndRouteMessage.js";
export {
  _EvaluateSearchRequestRequest,
  type _EvaluateSearchRequestRequestParameters,
  _EvaluateSearchRequestResponse,
} from "./_EvaluateSearchRequestMessage.js";
export {
  _GetServiceTreeDataRequest,
  type _GetServiceTreeDataRequestParameters,
  _GetServiceTreeDataResponse,
} from "./_GetServiceTreeDataMessage.js";
export {
  _InvokeHideReserveEntitiesRequest,
  _InvokeHideReserveEntitiesResponse,
} from "./_InvokeHideReserveEntitiesMessage.js";
export {
  _MoveRoutingRuleItemAtRequest,
  type _MoveRoutingRuleItemAtRequestParameters,
  _MoveRoutingRuleItemAtResponse,
} from "./_MoveRoutingRuleItemAtMessage.js";
export {
  _RemoveMarketingListMembersByIdsRequest,
  type _RemoveMarketingListMembersByIdsRequestParameters,
  _RemoveMarketingListMembersByIdsResponse,
} from "./_RemoveMarketingListMembersByIdsMessage.js";
export {
  _ResourcesAddUpdateActionRequest,
  type _ResourcesAddUpdateActionRequestParameters,
  _ResourcesAddUpdateActionResponse,
} from "./_ResourcesAddUpdateActionMessage.js";
export {
  _ResourcesRemoveUpdateActionRequest,
  type _ResourcesRemoveUpdateActionRequestParameters,
  _ResourcesRemoveUpdateActionResponse,
} from "./_ResourcesRemoveUpdateActionMessage.js";
export {
  _RetrieveActivitiesByResourcesRequest,
  type _RetrieveActivitiesByResourcesRequestParameters,
  _RetrieveActivitiesByResourcesResponse,
} from "./_RetrieveActivitiesByResourcesMessage.js";
export {
  _RoutingRuleSetValidationRequest,
  type _RoutingRuleSetValidationRequestParameters,
  _RoutingRuleSetValidationResponse,
} from "./_RoutingRuleSetValidationMessage.js";
export {
  _SaveServiceTreeDataRequest,
  type _SaveServiceTreeDataRequestParameters,
  _SaveServiceTreeDataResponse,
} from "./_SaveServiceTreeDataMessage.js";
export {
  _ServiceCalendarActionRequest,
  type _ServiceCalendarActionRequestParameters,
  _ServiceCalendarActionResponse,
} from "./_ServiceCalendarActionMessage.js";
export {
  _SkillToUserRequest,
  type _SkillToUserRequestParameters,
  _SkillToUserResponse,
} from "./_SkillToUserMessage.js";
export {
  _SyncKnowledgeManagementSettingsRequest,
  _SyncKnowledgeManagementSettingsResponse,
} from "./_SyncKnowledgeManagementSettingsMessage.js";
export {
  _ValidateAndAllocateBusinessCardReaderCurrencyRequest,
  _ValidateAndAllocateBusinessCardReaderCurrencyResponse,
} from "./_ValidateAndAllocateBusinessCardReaderCurrencyMessage.js";
export {
  AddAppComponentsRequest,
  type AddAppComponentsRequestParameters,
  AddAppComponentsResponse,
} from "./AddAppComponentsMessage.js";
export {
  AddCertificateCredentialRequest,
  type AddCertificateCredentialRequestParameters,
  AddCertificateCredentialResponse,
} from "./AddCertificateCredentialMessage.js";
export {
  AddChannelAccessProfilePrivilegesRequest,
  type AddChannelAccessProfilePrivilegesRequestParameters,
  AddChannelAccessProfilePrivilegesResponse,
} from "./AddChannelAccessProfilePrivilegesMessage.js";
export {
  AddComponentsToSolutionAsyncRequest,
  type AddComponentsToSolutionAsyncRequestParameters,
  AddComponentsToSolutionAsyncResponse,
} from "./AddComponentsToSolutionAsyncMessage.js";
export {
  AddComponentToSolutionAsyncRequest,
  type AddComponentToSolutionAsyncRequestParameters,
  AddComponentToSolutionAsyncResponse,
} from "./AddComponentToSolutionAsyncMessage.js";
export {
  AddItemCampaign_campaignRequest,
  type AddItemCampaign_campaignRequestParameters,
  AddItemCampaign_campaignResponse,
} from "./AddItemCampaign_campaignMessage.js";
export {
  AddItemCampaign_listRequest,
  type AddItemCampaign_listRequestParameters,
  AddItemCampaign_listResponse,
} from "./AddItemCampaign_listMessage.js";
export {
  AddItemCampaign_productRequest,
  type AddItemCampaign_productRequestParameters,
  AddItemCampaign_productResponse,
} from "./AddItemCampaign_productMessage.js";
export {
  AddItemCampaign_salesliteratureRequest,
  type AddItemCampaign_salesliteratureRequestParameters,
  AddItemCampaign_salesliteratureResponse,
} from "./AddItemCampaign_salesliteratureMessage.js";
export {
  AddItemCampaignActivityRequest,
  type AddItemCampaignActivityRequestParameters,
  AddItemCampaignActivityResponse,
} from "./AddItemCampaignActivityMessage.js";
export {
  AddListMembersListRequest,
  type AddListMembersListRequestParameters,
  AddListMembersListResponse,
} from "./AddListMembersListMessage.js";
export {
  AddMemberListRequest,
  type AddMemberListRequestParameters,
  AddMemberListResponse,
} from "./AddMemberListMessage.js";
export {
  AddMembersBatchListRequest,
  type AddMembersBatchListRequestParameters,
  AddMembersBatchListResponse,
} from "./AddMembersBatchListMessage.js";
export {
  AddMembersTeamRequest,
  type AddMembersTeamRequestParameters,
  AddMembersTeamResponse,
} from "./AddMembersTeamMessage.js";
export {
  AddPrincipalToQueueRequest,
  type AddPrincipalToQueueRequestParameters,
  AddPrincipalToQueueResponse,
} from "./AddPrincipalToQueueMessage.js";
export {
  AddPrivilegesRoleRequest,
  type AddPrivilegesRoleRequestParameters,
  AddPrivilegesRoleResponse,
} from "./AddPrivilegesRoleMessage.js";
export {
  AddRecurrenceRequest,
  type AddRecurrenceRequestParameters,
  AddRecurrenceResponse,
} from "./AddRecurrenceMessage.js";
export {
  AddRequiredDesktopFlowComponentsToSolutionsRequest,
  AddRequiredDesktopFlowComponentsToSolutionsResponse,
} from "./AddRequiredDesktopFlowComponentsToSolutionsMessage.js";
export {
  AddRequiredUIElementCollectionComponentsToSolutionsRequest,
  AddRequiredUIElementCollectionComponentsToSolutionsResponse,
} from "./AddRequiredUIElementCollectionComponentsToSolutionsMessage.js";
export {
  AddSolutionComponentRequest,
  type AddSolutionComponentRequestParameters,
  AddSolutionComponentResponse,
} from "./AddSolutionComponentMessage.js";
export {
  AddToFeedbackLoopRequest,
  type AddToFeedbackLoopRequestParameters,
  AddToFeedbackLoopResponse,
} from "./AddToFeedbackLoopMessage.js";
export {
  AddToQueueRequest,
  type AddToQueueRequestParameters,
  AddToQueueResponse,
} from "./AddToQueueMessage.js";
export {
  AddUserToRecordTeamRequest,
  type AddUserToRecordTeamRequestParameters,
  AddUserToRecordTeamResponse,
} from "./AddUserToRecordTeamMessage.js";
export {
  AddWorkQueueItemProcessingHistoryEntryRequest,
  type AddWorkQueueItemProcessingHistoryEntryRequestParameters,
  AddWorkQueueItemProcessingHistoryEntryResponse,
} from "./AddWorkQueueItemProcessingHistoryEntryMessage.js";
export {
  adx_AzureBlobStorageEnabledRequest,
  adx_AzureBlobStorageEnabledResponse,
} from "./adx_AzureBlobStorageEnabledMessage.js";
export {
  adx_AzureBlobStorageUrlRequest,
  type adx_AzureBlobStorageUrlRequestParameters,
  adx_AzureBlobStorageUrlResponse,
} from "./adx_AzureBlobStorageUrlMessage.js";
export {
  adx_GenerateSharedAccessSignatureRequest,
  type adx_GenerateSharedAccessSignatureRequestParameters,
  adx_GenerateSharedAccessSignatureResponse,
} from "./adx_GenerateSharedAccessSignatureMessage.js";
export {
  adx_SendEmailConfirmationToContactRequest,
  type adx_SendEmailConfirmationToContactRequestParameters,
  adx_SendEmailConfirmationToContactResponse,
} from "./adx_SendEmailConfirmationToContactMessage.js";
export {
  adx_SendEmailTwoFactorCodeToContactRequest,
  type adx_SendEmailTwoFactorCodeToContactRequestParameters,
  adx_SendEmailTwoFactorCodeToContactResponse,
} from "./adx_SendEmailTwoFactorCodeToContactMessage.js";
export {
  adx_SendPasswordResetToContactRequest,
  type adx_SendPasswordResetToContactRequestParameters,
  adx_SendPasswordResetToContactResponse,
} from "./adx_SendPasswordResetToContactMessage.js";
export {
  AIClassifyRequest,
  type AIClassifyRequestParameters,
  AIClassifyResponse,
} from "./AIClassifyMessage.js";
export {
  AIExtractRequest,
  type AIExtractRequestParameters,
  AIExtractResponse,
} from "./AIExtractMessage.js";
export {
  AIModelPublishRequest,
  type AIModelPublishRequestParameters,
  AIModelPublishResponse,
} from "./AIModelPublishMessage.js";
export {
  AIReplyRequest,
  type AIReplyRequestParameters,
  AIReplyResponse,
} from "./AIReplyMessage.js";
export {
  AISentimentRequest,
  type AISentimentRequestParameters,
  AISentimentResponse,
} from "./AISentimentMessage.js";
export {
  AISummarizeRequest,
  type AISummarizeRequestParameters,
  AISummarizeResponse,
} from "./AISummarizeMessage.js";
export {
  AISummarizeRecordRequest,
  type AISummarizeRecordRequestParameters,
  AISummarizeRecordResponse,
} from "./AISummarizeRecordMessage.js";
export {
  AITranslateRequest,
  type AITranslateRequestParameters,
  AITranslateResponse,
} from "./AITranslateMessage.js";
export {
  AlmHandlerRequest,
  type AlmHandlerRequestParameters,
  AlmHandlerResponse,
} from "./AlmHandlerMessage.js";
export {
  AnalyzeRequest,
  type AnalyzeRequestParameters,
  AnalyzeResponse,
} from "./AnalyzeMessage.js";
export {
  AnalyzeSentimentRequest,
  type AnalyzeSentimentRequestParameters,
  AnalyzeSentimentResponse,
} from "./AnalyzeSentimentMessage.js";
export {
  AppendRelatedPartyRequest,
  type AppendRelatedPartyRequestParameters,
  AppendRelatedPartyResponse,
} from "./AppendRelatedPartyMessage.js";
export {
  ApplyRecordCreationAndUpdateRuleRequest,
  type ApplyRecordCreationAndUpdateRuleRequestParameters,
  ApplyRecordCreationAndUpdateRuleResponse,
} from "./ApplyRecordCreationAndUpdateRuleMessage.js";
export {
  ApplyRoutingRuleRequest,
  type ApplyRoutingRuleRequestParameters,
  ApplyRoutingRuleResponse,
} from "./ApplyRoutingRuleMessage.js";
export {
  AutoMapEntityRequest,
  type AutoMapEntityRequestParameters,
  AutoMapEntityResponse,
} from "./AutoMapEntityMessage.js";
export {
  BackgroundSendEmailRequest,
  type BackgroundSendEmailRequestParameters,
  BackgroundSendEmailResponse,
} from "./BackgroundSendEmailMessage.js";
export {
  BatchGetFlowMachineStatusRequest,
  type BatchGetFlowMachineStatusRequestParameters,
  BatchGetFlowMachineStatusResponse,
} from "./BatchGetFlowMachineStatusMessage.js";
export {
  BatchPredictionRequest,
  type BatchPredictionRequestParameters,
  BatchPredictionResponse,
} from "./BatchPredictionMessage.js";
export {
  BeginMachineImageProvisioningRequest,
  type BeginMachineImageProvisioningRequestParameters,
  BeginMachineImageProvisioningResponse,
} from "./BeginMachineImageProvisioningMessage.js";
export { BookRequest, type BookRequestParameters, BookResponse } from "./BookMessage.js";
export {
  BulkDeleteRequest,
  type BulkDeleteRequestParameters,
  BulkDeleteResponse,
} from "./BulkDeleteMessage.js";
export {
  BulkDetectDuplicatesRequest,
  type BulkDetectDuplicatesRequestParameters,
  BulkDetectDuplicatesResponse,
} from "./BulkDetectDuplicatesMessage.js";
export {
  BulkRemoveActiveCustomizationsAsyncRequest,
  type BulkRemoveActiveCustomizationsAsyncRequestParameters,
  BulkRemoveActiveCustomizationsAsyncResponse,
} from "./BulkRemoveActiveCustomizationsAsyncMessage.js";
export {
  BulkRetainRequest,
  type BulkRetainRequestParameters,
  BulkRetainResponse,
} from "./BulkRetainMessage.js";
export {
  CalculateActualValueOpportunityRequest,
  CalculateActualValueOpportunityResponse,
} from "./CalculateActualValueOpportunityMessage.js";
export {
  CalculatePriceRequest,
  type CalculatePriceRequestParameters,
  CalculatePriceResponse,
} from "./CalculatePriceMessage.js";
export {
  CanBeReferencedRequest,
  type CanBeReferencedRequestParameters,
  CanBeReferencedResponse,
} from "./CanBeReferencedMessage.js";
export {
  CanBeReferencingRequest,
  type CanBeReferencingRequestParameters,
  CanBeReferencingResponse,
} from "./CanBeReferencingMessage.js";
export {
  CancelAllCloudFlowRunsRequest,
  CancelAllCloudFlowRunsResponse,
} from "./CancelAllCloudFlowRunsMessage.js";
export {
  CancelContractRequest,
  type CancelContractRequestParameters,
  CancelContractResponse,
} from "./CancelContractMessage.js";
export {
  CancelDesktopFlowRunRequest,
  CancelDesktopFlowRunResponse,
} from "./CancelDesktopFlowRunMessage.js";
export {
  CancelSalesOrderRequest,
  type CancelSalesOrderRequestParameters,
  CancelSalesOrderResponse,
} from "./CancelSalesOrderMessage.js";
export {
  CancelTrainingRequest,
  type CancelTrainingRequestParameters,
  CancelTrainingResponse,
} from "./CancelTrainingMessage.js";
export {
  CanManyToManyRequest,
  type CanManyToManyRequestParameters,
  CanManyToManyResponse,
} from "./CanManyToManyMessage.js";
export {
  CardCreateCloneRequest,
  type CardCreateCloneRequestParameters,
  CardCreateCloneResponse,
} from "./CardCreateCloneMessage.js";
export {
  CardGetFullJsonRequest,
  type CardGetFullJsonRequestParameters,
  CardGetFullJsonResponse,
} from "./CardGetFullJsonMessage.js";
export {
  cascadeAsync_SuccessAPIRequest,
  type cascadeAsync_SuccessAPIRequestParameters,
  cascadeAsync_SuccessAPIResponse,
} from "./cascadeAsync_SuccessAPIMessage.js";
export {
  CategorizeTextRequest,
  type CategorizeTextRequestParameters,
  CategorizeTextResponse,
} from "./CategorizeTextMessage.js";
export {
  CCaaS_AcceptConversationRequest,
  type CCaaS_AcceptConversationRequestParameters,
  CCaaS_AcceptConversationResponse,
} from "./CCaaS_AcceptConversationMessage.js";
export {
  CCaaS_AddChannelToConversationRequest,
  type CCaaS_AddChannelToConversationRequestParameters,
  CCaaS_AddChannelToConversationResponse,
} from "./CCaaS_AddChannelToConversationMessage.js";
export {
  CCaaS_AgentEndConversationRequest,
  type CCaaS_AgentEndConversationRequestParameters,
  CCaaS_AgentEndConversationResponse,
} from "./CCaaS_AgentEndConversationMessage.js";
export {
  CCaaS_AssignConversationRequest,
  type CCaaS_AssignConversationRequestParameters,
  CCaaS_AssignConversationResponse,
} from "./CCaaS_AssignConversationMessage.js";
export {
  CCaaS_BroadcastMessageRequest,
  type CCaaS_BroadcastMessageRequestParameters,
  CCaaS_BroadcastMessageResponse,
} from "./CCaaS_BroadcastMessageMessage.js";
export {
  CCaaS_BulkForceCloseRequest,
  type CCaaS_BulkForceCloseRequestParameters,
  CCaaS_BulkForceCloseResponse,
} from "./CCaaS_BulkForceCloseMessage.js";
export {
  CCaaS_BulkQueueAssignmentRequest,
  type CCaaS_BulkQueueAssignmentRequestParameters,
  CCaaS_BulkQueueAssignmentResponse,
} from "./CCaaS_BulkQueueAssignmentMessage.js";
export {
  CCaaS_CancelConsultRequest,
  type CCaaS_CancelConsultRequestParameters,
  CCaaS_CancelConsultResponse,
} from "./CCaaS_CancelConsultMessage.js";
export {
  CCaaS_CloseConsultRequest,
  type CCaaS_CloseConsultRequestParameters,
  CCaaS_CloseConsultResponse,
} from "./CCaaS_CloseConsultMessage.js";
export {
  CCaaS_CloseConversationRequest,
  type CCaaS_CloseConversationRequestParameters,
  CCaaS_CloseConversationResponse,
} from "./CCaaS_CloseConversationMessage.js";
export {
  CCaaS_ConversationTimeoutRequest,
  type CCaaS_ConversationTimeoutRequestParameters,
  CCaaS_ConversationTimeoutResponse,
} from "./CCaaS_ConversationTimeoutMessage.js";
export {
  CCaaS_CreateConnectionRequest,
  type CCaaS_CreateConnectionRequestParameters,
  CCaaS_CreateConnectionResponse,
} from "./CCaaS_CreateConnectionMessage.js";
export {
  CCaaS_EndSecondaryChannelRequest,
  type CCaaS_EndSecondaryChannelRequestParameters,
  CCaaS_EndSecondaryChannelResponse,
} from "./CCaaS_EndSecondaryChannelMessage.js";
export {
  CCaaS_EndSessionRequest,
  type CCaaS_EndSessionRequestParameters,
  CCaaS_EndSessionResponse,
} from "./CCaaS_EndSessionMessage.js";
export {
  CCaaS_ForceCloseConversationRequest,
  type CCaaS_ForceCloseConversationRequestParameters,
  CCaaS_ForceCloseConversationResponse,
} from "./CCaaS_ForceCloseConversationMessage.js";
export {
  CCaaS_GetAvailabilityForConversationRequest,
  type CCaaS_GetAvailabilityForConversationRequestParameters,
  CCaaS_GetAvailabilityForConversationResponse,
} from "./CCaaS_GetAvailabilityForConversationMessage.js";
export {
  CCaaS_GetAvailabilityForSimulatedConversationRequest,
  type CCaaS_GetAvailabilityForSimulatedConversationRequestParameters,
  CCaaS_GetAvailabilityForSimulatedConversationResponse,
} from "./CCaaS_GetAvailabilityForSimulatedConversationMessage.js";
export {
  CCaaS_GetRepresentativeAvailabilityBeforeConversationRequest,
  type CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters,
  CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse,
} from "./CCaaS_GetRepresentativeAvailabilityBeforeConversationMessage.js";
export {
  CCaaS_GetRepresentativeAvailabilityForConversationRequest,
  type CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters,
  CCaaS_GetRepresentativeAvailabilityForConversationResponse,
} from "./CCaaS_GetRepresentativeAvailabilityForConversationMessage.js";
export {
  CCaaS_InitiateAgentConsultRequest,
  type CCaaS_InitiateAgentConsultRequestParameters,
  CCaaS_InitiateAgentConsultResponse,
} from "./CCaaS_InitiateAgentConsultMessage.js";
export {
  CCaaS_InitiateAgentConsultExternalRequest,
  type CCaaS_InitiateAgentConsultExternalRequestParameters,
  CCaaS_InitiateAgentConsultExternalResponse,
} from "./CCaaS_InitiateAgentConsultExternalMessage.js";
export {
  CCaaS_InitiateAgentGroupAssignmentRequest,
  type CCaaS_InitiateAgentGroupAssignmentRequestParameters,
  CCaaS_InitiateAgentGroupAssignmentResponse,
} from "./CCaaS_InitiateAgentGroupAssignmentMessage.js";
export {
  CCaaS_InitiateAgentGroupConsultRequest,
  type CCaaS_InitiateAgentGroupConsultRequestParameters,
  CCaaS_InitiateAgentGroupConsultResponse,
} from "./CCaaS_InitiateAgentGroupConsultMessage.js";
export {
  CCaaS_InitiateAgentGroupTransferRequest,
  type CCaaS_InitiateAgentGroupTransferRequestParameters,
  CCaaS_InitiateAgentGroupTransferResponse,
} from "./CCaaS_InitiateAgentGroupTransferMessage.js";
export {
  CCaaS_InitiateAgentTransferRequest,
  type CCaaS_InitiateAgentTransferRequestParameters,
  CCaaS_InitiateAgentTransferResponse,
} from "./CCaaS_InitiateAgentTransferMessage.js";
export {
  CCaaS_InitiateAgentTransferBySupervisorRequest,
  type CCaaS_InitiateAgentTransferBySupervisorRequestParameters,
  CCaaS_InitiateAgentTransferBySupervisorResponse,
} from "./CCaaS_InitiateAgentTransferBySupervisorMessage.js";
export {
  CCaaS_InitiateAgentTransferExternalRequest,
  type CCaaS_InitiateAgentTransferExternalRequestParameters,
  CCaaS_InitiateAgentTransferExternalResponse,
} from "./CCaaS_InitiateAgentTransferExternalMessage.js";
export {
  CCaaS_InitiateQueueAssignmentRequest,
  type CCaaS_InitiateQueueAssignmentRequestParameters,
  CCaaS_InitiateQueueAssignmentResponse,
} from "./CCaaS_InitiateQueueAssignmentMessage.js";
export {
  CCaaS_InitiateQueueConsultRequest,
  type CCaaS_InitiateQueueConsultRequestParameters,
  CCaaS_InitiateQueueConsultResponse,
} from "./CCaaS_InitiateQueueConsultMessage.js";
export {
  CCaaS_InitiateQueueTransferRequest,
  type CCaaS_InitiateQueueTransferRequestParameters,
  CCaaS_InitiateQueueTransferResponse,
} from "./CCaaS_InitiateQueueTransferMessage.js";
export {
  CCaaS_JoinConversationRequest,
  type CCaaS_JoinConversationRequestParameters,
  CCaaS_JoinConversationResponse,
} from "./CCaaS_JoinConversationMessage.js";
export {
  CCaaS_LeavePublicConsultRequest,
  type CCaaS_LeavePublicConsultRequestParameters,
  CCaaS_LeavePublicConsultResponse,
} from "./CCaaS_LeavePublicConsultMessage.js";
export {
  CCaaS_MaskMessageRequest,
  type CCaaS_MaskMessageRequestParameters,
  CCaaS_MaskMessageResponse,
} from "./CCaaS_MaskMessageMessage.js";
export {
  CCaaS_ModifyAgentPresenceRequest,
  type CCaaS_ModifyAgentPresenceRequestParameters,
  CCaaS_ModifyAgentPresenceResponse,
} from "./CCaaS_ModifyAgentPresenceMessage.js";
export {
  CCaaS_MonitorConversationRequest,
  type CCaaS_MonitorConversationRequestParameters,
  CCaaS_MonitorConversationResponse,
} from "./CCaaS_MonitorConversationMessage.js";
export {
  CCaaS_NotifyAgentRequest,
  type CCaaS_NotifyAgentRequestParameters,
  CCaaS_NotifyAgentResponse,
} from "./CCaaS_NotifyAgentMessage.js";
export {
  CCaaS_PickConversationRequest,
  type CCaaS_PickConversationRequestParameters,
  CCaaS_PickConversationResponse,
} from "./CCaaS_PickConversationMessage.js";
export {
  CCaaS_RaiseSecondaryChannelEventRequest,
  type CCaaS_RaiseSecondaryChannelEventRequestParameters,
  CCaaS_RaiseSecondaryChannelEventResponse,
} from "./CCaaS_RaiseSecondaryChannelEventMessage.js";
export {
  CCaaS_RejectConversationRequest,
  type CCaaS_RejectConversationRequestParameters,
  CCaaS_RejectConversationResponse,
} from "./CCaaS_RejectConversationMessage.js";
export {
  CCaaS_RejoinConversationRequest,
  type CCaaS_RejoinConversationRequestParameters,
  CCaaS_RejoinConversationResponse,
} from "./CCaaS_RejoinConversationMessage.js";
export {
  CCaaS_ResetAgentPresenceRequest,
  type CCaaS_ResetAgentPresenceRequestParameters,
  CCaaS_ResetAgentPresenceResponse,
} from "./CCaaS_ResetAgentPresenceMessage.js";
export {
  CCaaS_SendAgentTypingIndicatorRequest,
  type CCaaS_SendAgentTypingIndicatorRequestParameters,
  CCaaS_SendAgentTypingIndicatorResponse,
} from "./CCaaS_SendAgentTypingIndicatorMessage.js";
export {
  CCaaS_SendAHTEventsRequest,
  type CCaaS_SendAHTEventsRequestParameters,
  CCaaS_SendAHTEventsResponse,
} from "./CCaaS_SendAHTEventsMessage.js";
export {
  CCaaS_SendHeartbeatRequest,
  type CCaaS_SendHeartbeatRequestParameters,
  CCaaS_SendHeartbeatResponse,
} from "./CCaaS_SendHeartbeatMessage.js";
export {
  CCaaS_SetPresenceRequest,
  type CCaaS_SetPresenceRequestParameters,
  CCaaS_SetPresenceResponse,
} from "./CCaaS_SetPresenceMessage.js";
export {
  CCaaS_StartSecondaryChannelRequest,
  type CCaaS_StartSecondaryChannelRequestParameters,
  CCaaS_StartSecondaryChannelResponse,
} from "./CCaaS_StartSecondaryChannelMessage.js";
export {
  CCaaS_UserLogoutRequest,
  type CCaaS_UserLogoutRequestParameters,
  CCaaS_UserLogoutResponse,
} from "./CCaaS_UserLogoutMessage.js";
export { ClearWorkQueueRequest, ClearWorkQueueResponse } from "./ClearWorkQueueMessage.js";
export {
  CloneAsPatchRequest,
  type CloneAsPatchRequestParameters,
  CloneAsPatchResponse,
} from "./CloneAsPatchMessage.js";
export {
  CloneAsSolutionRequest,
  type CloneAsSolutionRequestParameters,
  CloneAsSolutionResponse,
} from "./CloneAsSolutionMessage.js";
export {
  CloneContractRequest,
  type CloneContractRequestParameters,
  CloneContractResponse,
} from "./CloneContractMessage.js";
export {
  CloneMobileOfflineProfileRequest,
  CloneMobileOfflineProfileResponse,
} from "./CloneMobileOfflineProfileMessage.js";
export { CloneProductRequest, CloneProductResponse } from "./CloneProductMessage.js";
export {
  CloseIncidentRequest,
  type CloseIncidentRequestParameters,
  CloseIncidentResponse,
} from "./CloseIncidentMessage.js";
export {
  CloseQuoteRequest,
  type CloseQuoteRequestParameters,
  CloseQuoteResponse,
} from "./CloseQuoteMessage.js";
export {
  CommitAnnotationBlocksUploadRequest,
  type CommitAnnotationBlocksUploadRequestParameters,
  CommitAnnotationBlocksUploadResponse,
} from "./CommitAnnotationBlocksUploadMessage.js";
export {
  CommitAttachmentBlocksUploadRequest,
  type CommitAttachmentBlocksUploadRequestParameters,
  CommitAttachmentBlocksUploadResponse,
} from "./CommitAttachmentBlocksUploadMessage.js";
export {
  CommitFileBlocksUploadRequest,
  type CommitFileBlocksUploadRequestParameters,
  CommitFileBlocksUploadResponse,
} from "./CommitFileBlocksUploadMessage.js";
export {
  CommitToGitRequest,
  type CommitToGitRequestParameters,
  CommitToGitResponse,
} from "./CommitToGitMessage.js";
export {
  CompoundUpdateDuplicateDetectionRuleRequest,
  type CompoundUpdateDuplicateDetectionRuleRequestParameters,
  CompoundUpdateDuplicateDetectionRuleResponse,
} from "./CompoundUpdateDuplicateDetectionRuleMessage.js";
export {
  ComputeSlaWorkQueueItemRequest,
  ComputeSlaWorkQueueItemResponse,
} from "./ComputeSlaWorkQueueItemMessage.js";
export {
  ConfirmConsentCodeRequest,
  type ConfirmConsentCodeRequestParameters,
  ConfirmConsentCodeResponse,
} from "./ConfirmConsentCodeMessage.js";
export {
  ConnectToGitRequest,
  type ConnectToGitRequestParameters,
  ConnectToGitResponse,
} from "./ConnectToGitMessage.js";
export {
  ConvertOwnerTeamToAccessTeamRequest,
  ConvertOwnerTeamToAccessTeamResponse,
} from "./ConvertOwnerTeamToAccessTeamMessage.js";
export {
  ConvertQuoteToSalesOrderRequest,
  type ConvertQuoteToSalesOrderRequestParameters,
  ConvertQuoteToSalesOrderResponse,
} from "./ConvertQuoteToSalesOrderMessage.js";
export {
  ConvertSalesOrderToInvoiceRequest,
  type ConvertSalesOrderToInvoiceRequestParameters,
  ConvertSalesOrderToInvoiceResponse,
} from "./ConvertSalesOrderToInvoiceMessage.js";
export {
  copilotquerytextcontextRequest,
  type copilotquerytextcontextRequestParameters,
  copilotquerytextcontextResponse,
} from "./copilotquerytextcontextMessage.js";
export {
  CopyCampaignRequest,
  type CopyCampaignRequestParameters,
  CopyCampaignResponse,
} from "./CopyCampaignMessage.js";
export {
  CopyCampaignResponseRequest,
  CopyCampaignResponseResponse,
} from "./CopyCampaignResponseMessage.js";
export {
  CopyDynamicListToStaticRequest,
  CopyDynamicListToStaticResponse,
} from "./CopyDynamicListToStaticMessage.js";
export {
  CopyMembersListRequest,
  type CopyMembersListRequestParameters,
  CopyMembersListResponse,
} from "./CopyMembersListMessage.js";
export {
  CopySystemFormRequest,
  type CopySystemFormRequestParameters,
  CopySystemFormResponse,
} from "./CopySystemFormMessage.js";
export {
  CreateActivitiesListRequest,
  type CreateActivitiesListRequestParameters,
  CreateActivitiesListResponse,
} from "./CreateActivitiesListMessage.js";
export {
  CreateAndSendNewEmailRequest,
  type CreateAndSendNewEmailRequestParameters,
  CreateAndSendNewEmailResponse,
} from "./CreateAndSendNewEmailMessage.js";
export {
  CreateAsyncJobToRevokeInheritedAccessRequest,
  type CreateAsyncJobToRevokeInheritedAccessRequestParameters,
  CreateAsyncJobToRevokeInheritedAccessResponse,
} from "./CreateAsyncJobToRevokeInheritedAccessMessage.js";
export {
  CreateCustomerRelationshipsRequest,
  type CreateCustomerRelationshipsRequestParameters,
  CreateCustomerRelationshipsResponse,
} from "./CreateCustomerRelationshipsMessage.js";
export {
  CreateExceptionRequest,
  type CreateExceptionRequestParameters,
  CreateExceptionResponse,
} from "./CreateExceptionMessage.js";
export {
  CreateFlowCredentialApplicationRequest,
  type CreateFlowCredentialApplicationRequestParameters,
  CreateFlowCredentialApplicationResponse,
} from "./CreateFlowCredentialApplicationMessage.js";
export {
  CreateFlowMachineNetworkRequest,
  type CreateFlowMachineNetworkRequestParameters,
  CreateFlowMachineNetworkResponse,
} from "./CreateFlowMachineNetworkMessage.js";
export {
  CreateHostedFlowMachineGroupRequest,
  type CreateHostedFlowMachineGroupRequestParameters,
  CreateHostedFlowMachineGroupResponse,
} from "./CreateHostedFlowMachineGroupMessage.js";
export {
  CreateInstanceRequest,
  type CreateInstanceRequestParameters,
  CreateInstanceResponse,
} from "./CreateInstanceMessage.js";
export {
  CreateKnowledgeArticleTranslationRequest,
  type CreateKnowledgeArticleTranslationRequestParameters,
  CreateKnowledgeArticleTranslationResponse,
} from "./CreateKnowledgeArticleTranslationMessage.js";
export {
  CreateKnowledgeArticleVersionRequest,
  type CreateKnowledgeArticleVersionRequestParameters,
  CreateKnowledgeArticleVersionResponse,
} from "./CreateKnowledgeArticleVersionMessage.js";
export {
  CreateMiniCampaignV2Request,
  type CreateMiniCampaignV2RequestParameters,
  CreateMiniCampaignV2Response,
} from "./CreateMiniCampaignV2Message.js";
export {
  CreateMultipleRequest,
  type CreateMultipleRequestParameters,
  CreateMultipleResponse,
} from "./CreateMultipleMessage.js";
export {
  CreateNPSUserRatingRequest,
  type CreateNPSUserRatingRequestParameters,
  CreateNPSUserRatingResponse,
} from "./CreateNPSUserRatingMessage.js";
export {
  CreatePolymorphicLookupAttributeRequest,
  type CreatePolymorphicLookupAttributeRequestParameters,
  CreatePolymorphicLookupAttributeResponse,
} from "./CreatePolymorphicLookupAttributeMessage.js";
export {
  CreateRoleWithPrivilegeCheckerRunRequest,
  type CreateRoleWithPrivilegeCheckerRunRequestParameters,
  CreateRoleWithPrivilegeCheckerRunResponse,
} from "./CreateRoleWithPrivilegeCheckerRunMessage.js";
export {
  CreateRpaBoxRequest,
  type CreateRpaBoxRequestParameters,
  CreateRpaBoxResponse,
} from "./CreateRpaBoxMessage.js";
export {
  CreateVirtualConnectorTableRequest,
  type CreateVirtualConnectorTableRequestParameters,
  CreateVirtualConnectorTableResponse,
} from "./CreateVirtualConnectorTableMessage.js";
export {
  CreateWorkflowFromTemplateRequest,
  type CreateWorkflowFromTemplateRequestParameters,
  CreateWorkflowFromTemplateResponse,
} from "./CreateWorkflowFromTemplateMessage.js";
export {
  cv_UpdateInviteRequest,
  type cv_UpdateInviteRequestParameters,
  cv_UpdateInviteResponse,
} from "./cv_UpdateInviteMessage.js";
export {
  DeactivateEntityKeyRequest,
  type DeactivateEntityKeyRequestParameters,
  DeactivateEntityKeyResponse,
} from "./DeactivateEntityKeyMessage.js";
export {
  DeleteAndPromoteRequest,
  type DeleteAndPromoteRequestParameters,
  DeleteAndPromoteResponse,
} from "./DeleteAndPromoteMessage.js";
export {
  DeleteAndPromoteAsyncRequest,
  type DeleteAndPromoteAsyncRequestParameters,
  DeleteAndPromoteAsyncResponse,
} from "./DeleteAndPromoteAsyncMessage.js";
export {
  DeleteAuditDataRequest,
  type DeleteAuditDataRequestParameters,
  DeleteAuditDataResponse,
} from "./DeleteAuditDataMessage.js";
export {
  DeleteAutomatedPluginRequest,
  type DeleteAutomatedPluginRequestParameters,
  DeleteAutomatedPluginResponse,
} from "./DeleteAutomatedPluginMessage.js";
export {
  DeleteFileRequest,
  type DeleteFileRequestParameters,
  DeleteFileResponse,
} from "./DeleteFileMessage.js";
export {
  DeleteFlowMachineGroupRequest,
  DeleteFlowMachineGroupResponse,
} from "./DeleteFlowMachineGroupMessage.js";
export {
  DeleteInstantPluginRequest,
  type DeleteInstantPluginRequestParameters,
  DeleteInstantPluginResponse,
} from "./DeleteInstantPluginMessage.js";
export {
  DeleteMultipleRequest,
  type DeleteMultipleRequestParameters,
  DeleteMultipleResponse,
} from "./DeleteMultipleMessage.js";
export {
  DeleteOpenInstancesRequest,
  type DeleteOpenInstancesRequestParameters,
  DeleteOpenInstancesResponse,
} from "./DeleteOpenInstancesMessage.js";
export {
  DeleteOptionValueRequest,
  type DeleteOptionValueRequestParameters,
  DeleteOptionValueResponse,
} from "./DeleteOptionValueMessage.js";
export {
  DeleteOQOILineWithSkipPricingCalculationRequest,
  type DeleteOQOILineWithSkipPricingCalculationRequestParameters,
  DeleteOQOILineWithSkipPricingCalculationResponse,
} from "./DeleteOQOILineWithSkipPricingCalculationMessage.js";
export {
  DeleteRecordChangeHistoryRequest,
  type DeleteRecordChangeHistoryRequestParameters,
  DeleteRecordChangeHistoryResponse,
} from "./DeleteRecordChangeHistoryMessage.js";
export {
  DeliverImmediatePromoteEmailRequest,
  type DeliverImmediatePromoteEmailRequestParameters,
  DeliverImmediatePromoteEmailResponse,
} from "./DeliverImmediatePromoteEmailMessage.js";
export {
  DeliverIncomingEmailRequest,
  type DeliverIncomingEmailRequestParameters,
  DeliverIncomingEmailResponse,
} from "./DeliverIncomingEmailMessage.js";
export {
  DeliverPromoteEmailRequest,
  type DeliverPromoteEmailRequestParameters,
  DeliverPromoteEmailResponse,
} from "./DeliverPromoteEmailMessage.js";
export {
  DeprovisionLanguageRequest,
  type DeprovisionLanguageRequestParameters,
  DeprovisionLanguageResponse,
} from "./DeprovisionLanguageMessage.js";
export {
  DequeueRequest,
  type DequeueRequestParameters,
  DequeueResponse,
} from "./DequeueMessage.js";
export {
  DetectLanguageRequest,
  type DetectLanguageRequestParameters,
  DetectLanguageResponse,
} from "./DetectLanguageMessage.js";
export {
  DisconnectFromGitRequest,
  type DisconnectFromGitRequestParameters,
  DisconnectFromGitResponse,
} from "./DisconnectFromGitMessage.js";
export {
  DiscoverFabricAISkillsRequest,
  type DiscoverFabricAISkillsRequestParameters,
  DiscoverFabricAISkillsResponse,
} from "./DiscoverFabricAISkillsMessage.js";
export {
  DiscoverFabricWorkspacesRequest,
  type DiscoverFabricWorkspacesRequestParameters,
  DiscoverFabricWorkspacesResponse,
} from "./DiscoverFabricWorkspacesMessage.js";
export {
  DistributeCampaignActivityRequest,
  type DistributeCampaignActivityRequestParameters,
  DistributeCampaignActivityResponse,
} from "./DistributeCampaignActivityMessage.js";
export {
  DownloadBlockRequest,
  type DownloadBlockRequestParameters,
  DownloadBlockResponse,
} from "./DownloadBlockMessage.js";
export {
  DownloadSolutionExportDataRequest,
  type DownloadSolutionExportDataRequestParameters,
  DownloadSolutionExportDataResponse,
} from "./DownloadSolutionExportDataMessage.js";
export {
  ExecuteFxExpressionRequest,
  type ExecuteFxExpressionRequestParameters,
  ExecuteFxExpressionResponse,
} from "./ExecuteFxExpressionMessage.js";
export {
  ExecuteWorkflowRequest,
  type ExecuteWorkflowRequestParameters,
  ExecuteWorkflowResponse,
} from "./ExecuteWorkflowMessage.js";
export {
  ExportMappingsImportMapRequest,
  type ExportMappingsImportMapRequestParameters,
  ExportMappingsImportMapResponse,
} from "./ExportMappingsImportMapMessage.js";
export {
  ExportRetainedDataRequest,
  type ExportRetainedDataRequestParameters,
  ExportRetainedDataResponse,
} from "./ExportRetainedDataMessage.js";
export {
  ExportSolutionRequest,
  type ExportSolutionRequestParameters,
  ExportSolutionResponse,
} from "./ExportSolutionMessage.js";
export {
  ExportSolutionAsyncRequest,
  type ExportSolutionAsyncRequestParameters,
  ExportSolutionAsyncResponse,
} from "./ExportSolutionAsyncMessage.js";
export {
  ExportSolutionFromGitRequest,
  type ExportSolutionFromGitRequestParameters,
  ExportSolutionFromGitResponse,
} from "./ExportSolutionFromGitMessage.js";
export {
  ExportSolutionFromGitAsyncRequest,
  type ExportSolutionFromGitAsyncRequestParameters,
  ExportSolutionFromGitAsyncResponse,
} from "./ExportSolutionFromGitAsyncMessage.js";
export {
  ExportToExcelRequest,
  type ExportToExcelRequestParameters,
  ExportToExcelResponse,
} from "./ExportToExcelMessage.js";
export {
  ExportTranslationRequest,
  type ExportTranslationRequestParameters,
  ExportTranslationResponse,
} from "./ExportTranslationMessage.js";
export {
  ExtractKeyPhrasesRequest,
  type ExtractKeyPhrasesRequestParameters,
  ExtractKeyPhrasesResponse,
} from "./ExtractKeyPhrasesMessage.js";
export {
  ExtractTextEntitiesRequest,
  type ExtractTextEntitiesRequestParameters,
  ExtractTextEntitiesResponse,
} from "./ExtractTextEntitiesMessage.js";
export {
  FormPredictRequest,
  type FormPredictRequestParameters,
  FormPredictResponse,
} from "./FormPredictMessage.js";
export {
  FulfillSalesOrderRequest,
  type FulfillSalesOrderRequestParameters,
  FulfillSalesOrderResponse,
} from "./FulfillSalesOrderMessage.js";
export {
  FullTextSearchKnowledgeArticleRequest,
  type FullTextSearchKnowledgeArticleRequestParameters,
  FullTextSearchKnowledgeArticleResponse,
} from "./FullTextSearchKnowledgeArticleMessage.js";
export {
  GenerateAutomatedPluginRequest,
  type GenerateAutomatedPluginRequestParameters,
  GenerateAutomatedPluginResponse,
} from "./GenerateAutomatedPluginMessage.js";
export {
  GenerateInstantPluginRequest,
  type GenerateInstantPluginRequestParameters,
  GenerateInstantPluginResponse,
} from "./GenerateInstantPluginMessage.js";
export {
  GenerateInvoiceFromOpportunityRequest,
  type GenerateInvoiceFromOpportunityRequestParameters,
  GenerateInvoiceFromOpportunityResponse,
} from "./GenerateInvoiceFromOpportunityMessage.js";
export {
  GeneratePowerFxFormulaRequest,
  type GeneratePowerFxFormulaRequestParameters,
  GeneratePowerFxFormulaResponse,
} from "./GeneratePowerFxFormulaMessage.js";
export {
  GenerateQuoteFromOpportunityRequest,
  type GenerateQuoteFromOpportunityRequestParameters,
  GenerateQuoteFromOpportunityResponse,
} from "./GenerateQuoteFromOpportunityMessage.js";
export {
  GenerateSalesOrderFromOpportunityRequest,
  type GenerateSalesOrderFromOpportunityRequestParameters,
  GenerateSalesOrderFromOpportunityResponse,
} from "./GenerateSalesOrderFromOpportunityMessage.js";
export {
  GenerateSharedLinkRequest,
  type GenerateSharedLinkRequestParameters,
  GenerateSharedLinkResponse,
} from "./GenerateSharedLinkMessage.js";
export {
  GenerateSocialProfileRequest,
  type GenerateSocialProfileRequestParameters,
  GenerateSocialProfileResponse,
} from "./GenerateSocialProfileMessage.js";
export {
  GetAuditStorageDetailsRequest,
  GetAuditStorageDetailsResponse,
} from "./GetAuditStorageDetailsMessage.js";
export {
  GetAutoNumberSeedRequest,
  type GetAutoNumberSeedRequestParameters,
  GetAutoNumberSeedResponse,
} from "./GetAutoNumberSeedMessage.js";
export {
  GetCertificateCredentialRequest,
  type GetCertificateCredentialRequestParameters,
  GetCertificateCredentialResponse,
} from "./GetCertificateCredentialMessage.js";
export {
  GetConsentLinkRequest,
  type GetConsentLinkRequestParameters,
  GetConsentLinkResponse,
} from "./GetConsentLinkMessage.js";
export {
  GetEntityLinkChatConfigRequest,
  type GetEntityLinkChatConfigRequestParameters,
  GetEntityLinkChatConfigResponse,
} from "./GetEntityLinkChatConfigMessage.js";
export {
  GetFeatureControlStringSettingsForNamespaceWithUserContextRequest,
  type GetFeatureControlStringSettingsForNamespaceWithUserContextRequestParameters,
  GetFeatureControlStringSettingsForNamespaceWithUserContextResponse,
} from "./GetFeatureControlStringSettingsForNamespaceWithUserContextMessage.js";
export {
  GetInvoiceProductsFromOpportunityRequest,
  type GetInvoiceProductsFromOpportunityRequestParameters,
  GetInvoiceProductsFromOpportunityResponse,
} from "./GetInvoiceProductsFromOpportunityMessage.js";
export {
  GetJobStatusRequest,
  type GetJobStatusRequestParameters,
  GetJobStatusResponse,
} from "./GetJobStatusMessage.js";
export {
  GetLinkedChatsRequest,
  type GetLinkedChatsRequestParameters,
  GetLinkedChatsResponse,
} from "./GetLinkedChatsMessage.js";
export {
  GetNextAutoNumberValueRequest,
  type GetNextAutoNumberValueRequestParameters,
  GetNextAutoNumberValueResponse,
} from "./GetNextAutoNumberValueMessage.js";
export {
  GetOrCreateSharedWorkspaceRequest,
  type GetOrCreateSharedWorkspaceRequestParameters,
  GetOrCreateSharedWorkspaceResponse,
} from "./GetOrCreateSharedWorkspaceMessage.js";
export {
  GetPBIReportRefreshStatusRequest,
  type GetPBIReportRefreshStatusRequestParameters,
  GetPBIReportRefreshStatusResponse,
} from "./GetPBIReportRefreshStatusMessage.js";
export { GetPublicKeyRequest, GetPublicKeyResponse } from "./GetPublicKeyMessage.js";
export {
  GetQuoteProductsFromOpportunityRequest,
  type GetQuoteProductsFromOpportunityRequestParameters,
  GetQuoteProductsFromOpportunityResponse,
} from "./GetQuoteProductsFromOpportunityMessage.js";
export {
  GetRunMapRequest,
  type GetRunMapRequestParameters,
  GetRunMapResponse,
} from "./GetRunMapMessage.js";
export {
  GetSalesOrderProductsFromOpportunityRequest,
  type GetSalesOrderProductsFromOpportunityRequestParameters,
  GetSalesOrderProductsFromOpportunityResponse,
} from "./GetSalesOrderProductsFromOpportunityMessage.js";
export {
  GetTrackingTokenEmailRequest,
  type GetTrackingTokenEmailRequestParameters,
  GetTrackingTokenEmailResponse,
} from "./GetTrackingTokenEmailMessage.js";
export {
  GrantAccessRequest,
  type GrantAccessRequestParameters,
  GrantAccessResponse,
} from "./GrantAccessMessage.js";
export {
  GrantAccessUsingSharedLinkRequest,
  type GrantAccessUsingSharedLinkRequestParameters,
  GrantAccessUsingSharedLinkResponse,
} from "./GrantAccessUsingSharedLinkMessage.js";
export {
  GrantDelegatedAccessRequest,
  type GrantDelegatedAccessRequestParameters,
  GrantDelegatedAccessResponse,
} from "./GrantDelegatedAccessMessage.js";
export {
  ImmediateBookRequest,
  type ImmediateBookRequestParameters,
  ImmediateBookResponse,
} from "./ImmediateBookMessage.js";
export {
  ImportCardTypeSchemaRequest,
  type ImportCardTypeSchemaRequestParameters,
  ImportCardTypeSchemaResponse,
} from "./ImportCardTypeSchemaMessage.js";
export {
  ImportFieldTranslationRequest,
  type ImportFieldTranslationRequestParameters,
  ImportFieldTranslationResponse,
} from "./ImportFieldTranslationMessage.js";
export {
  ImportMappingsImportMapRequest,
  type ImportMappingsImportMapRequestParameters,
  ImportMappingsImportMapResponse,
} from "./ImportMappingsImportMapMessage.js";
export {
  ImportRecordsImportRequest,
  ImportRecordsImportResponse,
} from "./ImportRecordsImportMessage.js";
export {
  ImportSolutionRequest,
  type ImportSolutionRequestParameters,
  ImportSolutionResponse,
} from "./ImportSolutionMessage.js";
export {
  ImportSolutionAsyncRequest,
  type ImportSolutionAsyncRequestParameters,
  ImportSolutionAsyncResponse,
} from "./ImportSolutionAsyncMessage.js";
export {
  ImportSolutionsRequest,
  type ImportSolutionsRequestParameters,
  ImportSolutionsResponse,
} from "./ImportSolutionsMessage.js";
export {
  ImportTranslationRequest,
  type ImportTranslationRequestParameters,
  ImportTranslationResponse,
} from "./ImportTranslationMessage.js";
export {
  ImportTranslationAsyncRequest,
  type ImportTranslationAsyncRequestParameters,
  ImportTranslationAsyncResponse,
} from "./ImportTranslationAsyncMessage.js";
export {
  InferEntityDefinitionRequest,
  type InferEntityDefinitionRequestParameters,
  InferEntityDefinitionResponse,
} from "./InferEntityDefinitionMessage.js";
export { IngestRequest, type IngestRequestParameters, IngestResponse } from "./IngestMessage.js";
export {
  InitializeAnnotationBlocksDownloadRequest,
  type InitializeAnnotationBlocksDownloadRequestParameters,
  InitializeAnnotationBlocksDownloadResponse,
} from "./InitializeAnnotationBlocksDownloadMessage.js";
export {
  InitializeAnnotationBlocksUploadRequest,
  type InitializeAnnotationBlocksUploadRequestParameters,
  InitializeAnnotationBlocksUploadResponse,
} from "./InitializeAnnotationBlocksUploadMessage.js";
export {
  InitializeAttachmentBlocksDownloadRequest,
  type InitializeAttachmentBlocksDownloadRequestParameters,
  InitializeAttachmentBlocksDownloadResponse,
} from "./InitializeAttachmentBlocksDownloadMessage.js";
export {
  InitializeAttachmentBlocksUploadRequest,
  type InitializeAttachmentBlocksUploadRequestParameters,
  InitializeAttachmentBlocksUploadResponse,
} from "./InitializeAttachmentBlocksUploadMessage.js";
export {
  InitializeFileBlocksDownloadRequest,
  type InitializeFileBlocksDownloadRequestParameters,
  InitializeFileBlocksDownloadResponse,
} from "./InitializeFileBlocksDownloadMessage.js";
export {
  InitializeFileBlocksUploadRequest,
  type InitializeFileBlocksUploadRequestParameters,
  InitializeFileBlocksUploadResponse,
} from "./InitializeFileBlocksUploadMessage.js";
export {
  InitializeModernFlowFromAsyncWorkflowRequest,
  InitializeModernFlowFromAsyncWorkflowResponse,
} from "./InitializeModernFlowFromAsyncWorkflowMessage.js";
export {
  InitializeTemporaryFileBlocksUploadRequest,
  type InitializeTemporaryFileBlocksUploadRequestParameters,
  InitializeTemporaryFileBlocksUploadResponse,
} from "./InitializeTemporaryFileBlocksUploadMessage.js";
export {
  InsertOptionValueRequest,
  type InsertOptionValueRequestParameters,
  InsertOptionValueResponse,
} from "./InsertOptionValueMessage.js";
export {
  InsertStatusValueRequest,
  type InsertStatusValueRequestParameters,
  InsertStatusValueResponse,
} from "./InsertStatusValueMessage.js";
export {
  installRequest,
  type installRequestParameters,
  installResponse,
} from "./installMessage.js";
export { InstallSampleDataRequest, InstallSampleDataResponse } from "./InstallSampleDataMessage.js";
export {
  InstantiateFiltersRequest,
  type InstantiateFiltersRequestParameters,
  InstantiateFiltersResponse,
} from "./InstantiateFiltersMessage.js";
export {
  InstantiateTemplateRequest,
  type InstantiateTemplateRequestParameters,
  InstantiateTemplateResponse,
} from "./InstantiateTemplateMessage.js";
export {
  InstantiateTemplateGenericRequest,
  type InstantiateTemplateGenericRequestParameters,
  InstantiateTemplateGenericResponse,
} from "./InstantiateTemplateGenericMessage.js";
export { IsPaiEnabledRequest, IsPaiEnabledResponse } from "./IsPaiEnabledMessage.js";
export { IsPmEnabledRequest, IsPmEnabledResponse } from "./IsPmEnabledMessage.js";
export {
  JoinLinkedChatRequest,
  type JoinLinkedChatRequestParameters,
  JoinLinkedChatResponse,
} from "./JoinLinkedChatMessage.js";
export { LeaveGroupRequest, LeaveGroupResponse } from "./LeaveGroupMessage.js";
export {
  ListChildDesktopFlowsRequest,
  ListChildDesktopFlowsResponse,
} from "./ListChildDesktopFlowsMessage.js";
export {
  ListConnectionReferencesRequest,
  ListConnectionReferencesResponse,
} from "./ListConnectionReferencesMessage.js";
export {
  LockInvoicePricingRequest,
  LockInvoicePricingResponse,
} from "./LockInvoicePricingMessage.js";
export {
  LockSalesOrderPricingRequest,
  LockSalesOrderPricingResponse,
} from "./LockSalesOrderPricingMessage.js";
export {
  LoseOpportunityRequest,
  type LoseOpportunityRequestParameters,
  LoseOpportunityResponse,
} from "./LoseOpportunityMessage.js";
export {
  McpCreateTableRequest,
  type McpCreateTableRequestParameters,
  McpCreateTableResponse,
} from "./McpCreateTableMessage.js";
export {
  McpUpdateTableRequest,
  type McpUpdateTableRequestParameters,
  McpUpdateTableResponse,
} from "./McpUpdateTableMessage.js";
export { MergeRequest, type MergeRequestParameters, MergeResponse } from "./MergeMessage.js";
export {
  ModifyAccessRequest,
  type ModifyAccessRequestParameters,
  ModifyAccessResponse,
} from "./ModifyAccessMessage.js";
export {
  msdn_evaluationplanorchestratorRequest,
  type msdn_evaluationplanorchestratorRequestParameters,
  msdn_evaluationplanorchestratorResponse,
} from "./msdn_evaluationplanorchestratorMessage.js";
export {
  msdyn_AcquireTokenRequest,
  type msdyn_AcquireTokenRequestParameters,
  msdyn_AcquireTokenResponse,
} from "./msdyn_AcquireTokenMessage.js";
export {
  msdyn_AcsForceSyncActionRequest,
  type msdyn_AcsForceSyncActionRequestParameters,
  msdyn_AcsForceSyncActionResponse,
} from "./msdyn_AcsForceSyncActionMessage.js";
export {
  msdyn_ActionCardActionLoggerRequest,
  type msdyn_ActionCardActionLoggerRequestParameters,
  msdyn_ActionCardActionLoggerResponse,
} from "./msdyn_ActionCardActionLoggerMessage.js";
export {
  msdyn_ActionCardCreateRequest,
  type msdyn_ActionCardCreateRequestParameters,
  msdyn_ActionCardCreateResponse,
} from "./msdyn_ActionCardCreateMessage.js";
export {
  msdyn_ActivateProcessesRequest,
  type msdyn_ActivateProcessesRequestParameters,
  msdyn_ActivateProcessesResponse,
} from "./msdyn_ActivateProcessesMessage.js";
export {
  msdyn_ActivateRoutingRuleRequest,
  type msdyn_ActivateRoutingRuleRequestParameters,
  msdyn_ActivateRoutingRuleResponse,
} from "./msdyn_ActivateRoutingRuleMessage.js";
export {
  msdyn_ActivateSdkMessageProcessingStepsRequest,
  type msdyn_ActivateSdkMessageProcessingStepsRequestParameters,
  msdyn_ActivateSdkMessageProcessingStepsResponse,
} from "./msdyn_ActivateSdkMessageProcessingStepsMessage.js";
export {
  msdyn_ActivateWorkflowRequest,
  type msdyn_ActivateWorkflowRequestParameters,
  msdyn_ActivateWorkflowResponse,
} from "./msdyn_ActivateWorkflowMessage.js";
export {
  msdyn_AddBotUserRequest,
  type msdyn_AddBotUserRequestParameters,
  msdyn_AddBotUserResponse,
} from "./msdyn_AddBotUserMessage.js";
export {
  msdyn_AddSuggestedCardsRequest,
  type msdyn_AddSuggestedCardsRequestParameters,
  msdyn_AddSuggestedCardsResponse,
} from "./msdyn_AddSuggestedCardsMessage.js";
export {
  msdyn_AddTeamsAppToLinkedChatRequest,
  type msdyn_AddTeamsAppToLinkedChatRequestParameters,
  msdyn_AddTeamsAppToLinkedChatResponse,
} from "./msdyn_AddTeamsAppToLinkedChatMessage.js";
export {
  msdyn_AgentscriptDataMigrationCustomActionRequest,
  msdyn_AgentscriptDataMigrationCustomActionResponse,
} from "./msdyn_AgentscriptDataMigrationCustomActionMessage.js";
export {
  msdyn_AIBRealTimePredictRequest,
  type msdyn_AIBRealTimePredictRequestParameters,
  msdyn_AIBRealTimePredictResponse,
} from "./msdyn_AIBRealTimePredictMessage.js";
export {
  msdyn_AIEvaluationMetricsRequest,
  type msdyn_AIEvaluationMetricsRequestParameters,
  msdyn_AIEvaluationMetricsResponse,
} from "./msdyn_AIEvaluationMetricsMessage.js";
export {
  msdyn_AIEvaluationMetricsWrapperRequest,
  type msdyn_AIEvaluationMetricsWrapperRequestParameters,
  msdyn_AIEvaluationMetricsWrapperResponse,
} from "./msdyn_AIEvaluationMetricsWrapperMessage.js";
export {
  msdyn_AITestRunRequest,
  type msdyn_AITestRunRequestParameters,
  msdyn_AITestRunResponse,
} from "./msdyn_AITestRunMessage.js";
export {
  msdyn_AnalyticsSaveDataInConfigStoreRequest,
  type msdyn_AnalyticsSaveDataInConfigStoreRequestParameters,
  msdyn_AnalyticsSaveDataInConfigStoreResponse,
} from "./msdyn_AnalyticsSaveDataInConfigStoreMessage.js";
export {
  msdyn_AnalyzeServiceHealthRequest,
  msdyn_AnalyzeServiceHealthResponse,
} from "./msdyn_AnalyzeServiceHealthMessage.js";
export {
  msdyn_AnalyzeServiceHealthAsyncRequest,
  msdyn_AnalyzeServiceHealthAsyncResponse,
} from "./msdyn_AnalyzeServiceHealthAsyncMessage.js";
export {
  msdyn_ApplyPredictionRequest,
  type msdyn_ApplyPredictionRequestParameters,
  msdyn_ApplyPredictionResponse,
} from "./msdyn_ApplyPredictionMessage.js";
export {
  msdyn_ApplyRoutingRuleEntityRecordRequest,
  type msdyn_ApplyRoutingRuleEntityRecordRequestParameters,
  msdyn_ApplyRoutingRuleEntityRecordResponse,
} from "./msdyn_ApplyRoutingRuleEntityRecordMessage.js";
export {
  msdyn_applyworktemplateforresourcesRequest,
  type msdyn_applyworktemplateforresourcesRequestParameters,
  msdyn_applyworktemplateforresourcesResponse,
} from "./msdyn_applyworktemplateforresourcesMessage.js";
export {
  msdyn_AsExchangeEventRequest,
  type msdyn_AsExchangeEventRequestParameters,
  msdyn_AsExchangeEventResponse,
} from "./msdyn_AsExchangeEventMessage.js";
export {
  msdyn_assignentityRequest,
  type msdyn_assignentityRequestParameters,
  msdyn_assignentityResponse,
} from "./msdyn_assignentityMessage.js";
export {
  msdyn_assignentitysyncRequest,
  type msdyn_assignentitysyncRequestParameters,
  msdyn_assignentitysyncResponse,
} from "./msdyn_assignentitysyncMessage.js";
export {
  msdyn_AssignOwnerToUnassignedRecordsRequest,
  type msdyn_AssignOwnerToUnassignedRecordsRequestParameters,
  msdyn_AssignOwnerToUnassignedRecordsResponse,
} from "./msdyn_AssignOwnerToUnassignedRecordsMessage.js";
export {
  msdyn_AutoCaseClosureAgentCompleteSnaRequest,
  type msdyn_AutoCaseClosureAgentCompleteSnaRequestParameters,
  msdyn_AutoCaseClosureAgentCompleteSnaResponse,
} from "./msdyn_AutoCaseClosureAgentCompleteSnaMessage.js";
export {
  msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequest,
  type msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequestParameters,
  msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse,
} from "./msdyn_AutoCaseClosureAgentGenerateFollowupEmailMessage.js";
export {
  msdyn_AutoCloseExpiredConversationsRequest,
  msdyn_AutoCloseExpiredConversationsResponse,
} from "./msdyn_AutoCloseExpiredConversationsMessage.js";
export {
  msdyn_AutoLinkingLeadCustomActionRequest,
  type msdyn_AutoLinkingLeadCustomActionRequestParameters,
  msdyn_AutoLinkingLeadCustomActionResponse,
} from "./msdyn_AutoLinkingLeadCustomActionMessage.js";
export {
  msdyn_autonomousCaseCreateUpdateRequest,
  type msdyn_autonomousCaseCreateUpdateRequestParameters,
  msdyn_autonomousCaseCreateUpdateResponse,
} from "./msdyn_autonomousCaseCreateUpdateMessage.js";
export {
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequest,
  type msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters,
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse,
} from "./msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARMessage.js";
export {
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequest,
  type msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequestParameters,
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse,
} from "./msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultMessage.js";
export {
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequest,
  type msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequestParameters,
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse,
} from "./msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationMessage.js";
export {
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequest,
  type msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequestParameters,
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse,
} from "./msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsMessage.js";
export {
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequest,
  type msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequestParameters,
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse,
} from "./msdyn_AutonomousSQA_ProcessBANTAndPIExtractionMessage.js";
export {
  msdyn_AutonomousSQA_ProvisionMCSAgentsRequest,
  msdyn_AutonomousSQA_ProvisionMCSAgentsResponse,
} from "./msdyn_AutonomousSQA_ProvisionMCSAgentsMessage.js";
export {
  msdyn_AutonomousSQA_TriggerQualificationEvaluationRequest,
  type msdyn_AutonomousSQA_TriggerQualificationEvaluationRequestParameters,
  msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse,
} from "./msdyn_AutonomousSQA_TriggerQualificationEvaluationMessage.js";
export {
  msdyn_AutonomousSQA_UpdateSalesAgentRunRequest,
  type msdyn_AutonomousSQA_UpdateSalesAgentRunRequestParameters,
  msdyn_AutonomousSQA_UpdateSalesAgentRunResponse,
} from "./msdyn_AutonomousSQA_UpdateSalesAgentRunMessage.js";
export {
  msdyn_BookingResourceRequest,
  type msdyn_BookingResourceRequestParameters,
  msdyn_BookingResourceResponse,
} from "./msdyn_BookingResourceMessage.js";
export {
  msdyn_BookingResourceRequirementRequest,
  type msdyn_BookingResourceRequirementRequestParameters,
  msdyn_BookingResourceRequirementResponse,
} from "./msdyn_BookingResourceRequirementMessage.js";
export {
  msdyn_BookRequirementGroupRequest,
  type msdyn_BookRequirementGroupRequestParameters,
  msdyn_BookRequirementGroupResponse,
} from "./msdyn_BookRequirementGroupMessage.js";
export {
  msdyn_BulkAITestCaseUploadRequest,
  type msdyn_BulkAITestCaseUploadRequestParameters,
  msdyn_BulkAITestCaseUploadResponse,
} from "./msdyn_BulkAITestCaseUploadMessage.js";
export {
  msdyn_BulkAITestRunRequest,
  type msdyn_BulkAITestRunRequestParameters,
  msdyn_BulkAITestRunResponse,
} from "./msdyn_BulkAITestRunMessage.js";
export {
  msdyn_BusinessClosureDeleteRequest,
  type msdyn_BusinessClosureDeleteRequestParameters,
  msdyn_BusinessClosureDeleteResponse,
} from "./msdyn_BusinessClosureDeleteMessage.js";
export {
  msdyn_BusinessClosureRetrieveRequest,
  type msdyn_BusinessClosureRetrieveRequestParameters,
  msdyn_BusinessClosureRetrieveResponse,
} from "./msdyn_BusinessClosureRetrieveMessage.js";
export {
  msdyn_BusinessClosureSaveRequest,
  type msdyn_BusinessClosureSaveRequestParameters,
  msdyn_BusinessClosureSaveResponse,
} from "./msdyn_BusinessClosureSaveMessage.js";
export {
  msdyn_CalculateAndUpdateBookingTravelRequest,
  type msdyn_CalculateAndUpdateBookingTravelRequestParameters,
  msdyn_CalculateAndUpdateBookingTravelResponse,
} from "./msdyn_CalculateAndUpdateBookingTravelMessage.js";
export {
  msdyn_CalendarBulkDeleteRequest,
  type msdyn_CalendarBulkDeleteRequestParameters,
  msdyn_CalendarBulkDeleteResponse,
} from "./msdyn_CalendarBulkDeleteMessage.js";
export {
  msdyn_CancelBookingsRequest,
  type msdyn_CancelBookingsRequestParameters,
  msdyn_CancelBookingsResponse,
} from "./msdyn_CancelBookingsMessage.js";
export {
  msdyn_CancelDataProcessingModuleExecutionRequest,
  type msdyn_CancelDataProcessingModuleExecutionRequestParameters,
  msdyn_CancelDataProcessingModuleExecutionResponse,
} from "./msdyn_CancelDataProcessingModuleExecutionMessage.js";
export {
  msdyn_CancelMobileAppBuildRequest,
  type msdyn_CancelMobileAppBuildRequestParameters,
  msdyn_CancelMobileAppBuildResponse,
} from "./msdyn_CancelMobileAppBuildMessage.js";
export {
  msdyn_CapacityProfilesToUsersRequest,
  type msdyn_CapacityProfilesToUsersRequestParameters,
  msdyn_CapacityProfilesToUsersResponse,
} from "./msdyn_CapacityProfilesToUsersMessage.js";
export {
  msdyn_CascadeBookingChangesRequest,
  type msdyn_CascadeBookingChangesRequestParameters,
  msdyn_CascadeBookingChangesResponse,
} from "./msdyn_CascadeBookingChangesMessage.js";
export {
  msdyn_CascadeCrewBookingsRequest,
  type msdyn_CascadeCrewBookingsRequestParameters,
  msdyn_CascadeCrewBookingsResponse,
} from "./msdyn_CascadeCrewBookingsMessage.js";
export {
  msdyn_CascadeCrewMembershipsRequest,
  type msdyn_CascadeCrewMembershipsRequestParameters,
  msdyn_CascadeCrewMembershipsResponse,
} from "./msdyn_CascadeCrewMembershipsMessage.js";
export {
  msdyn_CaseClassificationRequest,
  type msdyn_CaseClassificationRequestParameters,
  msdyn_CaseClassificationResponse,
} from "./msdyn_CaseClassificationMessage.js";
export {
  msdyn_CECLiveDataMigrationCustomActionRequest,
  msdyn_CECLiveDataMigrationCustomActionResponse,
} from "./msdyn_CECLiveDataMigrationCustomActionMessage.js";
export {
  msdyn_cesinvokeRequest,
  type msdyn_cesinvokeRequestParameters,
  msdyn_cesinvokeResponse,
} from "./msdyn_cesinvokeMessage.js";
export {
  msdyn_CheckAlertFieldsRequest,
  msdyn_CheckAlertFieldsResponse,
} from "./msdyn_CheckAlertFieldsMessage.js";
export {
  msdyn_CheckAnyUserIsIntegrationUserRequest,
  msdyn_CheckAnyUserIsIntegrationUserResponse,
} from "./msdyn_CheckAnyUserIsIntegrationUserMessage.js";
export {
  msdyn_CheckBookingCustomControlUsageRequest,
  type msdyn_CheckBookingCustomControlUsageRequestParameters,
  msdyn_CheckBookingCustomControlUsageResponse,
} from "./msdyn_CheckBookingCustomControlUsageMessage.js";
export {
  msdyn_CheckCharacteristicHasMatchingResourceRequest,
  type msdyn_CheckCharacteristicHasMatchingResourceRequestParameters,
  msdyn_CheckCharacteristicHasMatchingResourceResponse,
} from "./msdyn_CheckCharacteristicHasMatchingResourceMessage.js";
export {
  msdyn_CheckCompatibilityBetweenFSAndPSASolutionRequest,
  msdyn_CheckCompatibilityBetweenFSAndPSASolutionResponse,
} from "./msdyn_CheckCompatibilityBetweenFSAndPSASolutionMessage.js";
export {
  msdyn_CheckDefaultValueForLineStatusRequest,
  msdyn_CheckDefaultValueForLineStatusResponse,
} from "./msdyn_CheckDefaultValueForLineStatusMessage.js";
export {
  msdyn_CheckDVCopilotStatusRequest,
  msdyn_CheckDVCopilotStatusResponse,
} from "./msdyn_CheckDVCopilotStatusMessage.js";
export {
  msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequest,
  type msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequestParameters,
  msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse,
} from "./msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesMessage.js";
export {
  msdyn_CheckFieldServiceDBVersionRequest,
  type msdyn_CheckFieldServiceDBVersionRequestParameters,
  msdyn_CheckFieldServiceDBVersionResponse,
} from "./msdyn_CheckFieldServiceDBVersionMessage.js";
export {
  msdyn_CheckForActiveAgreementsHavingPastEndDatesRequest,
  type msdyn_CheckForActiveAgreementsHavingPastEndDatesRequestParameters,
  msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse,
} from "./msdyn_CheckForActiveAgreementsHavingPastEndDatesMessage.js";
export {
  msdyn_CheckForActiveLayersOnProcessesRequest,
  type msdyn_CheckForActiveLayersOnProcessesRequestParameters,
  msdyn_CheckForActiveLayersOnProcessesResponse,
} from "./msdyn_CheckForActiveLayersOnProcessesMessage.js";
export {
  msdyn_CheckForConditionXmlFormatRequest,
  type msdyn_CheckForConditionXmlFormatRequestParameters,
  msdyn_CheckForConditionXmlFormatResponse,
} from "./msdyn_CheckForConditionXmlFormatMessage.js";
export {
  msdyn_CheckForCustomizedAppModuleRequest,
  type msdyn_CheckForCustomizedAppModuleRequestParameters,
  msdyn_CheckForCustomizedAppModuleResponse,
} from "./msdyn_CheckForCustomizedAppModuleMessage.js";
export {
  msdyn_CheckForCustomizedOptionSetRequest,
  type msdyn_CheckForCustomizedOptionSetRequestParameters,
  msdyn_CheckForCustomizedOptionSetResponse,
} from "./msdyn_CheckForCustomizedOptionSetMessage.js";
export {
  msdyn_CheckForCustomizedSitemapRequest,
  type msdyn_CheckForCustomizedSitemapRequestParameters,
  msdyn_CheckForCustomizedSitemapResponse,
} from "./msdyn_CheckForCustomizedSitemapMessage.js";
export {
  msdyn_CheckForCustomizedWebResourcesRequest,
  type msdyn_CheckForCustomizedWebResourcesRequestParameters,
  msdyn_CheckForCustomizedWebResourcesResponse,
} from "./msdyn_CheckForCustomizedWebResourcesMessage.js";
export {
  msdyn_CheckForDeletedBSMRecordsRequest,
  msdyn_CheckForDeletedBSMRecordsResponse,
} from "./msdyn_CheckForDeletedBSMRecordsMessage.js";
export {
  msdyn_CheckForDeletedProcessRequest,
  type msdyn_CheckForDeletedProcessRequestParameters,
  msdyn_CheckForDeletedProcessResponse,
} from "./msdyn_CheckForDeletedProcessMessage.js";
export {
  msdyn_CheckForDeletedSDKMessageProcessingStepsRequest,
  type msdyn_CheckForDeletedSDKMessageProcessingStepsRequestParameters,
  msdyn_CheckForDeletedSDKMessageProcessingStepsResponse,
} from "./msdyn_CheckForDeletedSDKMessageProcessingStepsMessage.js";
export {
  msdyn_CheckForDeletedWebResourcesRequest,
  type msdyn_CheckForDeletedWebResourcesRequestParameters,
  msdyn_CheckForDeletedWebResourcesResponse,
} from "./msdyn_CheckForDeletedWebResourcesMessage.js";
export {
  msdyn_CheckForDuplicatesActionRequest,
  type msdyn_CheckForDuplicatesActionRequestParameters,
  msdyn_CheckForDuplicatesActionResponse,
} from "./msdyn_CheckForDuplicatesActionMessage.js";
export {
  msdyn_CheckForFailingDeleteUniqueNumberWorkflowRequest,
  msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse,
} from "./msdyn_CheckForFailingDeleteUniqueNumberWorkflowMessage.js";
export {
  msdyn_CheckForFailingWorkflowRelatedToAgreementRequest,
  msdyn_CheckForFailingWorkflowRelatedToAgreementResponse,
} from "./msdyn_CheckForFailingWorkflowRelatedToAgreementMessage.js";
export {
  msdyn_CheckForFieldServiceSettingRecordRequest,
  msdyn_CheckForFieldServiceSettingRecordResponse,
} from "./msdyn_CheckForFieldServiceSettingRecordMessage.js";
export {
  msdyn_CheckForNoOrphanWorkflowsRequest,
  type msdyn_CheckForNoOrphanWorkflowsRequestParameters,
  msdyn_CheckForNoOrphanWorkflowsResponse,
} from "./msdyn_CheckForNoOrphanWorkflowsMessage.js";
export {
  msdyn_CheckForPendingProcessesRequest,
  type msdyn_CheckForPendingProcessesRequestParameters,
  msdyn_CheckForPendingProcessesResponse,
} from "./msdyn_CheckForPendingProcessesMessage.js";
export {
  msdyn_CheckForRemovedFormLibrariesRequest,
  type msdyn_CheckForRemovedFormLibrariesRequestParameters,
  msdyn_CheckForRemovedFormLibrariesResponse,
} from "./msdyn_CheckForRemovedFormLibrariesMessage.js";
export {
  msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequest,
  type msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequestParameters,
  msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse,
} from "./msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersMessage.js";
export {
  msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequest,
  type msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequestParameters,
  msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse,
} from "./msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersMessage.js";
export {
  msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequest,
  type msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequestParameters,
  msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse,
} from "./msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsMessage.js";
export {
  msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequest,
  type msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequestParameters,
  msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse,
} from "./msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsMessage.js";
export {
  msdyn_CheckForSolutionVersionRequest,
  msdyn_CheckForSolutionVersionResponse,
} from "./msdyn_CheckForSolutionVersionMessage.js";
export {
  msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequest,
  type msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequestParameters,
  msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse,
} from "./msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementMessage.js";
export {
  msdyn_CheckForWorkflowTypeOfRuleItemsRequest,
  type msdyn_CheckForWorkflowTypeOfRuleItemsRequestParameters,
  msdyn_CheckForWorkflowTypeOfRuleItemsResponse,
} from "./msdyn_CheckForWorkflowTypeOfRuleItemsMessage.js";
export {
  msdyn_CheckForWorkOrderTypesRequest,
  msdyn_CheckForWorkOrderTypesResponse,
} from "./msdyn_CheckForWorkOrderTypesMessage.js";
export {
  msdyn_CheckGeolocationEnabledRequest,
  type msdyn_CheckGeolocationEnabledRequestParameters,
  msdyn_CheckGeolocationEnabledResponse,
} from "./msdyn_CheckGeolocationEnabledMessage.js";
export {
  msdyn_CheckIfActivityMonitorEnabledRequest,
  type msdyn_CheckIfActivityMonitorEnabledRequestParameters,
  msdyn_CheckIfActivityMonitorEnabledResponse,
} from "./msdyn_CheckIfActivityMonitorEnabledMessage.js";
export {
  msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysRequest,
  msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse,
} from "./msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysMessage.js";
export {
  msdyn_CheckIfAppProfileHasGenericTemplatesRequest,
  msdyn_CheckIfAppProfileHasGenericTemplatesResponse,
} from "./msdyn_CheckIfAppProfileHasGenericTemplatesMessage.js";
export {
  msdyn_CheckIfAutoNumberingIsOptedRequest,
  type msdyn_CheckIfAutoNumberingIsOptedRequestParameters,
  msdyn_CheckIfAutoNumberingIsOptedResponse,
} from "./msdyn_CheckIfAutoNumberingIsOptedMessage.js";
export {
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest,
  type msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters,
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse,
} from "./msdyn_CheckIfAutoRouteToOwnerQueueEnabledMessage.js";
export {
  msdyn_CheckIfCSFormsFromUnmanagedLayerRequest,
  msdyn_CheckIfCSFormsFromUnmanagedLayerResponse,
} from "./msdyn_CheckIfCSFormsFromUnmanagedLayerMessage.js";
export {
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest,
  type msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters,
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse,
} from "./msdyn_CheckIfEmailResponseTemplateEntityTypeMatchMessage.js";
export {
  msdyn_CheckIfExecutionContextIsPassedRequest,
  type msdyn_CheckIfExecutionContextIsPassedRequestParameters,
  msdyn_CheckIfExecutionContextIsPassedResponse,
} from "./msdyn_CheckIfExecutionContextIsPassedMessage.js";
export {
  msdyn_CheckIfFormsHaveTooManyCustomControlsRequest,
  type msdyn_CheckIfFormsHaveTooManyCustomControlsRequestParameters,
  msdyn_CheckIfFormsHaveTooManyCustomControlsResponse,
} from "./msdyn_CheckIfFormsHaveTooManyCustomControlsMessage.js";
export {
  msdyn_CheckIfHasLegacyArcRulesRequest,
  msdyn_CheckIfHasLegacyArcRulesResponse,
} from "./msdyn_CheckIfHasLegacyArcRulesMessage.js";
export {
  msdyn_CheckIfHasLegacySlaRulesRequest,
  msdyn_CheckIfHasLegacySlaRulesResponse,
} from "./msdyn_CheckIfHasLegacySlaRulesMessage.js";
export {
  msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequest,
  type msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequestParameters,
  msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse,
} from "./msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountMessage.js";
export {
  msdyn_CheckIfProcessesAreActiveRequest,
  type msdyn_CheckIfProcessesAreActiveRequestParameters,
  msdyn_CheckIfProcessesAreActiveResponse,
} from "./msdyn_CheckIfProcessesAreActiveMessage.js";
export {
  msdyn_CheckIfProcessesOwnedByDisabledUsersRequest,
  type msdyn_CheckIfProcessesOwnedByDisabledUsersRequestParameters,
  msdyn_CheckIfProcessesOwnedByDisabledUsersResponse,
} from "./msdyn_CheckIfProcessesOwnedByDisabledUsersMessage.js";
export {
  msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetRequest,
  msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse,
} from "./msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetMessage.js";
export {
  msdyn_CheckIfQueueInRTQIsActiveRequest,
  msdyn_CheckIfQueueInRTQIsActiveResponse,
} from "./msdyn_CheckIfQueueInRTQIsActiveMessage.js";
export {
  msdyn_CheckIfQueueInWorkstreamHasAgentsRequest,
  msdyn_CheckIfQueueInWorkstreamHasAgentsResponse,
} from "./msdyn_CheckIfQueueInWorkstreamHasAgentsMessage.js";
export {
  msdyn_CheckIfRecordWorkstreamHasIntakeRulesRequest,
  msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse,
} from "./msdyn_CheckIfRecordWorkstreamHasIntakeRulesMessage.js";
export {
  msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSRequest,
  msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSResponse,
} from "./msdyn_CheckIfRecurrenceSettingIsPresentAndValidForABSMessage.js";
export {
  msdyn_CheckIfRequiredLevelOfFieldIsChangedRequest,
  msdyn_CheckIfRequiredLevelOfFieldIsChangedResponse,
} from "./msdyn_CheckIfRequiredLevelOfFieldIsChangedMessage.js";
export {
  msdyn_CheckIfSalesFormsFromUnmanagedLayerRequest,
  msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse,
} from "./msdyn_CheckIfSalesFormsFromUnmanagedLayerMessage.js";
export {
  msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequest,
  type msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequestParameters,
  msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse,
} from "./msdyn_CheckIfSDKMessageProcessingStepsAreActiveMessage.js";
export {
  msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest,
  type msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters,
  msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse,
} from "./msdyn_CheckIfSLAOwnerIsActiveOrInactiveMessage.js";
export {
  msdyn_CheckIfSLAStaticFlowIsDisabledRequest,
  msdyn_CheckIfSLAStaticFlowIsDisabledResponse,
} from "./msdyn_CheckIfSLAStaticFlowIsDisabledMessage.js";
export {
  msdyn_CheckIfTerritoryRecordsExistRequest,
  msdyn_CheckIfTerritoryRecordsExistResponse,
} from "./msdyn_CheckIfTerritoryRecordsExistMessage.js";
export {
  msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutRequest,
  msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse,
} from "./msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutMessage.js";
export {
  msdyn_CheckIfWorkOrderGeneratedFromABSRequest,
  type msdyn_CheckIfWorkOrderGeneratedFromABSRequestParameters,
  msdyn_CheckIfWorkOrderGeneratedFromABSResponse,
} from "./msdyn_CheckIfWorkOrderGeneratedFromABSMessage.js";
export {
  msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesRequest,
  msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse,
} from "./msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesMessage.js";
export {
  msdyn_CheckIoTDeviceCategoryOfDeviceRequest,
  msdyn_CheckIoTDeviceCategoryOfDeviceResponse,
} from "./msdyn_CheckIoTDeviceCategoryOfDeviceMessage.js";
export {
  msdyn_CheckIoTSettingsAndAlertParentingConfigRequest,
  msdyn_CheckIoTSettingsAndAlertParentingConfigResponse,
} from "./msdyn_CheckIoTSettingsAndAlertParentingConfigMessage.js";
export {
  msdyn_CheckMobileUserSecurityRoleRequest,
  type msdyn_CheckMobileUserSecurityRoleRequestParameters,
  msdyn_CheckMobileUserSecurityRoleResponse,
} from "./msdyn_CheckMobileUserSecurityRoleMessage.js";
export {
  msdyn_CheckMultiplePrimaryIncidentForWorkOrderRequest,
  msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse,
} from "./msdyn_CheckMultiplePrimaryIncidentForWorkOrderMessage.js";
export {
  msdyn_CheckOrgSettingIsSOPIntegrationEnabledRequest,
  msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse,
} from "./msdyn_CheckOrgSettingIsSOPIntegrationEnabledMessage.js";
export {
  msdyn_CheckOrgSettingOOBPriceCalculationEnabledRequest,
  msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse,
} from "./msdyn_CheckOrgSettingOOBPriceCalculationEnabledMessage.js";
export {
  msdyn_CheckPredictionModelsRequest,
  type msdyn_CheckPredictionModelsRequestParameters,
  msdyn_CheckPredictionModelsResponse,
} from "./msdyn_CheckPredictionModelsMessage.js";
export {
  msdyn_CheckReqRibbonCommandDefRequest,
  type msdyn_CheckReqRibbonCommandDefRequestParameters,
  msdyn_CheckReqRibbonCommandDefResponse,
} from "./msdyn_CheckReqRibbonCommandDefMessage.js";
export {
  msdyn_CheckReqWebResourceOnSystemFormRequest,
  type msdyn_CheckReqWebResourceOnSystemFormRequestParameters,
  msdyn_CheckReqWebResourceOnSystemFormResponse,
} from "./msdyn_CheckReqWebResourceOnSystemFormMessage.js";
export {
  msdyn_CheckServiceEndPointRequest,
  msdyn_CheckServiceEndPointResponse,
} from "./msdyn_CheckServiceEndPointMessage.js";
export {
  msdyn_CheckVolumeOfAlertsRequest,
  msdyn_CheckVolumeOfAlertsResponse,
} from "./msdyn_CheckVolumeOfAlertsMessage.js";
export {
  msdyn_ClassifySegmentsRequest,
  type msdyn_ClassifySegmentsRequestParameters,
  msdyn_ClassifySegmentsResponse,
} from "./msdyn_ClassifySegmentsMessage.js";
export {
  msdyn_CleanUpActivityMappingsRequest,
  type msdyn_CleanUpActivityMappingsRequestParameters,
  msdyn_CleanUpActivityMappingsResponse,
} from "./msdyn_CleanUpActivityMappingsMessage.js";
export {
  msdyn_CleanupCopilotAgentResponsesRequest,
  type msdyn_CleanupCopilotAgentResponsesRequestParameters,
  msdyn_CleanupCopilotAgentResponsesResponse,
} from "./msdyn_CleanupCopilotAgentResponsesMessage.js";
export {
  msdyn_CleanupDiagnosticsWrappersRequest,
  type msdyn_CleanupDiagnosticsWrappersRequestParameters,
  msdyn_CleanupDiagnosticsWrappersResponse,
} from "./msdyn_CleanupDiagnosticsWrappersMessage.js";
export {
  msdyn_CleanUpEmailNBACardsPluginRequest,
  type msdyn_CleanUpEmailNBACardsPluginRequestParameters,
  msdyn_CleanUpEmailNBACardsPluginResponse,
} from "./msdyn_CleanUpEmailNBACardsPluginMessage.js";
export {
  msdyn_CloneAttachmentsPluginActionRequest,
  type msdyn_CloneAttachmentsPluginActionRequestParameters,
  msdyn_CloneAttachmentsPluginActionResponse,
} from "./msdyn_CloneAttachmentsPluginActionMessage.js";
export {
  msdyn_cloneentityRequest,
  type msdyn_cloneentityRequestParameters,
  msdyn_cloneentityResponse,
} from "./msdyn_cloneentityMessage.js";
export {
  msdyn_CloneMultipleRequest,
  type msdyn_CloneMultipleRequestParameters,
  msdyn_CloneMultipleResponse,
} from "./msdyn_CloneMultipleMessage.js";
export {
  msdyn_ConditionXmlConversionRequest,
  type msdyn_ConditionXmlConversionRequestParameters,
  msdyn_ConditionXmlConversionResponse,
} from "./msdyn_ConditionXmlConversionMessage.js";
export {
  msdyn_ConnectSequenceRequest,
  type msdyn_ConnectSequenceRequestParameters,
  msdyn_ConnectSequenceResponse,
} from "./msdyn_ConnectSequenceMessage.js";
export {
  msdyn_conversationclosecasesentimentRequest,
  type msdyn_conversationclosecasesentimentRequestParameters,
  msdyn_conversationclosecasesentimentResponse,
} from "./msdyn_conversationclosecasesentimentMessage.js";
export {
  msdyn_ConversationConductorEnablerRequest,
  type msdyn_ConversationConductorEnablerRequestParameters,
  msdyn_ConversationConductorEnablerResponse,
} from "./msdyn_ConversationConductorEnablerMessage.js";
export {
  msdyn_ConvertCJOJsonToSequenceJsonRequest,
  type msdyn_ConvertCJOJsonToSequenceJsonRequestParameters,
  msdyn_ConvertCJOJsonToSequenceJsonResponse,
} from "./msdyn_ConvertCJOJsonToSequenceJsonMessage.js";
export {
  msdyn_ConvertDateTimeOnCalendarTimeZoneRequest,
  type msdyn_ConvertDateTimeOnCalendarTimeZoneRequestParameters,
  msdyn_ConvertDateTimeOnCalendarTimeZoneResponse,
} from "./msdyn_ConvertDateTimeOnCalendarTimeZoneMessage.js";
export {
  msdyn_ConvertSequenceJsonToCJOJsonRequest,
  type msdyn_ConvertSequenceJsonToCJOJsonRequestParameters,
  msdyn_ConvertSequenceJsonToCJOJsonResponse,
} from "./msdyn_ConvertSequenceJsonToCJOJsonMessage.js";
export {
  msdyn_ConvertToLocalizedFeaturesRequest,
  type msdyn_ConvertToLocalizedFeaturesRequestParameters,
  msdyn_ConvertToLocalizedFeaturesResponse,
} from "./msdyn_ConvertToLocalizedFeaturesMessage.js";
export {
  msdyn_CopilotCreateOutlookMessageOrAppointmentRequest,
  type msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters,
  msdyn_CopilotCreateOutlookMessageOrAppointmentResponse,
} from "./msdyn_CopilotCreateOutlookMessageOrAppointmentMessage.js";
export {
  msdyn_CopyEventAppleChannelsCleanupRequest,
  msdyn_CopyEventAppleChannelsCleanupResponse,
} from "./msdyn_CopyEventAppleChannelsCleanupMessage.js";
export {
  msdyn_CopyEventBotRegistrationsCleanupRequest,
  msdyn_CopyEventBotRegistrationsCleanupResponse,
} from "./msdyn_CopyEventBotRegistrationsCleanupMessage.js";
export {
  msdyn_CopyEventCustomChannelsCleanupRequest,
  msdyn_CopyEventCustomChannelsCleanupResponse,
} from "./msdyn_CopyEventCustomChannelsCleanupMessage.js";
export {
  msdyn_CopyEventFacebookChannelsCleanupRequest,
  msdyn_CopyEventFacebookChannelsCleanupResponse,
} from "./msdyn_CopyEventFacebookChannelsCleanupMessage.js";
export {
  msdyn_CopyEventGoogleChannelsCleanupRequest,
  msdyn_CopyEventGoogleChannelsCleanupResponse,
} from "./msdyn_CopyEventGoogleChannelsCleanupMessage.js";
export {
  msdyn_CopyEventLineChannelsCleanupRequest,
  msdyn_CopyEventLineChannelsCleanupResponse,
} from "./msdyn_CopyEventLineChannelsCleanupMessage.js";
export {
  msdyn_CopyEventSMSChannelsCleanupRequest,
  msdyn_CopyEventSMSChannelsCleanupResponse,
} from "./msdyn_CopyEventSMSChannelsCleanupMessage.js";
export {
  msdyn_CopyEventTwitterChannelsCleanupRequest,
  msdyn_CopyEventTwitterChannelsCleanupResponse,
} from "./msdyn_CopyEventTwitterChannelsCleanupMessage.js";
export {
  msdyn_CopyEventWechatChannelCleanupRequest,
  msdyn_CopyEventWechatChannelCleanupResponse,
} from "./msdyn_CopyEventWechatChannelCleanupMessage.js";
export {
  msdyn_CopyEventWhatsAppChannelCleanupRequest,
  msdyn_CopyEventWhatsAppChannelCleanupResponse,
} from "./msdyn_CopyEventWhatsAppChannelCleanupMessage.js";
export {
  msdyn_CRACaseClosureRequest,
  type msdyn_CRACaseClosureRequestParameters,
  msdyn_CRACaseClosureResponse,
} from "./msdyn_CRACaseClosureMessage.js";
export {
  msdyn_create_virtual_table_v2Request,
  type msdyn_create_virtual_table_v2RequestParameters,
  msdyn_create_virtual_table_v2Response,
} from "./msdyn_create_virtual_table_v2Message.js";
export {
  msdyn_CreateActionFlowRequest,
  type msdyn_CreateActionFlowRequestParameters,
  msdyn_CreateActionFlowResponse,
} from "./msdyn_CreateActionFlowMessage.js";
export {
  msdyn_CreateAITestCaseRequest,
  type msdyn_CreateAITestCaseRequestParameters,
  msdyn_CreateAITestCaseResponse,
} from "./msdyn_CreateAITestCaseMessage.js";
export {
  msdyn_CreateApmEventHandlerRequest,
  type msdyn_CreateApmEventHandlerRequestParameters,
  msdyn_CreateApmEventHandlerResponse,
} from "./msdyn_CreateApmEventHandlerMessage.js";
export {
  msdyn_CreateAutonomousEmailRequest,
  type msdyn_CreateAutonomousEmailRequestParameters,
  msdyn_CreateAutonomousEmailResponse,
} from "./msdyn_CreateAutonomousEmailMessage.js";
export {
  msdyn_CreateAutonomousEmailWrapperRequest,
  type msdyn_CreateAutonomousEmailWrapperRequestParameters,
  msdyn_CreateAutonomousEmailWrapperResponse,
} from "./msdyn_CreateAutonomousEmailWrapperMessage.js";
export {
  msdyn_CreateBSMRecordRequest,
  type msdyn_CreateBSMRecordRequestParameters,
  msdyn_CreateBSMRecordResponse,
} from "./msdyn_CreateBSMRecordMessage.js";
export {
  msdyn_CreateCustomActionDefinitionRequest,
  type msdyn_CreateCustomActionDefinitionRequestParameters,
  msdyn_CreateCustomActionDefinitionResponse,
} from "./msdyn_CreateCustomActionDefinitionMessage.js";
export {
  msdyn_CreateDraftResponseForActionRequest,
  type msdyn_CreateDraftResponseForActionRequestParameters,
  msdyn_CreateDraftResponseForActionResponse,
} from "./msdyn_CreateDraftResponseForActionMessage.js";
export {
  msdyn_CreateEntityRequest,
  type msdyn_CreateEntityRequestParameters,
  msdyn_CreateEntityResponse,
} from "./msdyn_CreateEntityMessage.js";
export {
  msdyn_createevaluationplanbatchRequest,
  type msdyn_createevaluationplanbatchRequestParameters,
  msdyn_createevaluationplanbatchResponse,
} from "./msdyn_createevaluationplanbatchMessage.js";
export {
  msdyn_CreateEvaluationRecordsForPlanRequest,
  type msdyn_CreateEvaluationRecordsForPlanRequestParameters,
  msdyn_CreateEvaluationRecordsForPlanResponse,
} from "./msdyn_CreateEvaluationRecordsForPlanMessage.js";
export {
  msdyn_CreateKBArticleRequest,
  type msdyn_CreateKBArticleRequestParameters,
  msdyn_CreateKBArticleResponse,
} from "./msdyn_CreateKBArticleMessage.js";
export {
  msdyn_CreateNewAnalysisJobRequest,
  type msdyn_CreateNewAnalysisJobRequestParameters,
  msdyn_CreateNewAnalysisJobResponse,
} from "./msdyn_CreateNewAnalysisJobMessage.js";
export {
  msdyn_CreateNewAnalysisJobForRuleSetRequest,
  type msdyn_CreateNewAnalysisJobForRuleSetRequestParameters,
  msdyn_CreateNewAnalysisJobForRuleSetResponse,
} from "./msdyn_CreateNewAnalysisJobForRuleSetMessage.js";
export {
  msdyn_CreatePredictionRequest,
  type msdyn_CreatePredictionRequestParameters,
  msdyn_CreatePredictionResponse,
} from "./msdyn_CreatePredictionMessage.js";
export {
  msdyn_CreatePublishAIConfigRequest,
  type msdyn_CreatePublishAIConfigRequestParameters,
  msdyn_CreatePublishAIConfigResponse,
} from "./msdyn_CreatePublishAIConfigMessage.js";
export {
  msdyn_CreatePublishAIModelRequest,
  type msdyn_CreatePublishAIModelRequestParameters,
  msdyn_CreatePublishAIModelResponse,
} from "./msdyn_CreatePublishAIModelMessage.js";
export {
  msdyn_CreateRecordWithRuleBasedPredictionsRequest,
  type msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters,
  msdyn_CreateRecordWithRuleBasedPredictionsResponse,
} from "./msdyn_CreateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_CreateRequirementGroupBookingsRequest,
  type msdyn_CreateRequirementGroupBookingsRequestParameters,
  msdyn_CreateRequirementGroupBookingsResponse,
} from "./msdyn_CreateRequirementGroupBookingsMessage.js";
export {
  msdyn_CreateRequirementModelRequest,
  type msdyn_CreateRequirementModelRequestParameters,
  msdyn_CreateRequirementModelResponse,
} from "./msdyn_CreateRequirementModelMessage.js";
export {
  msdyn_CreateResourceOptimizationRequestRequest,
  type msdyn_CreateResourceOptimizationRequestRequestParameters,
  msdyn_CreateResourceOptimizationRequestResponse,
} from "./msdyn_CreateResourceOptimizationRequestMessage.js";
export {
  msdyn_CreateSimilarOpportunitiyPredictionModelRequest,
  type msdyn_CreateSimilarOpportunitiyPredictionModelRequestParameters,
  msdyn_CreateSimilarOpportunitiyPredictionModelResponse,
} from "./msdyn_CreateSimilarOpportunitiyPredictionModelMessage.js";
export {
  msdyn_CreateSuggestedActivityRequest,
  type msdyn_CreateSuggestedActivityRequestParameters,
  msdyn_CreateSuggestedActivityResponse,
} from "./msdyn_CreateSuggestedActivityMessage.js";
export {
  msdyn_CreateSuggestedContactRequest,
  type msdyn_CreateSuggestedContactRequestParameters,
  msdyn_CreateSuggestedContactResponse,
} from "./msdyn_CreateSuggestedContactMessage.js";
export {
  msdyn_CreateSuggestedNextActionRequest,
  type msdyn_CreateSuggestedNextActionRequestParameters,
  msdyn_CreateSuggestedNextActionResponse,
} from "./msdyn_CreateSuggestedNextActionMessage.js";
export {
  msdyn_CreateSwarmParticipantsRequest,
  type msdyn_CreateSwarmParticipantsRequestParameters,
  msdyn_CreateSwarmParticipantsResponse,
} from "./msdyn_CreateSwarmParticipantsMessage.js";
export {
  msdyn_CreateTechniciansRequest,
  type msdyn_CreateTechniciansRequestParameters,
  msdyn_CreateTechniciansResponse,
} from "./msdyn_CreateTechniciansMessage.js";
export {
  msdyn_createtemplatecvrelationshipsRequest,
  type msdyn_createtemplatecvrelationshipsRequestParameters,
  msdyn_createtemplatecvrelationshipsResponse,
} from "./msdyn_createtemplatecvrelationshipsMessage.js";
export {
  msdyn_CreateTrainConfigRequest,
  msdyn_CreateTrainConfigResponse,
} from "./msdyn_CreateTrainConfigMessage.js";
export {
  msdyn_CreateTrainEffortModelConfigRequest,
  type msdyn_CreateTrainEffortModelConfigRequestParameters,
  msdyn_CreateTrainEffortModelConfigResponse,
} from "./msdyn_CreateTrainEffortModelConfigMessage.js";
export {
  msdyn_CreateWorkOrderRequest,
  type msdyn_CreateWorkOrderRequestParameters,
  msdyn_CreateWorkOrderResponse,
} from "./msdyn_CreateWorkOrderMessage.js";
export {
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest,
  type msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequestParameters,
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse,
} from "./msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_CSCaseClosureProcessAgentResponseRequest,
  type msdyn_CSCaseClosureProcessAgentResponseRequestParameters,
  msdyn_CSCaseClosureProcessAgentResponseResponse,
} from "./msdyn_CSCaseClosureProcessAgentResponseMessage.js";
export {
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequest,
  type msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequestParameters,
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse,
} from "./msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailMessage.js";
export {
  msdyn_CSCopilotResolveCaseRequest,
  type msdyn_CSCopilotResolveCaseRequestParameters,
  msdyn_CSCopilotResolveCaseResponse,
} from "./msdyn_CSCopilotResolveCaseMessage.js";
export {
  msdyn_CustomApiCustomerServiceCaseSummaryRequest,
  type msdyn_CustomApiCustomerServiceCaseSummaryRequestParameters,
  msdyn_CustomApiCustomerServiceCaseSummaryResponse,
} from "./msdyn_CustomApiCustomerServiceCaseSummaryMessage.js";
export {
  msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_CustomChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_CustomChannelSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_CustomerServiceSolutionHealthRulesRegistrationRequest,
  type msdyn_CustomerServiceSolutionHealthRulesRegistrationRequestParameters,
  msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse,
} from "./msdyn_CustomerServiceSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_D365ChannelsInboundRequest,
  type msdyn_D365ChannelsInboundRequestParameters,
  msdyn_D365ChannelsInboundResponse,
} from "./msdyn_D365ChannelsInboundMessage.js";
export {
  msdyn_D365ChannelsNotificationRequest,
  type msdyn_D365ChannelsNotificationRequestParameters,
  msdyn_D365ChannelsNotificationResponse,
} from "./msdyn_D365ChannelsNotificationMessage.js";
export {
  msdyn_dataprovideroperationsRequest,
  type msdyn_dataprovideroperationsRequestParameters,
  msdyn_dataprovideroperationsResponse,
} from "./msdyn_dataprovideroperationsMessage.js";
export {
  msdyn_DataValidationApiRequest,
  type msdyn_DataValidationApiRequestParameters,
  msdyn_DataValidationApiResponse,
} from "./msdyn_DataValidationApiMessage.js";
export {
  msdyn_DCA_SendOutreachEmailRequest,
  type msdyn_DCA_SendOutreachEmailRequestParameters,
  msdyn_DCA_SendOutreachEmailResponse,
} from "./msdyn_DCA_SendOutreachEmailMessage.js";
export {
  msdyn_DecommissionFieldServiceSolutionHealthRulesRequest,
  type msdyn_DecommissionFieldServiceSolutionHealthRulesRequestParameters,
  msdyn_DecommissionFieldServiceSolutionHealthRulesResponse,
} from "./msdyn_DecommissionFieldServiceSolutionHealthRulesMessage.js";
export {
  msdyn_DeleteCalendarRequest,
  type msdyn_DeleteCalendarRequestParameters,
  msdyn_DeleteCalendarResponse,
} from "./msdyn_DeleteCalendarMessage.js";
export { msdyn_DeleteFlowRequest, msdyn_DeleteFlowResponse } from "./msdyn_DeleteFlowMessage.js";
export {
  msdyn_DeletePredictionRequest,
  type msdyn_DeletePredictionRequestParameters,
  msdyn_DeletePredictionResponse,
} from "./msdyn_DeletePredictionMessage.js";
export {
  msdyn_DeprecateODOSRequest,
  type msdyn_DeprecateODOSRequestParameters,
  msdyn_DeprecateODOSResponse,
} from "./msdyn_DeprecateODOSMessage.js";
export {
  msdyn_DeprovisionUnifiedRoutingRequest,
  msdyn_DeprovisionUnifiedRoutingResponse,
} from "./msdyn_DeprovisionUnifiedRoutingMessage.js";
export {
  msdyn_DisableBotUserRequest,
  type msdyn_DisableBotUserRequestParameters,
  msdyn_DisableBotUserResponse,
} from "./msdyn_DisableBotUserMessage.js";
export {
  msdyn_DisableUnstructuredDataRequest,
  msdyn_DisableUnstructuredDataResponse,
} from "./msdyn_DisableUnstructuredDataMessage.js";
export {
  msdyn_DisconnectSequenceRequest,
  type msdyn_DisconnectSequenceRequestParameters,
  msdyn_DisconnectSequenceResponse,
} from "./msdyn_DisconnectSequenceMessage.js";
export {
  msdyn_DismissEmailInfraActionCardRequest,
  type msdyn_DismissEmailInfraActionCardRequestParameters,
  msdyn_DismissEmailInfraActionCardResponse,
} from "./msdyn_DismissEmailInfraActionCardMessage.js";
export {
  msdyn_DismissSuggestedActivityRequest,
  type msdyn_DismissSuggestedActivityRequestParameters,
  msdyn_DismissSuggestedActivityResponse,
} from "./msdyn_DismissSuggestedActivityMessage.js";
export {
  msdyn_DismissSuggestedContactRequest,
  type msdyn_DismissSuggestedContactRequestParameters,
  msdyn_DismissSuggestedContactResponse,
} from "./msdyn_DismissSuggestedContactMessage.js";
export {
  msdyn_DoesKBExistRequest,
  type msdyn_DoesKBExistRequestParameters,
  msdyn_DoesKBExistResponse,
} from "./msdyn_DoesKBExistMessage.js";
export {
  msdyn_DownloadMobileAppBuildRequest,
  type msdyn_DownloadMobileAppBuildRequestParameters,
  msdyn_DownloadMobileAppBuildResponse,
} from "./msdyn_DownloadMobileAppBuildMessage.js";
export {
  msdyn_DraftEmailForCaseRequest,
  type msdyn_DraftEmailForCaseRequestParameters,
  msdyn_DraftEmailForCaseResponse,
} from "./msdyn_DraftEmailForCaseMessage.js";
export {
  msdyn_DraftFollowupEmailWithTemplateRequest,
  type msdyn_DraftFollowupEmailWithTemplateRequestParameters,
  msdyn_DraftFollowupEmailWithTemplateResponse,
} from "./msdyn_DraftFollowupEmailWithTemplateMessage.js";
export {
  msdyn_DraftOutreachEmailRequest,
  type msdyn_DraftOutreachEmailRequestParameters,
  msdyn_DraftOutreachEmailResponse,
} from "./msdyn_DraftOutreachEmailMessage.js";
export {
  msdyn_DuplicateDetectionClientTriggerActionRequest,
  type msdyn_DuplicateDetectionClientTriggerActionRequestParameters,
  msdyn_DuplicateDetectionClientTriggerActionResponse,
} from "./msdyn_DuplicateDetectionClientTriggerActionMessage.js";
export {
  msdyn_DuplicateDetectionTriggerActionRequest,
  type msdyn_DuplicateDetectionTriggerActionRequestParameters,
  msdyn_DuplicateDetectionTriggerActionResponse,
} from "./msdyn_DuplicateDetectionTriggerActionMessage.js";
export {
  msdyn_DynamicForecastRetrievalRequest,
  type msdyn_DynamicForecastRetrievalRequestParameters,
  msdyn_DynamicForecastRetrievalResponse,
} from "./msdyn_DynamicForecastRetrievalMessage.js";
export {
  msdyn_EditAndSaveSuggestedContactRequest,
  type msdyn_EditAndSaveSuggestedContactRequestParameters,
  msdyn_EditAndSaveSuggestedContactResponse,
} from "./msdyn_EditAndSaveSuggestedContactMessage.js";
export {
  msdyn_editSalesSequenceExperimentStatusRequest,
  type msdyn_editSalesSequenceExperimentStatusRequestParameters,
  msdyn_editSalesSequenceExperimentStatusResponse,
} from "./msdyn_editSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_EditSequenceRequest,
  type msdyn_EditSequenceRequestParameters,
  msdyn_EditSequenceResponse,
} from "./msdyn_EditSequenceMessage.js";
export {
  msdyn_EffortModelPredictionRequest,
  type msdyn_EffortModelPredictionRequestParameters,
  msdyn_EffortModelPredictionResponse,
} from "./msdyn_EffortModelPredictionMessage.js";
export {
  msdyn_emailAssistAdjustAPIRequest,
  type msdyn_emailAssistAdjustAPIRequestParameters,
  msdyn_emailAssistAdjustAPIResponse,
} from "./msdyn_emailAssistAdjustAPIMessage.js";
export {
  msdyn_emailsentimentflowactionRequest,
  type msdyn_emailsentimentflowactionRequestParameters,
  msdyn_emailsentimentflowactionResponse,
} from "./msdyn_emailsentimentflowactionMessage.js";
export {
  msdyn_EmailTemplateRecommendationRequest,
  type msdyn_EmailTemplateRecommendationRequestParameters,
  msdyn_EmailTemplateRecommendationResponse,
} from "./msdyn_EmailTemplateRecommendationMessage.js";
export {
  msdyn_EmailValidationCustomActionRequest,
  type msdyn_EmailValidationCustomActionRequestParameters,
  msdyn_EmailValidationCustomActionResponse,
} from "./msdyn_EmailValidationCustomActionMessage.js";
export {
  msdyn_EnableDVCopilotRequest,
  msdyn_EnableDVCopilotResponse,
} from "./msdyn_EnableDVCopilotMessage.js";
export {
  msdyn_EnableLinkedInDataValidationRequest,
  msdyn_EnableLinkedInDataValidationResponse,
} from "./msdyn_EnableLinkedInDataValidationMessage.js";
export {
  msdyn_EnableSharePointRequest,
  msdyn_EnableSharePointResponse,
} from "./msdyn_EnableSharePointMessage.js";
export {
  msdyn_EnableUnifiedRoutingRequest,
  type msdyn_EnableUnifiedRoutingRequestParameters,
  msdyn_EnableUnifiedRoutingResponse,
} from "./msdyn_EnableUnifiedRoutingMessage.js";
export {
  msdyn_EnableUnstructuredDataRequest,
  msdyn_EnableUnstructuredDataResponse,
} from "./msdyn_EnableUnstructuredDataMessage.js";
export {
  msdyn_EvaluateConversationRequest,
  type msdyn_EvaluateConversationRequestParameters,
  msdyn_EvaluateConversationResponse,
} from "./msdyn_EvaluateConversationMessage.js";
export {
  msdyn_EvaluateMasterEntityRoutingConfigurationRequest,
  type msdyn_EvaluateMasterEntityRoutingConfigurationRequestParameters,
  msdyn_EvaluateMasterEntityRoutingConfigurationResponse,
} from "./msdyn_EvaluateMasterEntityRoutingConfigurationMessage.js";
export {
  msdyn_ExecuteAggregateAndUpdateIntentMetricsRequest,
  type msdyn_ExecuteAggregateAndUpdateIntentMetricsRequestParameters,
  msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse,
} from "./msdyn_ExecuteAggregateAndUpdateIntentMetricsMessage.js";
export {
  msdyn_ExecuteARCRequest,
  type msdyn_ExecuteARCRequestParameters,
  msdyn_ExecuteARCResponse,
} from "./msdyn_ExecuteARCMessage.js";
export {
  msdyn_ExecuteCopilotServiceJobRequest,
  type msdyn_ExecuteCopilotServiceJobRequestParameters,
  msdyn_ExecuteCopilotServiceJobResponse,
} from "./msdyn_ExecuteCopilotServiceJobMessage.js";
export {
  msdyn_ExecuteCustomerNotificationRequestRequest,
  msdyn_ExecuteCustomerNotificationRequestResponse,
} from "./msdyn_ExecuteCustomerNotificationRequestMessage.js";
export {
  msdyn_executeemailsentimentbotRequest,
  type msdyn_executeemailsentimentbotRequestParameters,
  msdyn_executeemailsentimentbotResponse,
} from "./msdyn_executeemailsentimentbotMessage.js";
export {
  msdyn_ExecuteHttpServiceRequestRequest,
  type msdyn_ExecuteHttpServiceRequestRequestParameters,
  msdyn_ExecuteHttpServiceRequestResponse,
} from "./msdyn_ExecuteHttpServiceRequestMessage.js";
export {
  msdyn_ExecutePrimaryCreatePostActionsRequest,
  type msdyn_ExecutePrimaryCreatePostActionsRequestParameters,
  msdyn_ExecutePrimaryCreatePostActionsResponse,
} from "./msdyn_ExecutePrimaryCreatePostActionsMessage.js";
export {
  msdyn_ExecuteRecurringSalesOperationRequest,
  type msdyn_ExecuteRecurringSalesOperationRequestParameters,
  msdyn_ExecuteRecurringSalesOperationResponse,
} from "./msdyn_ExecuteRecurringSalesOperationMessage.js";
export {
  msdyn_ExecuteSandboxRequestRequest,
  type msdyn_ExecuteSandboxRequestRequestParameters,
  msdyn_ExecuteSandboxRequestResponse,
} from "./msdyn_ExecuteSandboxRequestMessage.js";
export {
  msdyn_ExecuteSIRequestRequest,
  type msdyn_ExecuteSIRequestRequestParameters,
  msdyn_ExecuteSIRequestResponse,
} from "./msdyn_ExecuteSIRequestMessage.js";
export {
  msdyn_ExecuteSISampleDataRequestRequest,
  type msdyn_ExecuteSISampleDataRequestRequestParameters,
  msdyn_ExecuteSISampleDataRequestResponse,
} from "./msdyn_ExecuteSISampleDataRequestMessage.js";
export {
  msdyn_ExpandOperatingHoursForEntityCollectionRequest,
  type msdyn_ExpandOperatingHoursForEntityCollectionRequestParameters,
  msdyn_ExpandOperatingHoursForEntityCollectionResponse,
} from "./msdyn_ExpandOperatingHoursForEntityCollectionMessage.js";
export {
  msdyn_ExportAnalyticsReportRequest,
  type msdyn_ExportAnalyticsReportRequestParameters,
  msdyn_ExportAnalyticsReportResponse,
} from "./msdyn_ExportAnalyticsReportMessage.js";
export {
  msdyn_ExternalContextCommitTranscriptUploadRequest,
  type msdyn_ExternalContextCommitTranscriptUploadRequestParameters,
  msdyn_ExternalContextCommitTranscriptUploadResponse,
} from "./msdyn_ExternalContextCommitTranscriptUploadMessage.js";
export {
  msdyn_ExternalContextInitiateTranscriptUploadRequest,
  type msdyn_ExternalContextInitiateTranscriptUploadRequestParameters,
  msdyn_ExternalContextInitiateTranscriptUploadResponse,
} from "./msdyn_ExternalContextInitiateTranscriptUploadMessage.js";
export {
  msdyn_ExternalContextUploadTranscriptBlocksRequest,
  type msdyn_ExternalContextUploadTranscriptBlocksRequestParameters,
  msdyn_ExternalContextUploadTranscriptBlocksResponse,
} from "./msdyn_ExternalContextUploadTranscriptBlocksMessage.js";
export {
  msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_FacebookPageConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_FacebookSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_FastPassBotEventUpdateRequest,
  type msdyn_FastPassBotEventUpdateRequestParameters,
  msdyn_FastPassBotEventUpdateResponse,
} from "./msdyn_FastPassBotEventUpdateMessage.js";
export {
  msdyn_FeedbackRequest,
  type msdyn_FeedbackRequestParameters,
  msdyn_FeedbackResponse,
} from "./msdyn_FeedbackMessage.js";
export {
  msdyn_FetchAllPredictionModelsRequest,
  type msdyn_FetchAllPredictionModelsRequestParameters,
  msdyn_FetchAllPredictionModelsResponse,
} from "./msdyn_FetchAllPredictionModelsMessage.js";
export {
  msdyn_fetchAutonomousCaseCreateUpdateRuleRequest,
  type msdyn_fetchAutonomousCaseCreateUpdateRuleRequestParameters,
  msdyn_fetchAutonomousCaseCreateUpdateRuleResponse,
} from "./msdyn_fetchAutonomousCaseCreateUpdateRuleMessage.js";
export {
  msdyn_FetchDiagnosticEntitiesAndCountRequest,
  type msdyn_FetchDiagnosticEntitiesAndCountRequestParameters,
  msdyn_FetchDiagnosticEntitiesAndCountResponse,
} from "./msdyn_FetchDiagnosticEntitiesAndCountMessage.js";
export {
  msdyn_fetchemailsentimentsapiRequest,
  type msdyn_fetchemailsentimentsapiRequestParameters,
  msdyn_fetchemailsentimentsapiResponse,
} from "./msdyn_fetchemailsentimentsapiMessage.js";
export {
  msdyn_fetchEntityMetadataRequest,
  type msdyn_fetchEntityMetadataRequestParameters,
  msdyn_fetchEntityMetadataResponse,
} from "./msdyn_fetchEntityMetadataMessage.js";
export {
  msdyn_FetchEvaluatedEntityInputConfigRequest,
  type msdyn_FetchEvaluatedEntityInputConfigRequestParameters,
  msdyn_FetchEvaluatedEntityInputConfigResponse,
} from "./msdyn_FetchEvaluatedEntityInputConfigMessage.js";
export {
  msdyn_FetchFCSValueRequest,
  type msdyn_FetchFCSValueRequestParameters,
  msdyn_FetchFCSValueResponse,
} from "./msdyn_FetchFCSValueMessage.js";
export {
  msdyn_FetchKPIValuesRequest,
  type msdyn_FetchKPIValuesRequestParameters,
  msdyn_FetchKPIValuesResponse,
} from "./msdyn_FetchKPIValuesMessage.js";
export {
  msdyn_FieldServiceAgreementBookingIncidentCopyActionRequest,
  type msdyn_FieldServiceAgreementBookingIncidentCopyActionRequestParameters,
  msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse,
} from "./msdyn_FieldServiceAgreementBookingIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceAgreementBookingIncidentStatusActionRequest,
  type msdyn_FieldServiceAgreementBookingIncidentStatusActionRequestParameters,
  msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse,
} from "./msdyn_FieldServiceAgreementBookingIncidentStatusActionMessage.js";
export {
  msdyn_FieldServiceAgreementSystemStatusActionRequest,
  type msdyn_FieldServiceAgreementSystemStatusActionRequestParameters,
  msdyn_FieldServiceAgreementSystemStatusActionResponse,
} from "./msdyn_FieldServiceAgreementSystemStatusActionMessage.js";
export {
  msdyn_FieldServiceBookableResourceBookingAssociateActionRequest,
  type msdyn_FieldServiceBookableResourceBookingAssociateActionRequestParameters,
  msdyn_FieldServiceBookableResourceBookingAssociateActionResponse,
} from "./msdyn_FieldServiceBookableResourceBookingAssociateActionMessage.js";
export {
  msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequest,
  type msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequestParameters,
  msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse,
} from "./msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalMessage.js";
export {
  msdyn_FieldServiceQuoteBookingIncidentCopyActionRequest,
  type msdyn_FieldServiceQuoteBookingIncidentCopyActionRequestParameters,
  msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse,
} from "./msdyn_FieldServiceQuoteBookingIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceSolutionHealthRulesRegistrationRequest,
  type msdyn_FieldServiceSolutionHealthRulesRegistrationRequestParameters,
  msdyn_FieldServiceSolutionHealthRulesRegistrationResponse,
} from "./msdyn_FieldServiceSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_FieldServiceSystemActionRequest,
  type msdyn_FieldServiceSystemActionRequestParameters,
  msdyn_FieldServiceSystemActionResponse,
} from "./msdyn_FieldServiceSystemActionMessage.js";
export {
  msdyn_FieldServiceSystemJobWOShareUnshareActionRequest,
  type msdyn_FieldServiceSystemJobWOShareUnshareActionRequestParameters,
  msdyn_FieldServiceSystemJobWOShareUnshareActionResponse,
} from "./msdyn_FieldServiceSystemJobWOShareUnshareActionMessage.js";
export {
  msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequest,
  type msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequestParameters,
  msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse,
} from "./msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderIncidentCopyActionRequest,
  type msdyn_FieldServiceWorkOrderIncidentCopyActionRequestParameters,
  msdyn_FieldServiceWorkOrderIncidentCopyActionResponse,
} from "./msdyn_FieldServiceWorkOrderIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderIncidentStatusActionRequest,
  type msdyn_FieldServiceWorkOrderIncidentStatusActionRequestParameters,
  msdyn_FieldServiceWorkOrderIncidentStatusActionResponse,
} from "./msdyn_FieldServiceWorkOrderIncidentStatusActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderSystemStatusActionRequest,
  type msdyn_FieldServiceWorkOrderSystemStatusActionRequestParameters,
  msdyn_FieldServiceWorkOrderSystemStatusActionResponse,
} from "./msdyn_FieldServiceWorkOrderSystemStatusActionMessage.js";
export {
  msdyn_FilterInActiveNBACardsRequest,
  type msdyn_FilterInActiveNBACardsRequestParameters,
  msdyn_FilterInActiveNBACardsResponse,
} from "./msdyn_FilterInActiveNBACardsMessage.js";
export {
  msdyn_FindEntityForPolymorphicLookupRequest,
  type msdyn_FindEntityForPolymorphicLookupRequestParameters,
  msdyn_FindEntityForPolymorphicLookupResponse,
} from "./msdyn_FindEntityForPolymorphicLookupMessage.js";
export {
  msdyn_FindRulesetDependenciesRequest,
  type msdyn_FindRulesetDependenciesRequestParameters,
  msdyn_FindRulesetDependenciesResponse,
} from "./msdyn_FindRulesetDependenciesMessage.js";
export {
  msdyn_FixSLARelationshipsOnTargetEntitiesRequest,
  type msdyn_FixSLARelationshipsOnTargetEntitiesRequestParameters,
  msdyn_FixSLARelationshipsOnTargetEntitiesResponse,
} from "./msdyn_FixSLARelationshipsOnTargetEntitiesMessage.js";
export {
  msdyn_ForecastApiRequest,
  type msdyn_ForecastApiRequestParameters,
  msdyn_ForecastApiResponse,
} from "./msdyn_ForecastApiMessage.js";
export {
  msdyn_ForecastGenerateHierarchyRequest,
  type msdyn_ForecastGenerateHierarchyRequestParameters,
  msdyn_ForecastGenerateHierarchyResponse,
} from "./msdyn_ForecastGenerateHierarchyMessage.js";
export {
  msdyn_ForecastInstanceActionsRequest,
  type msdyn_ForecastInstanceActionsRequestParameters,
  msdyn_ForecastInstanceActionsResponse,
} from "./msdyn_ForecastInstanceActionsMessage.js";
export {
  msdyn_ForecastRecalculateRequest,
  type msdyn_ForecastRecalculateRequestParameters,
  msdyn_ForecastRecalculateResponse,
} from "./msdyn_ForecastRecalculateMessage.js";
export {
  msdyn_ForecastRecalculateAllRequest,
  msdyn_ForecastRecalculateAllResponse,
} from "./msdyn_ForecastRecalculateAllMessage.js";
export {
  msdyn_ForecastRecalculateAsyncRequest,
  type msdyn_ForecastRecalculateAsyncRequestParameters,
  msdyn_ForecastRecalculateAsyncResponse,
} from "./msdyn_ForecastRecalculateAsyncMessage.js";
export {
  msdyn_FpsActionRequest,
  type msdyn_FpsActionRequestParameters,
  msdyn_FpsActionResponse,
} from "./msdyn_FpsActionMessage.js";
export {
  msdyn_FSDemoDataRequestRequest,
  type msdyn_FSDemoDataRequestRequestParameters,
  msdyn_FSDemoDataRequestResponse,
} from "./msdyn_FSDemoDataRequestMessage.js";
export {
  msdyn_GBMConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_GBMConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_GBMConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_GBMSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_GDPROptoutContactRequest,
  type msdyn_GDPROptoutContactRequestParameters,
  msdyn_GDPROptoutContactResponse,
} from "./msdyn_GDPROptoutContactMessage.js";
export {
  msdyn_GDPROptoutLeadRequest,
  type msdyn_GDPROptoutLeadRequestParameters,
  msdyn_GDPROptoutLeadResponse,
} from "./msdyn_GDPROptoutLeadMessage.js";
export {
  msdyn_GDPROptoutUserRequest,
  type msdyn_GDPROptoutUserRequestParameters,
  msdyn_GDPROptoutUserResponse,
} from "./msdyn_GDPROptoutUserMessage.js";
export {
  msdyn_GenerateGeofenceEventRequest,
  type msdyn_GenerateGeofenceEventRequestParameters,
  msdyn_GenerateGeofenceEventResponse,
} from "./msdyn_GenerateGeofenceEventMessage.js";
export {
  msdyn_GeneratePlatformSummaryRequest,
  type msdyn_GeneratePlatformSummaryRequestParameters,
  msdyn_GeneratePlatformSummaryResponse,
} from "./msdyn_GeneratePlatformSummaryMessage.js";
export {
  msdyn_GeneratePlatformSummaryConfigRecordsRequest,
  type msdyn_GeneratePlatformSummaryConfigRecordsRequestParameters,
  msdyn_GeneratePlatformSummaryConfigRecordsResponse,
} from "./msdyn_GeneratePlatformSummaryConfigRecordsMessage.js";
export {
  msdyn_GeocodeAddressRequest,
  type msdyn_GeocodeAddressRequestParameters,
  msdyn_GeocodeAddressResponse,
} from "./msdyn_GeocodeAddressMessage.js";
export {
  msdyn_GeolocationLocationTrackingDataRequest,
  type msdyn_GeolocationLocationTrackingDataRequestParameters,
  msdyn_GeolocationLocationTrackingDataResponse,
} from "./msdyn_GeolocationLocationTrackingDataMessage.js";
export {
  msdyn_GeolocationLocationTrackingEnabledRequest,
  msdyn_GeolocationLocationTrackingEnabledResponse,
} from "./msdyn_GeolocationLocationTrackingEnabledMessage.js";
export {
  msdyn_get_required_fieldsRequest,
  type msdyn_get_required_fieldsRequestParameters,
  msdyn_get_required_fieldsResponse,
} from "./msdyn_get_required_fieldsMessage.js";
export {
  msdyn_GetACIMarsConnectorStatusRequest,
  msdyn_GetACIMarsConnectorStatusResponse,
} from "./msdyn_GetACIMarsConnectorStatusMessage.js";
export {
  msdyn_GetActionTypesRequest,
  type msdyn_GetActionTypesRequestParameters,
  msdyn_GetActionTypesResponse,
} from "./msdyn_GetActionTypesMessage.js";
export {
  msdyn_GetAdditionalPropertiesMetadataRequest,
  type msdyn_GetAdditionalPropertiesMetadataRequestParameters,
  msdyn_GetAdditionalPropertiesMetadataResponse,
} from "./msdyn_GetAdditionalPropertiesMetadataMessage.js";
export {
  msdyn_GetAgentAssistStreamRequest,
  type msdyn_GetAgentAssistStreamRequestParameters,
  msdyn_GetAgentAssistStreamResponse,
} from "./msdyn_GetAgentAssistStreamMessage.js";
export {
  msdyn_GetAISuggestedContactsRequest,
  type msdyn_GetAISuggestedContactsRequestParameters,
  msdyn_GetAISuggestedContactsResponse,
} from "./msdyn_GetAISuggestedContactsMessage.js";
export {
  msdyn_GetAllAttributesDataRequest,
  type msdyn_GetAllAttributesDataRequestParameters,
  msdyn_GetAllAttributesDataResponse,
} from "./msdyn_GetAllAttributesDataMessage.js";
export {
  msdyn_GetAllLeadPredictionModelsRequest,
  msdyn_GetAllLeadPredictionModelsResponse,
} from "./msdyn_GetAllLeadPredictionModelsMessage.js";
export {
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest,
  type msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters,
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse,
} from "./msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsMessage.js";
export {
  msdyn_GetAnalyticsReportDetailRequest,
  type msdyn_GetAnalyticsReportDetailRequestParameters,
  msdyn_GetAnalyticsReportDetailResponse,
} from "./msdyn_GetAnalyticsReportDetailMessage.js";
export {
  msdyn_GetAnalyticsReportTokenRequest,
  type msdyn_GetAnalyticsReportTokenRequestParameters,
  msdyn_GetAnalyticsReportTokenResponse,
} from "./msdyn_GetAnalyticsReportTokenMessage.js";
export {
  msdyn_GetAnswerFromDocumentsRequest,
  type msdyn_GetAnswerFromDocumentsRequestParameters,
  msdyn_GetAnswerFromDocumentsResponse,
} from "./msdyn_GetAnswerFromDocumentsMessage.js";
export {
  msdyn_getAppConfigRequest,
  msdyn_getAppConfigResponse,
} from "./msdyn_getAppConfigMessage.js";
export {
  msdyn_getAppConfigByContextRequest,
  type msdyn_getAppConfigByContextRequestParameters,
  msdyn_getAppConfigByContextResponse,
} from "./msdyn_getAppConfigByContextMessage.js";
export {
  msdyn_GetAppInsightsTelemetryRequest,
  type msdyn_GetAppInsightsTelemetryRequestParameters,
  msdyn_GetAppInsightsTelemetryResponse,
} from "./msdyn_GetAppInsightsTelemetryMessage.js";
export {
  msdyn_GetAppModuleSettingsRequest,
  msdyn_GetAppModuleSettingsResponse,
} from "./msdyn_GetAppModuleSettingsMessage.js";
export {
  msdyn_GetAttributeInfluenceStatisticsRequest,
  type msdyn_GetAttributeInfluenceStatisticsRequestParameters,
  msdyn_GetAttributeInfluenceStatisticsResponse,
} from "./msdyn_GetAttributeInfluenceStatisticsMessage.js";
export {
  msdyn_GetAuditStateRequest,
  msdyn_GetAuditStateResponse,
} from "./msdyn_GetAuditStateMessage.js";
export {
  msdyn_GetAutoCaptureUriRequest,
  type msdyn_GetAutoCaptureUriRequestParameters,
  msdyn_GetAutoCaptureUriResponse,
} from "./msdyn_GetAutoCaptureUriMessage.js";
export {
  msdyn_GetAutonomousAgentEmailAssistRequest,
  type msdyn_GetAutonomousAgentEmailAssistRequestParameters,
  msdyn_GetAutonomousAgentEmailAssistResponse,
} from "./msdyn_GetAutonomousAgentEmailAssistMessage.js";
export {
  msdyn_GetAvailabilitySummaryFromDemandRequest,
  type msdyn_GetAvailabilitySummaryFromDemandRequestParameters,
  msdyn_GetAvailabilitySummaryFromDemandResponse,
} from "./msdyn_GetAvailabilitySummaryFromDemandMessage.js";
export {
  msdyn_GetAzureTokenRequest,
  type msdyn_GetAzureTokenRequestParameters,
  msdyn_GetAzureTokenResponse,
} from "./msdyn_GetAzureTokenMessage.js";
export {
  msdyn_GetBookableResourcesRequest,
  type msdyn_GetBookableResourcesRequestParameters,
  msdyn_GetBookableResourcesResponse,
} from "./msdyn_GetBookableResourcesMessage.js";
export {
  msdyn_GetBookingDetailsByRequirementIdsRequest,
  type msdyn_GetBookingDetailsByRequirementIdsRequestParameters,
  msdyn_GetBookingDetailsByRequirementIdsResponse,
} from "./msdyn_GetBookingDetailsByRequirementIdsMessage.js";
export {
  msdyn_GetBoolFCSValueRequest,
  type msdyn_GetBoolFCSValueRequestParameters,
  msdyn_GetBoolFCSValueResponse,
} from "./msdyn_GetBoolFCSValueMessage.js";
export {
  msdyn_GetBotConfigurationRequest,
  type msdyn_GetBotConfigurationRequestParameters,
  msdyn_GetBotConfigurationResponse,
} from "./msdyn_GetBotConfigurationMessage.js";
export {
  msdyn_GetCaseAggregationRequest,
  type msdyn_GetCaseAggregationRequestParameters,
  msdyn_GetCaseAggregationResponse,
} from "./msdyn_GetCaseAggregationMessage.js";
export {
  msdyn_GetCaseResolutionAgentSettingsRequest,
  type msdyn_GetCaseResolutionAgentSettingsRequestParameters,
  msdyn_GetCaseResolutionAgentSettingsResponse,
} from "./msdyn_GetCaseResolutionAgentSettingsMessage.js";
export {
  msdyn_GetCaseSuggestionsRequest,
  type msdyn_GetCaseSuggestionsRequestParameters,
  msdyn_GetCaseSuggestionsResponse,
} from "./msdyn_GetCaseSuggestionsMessage.js";
export {
  msdyn_GetCecCompatibilityForOmniChannelRequest,
  msdyn_GetCecCompatibilityForOmniChannelResponse,
} from "./msdyn_GetCecCompatibilityForOmniChannelMessage.js";
export {
  msdyn_GetChatResponseRequest,
  type msdyn_GetChatResponseRequestParameters,
  msdyn_GetChatResponseResponse,
} from "./msdyn_GetChatResponseMessage.js";
export {
  msdyn_GetChildrensForHierarchyRequest,
  type msdyn_GetChildrensForHierarchyRequestParameters,
  msdyn_GetChildrensForHierarchyResponse,
} from "./msdyn_GetChildrensForHierarchyMessage.js";
export {
  msdyn_GetChildResourcesRequest,
  type msdyn_GetChildResourcesRequestParameters,
  msdyn_GetChildResourcesResponse,
} from "./msdyn_GetChildResourcesMessage.js";
export {
  msdyn_GetCJOTreeNodesRequest,
  type msdyn_GetCJOTreeNodesRequestParameters,
  msdyn_GetCJOTreeNodesResponse,
} from "./msdyn_GetCJOTreeNodesMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberRequest,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberRequestParameters,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequest,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequestParameters,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineMessage.js";
export {
  msdyn_GetContactsFromAssociatedConversationsRequest,
  type msdyn_GetContactsFromAssociatedConversationsRequestParameters,
  msdyn_GetContactsFromAssociatedConversationsResponse,
} from "./msdyn_GetContactsFromAssociatedConversationsMessage.js";
export {
  msdyn_GetContactsFromTimelineRequest,
  type msdyn_GetContactsFromTimelineRequestParameters,
  msdyn_GetContactsFromTimelineResponse,
} from "./msdyn_GetContactsFromTimelineMessage.js";
export {
  msdyn_GetCopilotAgentStatusForEnvironmentRequest,
  msdyn_GetCopilotAgentStatusForEnvironmentResponse,
} from "./msdyn_GetCopilotAgentStatusForEnvironmentMessage.js";
export {
  msdyn_GetCopilotServiceStreamRequest,
  type msdyn_GetCopilotServiceStreamRequestParameters,
  msdyn_GetCopilotServiceStreamResponse,
} from "./msdyn_GetCopilotServiceStreamMessage.js";
export {
  msdyn_GetCopilotSettingsDataRequest,
  type msdyn_GetCopilotSettingsDataRequestParameters,
  msdyn_GetCopilotSettingsDataResponse,
} from "./msdyn_GetCopilotSettingsDataMessage.js";
export {
  msdyn_getCTandEACdisabledEntitiesRequest,
  type msdyn_getCTandEACdisabledEntitiesRequestParameters,
  msdyn_getCTandEACdisabledEntitiesResponse,
} from "./msdyn_getCTandEACdisabledEntitiesMessage.js";
export {
  msdyn_getcurrentemailcontentRequest,
  type msdyn_getcurrentemailcontentRequestParameters,
  msdyn_getcurrentemailcontentResponse,
} from "./msdyn_getcurrentemailcontentMessage.js";
export {
  msdyn_GetCustomActionListRequest,
  type msdyn_GetCustomActionListRequestParameters,
  msdyn_GetCustomActionListResponse,
} from "./msdyn_GetCustomActionListMessage.js";
export {
  msdyn_GetCustomActionParametersRequest,
  type msdyn_GetCustomActionParametersRequestParameters,
  msdyn_GetCustomActionParametersResponse,
} from "./msdyn_GetCustomActionParametersMessage.js";
export {
  msdyn_GetDocumentContentRequest,
  type msdyn_GetDocumentContentRequestParameters,
  msdyn_GetDocumentContentResponse,
} from "./msdyn_GetDocumentContentMessage.js";
export {
  msdyn_GetDuplicatesActionRequest,
  type msdyn_GetDuplicatesActionRequestParameters,
  msdyn_GetDuplicatesActionResponse,
} from "./msdyn_GetDuplicatesActionMessage.js";
export {
  msdyn_GetDynamicFieldsForActionTypeRequest,
  type msdyn_GetDynamicFieldsForActionTypeRequestParameters,
  msdyn_GetDynamicFieldsForActionTypeResponse,
} from "./msdyn_GetDynamicFieldsForActionTypeMessage.js";
export {
  msdyn_GetEligibleRegardingEntitiesRequest,
  type msdyn_GetEligibleRegardingEntitiesRequestParameters,
  msdyn_GetEligibleRegardingEntitiesResponse,
} from "./msdyn_GetEligibleRegardingEntitiesMessage.js";
export {
  msdyn_GetEmailAssistStreamRequest,
  type msdyn_GetEmailAssistStreamRequestParameters,
  msdyn_GetEmailAssistStreamResponse,
} from "./msdyn_GetEmailAssistStreamMessage.js";
export {
  msdyn_GetEntityListRequest,
  type msdyn_GetEntityListRequestParameters,
  msdyn_GetEntityListResponse,
} from "./msdyn_GetEntityListMessage.js";
export {
  msdyn_GetEntityListForCustomActionRequest,
  type msdyn_GetEntityListForCustomActionRequestParameters,
  msdyn_GetEntityListForCustomActionResponse,
} from "./msdyn_GetEntityListForCustomActionMessage.js";
export {
  msdyn_GetEntityViewsRequest,
  type msdyn_GetEntityViewsRequestParameters,
  msdyn_GetEntityViewsResponse,
} from "./msdyn_GetEntityViewsMessage.js";
export {
  msdyn_GetExpandedContractRequest,
  type msdyn_GetExpandedContractRequestParameters,
  msdyn_GetExpandedContractResponse,
} from "./msdyn_GetExpandedContractMessage.js";
export {
  msdyn_GetExtractsFromContentRequest,
  type msdyn_GetExtractsFromContentRequestParameters,
  msdyn_GetExtractsFromContentResponse,
} from "./msdyn_GetExtractsFromContentMessage.js";
export {
  msdyn_GetFavoriteArticlesRequest,
  type msdyn_GetFavoriteArticlesRequestParameters,
  msdyn_GetFavoriteArticlesResponse,
} from "./msdyn_GetFavoriteArticlesMessage.js";
export {
  msdyn_GetFCBValueRequest,
  type msdyn_GetFCBValueRequestParameters,
  msdyn_GetFCBValueResponse,
} from "./msdyn_GetFCBValueMessage.js";
export {
  msdyn_GetFCSValueRequest,
  type msdyn_GetFCSValueRequestParameters,
  msdyn_GetFCSValueResponse,
} from "./msdyn_GetFCSValueMessage.js";
export {
  msdyn_GetFCSWithUserContextRequest,
  type msdyn_GetFCSWithUserContextRequestParameters,
  msdyn_GetFCSWithUserContextResponse,
} from "./msdyn_GetFCSWithUserContextMessage.js";
export {
  msdyn_GetFeatureConsentStatusRequest,
  type msdyn_GetFeatureConsentStatusRequestParameters,
  msdyn_GetFeatureConsentStatusResponse,
} from "./msdyn_GetFeatureConsentStatusMessage.js";
export {
  msdyn_GetFeatureControlStatusRequest,
  type msdyn_GetFeatureControlStatusRequestParameters,
  msdyn_GetFeatureControlStatusResponse,
} from "./msdyn_GetFeatureControlStatusMessage.js";
export {
  msdyn_GetFormattedOpportunityDataRequest,
  type msdyn_GetFormattedOpportunityDataRequestParameters,
  msdyn_GetFormattedOpportunityDataResponse,
} from "./msdyn_GetFormattedOpportunityDataMessage.js";
export {
  msdyn_GetGPT3PredictionRequest,
  type msdyn_GetGPT3PredictionRequestParameters,
  msdyn_GetGPT3PredictionResponse,
} from "./msdyn_GetGPT3PredictionMessage.js";
export {
  msdyn_GetHierarchyDataRequest,
  type msdyn_GetHierarchyDataRequestParameters,
  msdyn_GetHierarchyDataResponse,
} from "./msdyn_GetHierarchyDataMessage.js";
export {
  msdyn_GetInsightsRequest,
  type msdyn_GetInsightsRequestParameters,
  msdyn_GetInsightsResponse,
} from "./msdyn_GetInsightsMessage.js";
export {
  msdyn_GetIntentAssistSuggestionsForBotRequest,
  type msdyn_GetIntentAssistSuggestionsForBotRequestParameters,
  msdyn_GetIntentAssistSuggestionsForBotResponse,
} from "./msdyn_GetIntentAssistSuggestionsForBotMessage.js";
export {
  msdyn_GetIoTAlertAggregationRequest,
  type msdyn_GetIoTAlertAggregationRequestParameters,
  msdyn_GetIoTAlertAggregationResponse,
} from "./msdyn_GetIoTAlertAggregationMessage.js";
export {
  msdyn_GetIoTCommandMetadataRequest,
  type msdyn_GetIoTCommandMetadataRequestParameters,
  msdyn_GetIoTCommandMetadataResponse,
} from "./msdyn_GetIoTCommandMetadataMessage.js";
export {
  msdyn_GetIoTVisualizationSummaryRequest,
  type msdyn_GetIoTVisualizationSummaryRequestParameters,
  msdyn_GetIoTVisualizationSummaryResponse,
} from "./msdyn_GetIoTVisualizationSummaryMessage.js";
export {
  msdyn_getIslandUrlRequest,
  msdyn_getIslandUrlResponse,
} from "./msdyn_getIslandUrlMessage.js";
export {
  msdyn_GetKAObjectFromTemplateRequest,
  type msdyn_GetKAObjectFromTemplateRequestParameters,
  msdyn_GetKAObjectFromTemplateResponse,
} from "./msdyn_GetKAObjectFromTemplateMessage.js";
export {
  msdyn_GetKeywordsRequest,
  type msdyn_GetKeywordsRequestParameters,
  msdyn_GetKeywordsResponse,
} from "./msdyn_GetKeywordsMessage.js";
export {
  msdyn_GetKnowledgeDraftAssistStreamRequest,
  type msdyn_GetKnowledgeDraftAssistStreamRequestParameters,
  msdyn_GetKnowledgeDraftAssistStreamResponse,
} from "./msdyn_GetKnowledgeDraftAssistStreamMessage.js";
export {
  msdyn_GetKnowledgeSuggestionsRequest,
  type msdyn_GetKnowledgeSuggestionsRequestParameters,
  msdyn_GetKnowledgeSuggestionsResponse,
} from "./msdyn_GetKnowledgeSuggestionsMessage.js";
export {
  msdyn_GetLeadCallPrepSheetDetailsRequest,
  type msdyn_GetLeadCallPrepSheetDetailsRequestParameters,
  msdyn_GetLeadCallPrepSheetDetailsResponse,
} from "./msdyn_GetLeadCallPrepSheetDetailsMessage.js";
export {
  msdyn_GetLeadPreferredOutreachCtaRequest,
  type msdyn_GetLeadPreferredOutreachCtaRequestParameters,
  msdyn_GetLeadPreferredOutreachCtaResponse,
} from "./msdyn_GetLeadPreferredOutreachCtaMessage.js";
export {
  msdyn_GetLegalAcceptanceStatusRequest,
  msdyn_GetLegalAcceptanceStatusResponse,
} from "./msdyn_GetLegalAcceptanceStatusMessage.js";
export {
  msdyn_GetLicenseInfoRequest,
  msdyn_GetLicenseInfoResponse,
} from "./msdyn_GetLicenseInfoMessage.js";
export {
  msdyn_GetLineOfBusinessOptionValueRequest,
  type msdyn_GetLineOfBusinessOptionValueRequestParameters,
  msdyn_GetLineOfBusinessOptionValueResponse,
} from "./msdyn_GetLineOfBusinessOptionValueMessage.js";
export {
  msdyn_GetMessageForCaseFollowupAndClosureAgentRequest,
  type msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters,
  msdyn_GetMessageForCaseFollowupAndClosureAgentResponse,
} from "./msdyn_GetMessageForCaseFollowupAndClosureAgentMessage.js";
export {
  msdyn_GetMessageIdsForOpportunityCustomActionRequest,
  type msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters,
  msdyn_GetMessageIdsForOpportunityCustomActionResponse,
} from "./msdyn_GetMessageIdsForOpportunityCustomActionMessage.js";
export {
  msdyn_GetMLPredictionRequest,
  type msdyn_GetMLPredictionRequestParameters,
  msdyn_GetMLPredictionResponse,
} from "./msdyn_GetMLPredictionMessage.js";
export {
  msdyn_GetMultipleResourceBookingDetailsRequest,
  type msdyn_GetMultipleResourceBookingDetailsRequestParameters,
  msdyn_GetMultipleResourceBookingDetailsResponse,
} from "./msdyn_GetMultipleResourceBookingDetailsMessage.js";
export {
  msdyn_GetNotesAnalysisRequest,
  type msdyn_GetNotesAnalysisRequestParameters,
  msdyn_GetNotesAnalysisResponse,
} from "./msdyn_GetNotesAnalysisMessage.js";
export {
  msdyn_GetOCSharedServiceURIRequest,
  msdyn_GetOCSharedServiceURIResponse,
} from "./msdyn_GetOCSharedServiceURIMessage.js";
export {
  msdyn_GetODOSFeatureEnabledRolesRequest,
  type msdyn_GetODOSFeatureEnabledRolesRequestParameters,
  msdyn_GetODOSFeatureEnabledRolesResponse,
} from "./msdyn_GetODOSFeatureEnabledRolesMessage.js";
export {
  msdyn_GetODOSFeatureProvisioningStatusRequest,
  type msdyn_GetODOSFeatureProvisioningStatusRequestParameters,
  msdyn_GetODOSFeatureProvisioningStatusResponse,
} from "./msdyn_GetODOSFeatureProvisioningStatusMessage.js";
export {
  msdyn_GetODOSMetadataRequest,
  msdyn_GetODOSMetadataResponse,
} from "./msdyn_GetODOSMetadataMessage.js";
export {
  msdyn_GetOpportunityResearchResultRequest,
  type msdyn_GetOpportunityResearchResultRequestParameters,
  msdyn_GetOpportunityResearchResultResponse,
} from "./msdyn_GetOpportunityResearchResultMessage.js";
export {
  msdyn_GetOrCreateBookableResourcesRequest,
  type msdyn_GetOrCreateBookableResourcesRequestParameters,
  msdyn_GetOrCreateBookableResourcesResponse,
} from "./msdyn_GetOrCreateBookableResourcesMessage.js";
export {
  msdyn_GetOrCreateExtUserSettingRequest,
  msdyn_GetOrCreateExtUserSettingResponse,
} from "./msdyn_GetOrCreateExtUserSettingMessage.js";
export {
  msdyn_GetOrCreateLinkedActivityRequest,
  type msdyn_GetOrCreateLinkedActivityRequestParameters,
  msdyn_GetOrCreateLinkedActivityResponse,
} from "./msdyn_GetOrCreateLinkedActivityMessage.js";
export {
  msdyn_GetOrganizationalUnitsWithinRadiusRequest,
  type msdyn_GetOrganizationalUnitsWithinRadiusRequestParameters,
  msdyn_GetOrganizationalUnitsWithinRadiusResponse,
} from "./msdyn_GetOrganizationalUnitsWithinRadiusMessage.js";
export {
  msdyn_GetOrganizationProvisioningStatusRequest,
  msdyn_GetOrganizationProvisioningStatusResponse,
} from "./msdyn_GetOrganizationProvisioningStatusMessage.js";
export {
  msdyn_GetORReasonExplanationRequest,
  type msdyn_GetORReasonExplanationRequestParameters,
  msdyn_GetORReasonExplanationResponse,
} from "./msdyn_GetORReasonExplanationMessage.js";
export {
  msdyn_GetPoPTokenRequest,
  type msdyn_GetPoPTokenRequestParameters,
  msdyn_GetPoPTokenResponse,
} from "./msdyn_GetPoPTokenMessage.js";
export {
  msdyn_GetPostOperationsRequest,
  type msdyn_GetPostOperationsRequestParameters,
  msdyn_GetPostOperationsResponse,
} from "./msdyn_GetPostOperationsMessage.js";
export {
  msdyn_GetPredictionModelStatusRequest,
  type msdyn_GetPredictionModelStatusRequestParameters,
  msdyn_GetPredictionModelStatusResponse,
} from "./msdyn_GetPredictionModelStatusMessage.js";
export {
  msdyn_GetPremiumOrgStatusRequest,
  msdyn_GetPremiumOrgStatusResponse,
} from "./msdyn_GetPremiumOrgStatusMessage.js";
export {
  msdyn_GetPromoContentFromIrisRequest,
  type msdyn_GetPromoContentFromIrisRequestParameters,
  msdyn_GetPromoContentFromIrisResponse,
} from "./msdyn_GetPromoContentFromIrisMessage.js";
export {
  msdyn_GetRecordUsersRequest,
  type msdyn_GetRecordUsersRequestParameters,
  msdyn_GetRecordUsersResponse,
} from "./msdyn_GetRecordUsersMessage.js";
export {
  msdyn_GetRelatedIoTDevicesByEntityRequest,
  type msdyn_GetRelatedIoTDevicesByEntityRequestParameters,
  msdyn_GetRelatedIoTDevicesByEntityResponse,
} from "./msdyn_GetRelatedIoTDevicesByEntityMessage.js";
export {
  msdyn_GetRelatedOpportunitiesForOpptyResearchRequest,
  type msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters,
  msdyn_GetRelatedOpportunitiesForOpptyResearchResponse,
} from "./msdyn_GetRelatedOpportunitiesForOpptyResearchMessage.js";
export {
  msdyn_GetRequirementChartDataRequest,
  type msdyn_GetRequirementChartDataRequestParameters,
  msdyn_GetRequirementChartDataResponse,
} from "./msdyn_GetRequirementChartDataMessage.js";
export {
  msdyn_GetRequirementDemandRequest,
  type msdyn_GetRequirementDemandRequestParameters,
  msdyn_GetRequirementDemandResponse,
} from "./msdyn_GetRequirementDemandMessage.js";
export {
  msdyn_GetRequirementDemandDisplayRequest,
  type msdyn_GetRequirementDemandDisplayRequestParameters,
  msdyn_GetRequirementDemandDisplayResponse,
} from "./msdyn_GetRequirementDemandDisplayMessage.js";
export {
  msdyn_GetRequirementDependencySetRequest,
  type msdyn_GetRequirementDependencySetRequestParameters,
  msdyn_GetRequirementDependencySetResponse,
} from "./msdyn_GetRequirementDependencySetMessage.js";
export {
  msdyn_GetRequirementModelsRequest,
  type msdyn_GetRequirementModelsRequestParameters,
  msdyn_GetRequirementModelsResponse,
} from "./msdyn_GetRequirementModelsMessage.js";
export {
  msdyn_GetResourceBookingDetailsRequest,
  type msdyn_GetResourceBookingDetailsRequestParameters,
  msdyn_GetResourceBookingDetailsResponse,
} from "./msdyn_GetResourceBookingDetailsMessage.js";
export {
  msdyn_GetResourceBookingFormParametersRequest,
  type msdyn_GetResourceBookingFormParametersRequestParameters,
  msdyn_GetResourceBookingFormParametersResponse,
} from "./msdyn_GetResourceBookingFormParametersMessage.js";
export {
  msdyn_GetResourceGroupMembershipsRequest,
  type msdyn_GetResourceGroupMembershipsRequestParameters,
  msdyn_GetResourceGroupMembershipsResponse,
} from "./msdyn_GetResourceGroupMembershipsMessage.js";
export {
  msdyn_GetResourcePopupDetailsRequest,
  type msdyn_GetResourcePopupDetailsRequestParameters,
  msdyn_GetResourcePopupDetailsResponse,
} from "./msdyn_GetResourcePopupDetailsMessage.js";
export {
  msdyn_GetResourcesRequest,
  type msdyn_GetResourcesRequestParameters,
  msdyn_GetResourcesResponse,
} from "./msdyn_GetResourcesMessage.js";
export {
  msdyn_GetResourceUtilizationGridRequest,
  type msdyn_GetResourceUtilizationGridRequestParameters,
  msdyn_GetResourceUtilizationGridResponse,
} from "./msdyn_GetResourceUtilizationGridMessage.js";
export {
  msdyn_GetResourceWorkHoursForTimeFrameRequest,
  type msdyn_GetResourceWorkHoursForTimeFrameRequestParameters,
  msdyn_GetResourceWorkHoursForTimeFrameResponse,
} from "./msdyn_GetResourceWorkHoursForTimeFrameMessage.js";
export {
  msdyn_GetRICommonFCBStatusRequest,
  type msdyn_GetRICommonFCBStatusRequestParameters,
  msdyn_GetRICommonFCBStatusResponse,
} from "./msdyn_GetRICommonFCBStatusMessage.js";
export {
  msdyn_GetRIProvisioningStatusRequest,
  msdyn_GetRIProvisioningStatusResponse,
} from "./msdyn_GetRIProvisioningStatusMessage.js";
export {
  msdyn_GetRITenantEndpointRequest,
  msdyn_GetRITenantEndpointResponse,
} from "./msdyn_GetRITenantEndpointMessage.js";
export {
  msdyn_GetSalesAcceleratedSellerRequest,
  type msdyn_GetSalesAcceleratedSellerRequestParameters,
  msdyn_GetSalesAcceleratedSellerResponse,
} from "./msdyn_GetSalesAcceleratedSellerMessage.js";
export {
  msdyn_GetSalesAcceleratedSellerDetailsRequest,
  type msdyn_GetSalesAcceleratedSellerDetailsRequestParameters,
  msdyn_GetSalesAcceleratedSellerDetailsResponse,
} from "./msdyn_GetSalesAcceleratedSellerDetailsMessage.js";
export {
  msdyn_GetSalesAccelerationConfigurationStatusRequest,
  msdyn_GetSalesAccelerationConfigurationStatusResponse,
} from "./msdyn_GetSalesAccelerationConfigurationStatusMessage.js";
export {
  msdyn_GetSalesCopilotConsentAndInfraStatusRequest,
  type msdyn_GetSalesCopilotConsentAndInfraStatusRequestParameters,
  msdyn_GetSalesCopilotConsentAndInfraStatusResponse,
} from "./msdyn_GetSalesCopilotConsentAndInfraStatusMessage.js";
export {
  msdyn_GetSalesCopilotEmailInsightsRequest,
  type msdyn_GetSalesCopilotEmailInsightsRequestParameters,
  msdyn_GetSalesCopilotEmailInsightsResponse,
} from "./msdyn_GetSalesCopilotEmailInsightsMessage.js";
export {
  msdyn_GetSalesMeetingsRequest,
  type msdyn_GetSalesMeetingsRequestParameters,
  msdyn_GetSalesMeetingsResponse,
} from "./msdyn_GetSalesMeetingsMessage.js";
export {
  msdyn_GetSalesRowSummaryRequest,
  type msdyn_GetSalesRowSummaryRequestParameters,
  msdyn_GetSalesRowSummaryResponse,
} from "./msdyn_GetSalesRowSummaryMessage.js";
export {
  msdyn_getSalesSequenceExperimentSettingsRequest,
  type msdyn_getSalesSequenceExperimentSettingsRequestParameters,
  msdyn_getSalesSequenceExperimentSettingsResponse,
} from "./msdyn_getSalesSequenceExperimentSettingsMessage.js";
export {
  msdyn_getSalesSequenceExperimentStatusRequest,
  type msdyn_getSalesSequenceExperimentStatusRequestParameters,
  msdyn_getSalesSequenceExperimentStatusResponse,
} from "./msdyn_getSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_getSalesSequenceExperimentVersionRequest,
  type msdyn_getSalesSequenceExperimentVersionRequestParameters,
  msdyn_getSalesSequenceExperimentVersionResponse,
} from "./msdyn_getSalesSequenceExperimentVersionMessage.js";
export {
  msdyn_GetSankeyDataRequest,
  type msdyn_GetSankeyDataRequestParameters,
  msdyn_GetSankeyDataResponse,
} from "./msdyn_GetSankeyDataMessage.js";
export {
  msdyn_GetSankeyViewKPIsRequest,
  type msdyn_GetSankeyViewKPIsRequestParameters,
  msdyn_GetSankeyViewKPIsResponse,
} from "./msdyn_GetSankeyViewKPIsMessage.js";
export {
  msdyn_GetSellerAuditStateRequest,
  msdyn_GetSellerAuditStateResponse,
} from "./msdyn_GetSellerAuditStateMessage.js";
export {
  msdyn_GetSequenceAnalyticsKPIsRequest,
  type msdyn_GetSequenceAnalyticsKPIsRequestParameters,
  msdyn_GetSequenceAnalyticsKPIsResponse,
} from "./msdyn_GetSequenceAnalyticsKPIsMessage.js";
export {
  msdyn_GetSequenceAssignedOwnersRequest,
  type msdyn_GetSequenceAssignedOwnersRequestParameters,
  msdyn_GetSequenceAssignedOwnersResponse,
} from "./msdyn_GetSequenceAssignedOwnersMessage.js";
export {
  msdyn_GetServiceBaseUrlRequest,
  type msdyn_GetServiceBaseUrlRequestParameters,
  msdyn_GetServiceBaseUrlResponse,
} from "./msdyn_GetServiceBaseUrlMessage.js";
export {
  msdyn_GetSIFeatureConfigurationRequest,
  type msdyn_GetSIFeatureConfigurationRequestParameters,
  msdyn_GetSIFeatureConfigurationResponse,
} from "./msdyn_GetSIFeatureConfigurationMessage.js";
export {
  msdyn_GetSILicenseStatusRequest,
  msdyn_GetSILicenseStatusResponse,
} from "./msdyn_GetSILicenseStatusMessage.js";
export {
  msdyn_GetSIPackageStatusRequest,
  type msdyn_GetSIPackageStatusRequestParameters,
  msdyn_GetSIPackageStatusResponse,
} from "./msdyn_GetSIPackageStatusMessage.js";
export {
  msdyn_GetSubjectHierarchyDataRequest,
  type msdyn_GetSubjectHierarchyDataRequestParameters,
  msdyn_GetSubjectHierarchyDataResponse,
} from "./msdyn_GetSubjectHierarchyDataMessage.js";
export {
  msdyn_GetSuggestedActionsForLeadRequest,
  msdyn_GetSuggestedActionsForLeadResponse,
} from "./msdyn_GetSuggestedActionsForLeadMessage.js";
export {
  msdyn_GetSuggestedContactsRequest,
  type msdyn_GetSuggestedContactsRequestParameters,
  msdyn_GetSuggestedContactsResponse,
} from "./msdyn_GetSuggestedContactsMessage.js";
export {
  msdyn_GetSummaryBookingsRequest,
  type msdyn_GetSummaryBookingsRequestParameters,
  msdyn_GetSummaryBookingsResponse,
} from "./msdyn_GetSummaryBookingsMessage.js";
export {
  msdyn_GetSwarmInvitationCardRequest,
  type msdyn_GetSwarmInvitationCardRequestParameters,
  msdyn_GetSwarmInvitationCardResponse,
} from "./msdyn_GetSwarmInvitationCardMessage.js";
export {
  msdyn_GetSwarmResponseCardRequest,
  type msdyn_GetSwarmResponseCardRequestParameters,
  msdyn_GetSwarmResponseCardResponse,
} from "./msdyn_GetSwarmResponseCardMessage.js";
export {
  msdyn_GetSwarmSkillsRequest,
  type msdyn_GetSwarmSkillsRequestParameters,
  msdyn_GetSwarmSkillsResponse,
} from "./msdyn_GetSwarmSkillsMessage.js";
export {
  msdyn_GetTalkingPointsRequest,
  type msdyn_GetTalkingPointsRequestParameters,
  msdyn_GetTalkingPointsResponse,
} from "./msdyn_GetTalkingPointsMessage.js";
export {
  msdyn_GetTimeLineRecordsRequest,
  type msdyn_GetTimeLineRecordsRequestParameters,
  msdyn_GetTimeLineRecordsResponse,
} from "./msdyn_GetTimeLineRecordsMessage.js";
export {
  msdyn_GetTrainingResultsRequest,
  type msdyn_GetTrainingResultsRequestParameters,
  msdyn_GetTrainingResultsResponse,
} from "./msdyn_GetTrainingResultsMessage.js";
export {
  msdyn_GetUserConsentStatusRequest,
  msdyn_GetUserConsentStatusResponse,
} from "./msdyn_GetUserConsentStatusMessage.js";
export {
  msdyn_GetWidgetsDataRequest,
  type msdyn_GetWidgetsDataRequestParameters,
  msdyn_GetWidgetsDataResponse,
} from "./msdyn_GetWidgetsDataMessage.js";
export {
  msdyn_GetWorkListConfigurationRequest,
  type msdyn_GetWorkListConfigurationRequestParameters,
  msdyn_GetWorkListConfigurationResponse,
} from "./msdyn_GetWorkListConfigurationMessage.js";
export {
  msdyn_GetWorkOrderAggregationRequest,
  type msdyn_GetWorkOrderAggregationRequestParameters,
  msdyn_GetWorkOrderAggregationResponse,
} from "./msdyn_GetWorkOrderAggregationMessage.js";
export {
  msdyn_HandleTrainingStatusRequest,
  type msdyn_HandleTrainingStatusRequestParameters,
  msdyn_HandleTrainingStatusResponse,
} from "./msdyn_HandleTrainingStatusMessage.js";
export {
  msdyn_ImportAnalyticsReportRequest,
  type msdyn_ImportAnalyticsReportRequestParameters,
  msdyn_ImportAnalyticsReportResponse,
} from "./msdyn_ImportAnalyticsReportMessage.js";
export {
  msdyn_IngestAnalyticsDataRequest,
  type msdyn_IngestAnalyticsDataRequestParameters,
  msdyn_IngestAnalyticsDataResponse,
} from "./msdyn_IngestAnalyticsDataMessage.js";
export {
  msdyn_IngestAnalyticsDataCustomChannelsRequest,
  type msdyn_IngestAnalyticsDataCustomChannelsRequestParameters,
  msdyn_IngestAnalyticsDataCustomChannelsResponse,
} from "./msdyn_IngestAnalyticsDataCustomChannelsMessage.js";
export {
  msdyn_InitEntityRoutingRequest,
  type msdyn_InitEntityRoutingRequestParameters,
  msdyn_InitEntityRoutingResponse,
} from "./msdyn_InitEntityRoutingMessage.js";
export {
  msdyn_InitEntityRoutingFlowRequest,
  type msdyn_InitEntityRoutingFlowRequestParameters,
  msdyn_InitEntityRoutingFlowResponse,
} from "./msdyn_InitEntityRoutingFlowMessage.js";
export {
  msdyn_initializedefaultclonequeryRequest,
  type msdyn_initializedefaultclonequeryRequestParameters,
  msdyn_initializedefaultclonequeryResponse,
} from "./msdyn_initializedefaultclonequeryMessage.js";
export {
  msdyn_InitializeSessionChannelRequest,
  msdyn_InitializeSessionChannelResponse,
} from "./msdyn_InitializeSessionChannelMessage.js";
export {
  msdyn_InitiateCCaaSAPIsAsyncRequest,
  type msdyn_InitiateCCaaSAPIsAsyncRequestParameters,
  msdyn_InitiateCCaaSAPIsAsyncResponse,
} from "./msdyn_InitiateCCaaSAPIsAsyncMessage.js";
export {
  msdyn_InitiateCCaaSCloseConversationRequest,
  type msdyn_InitiateCCaaSCloseConversationRequestParameters,
  msdyn_InitiateCCaaSCloseConversationResponse,
} from "./msdyn_InitiateCCaaSCloseConversationMessage.js";
export {
  msdyn_InitiateCCaaSPickConversationRequest,
  type msdyn_InitiateCCaaSPickConversationRequestParameters,
  msdyn_InitiateCCaaSPickConversationResponse,
} from "./msdyn_InitiateCCaaSPickConversationMessage.js";
export {
  msdyn_InsertTrainingRecordsRequest,
  type msdyn_InsertTrainingRecordsRequestParameters,
  msdyn_InsertTrainingRecordsResponse,
} from "./msdyn_InsertTrainingRecordsMessage.js";
export {
  msdyn_InstallSalesInsightsSolutionRequest,
  type msdyn_InstallSalesInsightsSolutionRequestParameters,
  msdyn_InstallSalesInsightsSolutionResponse,
} from "./msdyn_InstallSalesInsightsSolutionMessage.js";
export {
  msdyn_IntentServiceAPICallProxyRequest,
  type msdyn_IntentServiceAPICallProxyRequestParameters,
  msdyn_IntentServiceAPICallProxyResponse,
} from "./msdyn_IntentServiceAPICallProxyMessage.js";
export {
  msdyn_invokeCaseProcessingAgentRequest,
  type msdyn_invokeCaseProcessingAgentRequestParameters,
  msdyn_invokeCaseProcessingAgentResponse,
} from "./msdyn_invokeCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeCopilotAPIRequest,
  type msdyn_InvokeCopilotAPIRequestParameters,
  msdyn_InvokeCopilotAPIResponse,
} from "./msdyn_InvokeCopilotAPIMessage.js";
export {
  msdyn_invokeCustomAgentForCaseProcessingAgentRequest,
  type msdyn_invokeCustomAgentForCaseProcessingAgentRequestParameters,
  msdyn_invokeCustomAgentForCaseProcessingAgentResponse,
} from "./msdyn_invokeCustomAgentForCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeEvaluationActionRequest,
  type msdyn_InvokeEvaluationActionRequestParameters,
  msdyn_InvokeEvaluationActionResponse,
} from "./msdyn_InvokeEvaluationActionMessage.js";
export {
  msdyn_InvokeGetNextSuggestionRequest,
  type msdyn_InvokeGetNextSuggestionRequestParameters,
  msdyn_InvokeGetNextSuggestionResponse,
} from "./msdyn_InvokeGetNextSuggestionMessage.js";
export {
  msdyn_InvokeIntelligenceActionRequest,
  type msdyn_InvokeIntelligenceActionRequestParameters,
  msdyn_InvokeIntelligenceActionResponse,
} from "./msdyn_InvokeIntelligenceActionMessage.js";
export {
  msdyn_InvokeOutboundAPIRequest,
  type msdyn_InvokeOutboundAPIRequestParameters,
  msdyn_InvokeOutboundAPIResponse,
} from "./msdyn_InvokeOutboundAPIMessage.js";
export {
  msdyn_InvokeServiceStoredProcRequest,
  type msdyn_InvokeServiceStoredProcRequestParameters,
  msdyn_InvokeServiceStoredProcResponse,
} from "./msdyn_InvokeServiceStoredProcMessage.js";
export {
  msdyn_InvokeStoredProcRequest,
  type msdyn_InvokeStoredProcRequestParameters,
  msdyn_InvokeStoredProcResponse,
} from "./msdyn_InvokeStoredProcMessage.js";
export {
  msdyn_IoTCheckIfRecordExistsInEntityRequest,
  type msdyn_IoTCheckIfRecordExistsInEntityRequestParameters,
  msdyn_IoTCheckIfRecordExistsInEntityResponse,
} from "./msdyn_IoTCheckIfRecordExistsInEntityMessage.js";
export {
  msdyn_IoTGetDeviceEventsRequest,
  type msdyn_IoTGetDeviceEventsRequestParameters,
  msdyn_IoTGetDeviceEventsResponse,
} from "./msdyn_IoTGetDeviceEventsMessage.js";
export {
  msdyn_IoTGetEditablePropertiesMetadataRequest,
  type msdyn_IoTGetEditablePropertiesMetadataRequestParameters,
  msdyn_IoTGetEditablePropertiesMetadataResponse,
} from "./msdyn_IoTGetEditablePropertiesMetadataMessage.js";
export {
  msdyn_IoTGetIoTAlertCustomAttributesRequest,
  msdyn_IoTGetIoTAlertCustomAttributesResponse,
} from "./msdyn_IoTGetIoTAlertCustomAttributesMessage.js";
export {
  msdyn_IoTGetModelStatusInternalRequest,
  type msdyn_IoTGetModelStatusInternalRequestParameters,
  msdyn_IoTGetModelStatusInternalResponse,
} from "./msdyn_IoTGetModelStatusInternalMessage.js";
export {
  msdyn_IoTGetTagsMetadataRequest,
  type msdyn_IoTGetTagsMetadataRequestParameters,
  msdyn_IoTGetTagsMetadataResponse,
} from "./msdyn_IoTGetTagsMetadataMessage.js";
export {
  msdyn_IoTHubGetAggregatedDeviceReadingsRequest,
  type msdyn_IoTHubGetAggregatedDeviceReadingsRequestParameters,
  msdyn_IoTHubGetAggregatedDeviceReadingsResponse,
} from "./msdyn_IoTHubGetAggregatedDeviceReadingsMessage.js";
export {
  msdyn_IoTHubPullDeviceDataRequest,
  type msdyn_IoTHubPullDeviceDataRequestParameters,
  msdyn_IoTHubPullDeviceDataResponse,
} from "./msdyn_IoTHubPullDeviceDataMessage.js";
export {
  msdyn_IoTHubQueryDeviceReadingsRequest,
  type msdyn_IoTHubQueryDeviceReadingsRequestParameters,
  msdyn_IoTHubQueryDeviceReadingsResponse,
} from "./msdyn_IoTHubQueryDeviceReadingsMessage.js";
export {
  msdyn_IoTHubRegisterDeviceRequest,
  type msdyn_IoTHubRegisterDeviceRequestParameters,
  msdyn_IoTHubRegisterDeviceResponse,
} from "./msdyn_IoTHubRegisterDeviceMessage.js";
export {
  msdyn_IoTNewPrimaryAlertRequest,
  type msdyn_IoTNewPrimaryAlertRequestParameters,
  msdyn_IoTNewPrimaryAlertResponse,
} from "./msdyn_IoTNewPrimaryAlertMessage.js";
export {
  msdyn_IoTPullDeviceDataActionHandlerRequest,
  type msdyn_IoTPullDeviceDataActionHandlerRequestParameters,
  msdyn_IoTPullDeviceDataActionHandlerResponse,
} from "./msdyn_IoTPullDeviceDataActionHandlerMessage.js";
export {
  msdyn_IoTRegisterActionHandlerRequest,
  type msdyn_IoTRegisterActionHandlerRequestParameters,
  msdyn_IoTRegisterActionHandlerResponse,
} from "./msdyn_IoTRegisterActionHandlerMessage.js";
export {
  msdyn_IoTSendTestAlertRequest,
  type msdyn_IoTSendTestAlertRequestParameters,
  msdyn_IoTSendTestAlertResponse,
} from "./msdyn_IoTSendTestAlertMessage.js";
export {
  msdyn_IoTSetConfigurationRequest,
  type msdyn_IoTSetConfigurationRequestParameters,
  msdyn_IoTSetConfigurationResponse,
} from "./msdyn_IoTSetConfigurationMessage.js";
export {
  msdyn_IsAdvancedUnifiedRoutingEnabledRequest,
  msdyn_IsAdvancedUnifiedRoutingEnabledResponse,
} from "./msdyn_IsAdvancedUnifiedRoutingEnabledMessage.js";
export {
  msdyn_IsBotUserConfiguredRequest,
  type msdyn_IsBotUserConfiguredRequestParameters,
  msdyn_IsBotUserConfiguredResponse,
} from "./msdyn_IsBotUserConfiguredMessage.js";
export {
  msdyn_IsLinkedInDataValidationEnabledRequest,
  msdyn_IsLinkedInDataValidationEnabledResponse,
} from "./msdyn_IsLinkedInDataValidationEnabledMessage.js";
export {
  msdyn_IsMSTeamsUserSyncFeatureEnabledRequest,
  msdyn_IsMSTeamsUserSyncFeatureEnabledResponse,
} from "./msdyn_IsMSTeamsUserSyncFeatureEnabledMessage.js";
export {
  msdyn_IsSharePointEnabledRequest,
  msdyn_IsSharePointEnabledResponse,
} from "./msdyn_IsSharePointEnabledMessage.js";
export {
  msdyn_IsSSSEnabledRequest,
  msdyn_IsSSSEnabledResponse,
} from "./msdyn_IsSSSEnabledMessage.js";
export {
  msdyn_JoinLinkedChatConversationRequest,
  type msdyn_JoinLinkedChatConversationRequestParameters,
  msdyn_JoinLinkedChatConversationResponse,
} from "./msdyn_JoinLinkedChatConversationMessage.js";
export {
  msdyn_JsonGetBooleanRequest,
  type msdyn_JsonGetBooleanRequestParameters,
  msdyn_JsonGetBooleanResponse,
} from "./msdyn_JsonGetBooleanMessage.js";
export {
  msdyn_JsonGetNumberRequest,
  type msdyn_JsonGetNumberRequestParameters,
  msdyn_JsonGetNumberResponse,
} from "./msdyn_JsonGetNumberMessage.js";
export {
  msdyn_JsonGetStringRequest,
  type msdyn_JsonGetStringRequestParameters,
  msdyn_JsonGetStringResponse,
} from "./msdyn_JsonGetStringMessage.js";
export {
  msdyn_knowledgeHarvestAgentTriggerRequest,
  type msdyn_knowledgeHarvestAgentTriggerRequestParameters,
  msdyn_knowledgeHarvestAgentTriggerResponse,
} from "./msdyn_knowledgeHarvestAgentTriggerMessage.js";
export {
  msdyn_knowledgeHarvestCreateArticleRequest,
  type msdyn_knowledgeHarvestCreateArticleRequestParameters,
  msdyn_knowledgeHarvestCreateArticleResponse,
} from "./msdyn_knowledgeHarvestCreateArticleMessage.js";
export {
  msdyn_KnowledgeHarvestFetchDataRequest,
  type msdyn_KnowledgeHarvestFetchDataRequestParameters,
  msdyn_KnowledgeHarvestFetchDataResponse,
} from "./msdyn_KnowledgeHarvestFetchDataMessage.js";
export {
  msdyn_LeadResearchCustomActionRequest,
  type msdyn_LeadResearchCustomActionRequestParameters,
  msdyn_LeadResearchCustomActionResponse,
} from "./msdyn_LeadResearchCustomActionMessage.js";
export {
  msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_LineChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_LineSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleRequest,
  msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleResponse,
} from "./msdyn_LiveChatChannelConfigurationShouldHaveWorkstreamRuleMessage.js";
export {
  msdyn_LoadCalendarsRequest,
  type msdyn_LoadCalendarsRequestParameters,
  msdyn_LoadCalendarsResponse,
} from "./msdyn_LoadCalendarsMessage.js";
export {
  msdyn_LogCMAEventRequest,
  type msdyn_LogCMAEventRequestParameters,
  msdyn_LogCMAEventResponse,
} from "./msdyn_LogCMAEventMessage.js";
export {
  msdyn_LogPlatformSummaryInteractionRequest,
  type msdyn_LogPlatformSummaryInteractionRequestParameters,
  msdyn_LogPlatformSummaryInteractionResponse,
} from "./msdyn_LogPlatformSummaryInteractionMessage.js";
export {
  msdyn_ManageSLAInstancesRequest,
  type msdyn_ManageSLAInstancesRequestParameters,
  msdyn_ManageSLAInstancesResponse,
} from "./msdyn_ManageSLAInstancesMessage.js";
export {
  msdyn_MarkAgreementAsExpiredRequest,
  type msdyn_MarkAgreementAsExpiredRequestParameters,
  msdyn_MarkAgreementAsExpiredResponse,
} from "./msdyn_MarkAgreementAsExpiredMessage.js";
export {
  msdyn_MarketingListMetadataUpdateRequest,
  msdyn_MarketingListMetadataUpdateResponse,
} from "./msdyn_MarketingListMetadataUpdateMessage.js";
export {
  msdyn_MarketingMetadataUpdateRequest,
  msdyn_MarketingMetadataUpdateResponse,
} from "./msdyn_MarketingMetadataUpdateMessage.js";
export {
  msdyn_MarketingMetadataUpdatePostImportRequest,
  msdyn_MarketingMetadataUpdatePostImportResponse,
} from "./msdyn_MarketingMetadataUpdatePostImportMessage.js";
export {
  msdyn_markunmarkfavoritearticleRequest,
  type msdyn_markunmarkfavoritearticleRequestParameters,
  msdyn_markunmarkfavoritearticleResponse,
} from "./msdyn_markunmarkfavoritearticleMessage.js";
export {
  msdyn_McMcbyValuesRequest,
  type msdyn_McMcbyValuesRequestParameters,
  msdyn_McMcbyValuesResponse,
} from "./msdyn_McMcbyValuesMessage.js";
export {
  msdyn_MergeDuplicatesActionRequest,
  type msdyn_MergeDuplicatesActionRequestParameters,
  msdyn_MergeDuplicatesActionResponse,
} from "./msdyn_MergeDuplicatesActionMessage.js";
export {
  msdyn_MigrateArcRequest,
  type msdyn_MigrateArcRequestParameters,
  msdyn_MigrateArcResponse,
} from "./msdyn_MigrateArcMessage.js";
export {
  msdyn_MigrateArcProactiveRunRequest,
  msdyn_MigrateArcProactiveRunResponse,
} from "./msdyn_MigrateArcProactiveRunMessage.js";
export {
  msdyn_MigrateFeaturesToCoreServiceRequest,
  type msdyn_MigrateFeaturesToCoreServiceRequestParameters,
  msdyn_MigrateFeaturesToCoreServiceResponse,
} from "./msdyn_MigrateFeaturesToCoreServiceMessage.js";
export {
  msdyn_MigrateRICommonRSARequest,
  type msdyn_MigrateRICommonRSARequestParameters,
  msdyn_MigrateRICommonRSAResponse,
} from "./msdyn_MigrateRICommonRSAMessage.js";
export {
  msdyn_MigrateSequenceRequest,
  type msdyn_MigrateSequenceRequestParameters,
  msdyn_MigrateSequenceResponse,
} from "./msdyn_MigrateSequenceMessage.js";
export {
  msdyn_MigrateSlaRequest,
  type msdyn_MigrateSlaRequestParameters,
  msdyn_MigrateSlaResponse,
} from "./msdyn_MigrateSlaMessage.js";
export {
  msdyn_MigrateSlaProactiveRunRequest,
  msdyn_MigrateSlaProactiveRunResponse,
} from "./msdyn_MigrateSlaProactiveRunMessage.js";
export {
  msdyn_MobileAppBuildRequest,
  type msdyn_MobileAppBuildRequestParameters,
  msdyn_MobileAppBuildResponse,
} from "./msdyn_MobileAppBuildMessage.js";
export {
  msdyn_MobileAppBuildStatusRequest,
  type msdyn_MobileAppBuildStatusRequestParameters,
  msdyn_MobileAppBuildStatusResponse,
} from "./msdyn_MobileAppBuildStatusMessage.js";
export {
  msdyn_ModelAppDiagnosisRequest,
  type msdyn_ModelAppDiagnosisRequestParameters,
  msdyn_ModelAppDiagnosisResponse,
} from "./msdyn_ModelAppDiagnosisMessage.js";
export {
  msdyn_ModelAppRepairRequest,
  type msdyn_ModelAppRepairRequestParameters,
  msdyn_ModelAppRepairResponse,
} from "./msdyn_ModelAppRepairMessage.js";
export {
  msdyn_msdyn_ValidateWorkStreamSMSConnectionRequest,
  type msdyn_msdyn_ValidateWorkStreamSMSConnectionRequestParameters,
  msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse,
} from "./msdyn_msdyn_ValidateWorkStreamSMSConnectionMessage.js";
export {
  msdyn_OcAgentsShouldHaveCapacityRuleRequest,
  msdyn_OcAgentsShouldHaveCapacityRuleResponse,
} from "./msdyn_OcAgentsShouldHaveCapacityRuleMessage.js";
export {
  msdyn_OcBotsShouldHaveCapacityRuleRequest,
  msdyn_OcBotsShouldHaveCapacityRuleResponse,
} from "./msdyn_OcBotsShouldHaveCapacityRuleMessage.js";
export {
  msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleRequest,
  msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleResponse,
} from "./msdyn_OcBotsShouldNotHavePotentiallyLowCapacityRuleMessage.js";
export {
  msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_OcChannelProviderShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_OcQueuesShouldHaveAgentsRuleRequest,
  msdyn_OcQueuesShouldHaveAgentsRuleResponse,
} from "./msdyn_OcQueuesShouldHaveAgentsRuleMessage.js";
export {
  msdyn_OCResetInviteParamsInfoRequest,
  type msdyn_OCResetInviteParamsInfoRequestParameters,
  msdyn_OCResetInviteParamsInfoResponse,
} from "./msdyn_OCResetInviteParamsInfoMessage.js";
export {
  msdyn_OCResetLastMessageInfoRequest,
  type msdyn_OCResetLastMessageInfoRequestParameters,
  msdyn_OCResetLastMessageInfoResponse,
} from "./msdyn_OCResetLastMessageInfoMessage.js";
export {
  msdyn_OcSdkShouldBeActiveRuleRequest,
  msdyn_OcSdkShouldBeActiveRuleResponse,
} from "./msdyn_OcSdkShouldBeActiveRuleMessage.js";
export {
  msdyn_OcServiceEndpointShouldBeConfiguredRuleRequest,
  msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse,
} from "./msdyn_OcServiceEndpointShouldBeConfiguredRuleMessage.js";
export {
  msdyn_ODOSMetadataCleanUpRequest,
  type msdyn_ODOSMetadataCleanUpRequestParameters,
  msdyn_ODOSMetadataCleanUpResponse,
} from "./msdyn_ODOSMetadataCleanUpMessage.js";
export {
  msdyn_OnNewActivityForARCRecordRequest,
  type msdyn_OnNewActivityForARCRecordRequestParameters,
  msdyn_OnNewActivityForARCRecordResponse,
} from "./msdyn_OnNewActivityForARCRecordMessage.js";
export {
  msdyn_OperatingHoursUpgradeFlowRequest,
  msdyn_OperatingHoursUpgradeFlowResponse,
} from "./msdyn_OperatingHoursUpgradeFlowMessage.js";
export {
  msdyn_OpportunityResearchResultUserActionRequest,
  type msdyn_OpportunityResearchResultUserActionRequestParameters,
  msdyn_OpportunityResearchResultUserActionResponse,
} from "./msdyn_OpportunityResearchResultUserActionMessage.js";
export {
  msdyn_OrphanCalendarCleanupRequest,
  type msdyn_OrphanCalendarCleanupRequestParameters,
  msdyn_OrphanCalendarCleanupResponse,
} from "./msdyn_OrphanCalendarCleanupMessage.js";
export {
  msdyn_OSApplyPredictionRequest,
  type msdyn_OSApplyPredictionRequestParameters,
  msdyn_OSApplyPredictionResponse,
} from "./msdyn_OSApplyPredictionMessage.js";
export {
  msdyn_OSConvertToLocalizedFeaturesRequest,
  type msdyn_OSConvertToLocalizedFeaturesRequestParameters,
  msdyn_OSConvertToLocalizedFeaturesResponse,
} from "./msdyn_OSConvertToLocalizedFeaturesMessage.js";
export {
  msdyn_OSCreatePredictionRequest,
  type msdyn_OSCreatePredictionRequestParameters,
  msdyn_OSCreatePredictionResponse,
} from "./msdyn_OSCreatePredictionMessage.js";
export {
  msdyn_OSDeletePredictionRequest,
  type msdyn_OSDeletePredictionRequestParameters,
  msdyn_OSDeletePredictionResponse,
} from "./msdyn_OSDeletePredictionMessage.js";
export {
  msdyn_OSGetAllOpportunityPredictionModelsRequest,
  msdyn_OSGetAllOpportunityPredictionModelsResponse,
} from "./msdyn_OSGetAllOpportunityPredictionModelsMessage.js";
export {
  msdyn_OSGetPredictionModelStatusRequest,
  type msdyn_OSGetPredictionModelStatusRequestParameters,
  msdyn_OSGetPredictionModelStatusResponse,
} from "./msdyn_OSGetPredictionModelStatusMessage.js";
export {
  msdyn_OSGetTrainingResultsRequest,
  type msdyn_OSGetTrainingResultsRequestParameters,
  msdyn_OSGetTrainingResultsResponse,
} from "./msdyn_OSGetTrainingResultsMessage.js";
export {
  msdyn_OSUpdateModelGradesRequest,
  type msdyn_OSUpdateModelGradesRequestParameters,
  msdyn_OSUpdateModelGradesResponse,
} from "./msdyn_OSUpdateModelGradesMessage.js";
export {
  msdyn_OverflowMigrationAPIRequest,
  msdyn_OverflowMigrationAPIResponse,
} from "./msdyn_OverflowMigrationAPIMessage.js";
export {
  msdyn_ParentIoTAlertsRequest,
  type msdyn_ParentIoTAlertsRequestParameters,
  msdyn_ParentIoTAlertsResponse,
} from "./msdyn_ParentIoTAlertsMessage.js";
export {
  msdyn_PerformChecksForEnrichRecordRequest,
  type msdyn_PerformChecksForEnrichRecordRequestParameters,
  msdyn_PerformChecksForEnrichRecordResponse,
} from "./msdyn_PerformChecksForEnrichRecordMessage.js";
export {
  msdyn_PerformNotesAnalysisActionRequest,
  type msdyn_PerformNotesAnalysisActionRequestParameters,
  msdyn_PerformNotesAnalysisActionResponse,
} from "./msdyn_PerformNotesAnalysisActionMessage.js";
export {
  msdyn_PollCopilotAgentResponsesRequest,
  type msdyn_PollCopilotAgentResponsesRequestParameters,
  msdyn_PollCopilotAgentResponsesResponse,
} from "./msdyn_PollCopilotAgentResponsesMessage.js";
export {
  msdyn_PollODOSForConsentRequest,
  type msdyn_PollODOSForConsentRequestParameters,
  msdyn_PollODOSForConsentResponse,
} from "./msdyn_PollODOSForConsentMessage.js";
export {
  msdyn_PollODOSForExtractionsRequest,
  type msdyn_PollODOSForExtractionsRequestParameters,
  msdyn_PollODOSForExtractionsResponse,
} from "./msdyn_PollODOSForExtractionsMessage.js";
export {
  msdyn_PostCreateAutonomousEmailRequest,
  type msdyn_PostCreateAutonomousEmailRequestParameters,
  msdyn_PostCreateAutonomousEmailResponse,
} from "./msdyn_PostCreateAutonomousEmailMessage.js";
export {
  msdyn_PostOperationRevokeUsrConsentRequest,
  msdyn_PostOperationRevokeUsrConsentResponse,
} from "./msdyn_PostOperationRevokeUsrConsentMessage.js";
export {
  msdyn_PostOrganizationProvisioningStatusRequest,
  type msdyn_PostOrganizationProvisioningStatusRequestParameters,
  msdyn_PostOrganizationProvisioningStatusResponse,
} from "./msdyn_PostOrganizationProvisioningStatusMessage.js";
export {
  msdyn_PostRetrieveRealTimeSuggestedActivitiesRequest,
  type msdyn_PostRetrieveRealTimeSuggestedActivitiesRequestParameters,
  msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse,
} from "./msdyn_PostRetrieveRealTimeSuggestedActivitiesMessage.js";
export {
  msdyn_PowerAutomateLoggerRequest,
  type msdyn_PowerAutomateLoggerRequestParameters,
  msdyn_PowerAutomateLoggerResponse,
} from "./msdyn_PowerAutomateLoggerMessage.js";
export {
  msdyn_PredictFieldsBasedOnRulesRequest,
  type msdyn_PredictFieldsBasedOnRulesRequestParameters,
  msdyn_PredictFieldsBasedOnRulesResponse,
} from "./msdyn_PredictFieldsBasedOnRulesMessage.js";
export {
  msdyn_PredictiveScoringBackgroundJobRequest,
  type msdyn_PredictiveScoringBackgroundJobRequestParameters,
  msdyn_PredictiveScoringBackgroundJobResponse,
} from "./msdyn_PredictiveScoringBackgroundJobMessage.js";
export {
  msdyn_PredictiveScoringDataMigrationRequest,
  type msdyn_PredictiveScoringDataMigrationRequestParameters,
  msdyn_PredictiveScoringDataMigrationResponse,
} from "./msdyn_PredictiveScoringDataMigrationMessage.js";
export {
  msdyn_ProcessPostProposalFollowupRequest,
  type msdyn_ProcessPostProposalFollowupRequestParameters,
  msdyn_ProcessPostProposalFollowupResponse,
} from "./msdyn_ProcessPostProposalFollowupMessage.js";
export {
  msdyn_processsentimentresponseRequest,
  type msdyn_processsentimentresponseRequestParameters,
  msdyn_processsentimentresponseResponse,
} from "./msdyn_processsentimentresponseMessage.js";
export {
  msdyn_ProductDeterminationActionRequest,
  type msdyn_ProductDeterminationActionRequestParameters,
  msdyn_ProductDeterminationActionResponse,
} from "./msdyn_ProductDeterminationActionMessage.js";
export {
  msdyn_ProductDeterminationProvisioningActionRequest,
  type msdyn_ProductDeterminationProvisioningActionRequestParameters,
  msdyn_ProductDeterminationProvisioningActionResponse,
} from "./msdyn_ProductDeterminationProvisioningActionMessage.js";
export {
  msdyn_ProvisionAnalyticsRequest,
  msdyn_ProvisionAnalyticsResponse,
} from "./msdyn_ProvisionAnalyticsMessage.js";
export {
  msdyn_ProvisionIoTSuggestionsMLModelRequest,
  msdyn_ProvisionIoTSuggestionsMLModelResponse,
} from "./msdyn_ProvisionIoTSuggestionsMLModelMessage.js";
export {
  msdyn_ProvisionIoTSuggestionsMLModelInternalRequest,
  type msdyn_ProvisionIoTSuggestionsMLModelInternalRequestParameters,
  msdyn_ProvisionIoTSuggestionsMLModelInternalResponse,
} from "./msdyn_ProvisionIoTSuggestionsMLModelInternalMessage.js";
export {
  msdyn_ProvisionODOSRequest,
  type msdyn_ProvisionODOSRequestParameters,
  msdyn_ProvisionODOSResponse,
} from "./msdyn_ProvisionODOSMessage.js";
export {
  msdyn_ProvisionSharePointDocumentLibrariesRequest,
  type msdyn_ProvisionSharePointDocumentLibrariesRequestParameters,
  msdyn_ProvisionSharePointDocumentLibrariesResponse,
} from "./msdyn_ProvisionSharePointDocumentLibrariesMessage.js";
export {
  msdyn_ProvisionUnifiedRoutingRequest,
  msdyn_ProvisionUnifiedRoutingResponse,
} from "./msdyn_ProvisionUnifiedRoutingMessage.js";
export {
  msdyn_PublishAIModelRequest,
  msdyn_PublishAIModelResponse,
} from "./msdyn_PublishAIModelMessage.js";
export {
  msdyn_PublishEffortAIModelRequest,
  type msdyn_PublishEffortAIModelRequestParameters,
  msdyn_PublishEffortAIModelResponse,
} from "./msdyn_PublishEffortAIModelMessage.js";
export {
  msdyn_publishScheduledRolloutRequest,
  type msdyn_publishScheduledRolloutRequestParameters,
  msdyn_publishScheduledRolloutResponse,
} from "./msdyn_publishScheduledRolloutMessage.js";
export {
  msdyn_PullDataForIoTDeviceRequest,
  type msdyn_PullDataForIoTDeviceRequestParameters,
  msdyn_PullDataForIoTDeviceResponse,
} from "./msdyn_PullDataForIoTDeviceMessage.js";
export {
  msdyn_QueryExchangeRequest,
  type msdyn_QueryExchangeRequestParameters,
  msdyn_QueryExchangeResponse,
} from "./msdyn_QueryExchangeMessage.js";
export {
  msdyn_QueueItemCreateOperationRequest,
  type msdyn_QueueItemCreateOperationRequestParameters,
  msdyn_QueueItemCreateOperationResponse,
} from "./msdyn_QueueItemCreateOperationMessage.js";
export {
  msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequest,
  type msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequestParameters,
  msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse,
} from "./msdyn_QueueItemOperationsOnLwiDeleteOrClosureMessage.js";
export {
  msdyn_reassignmentbatchRequest,
  type msdyn_reassignmentbatchRequestParameters,
  msdyn_reassignmentbatchResponse,
} from "./msdyn_reassignmentbatchMessage.js";
export {
  msdyn_reassignmentrunRequest,
  type msdyn_reassignmentrunRequestParameters,
  msdyn_reassignmentrunResponse,
} from "./msdyn_reassignmentrunMessage.js";
export {
  msdyn_RecommendedEmailTemplatesRequest,
  type msdyn_RecommendedEmailTemplatesRequestParameters,
  msdyn_RecommendedEmailTemplatesResponse,
} from "./msdyn_RecommendedEmailTemplatesMessage.js";
export {
  msdyn_recurringsegmentactionRequest,
  type msdyn_recurringsegmentactionRequestParameters,
  msdyn_recurringsegmentactionResponse,
} from "./msdyn_recurringsegmentactionMessage.js";
export {
  msdyn_RegisterCustomEntityRequest,
  type msdyn_RegisterCustomEntityRequestParameters,
  msdyn_RegisterCustomEntityResponse,
} from "./msdyn_RegisterCustomEntityMessage.js";
export {
  msdyn_RegisterIoTDeviceRequest,
  type msdyn_RegisterIoTDeviceRequestParameters,
  msdyn_RegisterIoTDeviceResponse,
} from "./msdyn_RegisterIoTDeviceMessage.js";
export {
  msdyn_RegisterSolutionHealthRuleRequest,
  type msdyn_RegisterSolutionHealthRuleRequestParameters,
  msdyn_RegisterSolutionHealthRuleResponse,
} from "./msdyn_RegisterSolutionHealthRuleMessage.js";
export {
  msdyn_RemoveRequirementModelRequest,
  type msdyn_RemoveRequirementModelRequestParameters,
  msdyn_RemoveRequirementModelResponse,
} from "./msdyn_RemoveRequirementModelMessage.js";
export {
  msdyn_RequirementGroupOverviewRequest,
  type msdyn_RequirementGroupOverviewRequestParameters,
  msdyn_RequirementGroupOverviewResponse,
} from "./msdyn_RequirementGroupOverviewMessage.js";
export {
  msdyn_ResetOmnichannelProviderRequest,
  type msdyn_ResetOmnichannelProviderRequestParameters,
  msdyn_ResetOmnichannelProviderResponse,
} from "./msdyn_ResetOmnichannelProviderMessage.js";
export {
  msdyn_ResetWorkDistributionFlowRequest,
  type msdyn_ResetWorkDistributionFlowRequestParameters,
  msdyn_ResetWorkDistributionFlowResponse,
} from "./msdyn_ResetWorkDistributionFlowMessage.js";
export {
  msdyn_ResetWorkstreamChannelScenarioRequest,
  type msdyn_ResetWorkstreamChannelScenarioRequestParameters,
  msdyn_ResetWorkstreamChannelScenarioResponse,
} from "./msdyn_ResetWorkstreamChannelScenarioMessage.js";
export {
  msdyn_ResolveSolutionHealthRuleFailureRequest,
  type msdyn_ResolveSolutionHealthRuleFailureRequestParameters,
  msdyn_ResolveSolutionHealthRuleFailureResponse,
} from "./msdyn_ResolveSolutionHealthRuleFailureMessage.js";
export {
  msdyn_ResolveTimezoneRequest,
  type msdyn_ResolveTimezoneRequestParameters,
  msdyn_ResolveTimezoneResponse,
} from "./msdyn_ResolveTimezoneMessage.js";
export {
  msdyn_RestartAgreementRelatedWorkflowRequest,
  type msdyn_RestartAgreementRelatedWorkflowRequestParameters,
  msdyn_RestartAgreementRelatedWorkflowResponse,
} from "./msdyn_RestartAgreementRelatedWorkflowMessage.js";
export {
  msdyn_RestartUniqueNumberWorkflowRequest,
  type msdyn_RestartUniqueNumberWorkflowRequestParameters,
  msdyn_RestartUniqueNumberWorkflowResponse,
} from "./msdyn_RestartUniqueNumberWorkflowMessage.js";
export {
  msdyn_RetrieveActivitiesRequest,
  type msdyn_RetrieveActivitiesRequestParameters,
  msdyn_RetrieveActivitiesResponse,
} from "./msdyn_RetrieveActivitiesMessage.js";
export {
  msdyn_RetrieveActivityAnalyticsConfigurationRequest,
  type msdyn_RetrieveActivityAnalyticsConfigurationRequestParameters,
  msdyn_RetrieveActivityAnalyticsConfigurationResponse,
} from "./msdyn_RetrieveActivityAnalyticsConfigurationMessage.js";
export {
  msdyn_RetrieveAppointmentsByAttendeesRequest,
  type msdyn_RetrieveAppointmentsByAttendeesRequestParameters,
  msdyn_RetrieveAppointmentsByAttendeesResponse,
} from "./msdyn_RetrieveAppointmentsByAttendeesMessage.js";
export {
  msdyn_RetrieveCadenceSuggestionsRequest,
  type msdyn_RetrieveCadenceSuggestionsRequestParameters,
  msdyn_RetrieveCadenceSuggestionsResponse,
} from "./msdyn_RetrieveCadenceSuggestionsMessage.js";
export {
  msdyn_retrieveConnectionsRequest,
  type msdyn_retrieveConnectionsRequestParameters,
  msdyn_retrieveConnectionsResponse,
} from "./msdyn_retrieveConnectionsMessage.js";
export {
  msdyn_RetrieveConversationPayloadRequest,
  type msdyn_RetrieveConversationPayloadRequestParameters,
  msdyn_RetrieveConversationPayloadResponse,
} from "./msdyn_RetrieveConversationPayloadMessage.js";
export {
  msdyn_RetrieveCustomMessagingApplicationSecretRequest,
  type msdyn_RetrieveCustomMessagingApplicationSecretRequestParameters,
  msdyn_RetrieveCustomMessagingApplicationSecretResponse,
} from "./msdyn_RetrieveCustomMessagingApplicationSecretMessage.js";
export {
  msdyn_RetrieveDistanceMatrixRequest,
  type msdyn_RetrieveDistanceMatrixRequestParameters,
  msdyn_RetrieveDistanceMatrixResponse,
} from "./msdyn_RetrieveDistanceMatrixMessage.js";
export {
  msdyn_RetrieveEmailNBARequest,
  type msdyn_RetrieveEmailNBARequestParameters,
  msdyn_RetrieveEmailNBAResponse,
} from "./msdyn_RetrieveEmailNBAMessage.js";
export {
  msdyn_RetrieveEnvironmentVariableValueForCSRequest,
  type msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters,
  msdyn_RetrieveEnvironmentVariableValueForCSResponse,
} from "./msdyn_RetrieveEnvironmentVariableValueForCSMessage.js";
export {
  msdyn_RetrieveEvaluationCriteriaRequest,
  type msdyn_RetrieveEvaluationCriteriaRequestParameters,
  msdyn_RetrieveEvaluationCriteriaResponse,
} from "./msdyn_RetrieveEvaluationCriteriaMessage.js";
export {
  msdyn_RetrieveKnowledgeManagementSettingsRequest,
  type msdyn_RetrieveKnowledgeManagementSettingsRequestParameters,
  msdyn_RetrieveKnowledgeManagementSettingsResponse,
} from "./msdyn_RetrieveKnowledgeManagementSettingsMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchFiltersRequest,
  type msdyn_RetrieveKnowledgeSearchFiltersRequestParameters,
  msdyn_RetrieveKnowledgeSearchFiltersResponse,
} from "./msdyn_RetrieveKnowledgeSearchFiltersMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchModifiersRequest,
  type msdyn_RetrieveKnowledgeSearchModifiersRequestParameters,
  msdyn_RetrieveKnowledgeSearchModifiersResponse,
} from "./msdyn_RetrieveKnowledgeSearchModifiersMessage.js";
export {
  msdyn_RetrieveKnowledgeSuggestionsRequest,
  type msdyn_RetrieveKnowledgeSuggestionsRequestParameters,
  msdyn_RetrieveKnowledgeSuggestionsResponse,
} from "./msdyn_RetrieveKnowledgeSuggestionsMessage.js";
export {
  msdyn_RetrieveKpiItemRecordRequest,
  type msdyn_RetrieveKpiItemRecordRequestParameters,
  msdyn_RetrieveKpiItemRecordResponse,
} from "./msdyn_RetrieveKpiItemRecordMessage.js";
export {
  msdyn_RetrieveKPIValuesForGDPRRequest,
  type msdyn_RetrieveKPIValuesForGDPRRequestParameters,
  msdyn_RetrieveKPIValuesForGDPRResponse,
} from "./msdyn_RetrieveKPIValuesForGDPRMessage.js";
export {
  msdyn_RetrieveKPIvaluesfromDCIRequest,
  type msdyn_RetrieveKPIvaluesfromDCIRequestParameters,
  msdyn_RetrieveKPIvaluesfromDCIResponse,
} from "./msdyn_RetrieveKPIvaluesfromDCIMessage.js";
export {
  msdyn_RetrieveKpiValuesFromRIRequest,
  type msdyn_RetrieveKpiValuesFromRIRequestParameters,
  msdyn_RetrieveKpiValuesFromRIResponse,
} from "./msdyn_RetrieveKpiValuesFromRIMessage.js";
export {
  msdyn_RetrieveOutlookSchedulesRequest,
  type msdyn_RetrieveOutlookSchedulesRequestParameters,
  msdyn_RetrieveOutlookSchedulesResponse,
} from "./msdyn_RetrieveOutlookSchedulesMessage.js";
export {
  msdyn_RetrievePersonalizationFiltersRequest,
  type msdyn_RetrievePersonalizationFiltersRequestParameters,
  msdyn_RetrievePersonalizationFiltersResponse,
} from "./msdyn_RetrievePersonalizationFiltersMessage.js";
export {
  msdyn_RetrievePlatformCopilotSettingsRequest,
  msdyn_RetrievePlatformCopilotSettingsResponse,
} from "./msdyn_RetrievePlatformCopilotSettingsMessage.js";
export {
  msdyn_RetrieveRelationshipActivityKPIValuesRequest,
  type msdyn_RetrieveRelationshipActivityKPIValuesRequestParameters,
  msdyn_RetrieveRelationshipActivityKPIValuesResponse,
} from "./msdyn_RetrieveRelationshipActivityKPIValuesMessage.js";
export {
  msdyn_RetrieveRequirementGroupCandidatesRequest,
  type msdyn_RetrieveRequirementGroupCandidatesRequestParameters,
  msdyn_RetrieveRequirementGroupCandidatesResponse,
} from "./msdyn_RetrieveRequirementGroupCandidatesMessage.js";
export {
  msdyn_RetrieveResourceAvailabilityRequest,
  type msdyn_RetrieveResourceAvailabilityRequestParameters,
  msdyn_RetrieveResourceAvailabilityResponse,
} from "./msdyn_RetrieveResourceAvailabilityMessage.js";
export {
  msdyn_RetrieveSearchProvidersRequest,
  type msdyn_RetrieveSearchProvidersRequestParameters,
  msdyn_RetrieveSearchProvidersResponse,
} from "./msdyn_RetrieveSearchProvidersMessage.js";
export {
  msdyn_RetrieveSuggestionPayloadsRequest,
  type msdyn_RetrieveSuggestionPayloadsRequestParameters,
  msdyn_RetrieveSuggestionPayloadsResponse,
} from "./msdyn_RetrieveSuggestionPayloadsMessage.js";
export {
  msdyn_RetrieveTypeValuesFromDCIRequest,
  type msdyn_RetrieveTypeValuesFromDCIRequestParameters,
  msdyn_RetrieveTypeValuesFromDCIResponse,
} from "./msdyn_RetrieveTypeValuesFromDCIMessage.js";
export {
  msdyn_RouteToOperationRequest,
  type msdyn_RouteToOperationRequestParameters,
  msdyn_RouteToOperationResponse,
} from "./msdyn_RouteToOperationMessage.js";
export {
  msdyn_RunSAUpgradeScriptRequest,
  msdyn_RunSAUpgradeScriptResponse,
} from "./msdyn_RunSAUpgradeScriptMessage.js";
export {
  msdyn_RunSolutionCheckerRulesRequest,
  type msdyn_RunSolutionCheckerRulesRequestParameters,
  msdyn_RunSolutionCheckerRulesResponse,
} from "./msdyn_RunSolutionCheckerRulesMessage.js";
export {
  msdyn_SalesAcceleratorMailNotificationToAdminRequest,
  type msdyn_SalesAcceleratorMailNotificationToAdminRequestParameters,
  msdyn_SalesAcceleratorMailNotificationToAdminResponse,
} from "./msdyn_SalesAcceleratorMailNotificationToAdminMessage.js";
export {
  msdyn_SalesAccountCatchupRequest,
  type msdyn_SalesAccountCatchupRequestParameters,
  msdyn_SalesAccountCatchupResponse,
} from "./msdyn_SalesAccountCatchupMessage.js";
export {
  msdyn_SalesAccountSummaryRequest,
  type msdyn_SalesAccountSummaryRequestParameters,
  msdyn_SalesAccountSummaryResponse,
} from "./msdyn_SalesAccountSummaryMessage.js";
export {
  msdyn_SalesAdaptiveCardResponseRequest,
  type msdyn_SalesAdaptiveCardResponseRequestParameters,
  msdyn_SalesAdaptiveCardResponseResponse,
} from "./msdyn_SalesAdaptiveCardResponseMessage.js";
export {
  msdyn_SalesAgents_ActivateMicroAgentConfigurationRequest,
  type msdyn_SalesAgents_ActivateMicroAgentConfigurationRequestParameters,
  msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse,
} from "./msdyn_SalesAgents_ActivateMicroAgentConfigurationMessage.js";
export {
  msdyn_SalesAgents_ActivateSalesAgentProfileRequest,
  type msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters,
  msdyn_SalesAgents_ActivateSalesAgentProfileResponse,
} from "./msdyn_SalesAgents_ActivateSalesAgentProfileMessage.js";
export {
  msdyn_SalesAgents_BatchUpdateSARStatesRequest,
  type msdyn_SalesAgents_BatchUpdateSARStatesRequestParameters,
  msdyn_SalesAgents_BatchUpdateSARStatesResponse,
} from "./msdyn_SalesAgents_BatchUpdateSARStatesMessage.js";
export {
  msdyn_SalesAgents_CompleteOrchestrationRequest,
  type msdyn_SalesAgents_CompleteOrchestrationRequestParameters,
  msdyn_SalesAgents_CompleteOrchestrationResponse,
} from "./msdyn_SalesAgents_CompleteOrchestrationMessage.js";
export {
  msdyn_SalesAgents_CreateDefaultTemplateInSharepointRequest,
  msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse,
} from "./msdyn_SalesAgents_CreateDefaultTemplateInSharepointMessage.js";
export {
  msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequest,
  type msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequestParameters,
  msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse,
} from "./msdyn_SalesAgents_CreateSARBasedOnPreviousAgentMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsRequest,
  type msdyn_SalesAgents_CreateSARRecordsRequestParameters,
  msdyn_SalesAgents_CreateSARRecordsResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequest,
  type msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequestParameters,
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequest,
  type msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequestParameters,
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateMessage.js";
export {
  msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequest,
  type msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequestParameters,
  msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse,
} from "./msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksMessage.js";
export {
  msdyn_SalesAgents_ExtractAutoReplyInfoRequest,
  type msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters,
  msdyn_SalesAgents_ExtractAutoReplyInfoResponse,
} from "./msdyn_SalesAgents_ExtractAutoReplyInfoMessage.js";
export {
  msdyn_SalesAgents_FetchOutreachEmailForAgentRequest,
  type msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters,
  msdyn_SalesAgents_FetchOutreachEmailForAgentResponse,
} from "./msdyn_SalesAgents_FetchOutreachEmailForAgentMessage.js";
export {
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchSARRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest,
  type msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters,
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse,
} from "./msdyn_SalesAgents_GetAgentStatusAndGenAIConsentMessage.js";
export {
  msdyn_SalesAgents_GetEngageAgentInputPayloadRequest,
  type msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters,
  msdyn_SalesAgents_GetEngageAgentInputPayloadResponse,
} from "./msdyn_SalesAgents_GetEngageAgentInputPayloadMessage.js";
export {
  msdyn_SalesAgents_GetExecutionConfigPropertyRequest,
  type msdyn_SalesAgents_GetExecutionConfigPropertyRequestParameters,
  msdyn_SalesAgents_GetExecutionConfigPropertyResponse,
} from "./msdyn_SalesAgents_GetExecutionConfigPropertyMessage.js";
export {
  msdyn_SalesAgents_GetHandoverDetailsRequest,
  type msdyn_SalesAgents_GetHandoverDetailsRequestParameters,
  msdyn_SalesAgents_GetHandoverDetailsResponse,
} from "./msdyn_SalesAgents_GetHandoverDetailsMessage.js";
export {
  msdyn_SalesAgents_GetM365ConsentRequest,
  msdyn_SalesAgents_GetM365ConsentResponse,
} from "./msdyn_SalesAgents_GetM365ConsentMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentActivationDetailsRequest,
  type msdyn_SalesAgents_GetMicroAgentActivationDetailsRequestParameters,
  msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse,
} from "./msdyn_SalesAgents_GetMicroAgentActivationDetailsMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentsConfigurationRequest,
  type msdyn_SalesAgents_GetMicroAgentsConfigurationRequestParameters,
  msdyn_SalesAgents_GetMicroAgentsConfigurationResponse,
} from "./msdyn_SalesAgents_GetMicroAgentsConfigurationMessage.js";
export {
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequest,
  type msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequestParameters,
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse,
} from "./msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsMessage.js";
export {
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsRequest,
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse,
} from "./msdyn_SalesAgents_GetSalesAgentsFeatureSettingsMessage.js";
export {
  msdyn_SalesAgents_HandoverInitiateRequest,
  type msdyn_SalesAgents_HandoverInitiateRequestParameters,
  msdyn_SalesAgents_HandoverInitiateResponse,
} from "./msdyn_SalesAgents_HandoverInitiateMessage.js";
export {
  msdyn_SalesAgents_HandoverNotifySingleRequest,
  type msdyn_SalesAgents_HandoverNotifySingleRequestParameters,
  msdyn_SalesAgents_HandoverNotifySingleResponse,
} from "./msdyn_SalesAgents_HandoverNotifySingleMessage.js";
export {
  msdyn_SalesAgents_IsOrchestrationCompleteRequest,
  type msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters,
  msdyn_SalesAgents_IsOrchestrationCompleteResponse,
} from "./msdyn_SalesAgents_IsOrchestrationCompleteMessage.js";
export {
  msdyn_SalesAgents_IsOwnerAssignedRequest,
  type msdyn_SalesAgents_IsOwnerAssignedRequestParameters,
  msdyn_SalesAgents_IsOwnerAssignedResponse,
} from "./msdyn_SalesAgents_IsOwnerAssignedMessage.js";
export {
  msdyn_SalesAgents_IsTenantAdminRequest,
  msdyn_SalesAgents_IsTenantAdminResponse,
} from "./msdyn_SalesAgents_IsTenantAdminMessage.js";
export {
  msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequest,
  type msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequestParameters,
  msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse,
} from "./msdyn_SalesAgents_LogEngageReadinessFlowRunStateMessage.js";
export {
  msdyn_SalesAgents_LogMicroagentFlowDataRequest,
  type msdyn_SalesAgents_LogMicroagentFlowDataRequestParameters,
  msdyn_SalesAgents_LogMicroagentFlowDataResponse,
} from "./msdyn_SalesAgents_LogMicroagentFlowDataMessage.js";
export {
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequest,
  type msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequestParameters,
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse,
} from "./msdyn_SalesAgents_NotifyReactivatedEntityOwnerMessage.js";
export {
  msdyn_SalesAgents_ProcessEngageAgentResponseRequest,
  type msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters,
  msdyn_SalesAgents_ProcessEngageAgentResponseResponse,
} from "./msdyn_SalesAgents_ProcessEngageAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProcessOutreachAgentResponseRequest,
  type msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters,
  msdyn_SalesAgents_ProcessOutreachAgentResponseResponse,
} from "./msdyn_SalesAgents_ProcessOutreachAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIRequest,
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse,
} from "./msdyn_SalesAgents_ProvideConsentAndM365SetupAPIMessage.js";
export {
  msdyn_SalesAgents_ReEngageEntityRequest,
  type msdyn_SalesAgents_ReEngageEntityRequestParameters,
  msdyn_SalesAgents_ReEngageEntityResponse,
} from "./msdyn_SalesAgents_ReEngageEntityMessage.js";
export {
  msdyn_SalesAgents_RunAgentEvalsRequest,
  type msdyn_SalesAgents_RunAgentEvalsRequestParameters,
  msdyn_SalesAgents_RunAgentEvalsResponse,
} from "./msdyn_SalesAgents_RunAgentEvalsMessage.js";
export {
  msdyn_SalesAgents_SendEmailReplyRequest,
  type msdyn_SalesAgents_SendEmailReplyRequestParameters,
  msdyn_SalesAgents_SendEmailReplyResponse,
} from "./msdyn_SalesAgents_SendEmailReplyMessage.js";
export {
  msdyn_SalesAgents_SetExecutionConfigPropertyRequest,
  type msdyn_SalesAgents_SetExecutionConfigPropertyRequestParameters,
  msdyn_SalesAgents_SetExecutionConfigPropertyResponse,
} from "./msdyn_SalesAgents_SetExecutionConfigPropertyMessage.js";
export {
  msdyn_SalesAgents_ShouldRunAgentOrchestrationRequest,
  type msdyn_SalesAgents_ShouldRunAgentOrchestrationRequestParameters,
  msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse,
} from "./msdyn_SalesAgents_ShouldRunAgentOrchestrationMessage.js";
export {
  msdyn_SalesAgents_TriggerOutreachAgentRequest,
  type msdyn_SalesAgents_TriggerOutreachAgentRequestParameters,
  msdyn_SalesAgents_TriggerOutreachAgentResponse,
} from "./msdyn_SalesAgents_TriggerOutreachAgentMessage.js";
export {
  msdyn_SalesAgents_UpsertAgentProcessingStateRequest,
  type msdyn_SalesAgents_UpsertAgentProcessingStateRequestParameters,
  msdyn_SalesAgents_UpsertAgentProcessingStateResponse,
} from "./msdyn_SalesAgents_UpsertAgentProcessingStateMessage.js";
export {
  msdyn_SalesAnswerFromDocumentsRequest,
  type msdyn_SalesAnswerFromDocumentsRequestParameters,
  msdyn_SalesAnswerFromDocumentsResponse,
} from "./msdyn_SalesAnswerFromDocumentsMessage.js";
export {
  msdyn_SalesCopilotM365SkillInfraSetupRequest,
  type msdyn_SalesCopilotM365SkillInfraSetupRequestParameters,
  msdyn_SalesCopilotM365SkillInfraSetupResponse,
} from "./msdyn_SalesCopilotM365SkillInfraSetupMessage.js";
export {
  msdyn_SalesCopilotNBASkillInfraSetupRequest,
  type msdyn_SalesCopilotNBASkillInfraSetupRequestParameters,
  msdyn_SalesCopilotNBASkillInfraSetupResponse,
} from "./msdyn_SalesCopilotNBASkillInfraSetupMessage.js";
export {
  msdyn_SalesExternalServiceInvokeRequest,
  type msdyn_SalesExternalServiceInvokeRequestParameters,
  msdyn_SalesExternalServiceInvokeResponse,
} from "./msdyn_SalesExternalServiceInvokeMessage.js";
export {
  msdyn_SalesInsightsGetEuclidConsentStatusRequest,
  type msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters,
  msdyn_SalesInsightsGetEuclidConsentStatusResponse,
} from "./msdyn_SalesInsightsGetEuclidConsentStatusMessage.js";
export {
  msdyn_SalesInsightsTpsPackageRequest,
  type msdyn_SalesInsightsTpsPackageRequestParameters,
  msdyn_SalesInsightsTpsPackageResponse,
} from "./msdyn_SalesInsightsTpsPackageMessage.js";
export {
  msdyn_SalesLeadCatchupRequest,
  type msdyn_SalesLeadCatchupRequestParameters,
  msdyn_SalesLeadCatchupResponse,
} from "./msdyn_SalesLeadCatchupMessage.js";
export {
  msdyn_SalesLeadSummaryRequest,
  type msdyn_SalesLeadSummaryRequestParameters,
  msdyn_SalesLeadSummaryResponse,
} from "./msdyn_SalesLeadSummaryMessage.js";
export {
  msdyn_SalesMeetingPreparationRequest,
  type msdyn_SalesMeetingPreparationRequestParameters,
  msdyn_SalesMeetingPreparationResponse,
} from "./msdyn_SalesMeetingPreparationMessage.js";
export {
  msdyn_SalesOpportunityCatchupRequest,
  type msdyn_SalesOpportunityCatchupRequestParameters,
  msdyn_SalesOpportunityCatchupResponse,
} from "./msdyn_SalesOpportunityCatchupMessage.js";
export {
  msdyn_SalesOpportunitySummaryRequest,
  type msdyn_SalesOpportunitySummaryRequestParameters,
  msdyn_SalesOpportunitySummaryResponse,
} from "./msdyn_SalesOpportunitySummaryMessage.js";
export {
  msdyn_SalesOutlookMeetingPreparationRequest,
  type msdyn_SalesOutlookMeetingPreparationRequestParameters,
  msdyn_SalesOutlookMeetingPreparationResponse,
} from "./msdyn_SalesOutlookMeetingPreparationMessage.js";
export {
  msdyn_SalesRoutingIdentifyAttributesRequest,
  msdyn_SalesRoutingIdentifyAttributesResponse,
} from "./msdyn_SalesRoutingIdentifyAttributesMessage.js";
export {
  msdyn_SaveAgentContentCustomActionRequest,
  type msdyn_SaveAgentContentCustomActionRequestParameters,
  msdyn_SaveAgentContentCustomActionResponse,
} from "./msdyn_SaveAgentContentCustomActionMessage.js";
export {
  msdyn_SaveCalendarRequest,
  type msdyn_SaveCalendarRequestParameters,
  msdyn_SaveCalendarResponse,
} from "./msdyn_SaveCalendarMessage.js";
export {
  msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequest,
  type msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequestParameters,
  msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse,
} from "./msdyn_SaveMicrosoftCopilotStudioSurveyResponseMessage.js";
export {
  msdyn_SaveOpportunityResearchAgentContentCustomActionRequest,
  type msdyn_SaveOpportunityResearchAgentContentCustomActionRequestParameters,
  msdyn_SaveOpportunityResearchAgentContentCustomActionResponse,
} from "./msdyn_SaveOpportunityResearchAgentContentCustomActionMessage.js";
export {
  msdyn_SaveOpportunityResearchResultRequest,
  type msdyn_SaveOpportunityResearchResultRequestParameters,
  msdyn_SaveOpportunityResearchResultResponse,
} from "./msdyn_SaveOpportunityResearchResultMessage.js";
export {
  msdyn_SaveSalesCopilotEmailInsightsRequest,
  type msdyn_SaveSalesCopilotEmailInsightsRequestParameters,
  msdyn_SaveSalesCopilotEmailInsightsResponse,
} from "./msdyn_SaveSalesCopilotEmailInsightsMessage.js";
export {
  msdyn_ScheduleRealTimeScoringRequest,
  type msdyn_ScheduleRealTimeScoringRequestParameters,
  msdyn_ScheduleRealTimeScoringResponse,
} from "./msdyn_ScheduleRealTimeScoringMessage.js";
export {
  msdyn_ScheduleRequirementGroupRequest,
  type msdyn_ScheduleRequirementGroupRequestParameters,
  msdyn_ScheduleRequirementGroupResponse,
} from "./msdyn_ScheduleRequirementGroupMessage.js";
export {
  msdyn_ScheduleRolloutsOrchestrationRequest,
  msdyn_ScheduleRolloutsOrchestrationResponse,
} from "./msdyn_ScheduleRolloutsOrchestrationMessage.js";
export {
  msdyn_SearchResourceAvailabilityRequest,
  type msdyn_SearchResourceAvailabilityRequestParameters,
  msdyn_SearchResourceAvailabilityResponse,
} from "./msdyn_SearchResourceAvailabilityMessage.js";
export {
  msdyn_SearchResourceAvailabilityForRequirementGroupRequest,
  type msdyn_SearchResourceAvailabilityForRequirementGroupRequestParameters,
  msdyn_SearchResourceAvailabilityForRequirementGroupResponse,
} from "./msdyn_SearchResourceAvailabilityForRequirementGroupMessage.js";
export {
  msdyn_SendEmailFromTemplateRequest,
  type msdyn_SendEmailFromTemplateRequestParameters,
  msdyn_SendEmailFromTemplateResponse,
} from "./msdyn_SendEmailFromTemplateMessage.js";
export {
  msdyn_SendEmailsToOptedInResourcesRequest,
  type msdyn_SendEmailsToOptedInResourcesRequestParameters,
  msdyn_SendEmailsToOptedInResourcesResponse,
} from "./msdyn_SendEmailsToOptedInResourcesMessage.js";
export {
  msdyn_SendEmailToTechniciansRequest,
  type msdyn_SendEmailToTechniciansRequestParameters,
  msdyn_SendEmailToTechniciansResponse,
} from "./msdyn_SendEmailToTechniciansMessage.js";
export {
  msdyn_sendFeedbackRequest,
  type msdyn_sendFeedbackRequestParameters,
  msdyn_sendFeedbackResponse,
} from "./msdyn_sendFeedbackMessage.js";
export {
  msdyn_SendMCSSurveyRequest,
  type msdyn_SendMCSSurveyRequestParameters,
  msdyn_SendMCSSurveyResponse,
} from "./msdyn_SendMCSSurveyMessage.js";
export {
  msdyn_SendMessageToOCServiceRequest,
  type msdyn_SendMessageToOCServiceRequestParameters,
  msdyn_SendMessageToOCServiceResponse,
} from "./msdyn_SendMessageToOCServiceMessage.js";
export {
  msdyn_SendRecordEventUpdateRequest,
  type msdyn_SendRecordEventUpdateRequestParameters,
  msdyn_SendRecordEventUpdateResponse,
} from "./msdyn_SendRecordEventUpdateMessage.js";
export {
  msdyn_SetAutoBlockedFlagRequest,
  type msdyn_SetAutoBlockedFlagRequestParameters,
  msdyn_SetAutoBlockedFlagResponse,
} from "./msdyn_SetAutoBlockedFlagMessage.js";
export {
  msdyn_SetCaseSentimentCustomAPIRequest,
  type msdyn_SetCaseSentimentCustomAPIRequestParameters,
  msdyn_SetCaseSentimentCustomAPIResponse,
} from "./msdyn_SetCaseSentimentCustomAPIMessage.js";
export {
  msdyn_SetFeatureStatusRequest,
  type msdyn_SetFeatureStatusRequestParameters,
  msdyn_SetFeatureStatusResponse,
} from "./msdyn_SetFeatureStatusMessage.js";
export {
  msdyn_SetLegalAcceptanceStatusRequest,
  type msdyn_SetLegalAcceptanceStatusRequestParameters,
  msdyn_SetLegalAcceptanceStatusResponse,
} from "./msdyn_SetLegalAcceptanceStatusMessage.js";
export {
  msdyn_SetSharePointDocumentStatusRequest,
  type msdyn_SetSharePointDocumentStatusRequestParameters,
  msdyn_SetSharePointDocumentStatusResponse,
} from "./msdyn_SetSharePointDocumentStatusMessage.js";
export {
  msdyn_SetTalkingPointLikedStatusRequest,
  type msdyn_SetTalkingPointLikedStatusRequestParameters,
  msdyn_SetTalkingPointLikedStatusResponse,
} from "./msdyn_SetTalkingPointLikedStatusMessage.js";
export {
  msdyn_SetTeamsDocumentStatusRequest,
  type msdyn_SetTeamsDocumentStatusRequestParameters,
  msdyn_SetTeamsDocumentStatusResponse,
} from "./msdyn_SetTeamsDocumentStatusMessage.js";
export {
  msdyn_SetupRelationshipForEnablingEntityRoutingRequest,
  type msdyn_SetupRelationshipForEnablingEntityRoutingRequestParameters,
  msdyn_SetupRelationshipForEnablingEntityRoutingResponse,
} from "./msdyn_SetupRelationshipForEnablingEntityRoutingMessage.js";
export {
  msdyn_ShouldEnableRoutingCommandRequest,
  type msdyn_ShouldEnableRoutingCommandRequestParameters,
  msdyn_ShouldEnableRoutingCommandResponse,
} from "./msdyn_ShouldEnableRoutingCommandMessage.js";
export {
  msdyn_ShowConsumerCredentialsRequest,
  type msdyn_ShowConsumerCredentialsRequestParameters,
  msdyn_ShowConsumerCredentialsResponse,
} from "./msdyn_ShowConsumerCredentialsMessage.js";
export {
  msdyn_ShowPrivacyTermsRequest,
  type msdyn_ShowPrivacyTermsRequestParameters,
  msdyn_ShowPrivacyTermsResponse,
} from "./msdyn_ShowPrivacyTermsMessage.js";
export {
  msdyn_SIGetFCBStatusRequest,
  type msdyn_SIGetFCBStatusRequestParameters,
  msdyn_SIGetFCBStatusResponse,
} from "./msdyn_SIGetFCBStatusMessage.js";
export {
  msdyn_SignalRInstanceActionsRequest,
  type msdyn_SignalRInstanceActionsRequestParameters,
  msdyn_SignalRInstanceActionsResponse,
} from "./msdyn_SignalRInstanceActionsMessage.js";
export {
  msdyn_SimulateBookingResourceRequest,
  type msdyn_SimulateBookingResourceRequestParameters,
  msdyn_SimulateBookingResourceResponse,
} from "./msdyn_SimulateBookingResourceMessage.js";
export {
  msdyn_SiteMapDiagnosisRequest,
  type msdyn_SiteMapDiagnosisRequestParameters,
  msdyn_SiteMapDiagnosisResponse,
} from "./msdyn_SiteMapDiagnosisMessage.js";
export {
  msdyn_SiteMapRepairRequest,
  type msdyn_SiteMapRepairRequestParameters,
  msdyn_SiteMapRepairResponse,
} from "./msdyn_SiteMapRepairMessage.js";
export {
  msdyn_SLACustomTimeCalculationTemplateRequest,
  type msdyn_SLACustomTimeCalculationTemplateRequestParameters,
  msdyn_SLACustomTimeCalculationTemplateResponse,
} from "./msdyn_SLACustomTimeCalculationTemplateMessage.js";
export {
  msdyn_SLATimeCalculationRequest,
  type msdyn_SLATimeCalculationRequestParameters,
  msdyn_SLATimeCalculationResponse,
} from "./msdyn_SLATimeCalculationMessage.js";
export {
  msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_SmsChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_SmsSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_SnoozeEmailInfraActionCardRequest,
  type msdyn_SnoozeEmailInfraActionCardRequestParameters,
  msdyn_SnoozeEmailInfraActionCardResponse,
} from "./msdyn_SnoozeEmailInfraActionCardMessage.js";
export {
  msdyn_StartCaseFollowupMonitoringRequest,
  msdyn_StartCaseFollowupMonitoringResponse,
} from "./msdyn_StartCaseFollowupMonitoringMessage.js";
export {
  msdyn_StartODOSDeprovisioningRequest,
  type msdyn_StartODOSDeprovisioningRequestParameters,
  msdyn_StartODOSDeprovisioningResponse,
} from "./msdyn_StartODOSDeprovisioningMessage.js";
export {
  msdyn_StartODOSProvisioningRequest,
  type msdyn_StartODOSProvisioningRequestParameters,
  msdyn_StartODOSProvisioningResponse,
} from "./msdyn_StartODOSProvisioningMessage.js";
export {
  msdyn_StartRIProvisioningRequest,
  type msdyn_StartRIProvisioningRequestParameters,
  msdyn_StartRIProvisioningResponse,
} from "./msdyn_StartRIProvisioningMessage.js";
export {
  msdyn_startSequenceStatsCopyJobRequest,
  type msdyn_startSequenceStatsCopyJobRequestParameters,
  msdyn_startSequenceStatsCopyJobResponse,
} from "./msdyn_startSequenceStatsCopyJobMessage.js";
export {
  msdyn_StoreQualityEvaluationResultRequest,
  type msdyn_StoreQualityEvaluationResultRequestParameters,
  msdyn_StoreQualityEvaluationResultResponse,
} from "./msdyn_StoreQualityEvaluationResultMessage.js";
export {
  msdyn_SuggestPrimaryForMergeActionRequest,
  type msdyn_SuggestPrimaryForMergeActionRequestParameters,
  msdyn_SuggestPrimaryForMergeActionResponse,
} from "./msdyn_SuggestPrimaryForMergeActionMessage.js";
export {
  msdyn_SummarySynthesizerStatusRequest,
  type msdyn_SummarySynthesizerStatusRequestParameters,
  msdyn_SummarySynthesizerStatusResponse,
} from "./msdyn_SummarySynthesizerStatusMessage.js";
export {
  msdyn_SwarmExpertFinderRequest,
  type msdyn_SwarmExpertFinderRequestParameters,
  msdyn_SwarmExpertFinderResponse,
} from "./msdyn_SwarmExpertFinderMessage.js";
export {
  msdyn_SyncKnowledgeManagementSettingsV2Request,
  msdyn_SyncKnowledgeManagementSettingsV2Response,
} from "./msdyn_SyncKnowledgeManagementSettingsV2Message.js";
export {
  msdyn_SyncODOSProvisioningStatusRequest,
  type msdyn_SyncODOSProvisioningStatusRequestParameters,
  msdyn_SyncODOSProvisioningStatusResponse,
} from "./msdyn_SyncODOSProvisioningStatusMessage.js";
export {
  msdyn_TableOperationRequest,
  type msdyn_TableOperationRequestParameters,
  msdyn_TableOperationResponse,
} from "./msdyn_TableOperationMessage.js";
export {
  msdyn_TeamsChannelCleanupRequest,
  msdyn_TeamsChannelCleanupResponse,
} from "./msdyn_TeamsChannelCleanupMessage.js";
export {
  msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_TeamsChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_TeamsSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_TelephonyACSResourceUsageDetailsActionRequest,
  type msdyn_TelephonyACSResourceUsageDetailsActionRequestParameters,
  msdyn_TelephonyACSResourceUsageDetailsActionResponse,
} from "./msdyn_TelephonyACSResourceUsageDetailsActionMessage.js";
export {
  msdyn_TelephonyACSSyncPhoneNumbersActionRequest,
  type msdyn_TelephonyACSSyncPhoneNumbersActionRequestParameters,
  msdyn_TelephonyACSSyncPhoneNumbersActionResponse,
} from "./msdyn_TelephonyACSSyncPhoneNumbersActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberAreaCodeActionRequest,
  type msdyn_TelephonyPhoneNumberAreaCodeActionRequestParameters,
  msdyn_TelephonyPhoneNumberAreaCodeActionResponse,
} from "./msdyn_TelephonyPhoneNumberAreaCodeActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberPlanUpgradeActionRequest,
  type msdyn_TelephonyPhoneNumberPlanUpgradeActionRequestParameters,
  msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse,
} from "./msdyn_TelephonyPhoneNumberPlanUpgradeActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberReservationActionRequest,
  type msdyn_TelephonyPhoneNumberReservationActionRequestParameters,
  msdyn_TelephonyPhoneNumberReservationActionResponse,
} from "./msdyn_TelephonyPhoneNumberReservationActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberReservationStatusActionRequest,
  type msdyn_TelephonyPhoneNumberReservationStatusActionRequestParameters,
  msdyn_TelephonyPhoneNumberReservationStatusActionResponse,
} from "./msdyn_TelephonyPhoneNumberReservationStatusActionMessage.js";
export {
  msdyn_TelephonyPhoneNumbersDeprovisionActionRequest,
  type msdyn_TelephonyPhoneNumbersDeprovisionActionRequestParameters,
  msdyn_TelephonyPhoneNumbersDeprovisionActionResponse,
} from "./msdyn_TelephonyPhoneNumbersDeprovisionActionMessage.js";
export {
  msdyn_TelephonyPhoneNumbersProvisionActionRequest,
  type msdyn_TelephonyPhoneNumbersProvisionActionRequestParameters,
  msdyn_TelephonyPhoneNumbersProvisionActionResponse,
} from "./msdyn_TelephonyPhoneNumbersProvisionActionMessage.js";
export {
  msdyn_TelephonyPlanLocationDetailsActionRequest,
  type msdyn_TelephonyPlanLocationDetailsActionRequestParameters,
  msdyn_TelephonyPlanLocationDetailsActionResponse,
} from "./msdyn_TelephonyPlanLocationDetailsActionMessage.js";
export {
  msdyn_TelephonyResourceDeprovisionActionRequest,
  type msdyn_TelephonyResourceDeprovisionActionRequestParameters,
  msdyn_TelephonyResourceDeprovisionActionResponse,
} from "./msdyn_TelephonyResourceDeprovisionActionMessage.js";
export {
  msdyn_TelephonyResourceProvisionActionRequest,
  type msdyn_TelephonyResourceProvisionActionRequestParameters,
  msdyn_TelephonyResourceProvisionActionResponse,
} from "./msdyn_TelephonyResourceProvisionActionMessage.js";
export {
  msdyn_TelephonySupportedCountryActionRequest,
  type msdyn_TelephonySupportedCountryActionRequestParameters,
  msdyn_TelephonySupportedCountryActionResponse,
} from "./msdyn_TelephonySupportedCountryActionMessage.js";
export {
  msdyn_TelephonySupportedPlansActionRequest,
  type msdyn_TelephonySupportedPlansActionRequestParameters,
  msdyn_TelephonySupportedPlansActionResponse,
} from "./msdyn_TelephonySupportedPlansActionMessage.js";
export {
  msdyn_timetrackerapiRequest,
  type msdyn_timetrackerapiRequestParameters,
  msdyn_timetrackerapiResponse,
} from "./msdyn_timetrackerapiMessage.js";
export {
  msdyn_TrackExchangeActivityRequest,
  type msdyn_TrackExchangeActivityRequestParameters,
  msdyn_TrackExchangeActivityResponse,
} from "./msdyn_TrackExchangeActivityMessage.js";
export {
  msdyn_TrainAIModelRequest,
  msdyn_TrainAIModelResponse,
} from "./msdyn_TrainAIModelMessage.js";
export {
  msdyn_TrainEffortModelRequest,
  type msdyn_TrainEffortModelRequestParameters,
  msdyn_TrainEffortModelResponse,
} from "./msdyn_TrainEffortModelMessage.js";
export { msdyn_TrainModelRequest, msdyn_TrainModelResponse } from "./msdyn_TrainModelMessage.js";
export {
  msdyn_transformentityRequest,
  type msdyn_transformentityRequestParameters,
  msdyn_transformentityResponse,
} from "./msdyn_transformentityMessage.js";
export {
  msdyn_TriggerARCWithRuleRequest,
  type msdyn_TriggerARCWithRuleRequestParameters,
  msdyn_TriggerARCWithRuleResponse,
} from "./msdyn_TriggerARCWithRuleMessage.js";
export {
  msdyn_TriggerForecastPredictionsRequest,
  type msdyn_TriggerForecastPredictionsRequestParameters,
  msdyn_TriggerForecastPredictionsResponse,
} from "./msdyn_TriggerForecastPredictionsMessage.js";
export {
  msdyn_TriggerForecastRecomputeRequest,
  type msdyn_TriggerForecastRecomputeRequestParameters,
  msdyn_TriggerForecastRecomputeResponse,
} from "./msdyn_TriggerForecastRecomputeMessage.js";
export {
  msdyn_TriggerIntegratedSearchAnalyticsRequest,
  msdyn_TriggerIntegratedSearchAnalyticsResponse,
} from "./msdyn_TriggerIntegratedSearchAnalyticsMessage.js";
export {
  msdyn_TriggerIntegratedSearchIngestionRequest,
  msdyn_TriggerIntegratedSearchIngestionResponse,
} from "./msdyn_TriggerIntegratedSearchIngestionMessage.js";
export {
  msdyn_TriggerIntegratedSearchProvisioningApiRequest,
  type msdyn_TriggerIntegratedSearchProvisioningApiRequestParameters,
  msdyn_TriggerIntegratedSearchProvisioningApiResponse,
} from "./msdyn_TriggerIntegratedSearchProvisioningApiMessage.js";
export {
  msdyn_TriggerIntegratedSearchSyncRequest,
  msdyn_TriggerIntegratedSearchSyncResponse,
} from "./msdyn_TriggerIntegratedSearchSyncMessage.js";
export {
  msdyn_TriggerSequenceStatsDockerJobRequest,
  msdyn_TriggerSequenceStatsDockerJobResponse,
} from "./msdyn_TriggerSequenceStatsDockerJobMessage.js";
export {
  msdyn_TriggerSummarySynthesizerRequest,
  type msdyn_TriggerSummarySynthesizerRequestParameters,
  msdyn_TriggerSummarySynthesizerResponse,
} from "./msdyn_TriggerSummarySynthesizerMessage.js";
export {
  msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_TwitterHandleConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_TwitterSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_TwitterSigninRequest,
  type msdyn_TwitterSigninRequestParameters,
  msdyn_TwitterSigninResponse,
} from "./msdyn_TwitterSigninMessage.js";
export {
  msdyn_UnifiedRoutingQueueItemOperationsRequest,
  type msdyn_UnifiedRoutingQueueItemOperationsRequestParameters,
  msdyn_UnifiedRoutingQueueItemOperationsResponse,
} from "./msdyn_UnifiedRoutingQueueItemOperationsMessage.js";
export {
  msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequest,
  type msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequestParameters,
  msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse,
} from "./msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckMessage.js";
export {
  msdyn_UpdateAuditStateRequest,
  type msdyn_UpdateAuditStateRequestParameters,
  msdyn_UpdateAuditStateResponse,
} from "./msdyn_UpdateAuditStateMessage.js";
export {
  msdyn_UpdateAutoCaptureSettingsRequest,
  type msdyn_UpdateAutoCaptureSettingsRequestParameters,
  msdyn_UpdateAutoCaptureSettingsResponse,
} from "./msdyn_UpdateAutoCaptureSettingsMessage.js";
export {
  msdyn_UpdateAutoScheduledTrainingStatusRequest,
  type msdyn_UpdateAutoScheduledTrainingStatusRequestParameters,
  msdyn_UpdateAutoScheduledTrainingStatusResponse,
} from "./msdyn_UpdateAutoScheduledTrainingStatusMessage.js";
export {
  msdyn_UpdateBookingsStatusRequest,
  type msdyn_UpdateBookingsStatusRequestParameters,
  msdyn_UpdateBookingsStatusResponse,
} from "./msdyn_UpdateBookingsStatusMessage.js";
export {
  msdyn_UpdateCadenceRunStatusRequest,
  type msdyn_UpdateCadenceRunStatusRequestParameters,
  msdyn_UpdateCadenceRunStatusResponse,
} from "./msdyn_UpdateCadenceRunStatusMessage.js";
export {
  msdyn_UpdateCopilotSettingsRequest,
  type msdyn_UpdateCopilotSettingsRequestParameters,
  msdyn_UpdateCopilotSettingsResponse,
} from "./msdyn_UpdateCopilotSettingsMessage.js";
export {
  msdyn_UpdateEffortModelStatusRequest,
  type msdyn_UpdateEffortModelStatusRequestParameters,
  msdyn_UpdateEffortModelStatusResponse,
} from "./msdyn_UpdateEffortModelStatusMessage.js";
export {
  msdyn_updateevaluationdetailsRequest,
  type msdyn_updateevaluationdetailsRequestParameters,
  msdyn_updateevaluationdetailsResponse,
} from "./msdyn_updateevaluationdetailsMessage.js";
export {
  msdyn_UpdatefeatureconfigRequest,
  type msdyn_UpdatefeatureconfigRequestParameters,
  msdyn_UpdatefeatureconfigResponse,
} from "./msdyn_UpdatefeatureconfigMessage.js";
export {
  msdyn_UpdateIsCustomFieldForOrganizationEntityRequest,
  msdyn_UpdateIsCustomFieldForOrganizationEntityResponse,
} from "./msdyn_UpdateIsCustomFieldForOrganizationEntityMessage.js";
export {
  msdyn_UpdateKBArticleRequest,
  type msdyn_UpdateKBArticleRequestParameters,
  msdyn_UpdateKBArticleResponse,
} from "./msdyn_UpdateKBArticleMessage.js";
export {
  msdyn_UpdateKbAttachmentPrivilegeRequest,
  type msdyn_UpdateKbAttachmentPrivilegeRequestParameters,
  msdyn_UpdateKbAttachmentPrivilegeResponse,
} from "./msdyn_UpdateKbAttachmentPrivilegeMessage.js";
export {
  msdyn_updatelivechatconfigsRequest,
  msdyn_updatelivechatconfigsResponse,
} from "./msdyn_updatelivechatconfigsMessage.js";
export {
  msdyn_UpdateModelGradesRequest,
  type msdyn_UpdateModelGradesRequestParameters,
  msdyn_UpdateModelGradesResponse,
} from "./msdyn_UpdateModelGradesMessage.js";
export {
  msdyn_UpdateModelStatusRequest,
  type msdyn_UpdateModelStatusRequestParameters,
  msdyn_UpdateModelStatusResponse,
} from "./msdyn_UpdateModelStatusMessage.js";
export {
  msdyn_UpdateNBACardStateRequest,
  type msdyn_UpdateNBACardStateRequestParameters,
  msdyn_UpdateNBACardStateResponse,
} from "./msdyn_UpdateNBACardStateMessage.js";
export {
  msdyn_UpdateNewEntityAdditionOptedStatusRequest,
  type msdyn_UpdateNewEntityAdditionOptedStatusRequestParameters,
  msdyn_UpdateNewEntityAdditionOptedStatusResponse,
} from "./msdyn_UpdateNewEntityAdditionOptedStatusMessage.js";
export {
  msdyn_UpdateODOSFeatureEnabledRolesRequest,
  type msdyn_UpdateODOSFeatureEnabledRolesRequestParameters,
  msdyn_UpdateODOSFeatureEnabledRolesResponse,
} from "./msdyn_UpdateODOSFeatureEnabledRolesMessage.js";
export {
  msdyn_UpdatePrivacyTermsRequest,
  type msdyn_UpdatePrivacyTermsRequestParameters,
  msdyn_UpdatePrivacyTermsResponse,
} from "./msdyn_UpdatePrivacyTermsMessage.js";
export {
  msdyn_UpdateRecordWithRuleBasedPredictionsRequest,
  type msdyn_UpdateRecordWithRuleBasedPredictionsRequestParameters,
  msdyn_UpdateRecordWithRuleBasedPredictionsResponse,
} from "./msdyn_UpdateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_UpdateRequirementDemandRequest,
  type msdyn_UpdateRequirementDemandRequestParameters,
  msdyn_UpdateRequirementDemandResponse,
} from "./msdyn_UpdateRequirementDemandMessage.js";
export {
  msdyn_UpdateRequirementModelRequest,
  type msdyn_UpdateRequirementModelRequestParameters,
  msdyn_UpdateRequirementModelResponse,
} from "./msdyn_UpdateRequirementModelMessage.js";
export {
  msdyn_UpdateRITenantInfoRequest,
  type msdyn_UpdateRITenantInfoRequestParameters,
  msdyn_UpdateRITenantInfoResponse,
} from "./msdyn_UpdateRITenantInfoMessage.js";
export {
  msdyn_UpdateSalesCopilotUserSettingsRequest,
  type msdyn_UpdateSalesCopilotUserSettingsRequestParameters,
  msdyn_UpdateSalesCopilotUserSettingsResponse,
} from "./msdyn_UpdateSalesCopilotUserSettingsMessage.js";
export {
  msdyn_UpdateSdkMessageProcessingStepStateRequest,
  type msdyn_UpdateSdkMessageProcessingStepStateRequestParameters,
  msdyn_UpdateSdkMessageProcessingStepStateResponse,
} from "./msdyn_UpdateSdkMessageProcessingStepStateMessage.js";
export {
  msdyn_UpdateSequenceDailyUsageMetricRequest,
  type msdyn_UpdateSequenceDailyUsageMetricRequestParameters,
  msdyn_UpdateSequenceDailyUsageMetricResponse,
} from "./msdyn_UpdateSequenceDailyUsageMetricMessage.js";
export {
  msdyn_updatesequencetargetstepdataRequest,
  type msdyn_updatesequencetargetstepdataRequestParameters,
  msdyn_updatesequencetargetstepdataResponse,
} from "./msdyn_updatesequencetargetstepdataMessage.js";
export {
  msdyn_UpdateSurveyBotTopicsRequest,
  msdyn_UpdateSurveyBotTopicsResponse,
} from "./msdyn_UpdateSurveyBotTopicsMessage.js";
export {
  msdyn_UpdateSurveyJsonRequest,
  type msdyn_UpdateSurveyJsonRequestParameters,
  msdyn_UpdateSurveyJsonResponse,
} from "./msdyn_UpdateSurveyJsonMessage.js";
export {
  msdyn_UpdateUserConsentBasedonSecurityRolesRequest,
  type msdyn_UpdateUserConsentBasedonSecurityRolesRequestParameters,
  msdyn_UpdateUserConsentBasedonSecurityRolesResponse,
} from "./msdyn_UpdateUserConsentBasedonSecurityRolesMessage.js";
export {
  msdyn_UpgradeTelemetryRequest,
  type msdyn_UpgradeTelemetryRequestParameters,
  msdyn_UpgradeTelemetryResponse,
} from "./msdyn_UpgradeTelemetryMessage.js";
export {
  msdyn_UpsertEvaluationCriteriaRequest,
  type msdyn_UpsertEvaluationCriteriaRequestParameters,
  msdyn_UpsertEvaluationCriteriaResponse,
} from "./msdyn_UpsertEvaluationCriteriaMessage.js";
export {
  msdyn_upsertSalesRoutingDiagnosticRequest,
  type msdyn_upsertSalesRoutingDiagnosticRequestParameters,
  msdyn_upsertSalesRoutingDiagnosticResponse,
} from "./msdyn_upsertSalesRoutingDiagnosticMessage.js";
export {
  msdyn_UpsertSellerAssignmentMapRequest,
  type msdyn_UpsertSellerAssignmentMapRequestParameters,
  msdyn_UpsertSellerAssignmentMapResponse,
} from "./msdyn_UpsertSellerAssignmentMapMessage.js";
export {
  msdyn_URFirstPartyIntegrationApiRequest,
  type msdyn_URFirstPartyIntegrationApiRequestParameters,
  msdyn_URFirstPartyIntegrationApiResponse,
} from "./msdyn_URFirstPartyIntegrationApiMessage.js";
export {
  msdyn_UserOptOutActorRequest,
  type msdyn_UserOptOutActorRequestParameters,
  msdyn_UserOptOutActorResponse,
} from "./msdyn_UserOptOutActorMessage.js";
export {
  msdyn_UserSecurityRoleDeltaSyncActorRequest,
  type msdyn_UserSecurityRoleDeltaSyncActorRequestParameters,
  msdyn_UserSecurityRoleDeltaSyncActorResponse,
} from "./msdyn_UserSecurityRoleDeltaSyncActorMessage.js";
export {
  msdyn_ValidateCustomMessagingApplicationRequest,
  type msdyn_ValidateCustomMessagingApplicationRequestParameters,
  msdyn_ValidateCustomMessagingApplicationResponse,
} from "./msdyn_ValidateCustomMessagingApplicationMessage.js";
export {
  msdyn_ValidateKeyVaultRequest,
  type msdyn_ValidateKeyVaultRequestParameters,
  msdyn_ValidateKeyVaultResponse,
} from "./msdyn_ValidateKeyVaultMessage.js";
export {
  msdyn_ValidateTSIKeyRequest,
  msdyn_ValidateTSIKeyResponse,
} from "./msdyn_ValidateTSIKeyMessage.js";
export {
  msdyn_ValidateTSISecretExpiryRequest,
  msdyn_ValidateTSISecretExpiryResponse,
} from "./msdyn_ValidateTSISecretExpiryMessage.js";
export {
  msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_WeChatChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_WeChatSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleRequest,
  msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleResponse,
} from "./msdyn_WhatsAppChannelConfigurationShouldHaveWorkStreamRuleMessage.js";
export {
  msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleRequest,
  msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleResponse,
} from "./msdyn_WhatsAppSettingsShouldHaveAllRequiredFieldsRuleMessage.js";
export {
  msdyn_WKWDeleteGDPRDataRequest,
  type msdyn_WKWDeleteGDPRDataRequestParameters,
  msdyn_WKWDeleteGDPRDataResponse,
} from "./msdyn_WKWDeleteGDPRDataMessage.js";
export {
  msdyn_WKWGDPRDeleteStatusRequest,
  type msdyn_WKWGDPRDeleteStatusRequestParameters,
  msdyn_WKWGDPRDeleteStatusResponse,
} from "./msdyn_WKWGDPRDeleteStatusMessage.js";
export {
  msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleRequest,
  msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleResponse,
} from "./msdyn_WorkstreamCapacityShouldBeLessThanAgentsRuleMessage.js";
export {
  msdyn_WorkstreamShouldHaveNotificationTemplatesRuleRequest,
  msdyn_WorkstreamShouldHaveNotificationTemplatesRuleResponse,
} from "./msdyn_WorkstreamShouldHaveNotificationTemplatesRuleMessage.js";
export {
  msdyn_WorkstreamShouldHaveSessionTemplatesRuleRequest,
  msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse,
} from "./msdyn_WorkstreamShouldHaveSessionTemplatesRuleMessage.js";
export {
  msdyn_WorkstreamShouldNotHaveDuplicateContextRuleRequest,
  msdyn_WorkstreamShouldNotHaveDuplicateContextRuleResponse,
} from "./msdyn_WorkstreamShouldNotHaveDuplicateContextRuleMessage.js";
export {
  msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleRequest,
  msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleResponse,
} from "./msdyn_WorkstreamShouldNotHaveEmptyRoutingRulesAboveRulesWithConditionRuleMessage.js";
export {
  msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleRequest,
  msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleResponse,
} from "./msdyn_WorkstreamWithPushModeShouldNotAllowOfflineModeRuleMessage.js";
export {
  msdyncrm_GetFileAttributesFromConfigurationRequest,
  msdyncrm_GetFileAttributesFromConfigurationResponse,
} from "./msdyncrm_GetFileAttributesFromConfigurationMessage.js";
export {
  msdyncrm_MigrateFilesCustomActionRequest,
  msdyncrm_MigrateFilesCustomActionResponse,
} from "./msdyncrm_MigrateFilesCustomActionMessage.js";
export {
  msdyncrm_UpsertFileRequest,
  type msdyncrm_UpsertFileRequestParameters,
  msdyncrm_UpsertFileResponse,
} from "./msdyncrm_UpsertFileMessage.js";
export {
  msdynmkt_ChannelContentPersonalizeRequest,
  type msdynmkt_ChannelContentPersonalizeRequestParameters,
  msdynmkt_ChannelContentPersonalizeResponse,
} from "./msdynmkt_ChannelContentPersonalizeMessage.js";
export {
  msdynmkt_ChartWidgetDataCustomActionRequest,
  type msdynmkt_ChartWidgetDataCustomActionRequestParameters,
  msdynmkt_ChartWidgetDataCustomActionResponse,
} from "./msdynmkt_ChartWidgetDataCustomActionMessage.js";
export {
  msdynmkt_checkconsentRequest,
  type msdynmkt_checkconsentRequestParameters,
  msdynmkt_checkconsentResponse,
} from "./msdynmkt_checkconsentMessage.js";
export {
  msdynmkt_checkconsentbatchRequest,
  type msdynmkt_checkconsentbatchRequestParameters,
  msdynmkt_checkconsentbatchResponse,
} from "./msdynmkt_checkconsentbatchMessage.js";
export {
  msdynmkt_consentprovidervalidateRequest,
  type msdynmkt_consentprovidervalidateRequestParameters,
  msdynmkt_consentprovidervalidateResponse,
} from "./msdynmkt_consentprovidervalidateMessage.js";
export {
  msdynmkt_consentsubmissionRequest,
  type msdynmkt_consentsubmissionRequestParameters,
  msdynmkt_consentsubmissionResponse,
} from "./msdynmkt_consentsubmissionMessage.js";
export {
  msdynmkt_consentvalidateformRequest,
  type msdynmkt_consentvalidateformRequestParameters,
  msdynmkt_consentvalidateformResponse,
} from "./msdynmkt_consentvalidateformMessage.js";
export {
  msdynmkt_ContactabilitySnapshotCustomActionRequest,
  type msdynmkt_ContactabilitySnapshotCustomActionRequestParameters,
  msdynmkt_ContactabilitySnapshotCustomActionResponse,
} from "./msdynmkt_ContactabilitySnapshotCustomActionMessage.js";
export {
  msdynmkt_contactablefieldsactionRequest,
  type msdynmkt_contactablefieldsactionRequestParameters,
  msdynmkt_contactablefieldsactionResponse,
} from "./msdynmkt_contactablefieldsactionMessage.js";
export {
  msdynmkt_DateTimeFormatOptionsRequest,
  type msdynmkt_DateTimeFormatOptionsRequestParameters,
  msdynmkt_DateTimeFormatOptionsResponse,
} from "./msdynmkt_DateTimeFormatOptionsMessage.js";
export {
  msdynmkt_DiscoverPlaceholdersRequest,
  type msdynmkt_DiscoverPlaceholdersRequestParameters,
  msdynmkt_DiscoverPlaceholdersResponse,
} from "./msdynmkt_DiscoverPlaceholdersMessage.js";
export {
  msdynmkt_doubleoptinstatusRequest,
  type msdynmkt_doubleoptinstatusRequestParameters,
  msdynmkt_doubleoptinstatusResponse,
} from "./msdynmkt_doubleoptinstatusMessage.js";
export {
  msdynmkt_enabledoubleoptincomplianceRequest,
  type msdynmkt_enabledoubleoptincomplianceRequestParameters,
  msdynmkt_enabledoubleoptincomplianceResponse,
} from "./msdynmkt_enabledoubleoptincomplianceMessage.js";
export {
  msdynmkt_EnableDoubleOptInComplianceV2Request,
  type msdynmkt_EnableDoubleOptInComplianceV2RequestParameters,
  msdynmkt_EnableDoubleOptInComplianceV2Response,
} from "./msdynmkt_EnableDoubleOptInComplianceV2Message.js";
export {
  msdynmkt_GetAllCjoEventsMetadataItemsRequest,
  type msdynmkt_GetAllCjoEventsMetadataItemsRequestParameters,
  msdynmkt_GetAllCjoEventsMetadataItemsResponse,
} from "./msdynmkt_GetAllCjoEventsMetadataItemsMessage.js";
export {
  msdynmkt_GetAllLegalMetadataItemsRequest,
  type msdynmkt_GetAllLegalMetadataItemsRequestParameters,
  msdynmkt_GetAllLegalMetadataItemsResponse,
} from "./msdynmkt_GetAllLegalMetadataItemsMessage.js";
export {
  msdynmkt_GetCjoEventsMetadataItemsByNamesRequest,
  type msdynmkt_GetCjoEventsMetadataItemsByNamesRequestParameters,
  msdynmkt_GetCjoEventsMetadataItemsByNamesResponse,
} from "./msdynmkt_GetCjoEventsMetadataItemsByNamesMessage.js";
export {
  msdynmkt_GetDataverseTableMetadataItemsRequest,
  type msdynmkt_GetDataverseTableMetadataItemsRequestParameters,
  msdynmkt_GetDataverseTableMetadataItemsResponse,
} from "./msdynmkt_GetDataverseTableMetadataItemsMessage.js";
export {
  msdynmkt_getdigitalassetcdnurlv2Request,
  type msdynmkt_getdigitalassetcdnurlv2RequestParameters,
  msdynmkt_getdigitalassetcdnurlv2Response,
} from "./msdynmkt_getdigitalassetcdnurlv2Message.js";
export {
  msdynmkt_GetMetadataItemsForRequest,
  type msdynmkt_GetMetadataItemsForRequestParameters,
  msdynmkt_GetMetadataItemsForResponse,
} from "./msdynmkt_GetMetadataItemsForMessage.js";
export {
  msdynmkt_getObmDeprecationConfigurationRequest,
  msdynmkt_getObmDeprecationConfigurationResponse,
} from "./msdynmkt_getObmDeprecationConfigurationMessage.js";
export {
  msdynmkt_GetPublicConfigurationCustomActionRequest,
  msdynmkt_GetPublicConfigurationCustomActionResponse,
} from "./msdynmkt_GetPublicConfigurationCustomActionMessage.js";
export {
  msdynmkt_getsuppressionlistentriesRequest,
  type msdynmkt_getsuppressionlistentriesRequestParameters,
  msdynmkt_getsuppressionlistentriesResponse,
} from "./msdynmkt_getsuppressionlistentriesMessage.js";
export {
  msdynmkt_getsuppressionlistentryRequest,
  type msdynmkt_getsuppressionlistentryRequestParameters,
  msdynmkt_getsuppressionlistentryResponse,
} from "./msdynmkt_getsuppressionlistentryMessage.js";
export {
  msdynmkt_getunsubscribelinkRequest,
  type msdynmkt_getunsubscribelinkRequestParameters,
  msdynmkt_getunsubscribelinkResponse,
} from "./msdynmkt_getunsubscribelinkMessage.js";
export {
  msdynmkt_leadcapturev3submissionRequest,
  type msdynmkt_leadcapturev3submissionRequestParameters,
  msdynmkt_leadcapturev3submissionResponse,
} from "./msdynmkt_leadcapturev3submissionMessage.js";
export {
  msdynmkt_leadcapturev4submissionRequest,
  type msdynmkt_leadcapturev4submissionRequestParameters,
  msdynmkt_leadcapturev4submissionResponse,
} from "./msdynmkt_leadcapturev4submissionMessage.js";
export {
  msdynmkt_ListWidgetDataCustomActionRequest,
  type msdynmkt_ListWidgetDataCustomActionRequestParameters,
  msdynmkt_ListWidgetDataCustomActionResponse,
} from "./msdynmkt_ListWidgetDataCustomActionMessage.js";
export {
  msdynmkt_normalizecontactpointRequest,
  type msdynmkt_normalizecontactpointRequestParameters,
  msdynmkt_normalizecontactpointResponse,
} from "./msdynmkt_normalizecontactpointMessage.js";
export {
  msdynmkt_optoutofallvoicecommunicationRequest,
  type msdynmkt_optoutofallvoicecommunicationRequestParameters,
  msdynmkt_optoutofallvoicecommunicationResponse,
} from "./msdynmkt_optoutofallvoicecommunicationMessage.js";
export {
  msdynmkt_optoutofvoicecommunicationRequest,
  type msdynmkt_optoutofvoicecommunicationRequestParameters,
  msdynmkt_optoutofvoicecommunicationResponse,
} from "./msdynmkt_optoutofvoicecommunicationMessage.js";
export {
  msdynmkt_PersonalizationDynamicTextAiRequest,
  type msdynmkt_PersonalizationDynamicTextAiRequestParameters,
  msdynmkt_PersonalizationDynamicTextAiResponse,
} from "./msdynmkt_PersonalizationDynamicTextAiMessage.js";
export {
  msdynmkt_PersonalizationGetEntityAttributesRequest,
  type msdynmkt_PersonalizationGetEntityAttributesRequestParameters,
  msdynmkt_PersonalizationGetEntityAttributesResponse,
} from "./msdynmkt_PersonalizationGetEntityAttributesMessage.js";
export {
  msdynmkt_PersonalizationGetEntityProvidersRequest,
  type msdynmkt_PersonalizationGetEntityProvidersRequestParameters,
  msdynmkt_PersonalizationGetEntityProvidersResponse,
} from "./msdynmkt_PersonalizationGetEntityProvidersMessage.js";
export {
  msdynmkt_PersonalizationGetEntityTypesRequest,
  type msdynmkt_PersonalizationGetEntityTypesRequestParameters,
  msdynmkt_PersonalizationGetEntityTypesResponse,
} from "./msdynmkt_PersonalizationGetEntityTypesMessage.js";
export {
  msdynmkt_PersonalizationGetEventsByNameRequest,
  type msdynmkt_PersonalizationGetEventsByNameRequestParameters,
  msdynmkt_PersonalizationGetEventsByNameResponse,
} from "./msdynmkt_PersonalizationGetEventsByNameMessage.js";
export {
  msdynmkt_PredefinedPlaceholderAddCountRequest,
  type msdynmkt_PredefinedPlaceholderAddCountRequestParameters,
  msdynmkt_PredefinedPlaceholderAddCountResponse,
} from "./msdynmkt_PredefinedPlaceholderAddCountMessage.js";
export {
  msdynmkt_purposecreationandassociationRequest,
  type msdynmkt_purposecreationandassociationRequestParameters,
  msdynmkt_purposecreationandassociationResponse,
} from "./msdynmkt_purposecreationandassociationMessage.js";
export {
  msdynmkt_removesuppressionlistentryRequest,
  type msdynmkt_removesuppressionlistentryRequestParameters,
  msdynmkt_removesuppressionlistentryResponse,
} from "./msdynmkt_removesuppressionlistentryMessage.js";
export {
  msdynmkt_RetrieveAllFeatureConfigurationsRequest,
  msdynmkt_RetrieveAllFeatureConfigurationsResponse,
} from "./msdynmkt_RetrieveAllFeatureConfigurationsMessage.js";
export {
  msdynmkt_RetrieveAnalyitcsAriaCountsRequest,
  type msdynmkt_RetrieveAnalyitcsAriaCountsRequestParameters,
  msdynmkt_RetrieveAnalyitcsAriaCountsResponse,
} from "./msdynmkt_RetrieveAnalyitcsAriaCountsMessage.js";
export {
  msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequest,
  type msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequestParameters,
  msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse,
} from "./msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryMessage.js";
export {
  msdynmkt_RetrieveServiceFeatureFlagsRequest,
  type msdynmkt_RetrieveServiceFeatureFlagsRequestParameters,
  msdynmkt_RetrieveServiceFeatureFlagsResponse,
} from "./msdynmkt_RetrieveServiceFeatureFlagsMessage.js";
export {
  msdynmkt_StartLoadConsentV4CustomActionRequest,
  type msdynmkt_StartLoadConsentV4CustomActionRequestParameters,
  msdynmkt_StartLoadConsentV4CustomActionResponse,
} from "./msdynmkt_StartLoadConsentV4CustomActionMessage.js";
export {
  msdynmkt_StartMigrationCustomActionRequest,
  type msdynmkt_StartMigrationCustomActionRequestParameters,
  msdynmkt_StartMigrationCustomActionResponse,
} from "./msdynmkt_StartMigrationCustomActionMessage.js";
export {
  msdynmkt_updategdprconfigurationRequest,
  type msdynmkt_updategdprconfigurationRequestParameters,
  msdynmkt_updategdprconfigurationResponse,
} from "./msdynmkt_updategdprconfigurationMessage.js";
export {
  msdynmkt_ValidatePlaceholdersRequest,
  type msdynmkt_ValidatePlaceholdersRequestParameters,
  msdynmkt_ValidatePlaceholdersResponse,
} from "./msdynmkt_ValidatePlaceholdersMessage.js";
export {
  msdynmkt_ValueWidgetDataCustomActionRequest,
  type msdynmkt_ValueWidgetDataCustomActionRequestParameters,
  msdynmkt_ValueWidgetDataCustomActionResponse,
} from "./msdynmkt_ValueWidgetDataCustomActionMessage.js";
export {
  msft_DataEngineIndexMgmt_CreateIndexRequest,
  type msft_DataEngineIndexMgmt_CreateIndexRequestParameters,
  msft_DataEngineIndexMgmt_CreateIndexResponse,
} from "./msft_DataEngineIndexMgmt_CreateIndexMessage.js";
export {
  msft_GetSecHubFeatureDataRequest,
  msft_GetSecHubFeatureDataResponse,
} from "./msft_GetSecHubFeatureDataMessage.js";
export {
  msft_LabelAttributeMappingRequest,
  type msft_LabelAttributeMappingRequestParameters,
  msft_LabelAttributeMappingResponse,
} from "./msft_LabelAttributeMappingMessage.js";
export {
  NotifyEnvironmentVariableSecretChangeRequest,
  type NotifyEnvironmentVariableSecretChangeRequestParameters,
  NotifyEnvironmentVariableSecretChangeResponse,
} from "./NotifyEnvironmentVariableSecretChangeMessage.js";
export {
  OnBackgroundOperationCompleteRequest,
  type OnBackgroundOperationCompleteRequestParameters,
  OnBackgroundOperationCompleteResponse,
} from "./OnBackgroundOperationCompleteMessage.js";
export {
  OnExternalCreatedRequest,
  type OnExternalCreatedRequestParameters,
  OnExternalCreatedResponse,
} from "./OnExternalCreatedMessage.js";
export {
  OnExternalDeletedRequest,
  type OnExternalDeletedRequestParameters,
  OnExternalDeletedResponse,
} from "./OnExternalDeletedMessage.js";
export {
  OnExternalUpdatedRequest,
  type OnExternalUpdatedRequestParameters,
  OnExternalUpdatedResponse,
} from "./OnExternalUpdatedMessage.js";
export {
  OrderOptionRequest,
  type OrderOptionRequestParameters,
  OrderOptionResponse,
} from "./OrderOptionMessage.js";
export { ParseImportRequest, ParseImportResponse } from "./ParseImportMessage.js";
export {
  pbi_CloneAndAddPowerBIDatasetRequest,
  type pbi_CloneAndAddPowerBIDatasetRequestParameters,
  pbi_CloneAndAddPowerBIDatasetResponse,
} from "./pbi_CloneAndAddPowerBIDatasetMessage.js";
export {
  pbi_CloneAndAddPowerBIReportRequest,
  type pbi_CloneAndAddPowerBIReportRequestParameters,
  pbi_CloneAndAddPowerBIReportResponse,
} from "./pbi_CloneAndAddPowerBIReportMessage.js";
export {
  PBIAutoRefreshDatasetRequest,
  type PBIAutoRefreshDatasetRequestParameters,
  PBIAutoRefreshDatasetResponse,
} from "./PBIAutoRefreshDatasetMessage.js";
export {
  PickFromQueueRequest,
  type PickFromQueueRequestParameters,
  PickFromQueueResponse,
} from "./PickFromQueueMessage.js";
export {
  pm_CreateProcessRequest,
  type pm_CreateProcessRequestParameters,
  pm_CreateProcessResponse,
} from "./pm_CreateProcessMessage.js";
export {
  pm_RefreshProcessMiningLicensingCapacityRequest,
  pm_RefreshProcessMiningLicensingCapacityResponse,
} from "./pm_RefreshProcessMiningLicensingCapacityMessage.js";
export {
  PowerAutomateProxyRequest,
  type PowerAutomateProxyRequestParameters,
  PowerAutomateProxyResponse,
} from "./PowerAutomateProxyMessage.js";
export {
  PredictRequest,
  type PredictRequestParameters,
  PredictResponse,
} from "./PredictMessage.js";
export {
  PredictByReferenceRequest,
  type PredictByReferenceRequestParameters,
  PredictByReferenceResponse,
} from "./PredictByReferenceMessage.js";
export {
  PredictionSchemaRequest,
  type PredictionSchemaRequestParameters,
  PredictionSchemaResponse,
} from "./PredictionSchemaMessage.js";
export {
  PreValidateGitComponentsRequest,
  type PreValidateGitComponentsRequestParameters,
  PreValidateGitComponentsResponse,
} from "./PreValidateGitComponentsMessage.js";
export {
  ProcessInboundEmailRequest,
  ProcessInboundEmailResponse,
} from "./ProcessInboundEmailMessage.js";
export {
  PropagateByExpressionRequest,
  type PropagateByExpressionRequestParameters,
  PropagateByExpressionResponse,
} from "./PropagateByExpressionMessage.js";
export {
  ProvisionDelegationRequest,
  type ProvisionDelegationRequestParameters,
  ProvisionDelegationResponse,
} from "./ProvisionDelegationMessage.js";
export {
  ProvisionLanguageRequest,
  type ProvisionLanguageRequestParameters,
  ProvisionLanguageResponse,
} from "./ProvisionLanguageMessage.js";
export {
  ProvisionLanguageAsyncRequest,
  type ProvisionLanguageAsyncRequestParameters,
  ProvisionLanguageAsyncResponse,
} from "./ProvisionLanguageAsyncMessage.js";
export {
  PublishAIConfigurationRequest,
  type PublishAIConfigurationRequestParameters,
  PublishAIConfigurationResponse,
} from "./PublishAIConfigurationMessage.js";
export { PublishAllXmlRequest, PublishAllXmlResponse } from "./PublishAllXmlMessage.js";
export {
  PublishAllXmlAsyncRequest,
  PublishAllXmlAsyncResponse,
} from "./PublishAllXmlAsyncMessage.js";
export {
  PublishDuplicateRuleRequest,
  PublishDuplicateRuleResponse,
} from "./PublishDuplicateRuleMessage.js";
export {
  PublishProductHierarchyRequest,
  PublishProductHierarchyResponse,
} from "./PublishProductHierarchyMessage.js";
export { PublishThemeRequest, PublishThemeResponse } from "./PublishThemeMessage.js";
export {
  PublishXmlRequest,
  type PublishXmlRequestParameters,
  PublishXmlResponse,
} from "./PublishXmlMessage.js";
export {
  PullChangesFromGitRequest,
  type PullChangesFromGitRequestParameters,
  PullChangesFromGitResponse,
} from "./PullChangesFromGitMessage.js";
export {
  PurgeRetainedContentRequest,
  type PurgeRetainedContentRequestParameters,
  PurgeRetainedContentResponse,
} from "./PurgeRetainedContentMessage.js";
export {
  PvaAuthorizeRequest,
  type PvaAuthorizeRequestParameters,
  PvaAuthorizeResponse,
} from "./PvaAuthorizeMessage.js";
export {
  PvaComponentCollectionAuthorizeRequest,
  type PvaComponentCollectionAuthorizeRequestParameters,
  PvaComponentCollectionAuthorizeResponse,
} from "./PvaComponentCollectionAuthorizeMessage.js";
export {
  PvaCreateBotComponentsRequest,
  type PvaCreateBotComponentsRequestParameters,
  PvaCreateBotComponentsResponse,
} from "./PvaCreateBotComponentsMessage.js";
export {
  PvaCreateContentSnapshotRequest,
  PvaCreateContentSnapshotResponse,
} from "./PvaCreateContentSnapshotMessage.js";
export { PvaDeleteBotRequest, PvaDeleteBotResponse } from "./PvaDeleteBotMessage.js";
export {
  PvaDeleteBotComponentCollectionRequest,
  PvaDeleteBotComponentCollectionResponse,
} from "./PvaDeleteBotComponentCollectionMessage.js";
export {
  PvaGetDirectLineEndpointRequest,
  PvaGetDirectLineEndpointResponse,
} from "./PvaGetDirectLineEndpointMessage.js";
export {
  PvaGetFeatureControlSetRequest,
  PvaGetFeatureControlSetResponse,
} from "./PvaGetFeatureControlSetMessage.js";
export {
  PvaGetMaxDatabaseVersionRequest,
  PvaGetMaxDatabaseVersionResponse,
} from "./PvaGetMaxDatabaseVersionMessage.js";
export {
  PvaGetUserBotsRequest,
  type PvaGetUserBotsRequestParameters,
  PvaGetUserBotsResponse,
} from "./PvaGetUserBotsMessage.js";
export { PvaProvisionRequest, PvaProvisionResponse } from "./PvaProvisionMessage.js";
export { PvaPublishRequest, PvaPublishResponse } from "./PvaPublishMessage.js";
export {
  PvaPublishStatusRequest,
  type PvaPublishStatusRequestParameters,
  PvaPublishStatusResponse,
} from "./PvaPublishStatusMessage.js";
export {
  PvaShareConnectionRequest,
  PvaShareConnectionResponse,
} from "./PvaShareConnectionMessage.js";
export {
  PvaStartConversationRequest,
  type PvaStartConversationRequestParameters,
  PvaStartConversationResponse,
} from "./PvaStartConversationMessage.js";
export {
  QualifyLeadRequest,
  type QualifyLeadRequestParameters,
  QualifyLeadResponse,
} from "./QualifyLeadMessage.js";
export {
  QualifyMemberListRequest,
  type QualifyMemberListRequestParameters,
  QualifyMemberListResponse,
} from "./QualifyMemberListMessage.js";
export {
  QueryDvUnstructuredDataRequest,
  type QueryDvUnstructuredDataRequestParameters,
  QueryDvUnstructuredDataResponse,
} from "./QueryDvUnstructuredDataMessage.js";
export {
  QueryExpressionToFetchXmlRequest,
  type QueryExpressionToFetchXmlRequestParameters,
  QueryExpressionToFetchXmlResponse,
} from "./QueryExpressionToFetchXmlMessage.js";
export {
  QuerySalesforceUnstructuredDataRequest,
  type QuerySalesforceUnstructuredDataRequestParameters,
  QuerySalesforceUnstructuredDataResponse,
} from "./QuerySalesforceUnstructuredDataMessage.js";
export {
  querystructureddatastreamRequest,
  type querystructureddatastreamRequestParameters,
  querystructureddatastreamResponse,
} from "./querystructureddatastreamMessage.js";
export {
  QueryZendeskUnstructuredArticlesRequest,
  type QueryZendeskUnstructuredArticlesRequestParameters,
  QueryZendeskUnstructuredArticlesResponse,
} from "./QueryZendeskUnstructuredArticlesMessage.js";
export {
  QuestionAnalyticsRequest,
  type QuestionAnalyticsRequestParameters,
  QuestionAnalyticsResponse,
} from "./QuestionAnalyticsMessage.js";
export {
  QueueUpdateRibbonClientMetadataRequest,
  QueueUpdateRibbonClientMetadataResponse,
} from "./QueueUpdateRibbonClientMetadataMessage.js";
export {
  QuickTestRequest,
  type QuickTestRequestParameters,
  QuickTestResponse,
} from "./QuickTestMessage.js";
export {
  ReactivateEntityKeyRequest,
  type ReactivateEntityKeyRequestParameters,
  ReactivateEntityKeyResponse,
} from "./ReactivateEntityKeyMessage.js";
export {
  ReassignObjectsOwnerRequest,
  type ReassignObjectsOwnerRequestParameters,
  ReassignObjectsOwnerResponse,
} from "./ReassignObjectsOwnerMessage.js";
export {
  ReassignObjectsSystemUserRequest,
  type ReassignObjectsSystemUserRequestParameters,
  ReassignObjectsSystemUserResponse,
} from "./ReassignObjectsSystemUserMessage.js";
export { RecalculateRequest, RecalculateResponse } from "./RecalculateMessage.js";
export {
  RecalculatePriceRequest,
  type RecalculatePriceRequestParameters,
  RecalculatePriceResponse,
} from "./RecalculatePriceMessage.js";
export {
  RecognizeTextRequest,
  type RecognizeTextRequestParameters,
  RecognizeTextResponse,
} from "./RecognizeTextMessage.js";
export {
  RefreshChangesFromGitRequest,
  type RefreshChangesFromGitRequestParameters,
  RefreshChangesFromGitResponse,
} from "./RefreshChangesFromGitMessage.js";
export {
  RefreshRpaLicensingCapacityRequest,
  RefreshRpaLicensingCapacityResponse,
} from "./RefreshRpaLicensingCapacityMessage.js";
export {
  RegisterFlowMachineRequest,
  type RegisterFlowMachineRequestParameters,
  RegisterFlowMachineResponse,
} from "./RegisterFlowMachineMessage.js";
export { ReleaseToQueueRequest, ReleaseToQueueResponse } from "./ReleaseToQueueMessage.js";
export {
  RemoveActiveCustomizationRequest,
  type RemoveActiveCustomizationRequestParameters,
  RemoveActiveCustomizationResponse,
} from "./RemoveActiveCustomizationMessage.js";
export {
  RemoveAppComponentsRequest,
  type RemoveAppComponentsRequestParameters,
  RemoveAppComponentsResponse,
} from "./RemoveAppComponentsMessage.js";
export {
  RemoveCertificateCredentialRequest,
  type RemoveCertificateCredentialRequestParameters,
  RemoveCertificateCredentialResponse,
} from "./RemoveCertificateCredentialMessage.js";
export { RemoveFromQueueRequest, RemoveFromQueueResponse } from "./RemoveFromQueueMessage.js";
export {
  RemoveItemCampaignRequest,
  type RemoveItemCampaignRequestParameters,
  RemoveItemCampaignResponse,
} from "./RemoveItemCampaignMessage.js";
export {
  RemoveItemCampaignActivityRequest,
  type RemoveItemCampaignActivityRequestParameters,
  RemoveItemCampaignActivityResponse,
} from "./RemoveItemCampaignActivityMessage.js";
export {
  RemoveListMembersListRequest,
  type RemoveListMembersListRequestParameters,
  RemoveListMembersListResponse,
} from "./RemoveListMembersListMessage.js";
export {
  RemoveMemberListRequest,
  type RemoveMemberListRequestParameters,
  RemoveMemberListResponse,
} from "./RemoveMemberListMessage.js";
export {
  RemoveMembersTeamRequest,
  type RemoveMembersTeamRequestParameters,
  RemoveMembersTeamResponse,
} from "./RemoveMembersTeamMessage.js";
export {
  RemoveParentRequest,
  type RemoveParentRequestParameters,
  RemoveParentResponse,
} from "./RemoveParentMessage.js";
export {
  RemovePrivilegeRoleRequest,
  type RemovePrivilegeRoleRequestParameters,
  RemovePrivilegeRoleResponse,
} from "./RemovePrivilegeRoleMessage.js";
export {
  RemoveSolutionComponentRequest,
  type RemoveSolutionComponentRequestParameters,
  RemoveSolutionComponentResponse,
} from "./RemoveSolutionComponentMessage.js";
export {
  RemoveUserFromRecordTeamRequest,
  type RemoveUserFromRecordTeamRequestParameters,
  RemoveUserFromRecordTeamResponse,
} from "./RemoveUserFromRecordTeamMessage.js";
export {
  RenewContractRequest,
  type RenewContractRequestParameters,
  RenewContractResponse,
} from "./RenewContractMessage.js";
export {
  RenewEntitlementRequest,
  type RenewEntitlementRequestParameters,
  RenewEntitlementResponse,
} from "./RenewEntitlementMessage.js";
export {
  ReplacePrivilegesRoleRequest,
  type ReplacePrivilegesRoleRequestParameters,
  ReplacePrivilegesRoleResponse,
} from "./ReplacePrivilegesRoleMessage.js";
export {
  RescheduleRequest,
  type RescheduleRequestParameters,
  RescheduleResponse,
} from "./RescheduleMessage.js";
export {
  ResetUserFiltersRequest,
  type ResetUserFiltersRequestParameters,
  ResetUserFiltersResponse,
} from "./ResetUserFiltersMessage.js";
export {
  RestartHostedMachineRequest,
  RestartHostedMachineResponse,
} from "./RestartHostedMachineMessage.js";
export {
  RestoreRequest,
  type RestoreRequestParameters,
  RestoreResponse,
} from "./RestoreMessage.js";
export { RetainRequest, type RetainRequestParameters, RetainResponse } from "./RetainMessage.js";
export {
  RetrieveAppsWithDelegatedAccessPermissionsRequest,
  type RetrieveAppsWithDelegatedAccessPermissionsRequestParameters,
  RetrieveAppsWithDelegatedAccessPermissionsResponse,
} from "./RetrieveAppsWithDelegatedAccessPermissionsMessage.js";
export {
  RetrieveBoolFeatureControlSettingRequest,
  type RetrieveBoolFeatureControlSettingRequestParameters,
  RetrieveBoolFeatureControlSettingResponse,
} from "./RetrieveBoolFeatureControlSettingMessage.js";
export {
  RetrieveConnectorActionsRequest,
  type RetrieveConnectorActionsRequestParameters,
  RetrieveConnectorActionsResponse,
} from "./RetrieveConnectorActionsMessage.js";
export {
  RetrieveConnectorSettingsRequest,
  RetrieveConnectorSettingsResponse,
} from "./RetrieveConnectorSettingsMessage.js";
export {
  RetrieveEnvironmentVariableSecretValueRequest,
  type RetrieveEnvironmentVariableSecretValueRequestParameters,
  RetrieveEnvironmentVariableSecretValueResponse,
} from "./RetrieveEnvironmentVariableSecretValueMessage.js";
export {
  RetrieveFeatureControlSettingRequest,
  type RetrieveFeatureControlSettingRequestParameters,
  RetrieveFeatureControlSettingResponse,
} from "./RetrieveFeatureControlSettingMessage.js";
export {
  RetrieveFeatureControlSettingsRequest,
  type RetrieveFeatureControlSettingsRequestParameters,
  RetrieveFeatureControlSettingsResponse,
} from "./RetrieveFeatureControlSettingsMessage.js";
export {
  RetrieveFeatureControlSettingsByNamespaceRequest,
  type RetrieveFeatureControlSettingsByNamespaceRequestParameters,
  RetrieveFeatureControlSettingsByNamespaceResponse,
} from "./RetrieveFeatureControlSettingsByNamespaceMessage.js";
export {
  RetrieveFeatureControlStringSettingsRequest,
  RetrieveFeatureControlStringSettingsResponse,
} from "./RetrieveFeatureControlStringSettingsMessage.js";
export {
  RetrieveFeatureControlStringSettingsForNamespaceRequest,
  type RetrieveFeatureControlStringSettingsForNamespaceRequestParameters,
  RetrieveFeatureControlStringSettingsForNamespaceResponse,
} from "./RetrieveFeatureControlStringSettingsForNamespaceMessage.js";
export {
  RetrieveFlowUpdatesRequest,
  type RetrieveFlowUpdatesRequestParameters,
  RetrieveFlowUpdatesResponse,
} from "./RetrieveFlowUpdatesMessage.js";
export {
  RetrievePowerAppsConnectionsRequest,
  RetrievePowerAppsConnectionsResponse,
} from "./RetrievePowerAppsConnectionsMessage.js";
export {
  RetrievePowerAppsConnectorApisRequest,
  RetrievePowerAppsConnectorApisResponse,
} from "./RetrievePowerAppsConnectorApisMessage.js";
export {
  RevertProductRequest,
  type RevertProductRequestParameters,
  RevertProductResponse,
} from "./RevertProductMessage.js";
export {
  ReviseQuoteRequest,
  type ReviseQuoteRequestParameters,
  ReviseQuoteResponse,
} from "./ReviseQuoteMessage.js";
export {
  RevokeAccessRequest,
  type RevokeAccessRequestParameters,
  RevokeAccessResponse,
} from "./RevokeAccessMessage.js";
export {
  RevokeSharedLinkRequest,
  type RevokeSharedLinkRequestParameters,
  RevokeSharedLinkResponse,
} from "./RevokeSharedLinkMessage.js";
export {
  RollbackRetainRequest,
  type RollbackRetainRequestParameters,
  RollbackRetainResponse,
} from "./RollbackRetainMessage.js";
export { RotateGroupKeyRequest, RotateGroupKeyResponse } from "./RotateGroupKeyMessage.js";
export {
  RouteToRequest,
  type RouteToRequestParameters,
  RouteToResponse,
} from "./RouteToMessage.js";
export {
  RunDataProcessingModuleRequest,
  type RunDataProcessingModuleRequestParameters,
  RunDataProcessingModuleResponse,
} from "./RunDataProcessingModuleMessage.js";
export {
  RunDesktopFlowRequest,
  type RunDesktopFlowRequestParameters,
  RunDesktopFlowResponse,
} from "./RunDesktopFlowMessage.js";
export {
  SaveAsDesktopFlowRequest,
  type SaveAsDesktopFlowRequestParameters,
  SaveAsDesktopFlowResponse,
} from "./SaveAsDesktopFlowMessage.js";
export {
  SaveAsDesktopFlowModuleRequest,
  type SaveAsDesktopFlowModuleRequestParameters,
  SaveAsDesktopFlowModuleResponse,
} from "./SaveAsDesktopFlowModuleMessage.js";
export {
  SaveSettingValueRequest,
  type SaveSettingValueRequestParameters,
  SaveSettingValueResponse,
} from "./SaveSettingValueMessage.js";
export {
  SchedulePredictionRequest,
  type SchedulePredictionRequestParameters,
  SchedulePredictionResponse,
} from "./SchedulePredictionMessage.js";
export {
  ScheduleRetrainRequest,
  type ScheduleRetrainRequestParameters,
  ScheduleRetrainResponse,
} from "./ScheduleRetrainMessage.js";
export {
  ScheduleTrainingRequest,
  type ScheduleTrainingRequestParameters,
  ScheduleTrainingResponse,
} from "./ScheduleTrainingMessage.js";
export {
  searchautocompleteRequest,
  type searchautocompleteRequestParameters,
  searchautocompleteResponse,
} from "./searchautocompleteMessage.js";
export {
  searchqueryRequest,
  type searchqueryRequestParameters,
  searchqueryResponse,
} from "./searchqueryMessage.js";
export {
  searchsuggestRequest,
  type searchsuggestRequestParameters,
  searchsuggestResponse,
} from "./searchsuggestMessage.js";
export {
  SearchWebRequest,
  type SearchWebRequestParameters,
  SearchWebResponse,
} from "./SearchWebMessage.js";
export {
  SendAppNotificationRequest,
  type SendAppNotificationRequestParameters,
  SendAppNotificationResponse,
} from "./SendAppNotificationMessage.js";
export {
  SendBulkMailRequest,
  type SendBulkMailRequestParameters,
  SendBulkMailResponse,
} from "./SendBulkMailMessage.js";
export {
  SendEmailRequest,
  type SendEmailRequestParameters,
  SendEmailResponse,
} from "./SendEmailMessage.js";
export {
  SendEmailFromTemplateRequest,
  type SendEmailFromTemplateRequestParameters,
  SendEmailFromTemplateResponse,
} from "./SendEmailFromTemplateMessage.js";
export {
  SendFaxRequest,
  type SendFaxRequestParameters,
  SendFaxResponse,
} from "./SendFaxMessage.js";
export {
  SendTemplateRequest,
  type SendTemplateRequestParameters,
  SendTemplateResponse,
} from "./SendTemplateMessage.js";
export {
  SetAutoNumberSeedRequest,
  type SetAutoNumberSeedRequestParameters,
  SetAutoNumberSeedResponse,
} from "./SetAutoNumberSeedMessage.js";
export {
  SetBusinessEquipmentRequest,
  type SetBusinessEquipmentRequestParameters,
  SetBusinessEquipmentResponse,
} from "./SetBusinessEquipmentMessage.js";
export {
  SetBusinessSystemUserRequest,
  type SetBusinessSystemUserRequestParameters,
  SetBusinessSystemUserResponse,
} from "./SetBusinessSystemUserMessage.js";
export {
  SetDataEncryptionKeyRequest,
  type SetDataEncryptionKeyRequestParameters,
  SetDataEncryptionKeyResponse,
} from "./SetDataEncryptionKeyMessage.js";
export {
  SetFeatureStatusRequest,
  type SetFeatureStatusRequestParameters,
  SetFeatureStatusResponse,
} from "./SetFeatureStatusMessage.js";
export {
  SetLocLabelsRequest,
  type SetLocLabelsRequestParameters,
  SetLocLabelsResponse,
} from "./SetLocLabelsMessage.js";
export {
  SetParentSystemUserRequest,
  type SetParentSystemUserRequestParameters,
  SetParentSystemUserResponse,
} from "./SetParentSystemUserMessage.js";
export {
  SetParentTeamRequest,
  type SetParentTeamRequestParameters,
  SetParentTeamResponse,
} from "./SetParentTeamMessage.js";
export {
  SetPreferredSolutionRequest,
  type SetPreferredSolutionRequestParameters,
  SetPreferredSolutionResponse,
} from "./SetPreferredSolutionMessage.js";
export {
  SetProcessRequest,
  type SetProcessRequestParameters,
  SetProcessResponse,
} from "./SetProcessMessage.js";
export {
  SetReportRelatedRequest,
  type SetReportRelatedRequestParameters,
  SetReportRelatedResponse,
} from "./SetReportRelatedMessage.js";
export {
  SetupAiConnectionRequest,
  type SetupAiConnectionRequestParameters,
  SetupAiConnectionResponse,
} from "./SetupAiConnectionMessage.js";
export { ShareRequest, type ShareRequestParameters, ShareResponse } from "./ShareMessage.js";
export {
  SnapshotDatasourceRequest,
  type SnapshotDatasourceRequestParameters,
  SnapshotDatasourceResponse,
} from "./SnapshotDatasourceMessage.js";
export {
  StageAndUpgradeRequest,
  type StageAndUpgradeRequestParameters,
  StageAndUpgradeResponse,
} from "./StageAndUpgradeMessage.js";
export {
  StageAndUpgradeAsyncRequest,
  type StageAndUpgradeAsyncRequestParameters,
  StageAndUpgradeAsyncResponse,
} from "./StageAndUpgradeAsyncMessage.js";
export {
  StageSolutionRequest,
  type StageSolutionRequestParameters,
  StageSolutionResponse,
} from "./StageSolutionMessage.js";
export {
  SubstituteForAttributeRequest,
  type SubstituteForAttributeRequestParameters,
  SubstituteForAttributeResponse,
} from "./SubstituteForAttributeMessage.js";
export {
  SubstituteForComponentRequest,
  type SubstituteForComponentRequestParameters,
  SubstituteForComponentResponse,
} from "./SubstituteForComponentMessage.js";
export {
  SummarizeRecordRequest,
  type SummarizeRecordRequestParameters,
  SummarizeRecordResponse,
} from "./SummarizeRecordMessage.js";
export {
  SyncBulkOperationRequest,
  type SyncBulkOperationRequestParameters,
  SyncBulkOperationResponse,
} from "./SyncBulkOperationMessage.js";
export {
  SyncCopresenceStateRequest,
  type SyncCopresenceStateRequestParameters,
  SyncCopresenceStateResponse,
} from "./SyncCopresenceStateMessage.js";
export {
  SyncGroupMembersToTeamRequest,
  SyncGroupMembersToTeamResponse,
} from "./SyncGroupMembersToTeamMessage.js";
export { TrainRequest, type TrainRequestParameters, TrainResponse } from "./TrainMessage.js";
export {
  TransformImportRequest,
  type TransformImportRequestParameters,
  TransformImportResponse,
} from "./TransformImportMessage.js";
export {
  TriggerDesktopFlowRunCallbackRequest,
  TriggerDesktopFlowRunCallbackResponse,
} from "./TriggerDesktopFlowRunCallbackMessage.js";
export {
  TriggerServiceEndpointCheckRequest,
  TriggerServiceEndpointCheckResponse,
} from "./TriggerServiceEndpointCheckMessage.js";
export {
  UninstallSampleDataRequest,
  UninstallSampleDataResponse,
} from "./UninstallSampleDataMessage.js";
export {
  UninstallSolutionRequest,
  type UninstallSolutionRequestParameters,
  UninstallSolutionResponse,
} from "./UninstallSolutionMessage.js";
export {
  UninstallSolutionAsyncRequest,
  type UninstallSolutionAsyncRequestParameters,
  UninstallSolutionAsyncResponse,
} from "./UninstallSolutionAsyncMessage.js";
export {
  UnlockInvoicePricingRequest,
  type UnlockInvoicePricingRequestParameters,
  UnlockInvoicePricingResponse,
} from "./UnlockInvoicePricingMessage.js";
export {
  UnlockSalesOrderPricingRequest,
  type UnlockSalesOrderPricingRequestParameters,
  UnlockSalesOrderPricingResponse,
} from "./UnlockSalesOrderPricingMessage.js";
export {
  UnpublishAIConfigurationRequest,
  type UnpublishAIConfigurationRequestParameters,
  UnpublishAIConfigurationResponse,
} from "./UnpublishAIConfigurationMessage.js";
export {
  UnpublishDuplicateRuleRequest,
  type UnpublishDuplicateRuleRequestParameters,
  UnpublishDuplicateRuleResponse,
} from "./UnpublishDuplicateRuleMessage.js";
export {
  UnschedulePredictionRequest,
  type UnschedulePredictionRequestParameters,
  UnschedulePredictionResponse,
} from "./UnschedulePredictionMessage.js";
export {
  UnscheduleTrainingRequest,
  type UnscheduleTrainingRequestParameters,
  UnscheduleTrainingResponse,
} from "./UnscheduleTrainingMessage.js";
export {
  UpdateAccountCredentialsRequest,
  type UpdateAccountCredentialsRequestParameters,
  UpdateAccountCredentialsResponse,
} from "./UpdateAccountCredentialsMessage.js";
export {
  UpdateAutomatedPluginRequest,
  type UpdateAutomatedPluginRequestParameters,
  UpdateAutomatedPluginResponse,
} from "./UpdateAutomatedPluginMessage.js";
export {
  UpdateFeatureConfigRequest,
  type UpdateFeatureConfigRequestParameters,
  UpdateFeatureConfigResponse,
} from "./UpdateFeatureConfigMessage.js";
export {
  UpdateFlowMachineNetworkRequest,
  type UpdateFlowMachineNetworkRequestParameters,
  UpdateFlowMachineNetworkResponse,
} from "./UpdateFlowMachineNetworkMessage.js";
export {
  UpdateInstantPluginRequest,
  type UpdateInstantPluginRequestParameters,
  UpdateInstantPluginResponse,
} from "./UpdateInstantPluginMessage.js";
export {
  UpdateMultipleRequest,
  type UpdateMultipleRequestParameters,
  UpdateMultipleResponse,
} from "./UpdateMultipleMessage.js";
export {
  UpdateOptionValueRequest,
  type UpdateOptionValueRequestParameters,
  UpdateOptionValueResponse,
} from "./UpdateOptionValueMessage.js";
export {
  UpdateProductPropertiesRequest,
  type UpdateProductPropertiesRequestParameters,
  UpdateProductPropertiesResponse,
} from "./UpdateProductPropertiesMessage.js";
export {
  UpdateRibbonClientMetadataRequest,
  UpdateRibbonClientMetadataResponse,
} from "./UpdateRibbonClientMetadataMessage.js";
export {
  UpdateSolutionComponentRequest,
  type UpdateSolutionComponentRequestParameters,
  UpdateSolutionComponentResponse,
} from "./UpdateSolutionComponentMessage.js";
export {
  UpdateStateValueRequest,
  type UpdateStateValueRequestParameters,
  UpdateStateValueResponse,
} from "./UpdateStateValueMessage.js";
export {
  UploadBlockRequest,
  type UploadBlockRequestParameters,
  UploadBlockResponse,
} from "./UploadBlockMessage.js";
export {
  UpsertCompositeDataSourceRequest,
  type UpsertCompositeDataSourceRequestParameters,
  UpsertCompositeDataSourceResponse,
} from "./UpsertCompositeDataSourceMessage.js";
export {
  UpsertEnvironmentVariableRequest,
  type UpsertEnvironmentVariableRequestParameters,
  UpsertEnvironmentVariableResponse,
} from "./UpsertEnvironmentVariableMessage.js";
export {
  UpsertMultipleRequest,
  type UpsertMultipleRequestParameters,
  UpsertMultipleResponse,
} from "./UpsertMultipleMessage.js";
export {
  ValidateRequest,
  type ValidateRequestParameters,
  ValidateResponse,
} from "./ValidateMessage.js";
export {
  ValidateAIConfigurationRequest,
  type ValidateAIConfigurationRequestParameters,
  ValidateAIConfigurationResponse,
} from "./ValidateAIConfigurationMessage.js";
export {
  ValidateRetentionConfigRequest,
  type ValidateRetentionConfigRequestParameters,
  ValidateRetentionConfigResponse,
} from "./ValidateRetentionConfigMessage.js";
export {
  ValidateSavedQueryRequest,
  type ValidateSavedQueryRequestParameters,
  ValidateSavedQueryResponse,
} from "./ValidateSavedQueryMessage.js";
export {
  ValidateUnpublishedRequest,
  type ValidateUnpublishedRequestParameters,
  ValidateUnpublishedResponse,
} from "./ValidateUnpublishedMessage.js";
export {
  WinOpportunityRequest,
  type WinOpportunityRequestParameters,
  WinOpportunityResponse,
} from "./WinOpportunityMessage.js";
export {
  WinQuoteRequest,
  type WinQuoteRequestParameters,
  WinQuoteResponse,
} from "./WinQuoteMessage.js";

// Enums
export {
  AccessRights,
  AssociatedMenuBehavior,
  AssociatedMenuGroup,
  AttributeRequiredLevel,
  AttributeTypeCode,
  BusinessNotificationParameterType,
  BusinessNotificationSeverity,
  CascadeType,
  ChannelAccessProfilePrivilegeDepth,
  ConditionOperator,
  DateTimeFormat,
  DeletedMetadataFilters,
  DependencyDepth,
  EndpointAccessType,
  EndpointType,
  EntityClusterMode,
  EntityFilters,
  EntityKeyIndexStatus,
  ErrorType,
  ImeMode,
  ImportDecision,
  IntegerFormat,
  JoinOperator,
  LayerDesiredOrderType,
  LogicalOperator,
  LookupFormat,
  ManagedPropertyEvaluationPriority,
  ManagedPropertyOperation,
  ManagedPropertyType,
  MetadataConditionOperator,
  MissingPackageResolutionAction,
  OptionSetType,
  OrderType,
  OrganizationState,
  OrganizationType,
  OwnershipTypes,
  PresentInOrg,
  PrivilegeDepth,
  PrivilegeType,
  PropagationOwnershipOptions,
  ProvisionLanguageForUserStatusType,
  RecentlyViewedRecordType,
  RelationshipType,
  ResultCode,
  RibbonLocationFilters,
  RollupType,
  SearchDirection,
  SecurityTypes,
  ShareAccessRights,
  SolutionOperationStatus,
  SolutionOperationType,
  SolutionValidationResultType,
  StageSolutionStatus,
  StringFormat,
  SubCode,
  SubstitutionStatus,
  TargetFieldType,
  TimeCode,
  ValidateSolutionStatus,
  XrmAggregateType,
  XrmDateTimeGrouping,
} from "./types/index.js";
