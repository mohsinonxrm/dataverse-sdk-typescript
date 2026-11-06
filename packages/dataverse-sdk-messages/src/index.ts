/**
 * Web API Action Messages
 *
 * Auto-generated TypeScript wrappers for Dataverse Web API actions.
 * Use with IOrganizationService.execute() for C#-familiar patterns.
 */

// Base classes and types
export { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
export type { EntityReference, EntityReferenceOptions } from "./EntityReference.js";
export { createEntityReference } from "./EntityReference.js";
export type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
export type { MessageRequest, MessageResponse } from "./types.js";

// Message classes
export {
  _CloneRoutingRuleSetRequest,
  _CloneRoutingRuleSetResponse,
} from "./_CloneRoutingRuleSetMessage.js";
export {
  _DownloademailasattachmentRequest,
  _DownloademailasattachmentResponse,
} from "./_DownloademailasattachmentMessage.js";
export {
  _EvaluateRuleAndRouteRequest,
  _EvaluateRuleAndRouteResponse,
} from "./_EvaluateRuleAndRouteMessage.js";
export {
  _EvaluateSearchRequestRequest,
  _EvaluateSearchRequestResponse,
} from "./_EvaluateSearchRequestMessage.js";
export {
  _GetServiceTreeDataRequest,
  _GetServiceTreeDataResponse,
} from "./_GetServiceTreeDataMessage.js";
export {
  _InvokeHideReserveEntitiesRequest,
  _InvokeHideReserveEntitiesResponse,
} from "./_InvokeHideReserveEntitiesMessage.js";
export {
  _MoveRoutingRuleItemAtRequest,
  _MoveRoutingRuleItemAtResponse,
} from "./_MoveRoutingRuleItemAtMessage.js";
export {
  _RemoveMarketingListMembersByIdsRequest,
  _RemoveMarketingListMembersByIdsResponse,
} from "./_RemoveMarketingListMembersByIdsMessage.js";
export {
  _ResourcesAddUpdateActionRequest,
  _ResourcesAddUpdateActionResponse,
} from "./_ResourcesAddUpdateActionMessage.js";
export {
  _ResourcesRemoveUpdateActionRequest,
  _ResourcesRemoveUpdateActionResponse,
} from "./_ResourcesRemoveUpdateActionMessage.js";
export {
  _RetrieveActivitiesByResourcesRequest,
  _RetrieveActivitiesByResourcesResponse,
} from "./_RetrieveActivitiesByResourcesMessage.js";
export {
  _RoutingRuleSetValidationRequest,
  _RoutingRuleSetValidationResponse,
} from "./_RoutingRuleSetValidationMessage.js";
export {
  _SaveServiceTreeDataRequest,
  _SaveServiceTreeDataResponse,
} from "./_SaveServiceTreeDataMessage.js";
export {
  _ServiceCalendarActionRequest,
  _ServiceCalendarActionResponse,
} from "./_ServiceCalendarActionMessage.js";
export { _SkillToUserRequest, _SkillToUserResponse } from "./_SkillToUserMessage.js";
export {
  _SyncKnowledgeManagementSettingsRequest,
  _SyncKnowledgeManagementSettingsResponse,
} from "./_SyncKnowledgeManagementSettingsMessage.js";
export {
  _ValidateAndAllocateBusinessCardReaderCurrencyRequest,
  _ValidateAndAllocateBusinessCardReaderCurrencyResponse,
} from "./_ValidateAndAllocateBusinessCardReaderCurrencyMessage.js";
export { AddAppComponentsRequest, AddAppComponentsResponse } from "./AddAppComponentsMessage.js";
export {
  AddCertificateCredentialRequest,
  AddCertificateCredentialResponse,
} from "./AddCertificateCredentialMessage.js";
export {
  AddChannelAccessProfilePrivilegesRequest,
  AddChannelAccessProfilePrivilegesResponse,
} from "./AddChannelAccessProfilePrivilegesMessage.js";
export {
  AddComponentsToSolutionAsyncRequest,
  AddComponentsToSolutionAsyncResponse,
} from "./AddComponentsToSolutionAsyncMessage.js";
export {
  AddComponentToSolutionAsyncRequest,
  AddComponentToSolutionAsyncResponse,
} from "./AddComponentToSolutionAsyncMessage.js";
export { AddItemCampaignRequest, AddItemCampaignResponse } from "./AddItemCampaignMessage.js";
export {
  AddItemCampaignActivityRequest,
  AddItemCampaignActivityResponse,
} from "./AddItemCampaignActivityMessage.js";
export {
  AddListMembersListRequest,
  AddListMembersListResponse,
} from "./AddListMembersListMessage.js";
export { AddMemberListRequest, AddMemberListResponse } from "./AddMemberListMessage.js";
export {
  AddMembersBatchListRequest,
  AddMembersBatchListResponse,
} from "./AddMembersBatchListMessage.js";
export { AddMembersTeamRequest, AddMembersTeamResponse } from "./AddMembersTeamMessage.js";
export {
  AddPrincipalToQueueRequest,
  AddPrincipalToQueueResponse,
} from "./AddPrincipalToQueueMessage.js";
export { AddPrivilegesRoleRequest, AddPrivilegesRoleResponse } from "./AddPrivilegesRoleMessage.js";
export { AddRecurrenceRequest, AddRecurrenceResponse } from "./AddRecurrenceMessage.js";
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
  AddSolutionComponentResponse,
} from "./AddSolutionComponentMessage.js";
export { AddToFeedbackLoopRequest, AddToFeedbackLoopResponse } from "./AddToFeedbackLoopMessage.js";
export { AddToQueueRequest, AddToQueueResponse } from "./AddToQueueMessage.js";
export {
  AddUserToRecordTeamRequest,
  AddUserToRecordTeamResponse,
} from "./AddUserToRecordTeamMessage.js";
export {
  AddWorkQueueItemProcessingHistoryEntryRequest,
  AddWorkQueueItemProcessingHistoryEntryResponse,
} from "./AddWorkQueueItemProcessingHistoryEntryMessage.js";
export {
  adx_AzureBlobStorageEnabledRequest,
  adx_AzureBlobStorageEnabledResponse,
} from "./adx_AzureBlobStorageEnabledMessage.js";
export {
  adx_AzureBlobStorageUrlRequest,
  adx_AzureBlobStorageUrlResponse,
} from "./adx_AzureBlobStorageUrlMessage.js";
export {
  adx_GenerateSharedAccessSignatureRequest,
  adx_GenerateSharedAccessSignatureResponse,
} from "./adx_GenerateSharedAccessSignatureMessage.js";
export {
  adx_SendEmailConfirmationToContactRequest,
  adx_SendEmailConfirmationToContactResponse,
} from "./adx_SendEmailConfirmationToContactMessage.js";
export {
  adx_SendEmailTwoFactorCodeToContactRequest,
  adx_SendEmailTwoFactorCodeToContactResponse,
} from "./adx_SendEmailTwoFactorCodeToContactMessage.js";
export {
  adx_SendPasswordResetToContactRequest,
  adx_SendPasswordResetToContactResponse,
} from "./adx_SendPasswordResetToContactMessage.js";
export { AIClassifyRequest, AIClassifyResponse } from "./AIClassifyMessage.js";
export { AIExtractRequest, AIExtractResponse } from "./AIExtractMessage.js";
export { AIModelPublishRequest, AIModelPublishResponse } from "./AIModelPublishMessage.js";
export { AIReplyRequest, AIReplyResponse } from "./AIReplyMessage.js";
export { AISentimentRequest, AISentimentResponse } from "./AISentimentMessage.js";
export { AISummarizeRequest, AISummarizeResponse } from "./AISummarizeMessage.js";
export { AISummarizeRecordRequest, AISummarizeRecordResponse } from "./AISummarizeRecordMessage.js";
export { AITranslateRequest, AITranslateResponse } from "./AITranslateMessage.js";
export { AlmHandlerRequest, AlmHandlerResponse } from "./AlmHandlerMessage.js";
export { AnalyzeRequest, AnalyzeResponse } from "./AnalyzeMessage.js";
export { AnalyzeSentimentRequest, AnalyzeSentimentResponse } from "./AnalyzeSentimentMessage.js";
export {
  AppendRelatedPartyRequest,
  AppendRelatedPartyResponse,
} from "./AppendRelatedPartyMessage.js";
export {
  ApplyRecordCreationAndUpdateRuleRequest,
  ApplyRecordCreationAndUpdateRuleResponse,
} from "./ApplyRecordCreationAndUpdateRuleMessage.js";
export { ApplyRoutingRuleRequest, ApplyRoutingRuleResponse } from "./ApplyRoutingRuleMessage.js";
export { AutoMapEntityRequest, AutoMapEntityResponse } from "./AutoMapEntityMessage.js";
export {
  BackgroundSendEmailRequest,
  BackgroundSendEmailResponse,
} from "./BackgroundSendEmailMessage.js";
export {
  BatchGetFlowMachineStatusRequest,
  BatchGetFlowMachineStatusResponse,
} from "./BatchGetFlowMachineStatusMessage.js";
export { BatchPredictionRequest, BatchPredictionResponse } from "./BatchPredictionMessage.js";
export {
  BeginMachineImageProvisioningRequest,
  BeginMachineImageProvisioningResponse,
} from "./BeginMachineImageProvisioningMessage.js";
export { BookRequest, BookResponse } from "./BookMessage.js";
export { BulkDeleteRequest, BulkDeleteResponse } from "./BulkDeleteMessage.js";
export {
  BulkDetectDuplicatesRequest,
  BulkDetectDuplicatesResponse,
} from "./BulkDetectDuplicatesMessage.js";
export {
  BulkRemoveActiveCustomizationsAsyncRequest,
  BulkRemoveActiveCustomizationsAsyncResponse,
} from "./BulkRemoveActiveCustomizationsAsyncMessage.js";
export { BulkRetainRequest, BulkRetainResponse } from "./BulkRetainMessage.js";
export {
  CalculateActualValueOpportunityRequest,
  CalculateActualValueOpportunityResponse,
} from "./CalculateActualValueOpportunityMessage.js";
export { CalculatePriceRequest, CalculatePriceResponse } from "./CalculatePriceMessage.js";
export { CanBeReferencedRequest, CanBeReferencedResponse } from "./CanBeReferencedMessage.js";
export { CanBeReferencingRequest, CanBeReferencingResponse } from "./CanBeReferencingMessage.js";
export {
  CancelAllCloudFlowRunsRequest,
  CancelAllCloudFlowRunsResponse,
} from "./CancelAllCloudFlowRunsMessage.js";
export { CancelContractRequest, CancelContractResponse } from "./CancelContractMessage.js";
export {
  CancelDesktopFlowRunRequest,
  CancelDesktopFlowRunResponse,
} from "./CancelDesktopFlowRunMessage.js";
export { CancelSalesOrderRequest, CancelSalesOrderResponse } from "./CancelSalesOrderMessage.js";
export { CancelTrainingRequest, CancelTrainingResponse } from "./CancelTrainingMessage.js";
export { CanManyToManyRequest, CanManyToManyResponse } from "./CanManyToManyMessage.js";
export { CardCreateCloneRequest, CardCreateCloneResponse } from "./CardCreateCloneMessage.js";
export { CardGetFullJsonRequest, CardGetFullJsonResponse } from "./CardGetFullJsonMessage.js";
export {
  cascadeAsync_SuccessAPIRequest,
  cascadeAsync_SuccessAPIResponse,
} from "./cascadeAsync_SuccessAPIMessage.js";
export { CategorizeTextRequest, CategorizeTextResponse } from "./CategorizeTextMessage.js";
export {
  CCaaS_AcceptConversationRequest,
  CCaaS_AcceptConversationResponse,
} from "./CCaaS_AcceptConversationMessage.js";
export {
  CCaaS_AddChannelToConversationRequest,
  CCaaS_AddChannelToConversationResponse,
} from "./CCaaS_AddChannelToConversationMessage.js";
export {
  CCaaS_AgentEndConversationRequest,
  CCaaS_AgentEndConversationResponse,
} from "./CCaaS_AgentEndConversationMessage.js";
export {
  CCaaS_AssignConversationRequest,
  CCaaS_AssignConversationResponse,
} from "./CCaaS_AssignConversationMessage.js";
export {
  CCaaS_BroadcastMessageRequest,
  CCaaS_BroadcastMessageResponse,
} from "./CCaaS_BroadcastMessageMessage.js";
export {
  CCaaS_BulkForceCloseRequest,
  CCaaS_BulkForceCloseResponse,
} from "./CCaaS_BulkForceCloseMessage.js";
export {
  CCaaS_BulkQueueAssignmentRequest,
  CCaaS_BulkQueueAssignmentResponse,
} from "./CCaaS_BulkQueueAssignmentMessage.js";
export {
  CCaaS_CancelConsultRequest,
  CCaaS_CancelConsultResponse,
} from "./CCaaS_CancelConsultMessage.js";
export {
  CCaaS_CloseConsultRequest,
  CCaaS_CloseConsultResponse,
} from "./CCaaS_CloseConsultMessage.js";
export {
  CCaaS_CloseConversationRequest,
  CCaaS_CloseConversationResponse,
} from "./CCaaS_CloseConversationMessage.js";
export {
  CCaaS_ConversationTimeoutRequest,
  CCaaS_ConversationTimeoutResponse,
} from "./CCaaS_ConversationTimeoutMessage.js";
export {
  CCaaS_CreateConnectionRequest,
  CCaaS_CreateConnectionResponse,
} from "./CCaaS_CreateConnectionMessage.js";
export {
  CCaaS_EndSecondaryChannelRequest,
  CCaaS_EndSecondaryChannelResponse,
} from "./CCaaS_EndSecondaryChannelMessage.js";
export { CCaaS_EndSessionRequest, CCaaS_EndSessionResponse } from "./CCaaS_EndSessionMessage.js";
export {
  CCaaS_ForceCloseConversationRequest,
  CCaaS_ForceCloseConversationResponse,
} from "./CCaaS_ForceCloseConversationMessage.js";
export {
  CCaaS_GetAvailabilityForConversationRequest,
  CCaaS_GetAvailabilityForConversationResponse,
} from "./CCaaS_GetAvailabilityForConversationMessage.js";
export {
  CCaaS_GetAvailabilityForSimulatedConversationRequest,
  CCaaS_GetAvailabilityForSimulatedConversationResponse,
} from "./CCaaS_GetAvailabilityForSimulatedConversationMessage.js";
export {
  CCaaS_GetRepresentativeAvailabilityBeforeConversationRequest,
  CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse,
} from "./CCaaS_GetRepresentativeAvailabilityBeforeConversationMessage.js";
export {
  CCaaS_GetRepresentativeAvailabilityForConversationRequest,
  CCaaS_GetRepresentativeAvailabilityForConversationResponse,
} from "./CCaaS_GetRepresentativeAvailabilityForConversationMessage.js";
export {
  CCaaS_InitiateAgentConsultRequest,
  CCaaS_InitiateAgentConsultResponse,
} from "./CCaaS_InitiateAgentConsultMessage.js";
export {
  CCaaS_InitiateAgentConsultExternalRequest,
  CCaaS_InitiateAgentConsultExternalResponse,
} from "./CCaaS_InitiateAgentConsultExternalMessage.js";
export {
  CCaaS_InitiateAgentGroupAssignmentRequest,
  CCaaS_InitiateAgentGroupAssignmentResponse,
} from "./CCaaS_InitiateAgentGroupAssignmentMessage.js";
export {
  CCaaS_InitiateAgentGroupConsultRequest,
  CCaaS_InitiateAgentGroupConsultResponse,
} from "./CCaaS_InitiateAgentGroupConsultMessage.js";
export {
  CCaaS_InitiateAgentGroupTransferRequest,
  CCaaS_InitiateAgentGroupTransferResponse,
} from "./CCaaS_InitiateAgentGroupTransferMessage.js";
export {
  CCaaS_InitiateAgentTransferRequest,
  CCaaS_InitiateAgentTransferResponse,
} from "./CCaaS_InitiateAgentTransferMessage.js";
export {
  CCaaS_InitiateAgentTransferBySupervisorRequest,
  CCaaS_InitiateAgentTransferBySupervisorResponse,
} from "./CCaaS_InitiateAgentTransferBySupervisorMessage.js";
export {
  CCaaS_InitiateAgentTransferExternalRequest,
  CCaaS_InitiateAgentTransferExternalResponse,
} from "./CCaaS_InitiateAgentTransferExternalMessage.js";
export {
  CCaaS_InitiateQueueAssignmentRequest,
  CCaaS_InitiateQueueAssignmentResponse,
} from "./CCaaS_InitiateQueueAssignmentMessage.js";
export {
  CCaaS_InitiateQueueConsultRequest,
  CCaaS_InitiateQueueConsultResponse,
} from "./CCaaS_InitiateQueueConsultMessage.js";
export {
  CCaaS_InitiateQueueTransferRequest,
  CCaaS_InitiateQueueTransferResponse,
} from "./CCaaS_InitiateQueueTransferMessage.js";
export {
  CCaaS_JoinConversationRequest,
  CCaaS_JoinConversationResponse,
} from "./CCaaS_JoinConversationMessage.js";
export {
  CCaaS_LeavePublicConsultRequest,
  CCaaS_LeavePublicConsultResponse,
} from "./CCaaS_LeavePublicConsultMessage.js";
export { CCaaS_MaskMessageRequest, CCaaS_MaskMessageResponse } from "./CCaaS_MaskMessageMessage.js";
export {
  CCaaS_ModifyAgentPresenceRequest,
  CCaaS_ModifyAgentPresenceResponse,
} from "./CCaaS_ModifyAgentPresenceMessage.js";
export {
  CCaaS_MonitorConversationRequest,
  CCaaS_MonitorConversationResponse,
} from "./CCaaS_MonitorConversationMessage.js";
export { CCaaS_NotifyAgentRequest, CCaaS_NotifyAgentResponse } from "./CCaaS_NotifyAgentMessage.js";
export {
  CCaaS_PickConversationRequest,
  CCaaS_PickConversationResponse,
} from "./CCaaS_PickConversationMessage.js";
export {
  CCaaS_RaiseSecondaryChannelEventRequest,
  CCaaS_RaiseSecondaryChannelEventResponse,
} from "./CCaaS_RaiseSecondaryChannelEventMessage.js";
export {
  CCaaS_RejectConversationRequest,
  CCaaS_RejectConversationResponse,
} from "./CCaaS_RejectConversationMessage.js";
export {
  CCaaS_RejoinConversationRequest,
  CCaaS_RejoinConversationResponse,
} from "./CCaaS_RejoinConversationMessage.js";
export {
  CCaaS_ResetAgentPresenceRequest,
  CCaaS_ResetAgentPresenceResponse,
} from "./CCaaS_ResetAgentPresenceMessage.js";
export {
  CCaaS_SendAgentTypingIndicatorRequest,
  CCaaS_SendAgentTypingIndicatorResponse,
} from "./CCaaS_SendAgentTypingIndicatorMessage.js";
export {
  CCaaS_SendAHTEventsRequest,
  CCaaS_SendAHTEventsResponse,
} from "./CCaaS_SendAHTEventsMessage.js";
export {
  CCaaS_SendHeartbeatRequest,
  CCaaS_SendHeartbeatResponse,
} from "./CCaaS_SendHeartbeatMessage.js";
export { CCaaS_SetPresenceRequest, CCaaS_SetPresenceResponse } from "./CCaaS_SetPresenceMessage.js";
export {
  CCaaS_StartSecondaryChannelRequest,
  CCaaS_StartSecondaryChannelResponse,
} from "./CCaaS_StartSecondaryChannelMessage.js";
export { CCaaS_UserLogoutRequest, CCaaS_UserLogoutResponse } from "./CCaaS_UserLogoutMessage.js";
export { ClearWorkQueueRequest, ClearWorkQueueResponse } from "./ClearWorkQueueMessage.js";
export { CloneAsPatchRequest, CloneAsPatchResponse } from "./CloneAsPatchMessage.js";
export { CloneAsSolutionRequest, CloneAsSolutionResponse } from "./CloneAsSolutionMessage.js";
export { CloneContractRequest, CloneContractResponse } from "./CloneContractMessage.js";
export {
  CloneMobileOfflineProfileRequest,
  CloneMobileOfflineProfileResponse,
} from "./CloneMobileOfflineProfileMessage.js";
export { CloneProductRequest, CloneProductResponse } from "./CloneProductMessage.js";
export { CloseIncidentRequest, CloseIncidentResponse } from "./CloseIncidentMessage.js";
export { CloseQuoteRequest, CloseQuoteResponse } from "./CloseQuoteMessage.js";
export {
  CommitAnnotationBlocksUploadRequest,
  CommitAnnotationBlocksUploadResponse,
} from "./CommitAnnotationBlocksUploadMessage.js";
export {
  CommitAttachmentBlocksUploadRequest,
  CommitAttachmentBlocksUploadResponse,
} from "./CommitAttachmentBlocksUploadMessage.js";
export {
  CommitFileBlocksUploadRequest,
  CommitFileBlocksUploadResponse,
} from "./CommitFileBlocksUploadMessage.js";
export { CommitToGitRequest, CommitToGitResponse } from "./CommitToGitMessage.js";
export {
  CompoundUpdateDuplicateDetectionRuleRequest,
  CompoundUpdateDuplicateDetectionRuleResponse,
} from "./CompoundUpdateDuplicateDetectionRuleMessage.js";
export {
  ComputeSlaWorkQueueItemRequest,
  ComputeSlaWorkQueueItemResponse,
} from "./ComputeSlaWorkQueueItemMessage.js";
export {
  ConfirmConsentCodeRequest,
  ConfirmConsentCodeResponse,
} from "./ConfirmConsentCodeMessage.js";
export { ConnectToGitRequest, ConnectToGitResponse } from "./ConnectToGitMessage.js";
export {
  ConvertOwnerTeamToAccessTeamRequest,
  ConvertOwnerTeamToAccessTeamResponse,
} from "./ConvertOwnerTeamToAccessTeamMessage.js";
export {
  ConvertQuoteToSalesOrderRequest,
  ConvertQuoteToSalesOrderResponse,
} from "./ConvertQuoteToSalesOrderMessage.js";
export {
  ConvertSalesOrderToInvoiceRequest,
  ConvertSalesOrderToInvoiceResponse,
} from "./ConvertSalesOrderToInvoiceMessage.js";
export {
  copilotquerytextcontextRequest,
  copilotquerytextcontextResponse,
} from "./copilotquerytextcontextMessage.js";
export { CopyCampaignRequest, CopyCampaignResponse } from "./CopyCampaignMessage.js";
export {
  CopyCampaignResponseRequest,
  CopyCampaignResponseResponse,
} from "./CopyCampaignResponseMessage.js";
export {
  CopyDynamicListToStaticRequest,
  CopyDynamicListToStaticResponse,
} from "./CopyDynamicListToStaticMessage.js";
export { CopyMembersListRequest, CopyMembersListResponse } from "./CopyMembersListMessage.js";
export { CopySystemFormRequest, CopySystemFormResponse } from "./CopySystemFormMessage.js";
export {
  CreateActivitiesListRequest,
  CreateActivitiesListResponse,
} from "./CreateActivitiesListMessage.js";
export {
  CreateAndSendNewEmailRequest,
  CreateAndSendNewEmailResponse,
} from "./CreateAndSendNewEmailMessage.js";
export {
  CreateAsyncJobToRevokeInheritedAccessRequest,
  CreateAsyncJobToRevokeInheritedAccessResponse,
} from "./CreateAsyncJobToRevokeInheritedAccessMessage.js";
export {
  CreateCustomerRelationshipsRequest,
  CreateCustomerRelationshipsResponse,
} from "./CreateCustomerRelationshipsMessage.js";
export { CreateExceptionRequest, CreateExceptionResponse } from "./CreateExceptionMessage.js";
export {
  CreateFlowCredentialApplicationRequest,
  CreateFlowCredentialApplicationResponse,
} from "./CreateFlowCredentialApplicationMessage.js";
export {
  CreateFlowMachineNetworkRequest,
  CreateFlowMachineNetworkResponse,
} from "./CreateFlowMachineNetworkMessage.js";
export {
  CreateHostedFlowMachineGroupRequest,
  CreateHostedFlowMachineGroupResponse,
} from "./CreateHostedFlowMachineGroupMessage.js";
export { CreateInstanceRequest, CreateInstanceResponse } from "./CreateInstanceMessage.js";
export {
  CreateKnowledgeArticleTranslationRequest,
  CreateKnowledgeArticleTranslationResponse,
} from "./CreateKnowledgeArticleTranslationMessage.js";
export {
  CreateKnowledgeArticleVersionRequest,
  CreateKnowledgeArticleVersionResponse,
} from "./CreateKnowledgeArticleVersionMessage.js";
export {
  CreateMiniCampaignV2Request,
  CreateMiniCampaignV2Response,
} from "./CreateMiniCampaignV2Message.js";
export { CreateMultipleRequest, CreateMultipleResponse } from "./CreateMultipleMessage.js";
export {
  CreateNPSUserRatingRequest,
  CreateNPSUserRatingResponse,
} from "./CreateNPSUserRatingMessage.js";
export {
  CreatePolymorphicLookupAttributeRequest,
  CreatePolymorphicLookupAttributeResponse,
} from "./CreatePolymorphicLookupAttributeMessage.js";
export {
  CreateRoleWithPrivilegeCheckerRunRequest,
  CreateRoleWithPrivilegeCheckerRunResponse,
} from "./CreateRoleWithPrivilegeCheckerRunMessage.js";
export { CreateRpaBoxRequest, CreateRpaBoxResponse } from "./CreateRpaBoxMessage.js";
export {
  CreateVirtualConnectorTableRequest,
  CreateVirtualConnectorTableResponse,
} from "./CreateVirtualConnectorTableMessage.js";
export {
  CreateWorkflowFromTemplateRequest,
  CreateWorkflowFromTemplateResponse,
} from "./CreateWorkflowFromTemplateMessage.js";
export { cv_UpdateInviteRequest, cv_UpdateInviteResponse } from "./cv_UpdateInviteMessage.js";
export {
  DeactivateEntityKeyRequest,
  DeactivateEntityKeyResponse,
} from "./DeactivateEntityKeyMessage.js";
export { DeleteAndPromoteRequest, DeleteAndPromoteResponse } from "./DeleteAndPromoteMessage.js";
export {
  DeleteAndPromoteAsyncRequest,
  DeleteAndPromoteAsyncResponse,
} from "./DeleteAndPromoteAsyncMessage.js";
export { DeleteAuditDataRequest, DeleteAuditDataResponse } from "./DeleteAuditDataMessage.js";
export {
  DeleteAutomatedPluginRequest,
  DeleteAutomatedPluginResponse,
} from "./DeleteAutomatedPluginMessage.js";
export { DeleteFileRequest, DeleteFileResponse } from "./DeleteFileMessage.js";
export {
  DeleteFlowMachineGroupRequest,
  DeleteFlowMachineGroupResponse,
} from "./DeleteFlowMachineGroupMessage.js";
export {
  DeleteInstantPluginRequest,
  DeleteInstantPluginResponse,
} from "./DeleteInstantPluginMessage.js";
export { DeleteMultipleRequest, DeleteMultipleResponse } from "./DeleteMultipleMessage.js";
export {
  DeleteOpenInstancesRequest,
  DeleteOpenInstancesResponse,
} from "./DeleteOpenInstancesMessage.js";
export { DeleteOptionValueRequest, DeleteOptionValueResponse } from "./DeleteOptionValueMessage.js";
export {
  DeleteOQOILineWithSkipPricingCalculationRequest,
  DeleteOQOILineWithSkipPricingCalculationResponse,
} from "./DeleteOQOILineWithSkipPricingCalculationMessage.js";
export {
  DeleteRecordChangeHistoryRequest,
  DeleteRecordChangeHistoryResponse,
} from "./DeleteRecordChangeHistoryMessage.js";
export {
  DeliverImmediatePromoteEmailRequest,
  DeliverImmediatePromoteEmailResponse,
} from "./DeliverImmediatePromoteEmailMessage.js";
export {
  DeliverIncomingEmailRequest,
  DeliverIncomingEmailResponse,
} from "./DeliverIncomingEmailMessage.js";
export {
  DeliverPromoteEmailRequest,
  DeliverPromoteEmailResponse,
} from "./DeliverPromoteEmailMessage.js";
export {
  DeprovisionLanguageRequest,
  DeprovisionLanguageResponse,
} from "./DeprovisionLanguageMessage.js";
export { DequeueRequest, DequeueResponse } from "./DequeueMessage.js";
export { DetectLanguageRequest, DetectLanguageResponse } from "./DetectLanguageMessage.js";
export { DisconnectFromGitRequest, DisconnectFromGitResponse } from "./DisconnectFromGitMessage.js";
export {
  DiscoverFabricAISkillsRequest,
  DiscoverFabricAISkillsResponse,
} from "./DiscoverFabricAISkillsMessage.js";
export {
  DiscoverFabricWorkspacesRequest,
  DiscoverFabricWorkspacesResponse,
} from "./DiscoverFabricWorkspacesMessage.js";
export {
  DistributeCampaignActivityRequest,
  DistributeCampaignActivityResponse,
} from "./DistributeCampaignActivityMessage.js";
export { DownloadBlockRequest, DownloadBlockResponse } from "./DownloadBlockMessage.js";
export {
  DownloadSolutionExportDataRequest,
  DownloadSolutionExportDataResponse,
} from "./DownloadSolutionExportDataMessage.js";
export {
  ExecuteFxExpressionRequest,
  ExecuteFxExpressionResponse,
} from "./ExecuteFxExpressionMessage.js";
export { ExecuteWorkflowRequest, ExecuteWorkflowResponse } from "./ExecuteWorkflowMessage.js";
export {
  ExportMappingsImportMapRequest,
  ExportMappingsImportMapResponse,
} from "./ExportMappingsImportMapMessage.js";
export {
  ExportRetainedDataRequest,
  ExportRetainedDataResponse,
} from "./ExportRetainedDataMessage.js";
export { ExportSolutionRequest, ExportSolutionResponse } from "./ExportSolutionMessage.js";
export {
  ExportSolutionAsyncRequest,
  ExportSolutionAsyncResponse,
} from "./ExportSolutionAsyncMessage.js";
export {
  ExportSolutionFromGitRequest,
  ExportSolutionFromGitResponse,
} from "./ExportSolutionFromGitMessage.js";
export {
  ExportSolutionFromGitAsyncRequest,
  ExportSolutionFromGitAsyncResponse,
} from "./ExportSolutionFromGitAsyncMessage.js";
export { ExportTranslationRequest, ExportTranslationResponse } from "./ExportTranslationMessage.js";
export { ExtractKeyPhrasesRequest, ExtractKeyPhrasesResponse } from "./ExtractKeyPhrasesMessage.js";
export {
  ExtractTextEntitiesRequest,
  ExtractTextEntitiesResponse,
} from "./ExtractTextEntitiesMessage.js";
export { FormPredictRequest, FormPredictResponse } from "./FormPredictMessage.js";
export { FulfillSalesOrderRequest, FulfillSalesOrderResponse } from "./FulfillSalesOrderMessage.js";
export {
  FullTextSearchKnowledgeArticleRequest,
  FullTextSearchKnowledgeArticleResponse,
} from "./FullTextSearchKnowledgeArticleMessage.js";
export {
  GenerateAutomatedPluginRequest,
  GenerateAutomatedPluginResponse,
} from "./GenerateAutomatedPluginMessage.js";
export {
  GenerateInstantPluginRequest,
  GenerateInstantPluginResponse,
} from "./GenerateInstantPluginMessage.js";
export {
  GenerateInvoiceFromOpportunityRequest,
  GenerateInvoiceFromOpportunityResponse,
} from "./GenerateInvoiceFromOpportunityMessage.js";
export {
  GeneratePowerFxFormulaRequest,
  GeneratePowerFxFormulaResponse,
} from "./GeneratePowerFxFormulaMessage.js";
export {
  GenerateQuoteFromOpportunityRequest,
  GenerateQuoteFromOpportunityResponse,
} from "./GenerateQuoteFromOpportunityMessage.js";
export {
  GenerateSalesOrderFromOpportunityRequest,
  GenerateSalesOrderFromOpportunityResponse,
} from "./GenerateSalesOrderFromOpportunityMessage.js";
export {
  GenerateSharedLinkRequest,
  GenerateSharedLinkResponse,
} from "./GenerateSharedLinkMessage.js";
export {
  GenerateSocialProfileRequest,
  GenerateSocialProfileResponse,
} from "./GenerateSocialProfileMessage.js";
export {
  GetAuditStorageDetailsRequest,
  GetAuditStorageDetailsResponse,
} from "./GetAuditStorageDetailsMessage.js";
export { GetAutoNumberSeedRequest, GetAutoNumberSeedResponse } from "./GetAutoNumberSeedMessage.js";
export {
  GetCertificateCredentialRequest,
  GetCertificateCredentialResponse,
} from "./GetCertificateCredentialMessage.js";
export { GetConsentLinkRequest, GetConsentLinkResponse } from "./GetConsentLinkMessage.js";
export {
  GetEntityLinkChatConfigRequest,
  GetEntityLinkChatConfigResponse,
} from "./GetEntityLinkChatConfigMessage.js";
export {
  GetFeatureControlStringSettingsForNamespaceWithUserContextRequest,
  GetFeatureControlStringSettingsForNamespaceWithUserContextResponse,
} from "./GetFeatureControlStringSettingsForNamespaceWithUserContextMessage.js";
export {
  GetInvoiceProductsFromOpportunityRequest,
  GetInvoiceProductsFromOpportunityResponse,
} from "./GetInvoiceProductsFromOpportunityMessage.js";
export { GetJobStatusRequest, GetJobStatusResponse } from "./GetJobStatusMessage.js";
export { GetLinkedChatsRequest, GetLinkedChatsResponse } from "./GetLinkedChatsMessage.js";
export {
  GetNextAutoNumberValueRequest,
  GetNextAutoNumberValueResponse,
} from "./GetNextAutoNumberValueMessage.js";
export {
  GetOrCreateSharedWorkspaceRequest,
  GetOrCreateSharedWorkspaceResponse,
} from "./GetOrCreateSharedWorkspaceMessage.js";
export {
  GetPBIReportRefreshStatusRequest,
  GetPBIReportRefreshStatusResponse,
} from "./GetPBIReportRefreshStatusMessage.js";
export { GetPublicKeyRequest, GetPublicKeyResponse } from "./GetPublicKeyMessage.js";
export {
  GetQuoteProductsFromOpportunityRequest,
  GetQuoteProductsFromOpportunityResponse,
} from "./GetQuoteProductsFromOpportunityMessage.js";
export { GetRunMapRequest, GetRunMapResponse } from "./GetRunMapMessage.js";
export {
  GetSalesOrderProductsFromOpportunityRequest,
  GetSalesOrderProductsFromOpportunityResponse,
} from "./GetSalesOrderProductsFromOpportunityMessage.js";
export {
  GetTrackingTokenEmailRequest,
  GetTrackingTokenEmailResponse,
} from "./GetTrackingTokenEmailMessage.js";
export { GrantAccessRequest, GrantAccessResponse } from "./GrantAccessMessage.js";
export {
  GrantAccessUsingSharedLinkRequest,
  GrantAccessUsingSharedLinkResponse,
} from "./GrantAccessUsingSharedLinkMessage.js";
export {
  GrantDelegatedAccessRequest,
  GrantDelegatedAccessResponse,
} from "./GrantDelegatedAccessMessage.js";
export { ImmediateBookRequest, ImmediateBookResponse } from "./ImmediateBookMessage.js";
export {
  ImportCardTypeSchemaRequest,
  ImportCardTypeSchemaResponse,
} from "./ImportCardTypeSchemaMessage.js";
export {
  ImportFieldTranslationRequest,
  ImportFieldTranslationResponse,
} from "./ImportFieldTranslationMessage.js";
export {
  ImportMappingsImportMapRequest,
  ImportMappingsImportMapResponse,
} from "./ImportMappingsImportMapMessage.js";
export {
  ImportRecordsImportRequest,
  ImportRecordsImportResponse,
} from "./ImportRecordsImportMessage.js";
export { ImportSolutionRequest, ImportSolutionResponse } from "./ImportSolutionMessage.js";
export {
  ImportSolutionAsyncRequest,
  ImportSolutionAsyncResponse,
} from "./ImportSolutionAsyncMessage.js";
export { ImportSolutionsRequest, ImportSolutionsResponse } from "./ImportSolutionsMessage.js";
export { ImportTranslationRequest, ImportTranslationResponse } from "./ImportTranslationMessage.js";
export {
  ImportTranslationAsyncRequest,
  ImportTranslationAsyncResponse,
} from "./ImportTranslationAsyncMessage.js";
export {
  InferEntityDefinitionRequest,
  InferEntityDefinitionResponse,
} from "./InferEntityDefinitionMessage.js";
export { IngestRequest, IngestResponse } from "./IngestMessage.js";
export {
  InitializeAnnotationBlocksDownloadRequest,
  InitializeAnnotationBlocksDownloadResponse,
} from "./InitializeAnnotationBlocksDownloadMessage.js";
export {
  InitializeAnnotationBlocksUploadRequest,
  InitializeAnnotationBlocksUploadResponse,
} from "./InitializeAnnotationBlocksUploadMessage.js";
export {
  InitializeAttachmentBlocksDownloadRequest,
  InitializeAttachmentBlocksDownloadResponse,
} from "./InitializeAttachmentBlocksDownloadMessage.js";
export {
  InitializeAttachmentBlocksUploadRequest,
  InitializeAttachmentBlocksUploadResponse,
} from "./InitializeAttachmentBlocksUploadMessage.js";
export {
  InitializeFileBlocksDownloadRequest,
  InitializeFileBlocksDownloadResponse,
} from "./InitializeFileBlocksDownloadMessage.js";
export {
  InitializeFileBlocksUploadRequest,
  InitializeFileBlocksUploadResponse,
} from "./InitializeFileBlocksUploadMessage.js";
export {
  InitializeModernFlowFromAsyncWorkflowRequest,
  InitializeModernFlowFromAsyncWorkflowResponse,
} from "./InitializeModernFlowFromAsyncWorkflowMessage.js";
export {
  InitializeTemporaryFileBlocksUploadRequest,
  InitializeTemporaryFileBlocksUploadResponse,
} from "./InitializeTemporaryFileBlocksUploadMessage.js";
export { InsertOptionValueRequest, InsertOptionValueResponse } from "./InsertOptionValueMessage.js";
export { InsertStatusValueRequest, InsertStatusValueResponse } from "./InsertStatusValueMessage.js";
export { installRequest, installResponse } from "./installMessage.js";
export { InstallSampleDataRequest, InstallSampleDataResponse } from "./InstallSampleDataMessage.js";
export {
  InstantiateFiltersRequest,
  InstantiateFiltersResponse,
} from "./InstantiateFiltersMessage.js";
export {
  InstantiateTemplateRequest,
  InstantiateTemplateResponse,
} from "./InstantiateTemplateMessage.js";
export {
  InstantiateTemplateGenericRequest,
  InstantiateTemplateGenericResponse,
} from "./InstantiateTemplateGenericMessage.js";
export { IsPaiEnabledRequest, IsPaiEnabledResponse } from "./IsPaiEnabledMessage.js";
export { IsPmEnabledRequest, IsPmEnabledResponse } from "./IsPmEnabledMessage.js";
export { JoinLinkedChatRequest, JoinLinkedChatResponse } from "./JoinLinkedChatMessage.js";
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
export { LoseOpportunityRequest, LoseOpportunityResponse } from "./LoseOpportunityMessage.js";
export { McpCreateTableRequest, McpCreateTableResponse } from "./McpCreateTableMessage.js";
export { McpUpdateTableRequest, McpUpdateTableResponse } from "./McpUpdateTableMessage.js";
export { MergeRequest, MergeResponse } from "./MergeMessage.js";
export { ModifyAccessRequest, ModifyAccessResponse } from "./ModifyAccessMessage.js";
export {
  msdn_evaluationplanorchestratorRequest,
  msdn_evaluationplanorchestratorResponse,
} from "./msdn_evaluationplanorchestratorMessage.js";
export {
  msdyn_AcquireTokenRequest,
  msdyn_AcquireTokenResponse,
} from "./msdyn_AcquireTokenMessage.js";
export {
  msdyn_AcsForceSyncActionRequest,
  msdyn_AcsForceSyncActionResponse,
} from "./msdyn_AcsForceSyncActionMessage.js";
export {
  msdyn_ActionCardActionLoggerRequest,
  msdyn_ActionCardActionLoggerResponse,
} from "./msdyn_ActionCardActionLoggerMessage.js";
export {
  msdyn_ActionCardCreateRequest,
  msdyn_ActionCardCreateResponse,
} from "./msdyn_ActionCardCreateMessage.js";
export {
  msdyn_ActivateProcessesRequest,
  msdyn_ActivateProcessesResponse,
} from "./msdyn_ActivateProcessesMessage.js";
export {
  msdyn_ActivateRoutingRuleRequest,
  msdyn_ActivateRoutingRuleResponse,
} from "./msdyn_ActivateRoutingRuleMessage.js";
export {
  msdyn_ActivateSdkMessageProcessingStepsRequest,
  msdyn_ActivateSdkMessageProcessingStepsResponse,
} from "./msdyn_ActivateSdkMessageProcessingStepsMessage.js";
export {
  msdyn_ActivateWorkflowRequest,
  msdyn_ActivateWorkflowResponse,
} from "./msdyn_ActivateWorkflowMessage.js";
export { msdyn_AddBotUserRequest, msdyn_AddBotUserResponse } from "./msdyn_AddBotUserMessage.js";
export {
  msdyn_AddSuggestedCardsRequest,
  msdyn_AddSuggestedCardsResponse,
} from "./msdyn_AddSuggestedCardsMessage.js";
export {
  msdyn_AddTeamsAppToLinkedChatRequest,
  msdyn_AddTeamsAppToLinkedChatResponse,
} from "./msdyn_AddTeamsAppToLinkedChatMessage.js";
export {
  msdyn_AgentscriptDataMigrationCustomActionRequest,
  msdyn_AgentscriptDataMigrationCustomActionResponse,
} from "./msdyn_AgentscriptDataMigrationCustomActionMessage.js";
export {
  msdyn_AIBRealTimePredictRequest,
  msdyn_AIBRealTimePredictResponse,
} from "./msdyn_AIBRealTimePredictMessage.js";
export {
  msdyn_AIEvaluationMetricsRequest,
  msdyn_AIEvaluationMetricsResponse,
} from "./msdyn_AIEvaluationMetricsMessage.js";
export {
  msdyn_AIEvaluationMetricsWrapperRequest,
  msdyn_AIEvaluationMetricsWrapperResponse,
} from "./msdyn_AIEvaluationMetricsWrapperMessage.js";
export { msdyn_AITestRunRequest, msdyn_AITestRunResponse } from "./msdyn_AITestRunMessage.js";
export {
  msdyn_AnalyticsSaveDataInConfigStoreRequest,
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
  msdyn_ApplyPredictionResponse,
} from "./msdyn_ApplyPredictionMessage.js";
export {
  msdyn_ApplyRoutingRuleEntityRecordRequest,
  msdyn_ApplyRoutingRuleEntityRecordResponse,
} from "./msdyn_ApplyRoutingRuleEntityRecordMessage.js";
export {
  msdyn_applyworktemplateforresourcesRequest,
  msdyn_applyworktemplateforresourcesResponse,
} from "./msdyn_applyworktemplateforresourcesMessage.js";
export {
  msdyn_AsExchangeEventRequest,
  msdyn_AsExchangeEventResponse,
} from "./msdyn_AsExchangeEventMessage.js";
export {
  msdyn_assignentityRequest,
  msdyn_assignentityResponse,
} from "./msdyn_assignentityMessage.js";
export {
  msdyn_assignentitysyncRequest,
  msdyn_assignentitysyncResponse,
} from "./msdyn_assignentitysyncMessage.js";
export {
  msdyn_AssignOwnerToUnassignedRecordsRequest,
  msdyn_AssignOwnerToUnassignedRecordsResponse,
} from "./msdyn_AssignOwnerToUnassignedRecordsMessage.js";
export {
  msdyn_AutoCaseClosureAgentCompleteSnaRequest,
  msdyn_AutoCaseClosureAgentCompleteSnaResponse,
} from "./msdyn_AutoCaseClosureAgentCompleteSnaMessage.js";
export {
  msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequest,
  msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse,
} from "./msdyn_AutoCaseClosureAgentGenerateFollowupEmailMessage.js";
export {
  msdyn_AutoCloseExpiredConversationsRequest,
  msdyn_AutoCloseExpiredConversationsResponse,
} from "./msdyn_AutoCloseExpiredConversationsMessage.js";
export {
  msdyn_AutoLinkingLeadCustomActionRequest,
  msdyn_AutoLinkingLeadCustomActionResponse,
} from "./msdyn_AutoLinkingLeadCustomActionMessage.js";
export {
  msdyn_autonomousCaseCreateUpdateRequest,
  msdyn_autonomousCaseCreateUpdateResponse,
} from "./msdyn_autonomousCaseCreateUpdateMessage.js";
export {
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequest,
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse,
} from "./msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARMessage.js";
export {
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequest,
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse,
} from "./msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultMessage.js";
export {
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequest,
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse,
} from "./msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationMessage.js";
export {
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequest,
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse,
} from "./msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsMessage.js";
export {
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequest,
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse,
} from "./msdyn_AutonomousSQA_ProcessBANTAndPIExtractionMessage.js";
export {
  msdyn_AutonomousSQA_ProvisionMCSAgentsRequest,
  msdyn_AutonomousSQA_ProvisionMCSAgentsResponse,
} from "./msdyn_AutonomousSQA_ProvisionMCSAgentsMessage.js";
export {
  msdyn_AutonomousSQA_TriggerQualificationEvaluationRequest,
  msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse,
} from "./msdyn_AutonomousSQA_TriggerQualificationEvaluationMessage.js";
export {
  msdyn_AutonomousSQA_UpdateSalesAgentRunRequest,
  msdyn_AutonomousSQA_UpdateSalesAgentRunResponse,
} from "./msdyn_AutonomousSQA_UpdateSalesAgentRunMessage.js";
export {
  msdyn_BookingResourceRequest,
  msdyn_BookingResourceResponse,
} from "./msdyn_BookingResourceMessage.js";
export {
  msdyn_BookingResourceRequirementRequest,
  msdyn_BookingResourceRequirementResponse,
} from "./msdyn_BookingResourceRequirementMessage.js";
export {
  msdyn_BookRequirementGroupRequest,
  msdyn_BookRequirementGroupResponse,
} from "./msdyn_BookRequirementGroupMessage.js";
export {
  msdyn_BulkAITestCaseUploadRequest,
  msdyn_BulkAITestCaseUploadResponse,
} from "./msdyn_BulkAITestCaseUploadMessage.js";
export {
  msdyn_BulkAITestRunRequest,
  msdyn_BulkAITestRunResponse,
} from "./msdyn_BulkAITestRunMessage.js";
export {
  msdyn_BusinessClosureDeleteRequest,
  msdyn_BusinessClosureDeleteResponse,
} from "./msdyn_BusinessClosureDeleteMessage.js";
export {
  msdyn_BusinessClosureRetrieveRequest,
  msdyn_BusinessClosureRetrieveResponse,
} from "./msdyn_BusinessClosureRetrieveMessage.js";
export {
  msdyn_BusinessClosureSaveRequest,
  msdyn_BusinessClosureSaveResponse,
} from "./msdyn_BusinessClosureSaveMessage.js";
export {
  msdyn_CalculateAndUpdateBookingTravelRequest,
  msdyn_CalculateAndUpdateBookingTravelResponse,
} from "./msdyn_CalculateAndUpdateBookingTravelMessage.js";
export {
  msdyn_CalendarBulkDeleteRequest,
  msdyn_CalendarBulkDeleteResponse,
} from "./msdyn_CalendarBulkDeleteMessage.js";
export {
  msdyn_CancelBookingsRequest,
  msdyn_CancelBookingsResponse,
} from "./msdyn_CancelBookingsMessage.js";
export {
  msdyn_CancelDataProcessingModuleExecutionRequest,
  msdyn_CancelDataProcessingModuleExecutionResponse,
} from "./msdyn_CancelDataProcessingModuleExecutionMessage.js";
export {
  msdyn_CancelMobileAppBuildRequest,
  msdyn_CancelMobileAppBuildResponse,
} from "./msdyn_CancelMobileAppBuildMessage.js";
export {
  msdyn_CapacityProfilesToUsersRequest,
  msdyn_CapacityProfilesToUsersResponse,
} from "./msdyn_CapacityProfilesToUsersMessage.js";
export {
  msdyn_CascadeBookingChangesRequest,
  msdyn_CascadeBookingChangesResponse,
} from "./msdyn_CascadeBookingChangesMessage.js";
export {
  msdyn_CascadeCrewBookingsRequest,
  msdyn_CascadeCrewBookingsResponse,
} from "./msdyn_CascadeCrewBookingsMessage.js";
export {
  msdyn_CascadeCrewMembershipsRequest,
  msdyn_CascadeCrewMembershipsResponse,
} from "./msdyn_CascadeCrewMembershipsMessage.js";
export {
  msdyn_CaseClassificationRequest,
  msdyn_CaseClassificationResponse,
} from "./msdyn_CaseClassificationMessage.js";
export {
  msdyn_CECLiveDataMigrationCustomActionRequest,
  msdyn_CECLiveDataMigrationCustomActionResponse,
} from "./msdyn_CECLiveDataMigrationCustomActionMessage.js";
export { msdyn_cesinvokeRequest, msdyn_cesinvokeResponse } from "./msdyn_cesinvokeMessage.js";
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
  msdyn_CheckBookingCustomControlUsageResponse,
} from "./msdyn_CheckBookingCustomControlUsageMessage.js";
export {
  msdyn_CheckCharacteristicHasMatchingResourceRequest,
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
  msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse,
} from "./msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesMessage.js";
export {
  msdyn_CheckFieldServiceDBVersionRequest,
  msdyn_CheckFieldServiceDBVersionResponse,
} from "./msdyn_CheckFieldServiceDBVersionMessage.js";
export {
  msdyn_CheckForActiveAgreementsHavingPastEndDatesRequest,
  msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse,
} from "./msdyn_CheckForActiveAgreementsHavingPastEndDatesMessage.js";
export {
  msdyn_CheckForActiveLayersOnProcessesRequest,
  msdyn_CheckForActiveLayersOnProcessesResponse,
} from "./msdyn_CheckForActiveLayersOnProcessesMessage.js";
export {
  msdyn_CheckForConditionXmlFormatRequest,
  msdyn_CheckForConditionXmlFormatResponse,
} from "./msdyn_CheckForConditionXmlFormatMessage.js";
export {
  msdyn_CheckForCustomizedAppModuleRequest,
  msdyn_CheckForCustomizedAppModuleResponse,
} from "./msdyn_CheckForCustomizedAppModuleMessage.js";
export {
  msdyn_CheckForCustomizedOptionSetRequest,
  msdyn_CheckForCustomizedOptionSetResponse,
} from "./msdyn_CheckForCustomizedOptionSetMessage.js";
export {
  msdyn_CheckForCustomizedSitemapRequest,
  msdyn_CheckForCustomizedSitemapResponse,
} from "./msdyn_CheckForCustomizedSitemapMessage.js";
export {
  msdyn_CheckForCustomizedWebResourcesRequest,
  msdyn_CheckForCustomizedWebResourcesResponse,
} from "./msdyn_CheckForCustomizedWebResourcesMessage.js";
export {
  msdyn_CheckForDeletedBSMRecordsRequest,
  msdyn_CheckForDeletedBSMRecordsResponse,
} from "./msdyn_CheckForDeletedBSMRecordsMessage.js";
export {
  msdyn_CheckForDeletedProcessRequest,
  msdyn_CheckForDeletedProcessResponse,
} from "./msdyn_CheckForDeletedProcessMessage.js";
export {
  msdyn_CheckForDeletedSDKMessageProcessingStepsRequest,
  msdyn_CheckForDeletedSDKMessageProcessingStepsResponse,
} from "./msdyn_CheckForDeletedSDKMessageProcessingStepsMessage.js";
export {
  msdyn_CheckForDeletedWebResourcesRequest,
  msdyn_CheckForDeletedWebResourcesResponse,
} from "./msdyn_CheckForDeletedWebResourcesMessage.js";
export {
  msdyn_CheckForDuplicatesActionRequest,
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
  msdyn_CheckForNoOrphanWorkflowsResponse,
} from "./msdyn_CheckForNoOrphanWorkflowsMessage.js";
export {
  msdyn_CheckForPendingProcessesRequest,
  msdyn_CheckForPendingProcessesResponse,
} from "./msdyn_CheckForPendingProcessesMessage.js";
export {
  msdyn_CheckForRemovedFormLibrariesRequest,
  msdyn_CheckForRemovedFormLibrariesResponse,
} from "./msdyn_CheckForRemovedFormLibrariesMessage.js";
export {
  msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequest,
  msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse,
} from "./msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersMessage.js";
export {
  msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequest,
  msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse,
} from "./msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersMessage.js";
export {
  msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequest,
  msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse,
} from "./msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsMessage.js";
export {
  msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequest,
  msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse,
} from "./msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsMessage.js";
export {
  msdyn_CheckForSolutionVersionRequest,
  msdyn_CheckForSolutionVersionResponse,
} from "./msdyn_CheckForSolutionVersionMessage.js";
export {
  msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequest,
  msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse,
} from "./msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementMessage.js";
export {
  msdyn_CheckForWorkflowTypeOfRuleItemsRequest,
  msdyn_CheckForWorkflowTypeOfRuleItemsResponse,
} from "./msdyn_CheckForWorkflowTypeOfRuleItemsMessage.js";
export {
  msdyn_CheckForWorkOrderTypesRequest,
  msdyn_CheckForWorkOrderTypesResponse,
} from "./msdyn_CheckForWorkOrderTypesMessage.js";
export {
  msdyn_CheckGeolocationEnabledRequest,
  msdyn_CheckGeolocationEnabledResponse,
} from "./msdyn_CheckGeolocationEnabledMessage.js";
export {
  msdyn_CheckIfActivityMonitorEnabledRequest,
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
  msdyn_CheckIfAutoNumberingIsOptedResponse,
} from "./msdyn_CheckIfAutoNumberingIsOptedMessage.js";
export {
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest,
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse,
} from "./msdyn_CheckIfAutoRouteToOwnerQueueEnabledMessage.js";
export {
  msdyn_CheckIfCSFormsFromUnmanagedLayerRequest,
  msdyn_CheckIfCSFormsFromUnmanagedLayerResponse,
} from "./msdyn_CheckIfCSFormsFromUnmanagedLayerMessage.js";
export {
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest,
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse,
} from "./msdyn_CheckIfEmailResponseTemplateEntityTypeMatchMessage.js";
export {
  msdyn_CheckIfExecutionContextIsPassedRequest,
  msdyn_CheckIfExecutionContextIsPassedResponse,
} from "./msdyn_CheckIfExecutionContextIsPassedMessage.js";
export {
  msdyn_CheckIfFormsHaveTooManyCustomControlsRequest,
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
  msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse,
} from "./msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountMessage.js";
export {
  msdyn_CheckIfProcessesAreActiveRequest,
  msdyn_CheckIfProcessesAreActiveResponse,
} from "./msdyn_CheckIfProcessesAreActiveMessage.js";
export {
  msdyn_CheckIfProcessesOwnedByDisabledUsersRequest,
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
  msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse,
} from "./msdyn_CheckIfSDKMessageProcessingStepsAreActiveMessage.js";
export {
  msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest,
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
  msdyn_CheckPredictionModelsResponse,
} from "./msdyn_CheckPredictionModelsMessage.js";
export {
  msdyn_CheckReqRibbonCommandDefRequest,
  msdyn_CheckReqRibbonCommandDefResponse,
} from "./msdyn_CheckReqRibbonCommandDefMessage.js";
export {
  msdyn_CheckReqWebResourceOnSystemFormRequest,
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
  msdyn_ClassifySegmentsResponse,
} from "./msdyn_ClassifySegmentsMessage.js";
export {
  msdyn_CleanUpActivityMappingsRequest,
  msdyn_CleanUpActivityMappingsResponse,
} from "./msdyn_CleanUpActivityMappingsMessage.js";
export {
  msdyn_CleanupCopilotAgentResponsesRequest,
  msdyn_CleanupCopilotAgentResponsesResponse,
} from "./msdyn_CleanupCopilotAgentResponsesMessage.js";
export {
  msdyn_CleanupDiagnosticsWrappersRequest,
  msdyn_CleanupDiagnosticsWrappersResponse,
} from "./msdyn_CleanupDiagnosticsWrappersMessage.js";
export {
  msdyn_CleanUpEmailNBACardsPluginRequest,
  msdyn_CleanUpEmailNBACardsPluginResponse,
} from "./msdyn_CleanUpEmailNBACardsPluginMessage.js";
export {
  msdyn_CloneAttachmentsPluginActionRequest,
  msdyn_CloneAttachmentsPluginActionResponse,
} from "./msdyn_CloneAttachmentsPluginActionMessage.js";
export { msdyn_cloneentityRequest, msdyn_cloneentityResponse } from "./msdyn_cloneentityMessage.js";
export {
  msdyn_CloneMultipleRequest,
  msdyn_CloneMultipleResponse,
} from "./msdyn_CloneMultipleMessage.js";
export {
  msdyn_ConditionXmlConversionRequest,
  msdyn_ConditionXmlConversionResponse,
} from "./msdyn_ConditionXmlConversionMessage.js";
export {
  msdyn_ConnectSequenceRequest,
  msdyn_ConnectSequenceResponse,
} from "./msdyn_ConnectSequenceMessage.js";
export {
  msdyn_conversationclosecasesentimentRequest,
  msdyn_conversationclosecasesentimentResponse,
} from "./msdyn_conversationclosecasesentimentMessage.js";
export {
  msdyn_ConversationConductorEnablerRequest,
  msdyn_ConversationConductorEnablerResponse,
} from "./msdyn_ConversationConductorEnablerMessage.js";
export {
  msdyn_ConvertCJOJsonToSequenceJsonRequest,
  msdyn_ConvertCJOJsonToSequenceJsonResponse,
} from "./msdyn_ConvertCJOJsonToSequenceJsonMessage.js";
export {
  msdyn_ConvertDateTimeOnCalendarTimeZoneRequest,
  msdyn_ConvertDateTimeOnCalendarTimeZoneResponse,
} from "./msdyn_ConvertDateTimeOnCalendarTimeZoneMessage.js";
export {
  msdyn_ConvertSequenceJsonToCJOJsonRequest,
  msdyn_ConvertSequenceJsonToCJOJsonResponse,
} from "./msdyn_ConvertSequenceJsonToCJOJsonMessage.js";
export {
  msdyn_ConvertToLocalizedFeaturesRequest,
  msdyn_ConvertToLocalizedFeaturesResponse,
} from "./msdyn_ConvertToLocalizedFeaturesMessage.js";
export {
  msdyn_CopilotCreateOutlookMessageOrAppointmentRequest,
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
  msdyn_CRACaseClosureResponse,
} from "./msdyn_CRACaseClosureMessage.js";
export {
  msdyn_create_virtual_table_v2Request,
  msdyn_create_virtual_table_v2Response,
} from "./msdyn_create_virtual_table_v2Message.js";
export {
  msdyn_CreateActionFlowRequest,
  msdyn_CreateActionFlowResponse,
} from "./msdyn_CreateActionFlowMessage.js";
export {
  msdyn_CreateAITestCaseRequest,
  msdyn_CreateAITestCaseResponse,
} from "./msdyn_CreateAITestCaseMessage.js";
export {
  msdyn_CreateApmEventHandlerRequest,
  msdyn_CreateApmEventHandlerResponse,
} from "./msdyn_CreateApmEventHandlerMessage.js";
export {
  msdyn_CreateAutonomousEmailRequest,
  msdyn_CreateAutonomousEmailResponse,
} from "./msdyn_CreateAutonomousEmailMessage.js";
export {
  msdyn_CreateAutonomousEmailWrapperRequest,
  msdyn_CreateAutonomousEmailWrapperResponse,
} from "./msdyn_CreateAutonomousEmailWrapperMessage.js";
export {
  msdyn_CreateBSMRecordRequest,
  msdyn_CreateBSMRecordResponse,
} from "./msdyn_CreateBSMRecordMessage.js";
export {
  msdyn_CreateCustomActionDefinitionRequest,
  msdyn_CreateCustomActionDefinitionResponse,
} from "./msdyn_CreateCustomActionDefinitionMessage.js";
export {
  msdyn_CreateDraftResponseForActionRequest,
  msdyn_CreateDraftResponseForActionResponse,
} from "./msdyn_CreateDraftResponseForActionMessage.js";
export {
  msdyn_CreateEntityRequest,
  msdyn_CreateEntityResponse,
} from "./msdyn_CreateEntityMessage.js";
export {
  msdyn_createevaluationplanbatchRequest,
  msdyn_createevaluationplanbatchResponse,
} from "./msdyn_createevaluationplanbatchMessage.js";
export {
  msdyn_CreateEvaluationRecordsForPlanRequest,
  msdyn_CreateEvaluationRecordsForPlanResponse,
} from "./msdyn_CreateEvaluationRecordsForPlanMessage.js";
export {
  msdyn_CreateKBArticleRequest,
  msdyn_CreateKBArticleResponse,
} from "./msdyn_CreateKBArticleMessage.js";
export {
  msdyn_CreateNewAnalysisJobRequest,
  msdyn_CreateNewAnalysisJobResponse,
} from "./msdyn_CreateNewAnalysisJobMessage.js";
export {
  msdyn_CreateNewAnalysisJobForRuleSetRequest,
  msdyn_CreateNewAnalysisJobForRuleSetResponse,
} from "./msdyn_CreateNewAnalysisJobForRuleSetMessage.js";
export {
  msdyn_CreatePredictionRequest,
  msdyn_CreatePredictionResponse,
} from "./msdyn_CreatePredictionMessage.js";
export {
  msdyn_CreatePublishAIConfigRequest,
  msdyn_CreatePublishAIConfigResponse,
} from "./msdyn_CreatePublishAIConfigMessage.js";
export {
  msdyn_CreatePublishAIModelRequest,
  msdyn_CreatePublishAIModelResponse,
} from "./msdyn_CreatePublishAIModelMessage.js";
export {
  msdyn_CreateRecordWithRuleBasedPredictionsRequest,
  msdyn_CreateRecordWithRuleBasedPredictionsResponse,
} from "./msdyn_CreateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_CreateRequirementGroupBookingsRequest,
  msdyn_CreateRequirementGroupBookingsResponse,
} from "./msdyn_CreateRequirementGroupBookingsMessage.js";
export {
  msdyn_CreateRequirementModelRequest,
  msdyn_CreateRequirementModelResponse,
} from "./msdyn_CreateRequirementModelMessage.js";
export {
  msdyn_CreateResourceOptimizationRequestRequest,
  msdyn_CreateResourceOptimizationRequestResponse,
} from "./msdyn_CreateResourceOptimizationRequestMessage.js";
export {
  msdyn_CreateSimilarOpportunitiyPredictionModelRequest,
  msdyn_CreateSimilarOpportunitiyPredictionModelResponse,
} from "./msdyn_CreateSimilarOpportunitiyPredictionModelMessage.js";
export {
  msdyn_CreateSuggestedActivityRequest,
  msdyn_CreateSuggestedActivityResponse,
} from "./msdyn_CreateSuggestedActivityMessage.js";
export {
  msdyn_CreateSuggestedContactRequest,
  msdyn_CreateSuggestedContactResponse,
} from "./msdyn_CreateSuggestedContactMessage.js";
export {
  msdyn_CreateSuggestedNextActionRequest,
  msdyn_CreateSuggestedNextActionResponse,
} from "./msdyn_CreateSuggestedNextActionMessage.js";
export {
  msdyn_CreateSwarmParticipantsRequest,
  msdyn_CreateSwarmParticipantsResponse,
} from "./msdyn_CreateSwarmParticipantsMessage.js";
export {
  msdyn_CreateTechniciansRequest,
  msdyn_CreateTechniciansResponse,
} from "./msdyn_CreateTechniciansMessage.js";
export {
  msdyn_createtemplatecvrelationshipsRequest,
  msdyn_createtemplatecvrelationshipsResponse,
} from "./msdyn_createtemplatecvrelationshipsMessage.js";
export {
  msdyn_CreateTrainConfigRequest,
  msdyn_CreateTrainConfigResponse,
} from "./msdyn_CreateTrainConfigMessage.js";
export {
  msdyn_CreateTrainEffortModelConfigRequest,
  msdyn_CreateTrainEffortModelConfigResponse,
} from "./msdyn_CreateTrainEffortModelConfigMessage.js";
export {
  msdyn_CreateWorkOrderRequest,
  msdyn_CreateWorkOrderResponse,
} from "./msdyn_CreateWorkOrderMessage.js";
export {
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest,
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse,
} from "./msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_CSCaseClosureProcessAgentResponseRequest,
  msdyn_CSCaseClosureProcessAgentResponseResponse,
} from "./msdyn_CSCaseClosureProcessAgentResponseMessage.js";
export {
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequest,
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse,
} from "./msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailMessage.js";
export {
  msdyn_CSCopilotResolveCaseRequest,
  msdyn_CSCopilotResolveCaseResponse,
} from "./msdyn_CSCopilotResolveCaseMessage.js";
export {
  msdyn_CustomApiCustomerServiceCaseSummaryRequest,
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
  msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse,
} from "./msdyn_CustomerServiceSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_D365ChannelsInboundRequest,
  msdyn_D365ChannelsInboundResponse,
} from "./msdyn_D365ChannelsInboundMessage.js";
export {
  msdyn_D365ChannelsNotificationRequest,
  msdyn_D365ChannelsNotificationResponse,
} from "./msdyn_D365ChannelsNotificationMessage.js";
export {
  msdyn_dataprovideroperationsRequest,
  msdyn_dataprovideroperationsResponse,
} from "./msdyn_dataprovideroperationsMessage.js";
export {
  msdyn_DataValidationApiRequest,
  msdyn_DataValidationApiResponse,
} from "./msdyn_DataValidationApiMessage.js";
export {
  msdyn_DCA_SendOutreachEmailRequest,
  msdyn_DCA_SendOutreachEmailResponse,
} from "./msdyn_DCA_SendOutreachEmailMessage.js";
export {
  msdyn_DecommissionFieldServiceSolutionHealthRulesRequest,
  msdyn_DecommissionFieldServiceSolutionHealthRulesResponse,
} from "./msdyn_DecommissionFieldServiceSolutionHealthRulesMessage.js";
export {
  msdyn_DeleteCalendarRequest,
  msdyn_DeleteCalendarResponse,
} from "./msdyn_DeleteCalendarMessage.js";
export { msdyn_DeleteFlowRequest, msdyn_DeleteFlowResponse } from "./msdyn_DeleteFlowMessage.js";
export {
  msdyn_DeletePredictionRequest,
  msdyn_DeletePredictionResponse,
} from "./msdyn_DeletePredictionMessage.js";
export {
  msdyn_DeprecateODOSRequest,
  msdyn_DeprecateODOSResponse,
} from "./msdyn_DeprecateODOSMessage.js";
export {
  msdyn_DeprovisionUnifiedRoutingRequest,
  msdyn_DeprovisionUnifiedRoutingResponse,
} from "./msdyn_DeprovisionUnifiedRoutingMessage.js";
export {
  msdyn_DisableBotUserRequest,
  msdyn_DisableBotUserResponse,
} from "./msdyn_DisableBotUserMessage.js";
export {
  msdyn_DisableUnstructuredDataRequest,
  msdyn_DisableUnstructuredDataResponse,
} from "./msdyn_DisableUnstructuredDataMessage.js";
export {
  msdyn_DisconnectSequenceRequest,
  msdyn_DisconnectSequenceResponse,
} from "./msdyn_DisconnectSequenceMessage.js";
export {
  msdyn_DismissEmailInfraActionCardRequest,
  msdyn_DismissEmailInfraActionCardResponse,
} from "./msdyn_DismissEmailInfraActionCardMessage.js";
export {
  msdyn_DismissSuggestedActivityRequest,
  msdyn_DismissSuggestedActivityResponse,
} from "./msdyn_DismissSuggestedActivityMessage.js";
export {
  msdyn_DismissSuggestedContactRequest,
  msdyn_DismissSuggestedContactResponse,
} from "./msdyn_DismissSuggestedContactMessage.js";
export { msdyn_DoesKBExistRequest, msdyn_DoesKBExistResponse } from "./msdyn_DoesKBExistMessage.js";
export {
  msdyn_DownloadMobileAppBuildRequest,
  msdyn_DownloadMobileAppBuildResponse,
} from "./msdyn_DownloadMobileAppBuildMessage.js";
export {
  msdyn_DraftEmailForCaseRequest,
  msdyn_DraftEmailForCaseResponse,
} from "./msdyn_DraftEmailForCaseMessage.js";
export {
  msdyn_DraftFollowupEmailWithTemplateRequest,
  msdyn_DraftFollowupEmailWithTemplateResponse,
} from "./msdyn_DraftFollowupEmailWithTemplateMessage.js";
export {
  msdyn_DraftOutreachEmailRequest,
  msdyn_DraftOutreachEmailResponse,
} from "./msdyn_DraftOutreachEmailMessage.js";
export {
  msdyn_DuplicateDetectionClientTriggerActionRequest,
  msdyn_DuplicateDetectionClientTriggerActionResponse,
} from "./msdyn_DuplicateDetectionClientTriggerActionMessage.js";
export {
  msdyn_DuplicateDetectionTriggerActionRequest,
  msdyn_DuplicateDetectionTriggerActionResponse,
} from "./msdyn_DuplicateDetectionTriggerActionMessage.js";
export {
  msdyn_DynamicForecastRetrievalRequest,
  msdyn_DynamicForecastRetrievalResponse,
} from "./msdyn_DynamicForecastRetrievalMessage.js";
export {
  msdyn_EditAndSaveSuggestedContactRequest,
  msdyn_EditAndSaveSuggestedContactResponse,
} from "./msdyn_EditAndSaveSuggestedContactMessage.js";
export {
  msdyn_editSalesSequenceExperimentStatusRequest,
  msdyn_editSalesSequenceExperimentStatusResponse,
} from "./msdyn_editSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_EditSequenceRequest,
  msdyn_EditSequenceResponse,
} from "./msdyn_EditSequenceMessage.js";
export {
  msdyn_EffortModelPredictionRequest,
  msdyn_EffortModelPredictionResponse,
} from "./msdyn_EffortModelPredictionMessage.js";
export {
  msdyn_emailAssistAdjustAPIRequest,
  msdyn_emailAssistAdjustAPIResponse,
} from "./msdyn_emailAssistAdjustAPIMessage.js";
export {
  msdyn_emailsentimentflowactionRequest,
  msdyn_emailsentimentflowactionResponse,
} from "./msdyn_emailsentimentflowactionMessage.js";
export {
  msdyn_EmailTemplateRecommendationRequest,
  msdyn_EmailTemplateRecommendationResponse,
} from "./msdyn_EmailTemplateRecommendationMessage.js";
export {
  msdyn_EmailValidationCustomActionRequest,
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
  msdyn_EnableUnifiedRoutingResponse,
} from "./msdyn_EnableUnifiedRoutingMessage.js";
export {
  msdyn_EnableUnstructuredDataRequest,
  msdyn_EnableUnstructuredDataResponse,
} from "./msdyn_EnableUnstructuredDataMessage.js";
export {
  msdyn_EvaluateConversationRequest,
  msdyn_EvaluateConversationResponse,
} from "./msdyn_EvaluateConversationMessage.js";
export {
  msdyn_EvaluateMasterEntityRoutingConfigurationRequest,
  msdyn_EvaluateMasterEntityRoutingConfigurationResponse,
} from "./msdyn_EvaluateMasterEntityRoutingConfigurationMessage.js";
export {
  msdyn_ExecuteAggregateAndUpdateIntentMetricsRequest,
  msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse,
} from "./msdyn_ExecuteAggregateAndUpdateIntentMetricsMessage.js";
export { msdyn_ExecuteARCRequest, msdyn_ExecuteARCResponse } from "./msdyn_ExecuteARCMessage.js";
export {
  msdyn_ExecuteCopilotServiceJobRequest,
  msdyn_ExecuteCopilotServiceJobResponse,
} from "./msdyn_ExecuteCopilotServiceJobMessage.js";
export {
  msdyn_ExecuteCustomerNotificationRequestRequest,
  msdyn_ExecuteCustomerNotificationRequestResponse,
} from "./msdyn_ExecuteCustomerNotificationRequestMessage.js";
export {
  msdyn_executeemailsentimentbotRequest,
  msdyn_executeemailsentimentbotResponse,
} from "./msdyn_executeemailsentimentbotMessage.js";
export {
  msdyn_ExecuteHttpServiceRequestRequest,
  msdyn_ExecuteHttpServiceRequestResponse,
} from "./msdyn_ExecuteHttpServiceRequestMessage.js";
export {
  msdyn_ExecutePrimaryCreatePostActionsRequest,
  msdyn_ExecutePrimaryCreatePostActionsResponse,
} from "./msdyn_ExecutePrimaryCreatePostActionsMessage.js";
export {
  msdyn_ExecuteRecurringSalesOperationRequest,
  msdyn_ExecuteRecurringSalesOperationResponse,
} from "./msdyn_ExecuteRecurringSalesOperationMessage.js";
export {
  msdyn_ExecuteSandboxRequestRequest,
  msdyn_ExecuteSandboxRequestResponse,
} from "./msdyn_ExecuteSandboxRequestMessage.js";
export {
  msdyn_ExecuteSIRequestRequest,
  msdyn_ExecuteSIRequestResponse,
} from "./msdyn_ExecuteSIRequestMessage.js";
export {
  msdyn_ExecuteSISampleDataRequestRequest,
  msdyn_ExecuteSISampleDataRequestResponse,
} from "./msdyn_ExecuteSISampleDataRequestMessage.js";
export {
  msdyn_ExpandOperatingHoursForEntityCollectionRequest,
  msdyn_ExpandOperatingHoursForEntityCollectionResponse,
} from "./msdyn_ExpandOperatingHoursForEntityCollectionMessage.js";
export {
  msdyn_ExportAnalyticsReportRequest,
  msdyn_ExportAnalyticsReportResponse,
} from "./msdyn_ExportAnalyticsReportMessage.js";
export {
  msdyn_ExternalContextCommitTranscriptUploadRequest,
  msdyn_ExternalContextCommitTranscriptUploadResponse,
} from "./msdyn_ExternalContextCommitTranscriptUploadMessage.js";
export {
  msdyn_ExternalContextInitiateTranscriptUploadRequest,
  msdyn_ExternalContextInitiateTranscriptUploadResponse,
} from "./msdyn_ExternalContextInitiateTranscriptUploadMessage.js";
export {
  msdyn_ExternalContextUploadTranscriptBlocksRequest,
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
  msdyn_FastPassBotEventUpdateResponse,
} from "./msdyn_FastPassBotEventUpdateMessage.js";
export { msdyn_FeedbackRequest, msdyn_FeedbackResponse } from "./msdyn_FeedbackMessage.js";
export {
  msdyn_FetchAllPredictionModelsRequest,
  msdyn_FetchAllPredictionModelsResponse,
} from "./msdyn_FetchAllPredictionModelsMessage.js";
export {
  msdyn_fetchAutonomousCaseCreateUpdateRuleRequest,
  msdyn_fetchAutonomousCaseCreateUpdateRuleResponse,
} from "./msdyn_fetchAutonomousCaseCreateUpdateRuleMessage.js";
export {
  msdyn_FetchDiagnosticEntitiesAndCountRequest,
  msdyn_FetchDiagnosticEntitiesAndCountResponse,
} from "./msdyn_FetchDiagnosticEntitiesAndCountMessage.js";
export {
  msdyn_fetchemailsentimentsapiRequest,
  msdyn_fetchemailsentimentsapiResponse,
} from "./msdyn_fetchemailsentimentsapiMessage.js";
export {
  msdyn_fetchEntityMetadataRequest,
  msdyn_fetchEntityMetadataResponse,
} from "./msdyn_fetchEntityMetadataMessage.js";
export {
  msdyn_FetchEvaluatedEntityInputConfigRequest,
  msdyn_FetchEvaluatedEntityInputConfigResponse,
} from "./msdyn_FetchEvaluatedEntityInputConfigMessage.js";
export {
  msdyn_FetchFCSValueRequest,
  msdyn_FetchFCSValueResponse,
} from "./msdyn_FetchFCSValueMessage.js";
export {
  msdyn_FetchKPIValuesRequest,
  msdyn_FetchKPIValuesResponse,
} from "./msdyn_FetchKPIValuesMessage.js";
export {
  msdyn_FieldServiceAgreementBookingIncidentCopyActionRequest,
  msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse,
} from "./msdyn_FieldServiceAgreementBookingIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceAgreementBookingIncidentStatusActionRequest,
  msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse,
} from "./msdyn_FieldServiceAgreementBookingIncidentStatusActionMessage.js";
export {
  msdyn_FieldServiceAgreementSystemStatusActionRequest,
  msdyn_FieldServiceAgreementSystemStatusActionResponse,
} from "./msdyn_FieldServiceAgreementSystemStatusActionMessage.js";
export {
  msdyn_FieldServiceBookableResourceBookingAssociateActionRequest,
  msdyn_FieldServiceBookableResourceBookingAssociateActionResponse,
} from "./msdyn_FieldServiceBookableResourceBookingAssociateActionMessage.js";
export {
  msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalRequest,
  msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalResponse,
} from "./msdyn_FieldServiceProvisionIncidentTypeRecommendationMLModelInternalMessage.js";
export {
  msdyn_FieldServiceQuoteBookingIncidentCopyActionRequest,
  msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse,
} from "./msdyn_FieldServiceQuoteBookingIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceSolutionHealthRulesRegistrationRequest,
  msdyn_FieldServiceSolutionHealthRulesRegistrationResponse,
} from "./msdyn_FieldServiceSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_FieldServiceSystemActionRequest,
  msdyn_FieldServiceSystemActionResponse,
} from "./msdyn_FieldServiceSystemActionMessage.js";
export {
  msdyn_FieldServiceSystemJobWOShareUnshareActionRequest,
  msdyn_FieldServiceSystemJobWOShareUnshareActionResponse,
} from "./msdyn_FieldServiceSystemJobWOShareUnshareActionMessage.js";
export {
  msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequest,
  msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse,
} from "./msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderIncidentCopyActionRequest,
  msdyn_FieldServiceWorkOrderIncidentCopyActionResponse,
} from "./msdyn_FieldServiceWorkOrderIncidentCopyActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderIncidentStatusActionRequest,
  msdyn_FieldServiceWorkOrderIncidentStatusActionResponse,
} from "./msdyn_FieldServiceWorkOrderIncidentStatusActionMessage.js";
export {
  msdyn_FieldServiceWorkOrderSystemStatusActionRequest,
  msdyn_FieldServiceWorkOrderSystemStatusActionResponse,
} from "./msdyn_FieldServiceWorkOrderSystemStatusActionMessage.js";
export {
  msdyn_FilterInActiveNBACardsRequest,
  msdyn_FilterInActiveNBACardsResponse,
} from "./msdyn_FilterInActiveNBACardsMessage.js";
export {
  msdyn_FindEntityForPolymorphicLookupRequest,
  msdyn_FindEntityForPolymorphicLookupResponse,
} from "./msdyn_FindEntityForPolymorphicLookupMessage.js";
export {
  msdyn_FindRulesetDependenciesRequest,
  msdyn_FindRulesetDependenciesResponse,
} from "./msdyn_FindRulesetDependenciesMessage.js";
export {
  msdyn_FixSLARelationshipsOnTargetEntitiesRequest,
  msdyn_FixSLARelationshipsOnTargetEntitiesResponse,
} from "./msdyn_FixSLARelationshipsOnTargetEntitiesMessage.js";
export { msdyn_ForecastApiRequest, msdyn_ForecastApiResponse } from "./msdyn_ForecastApiMessage.js";
export {
  msdyn_ForecastGenerateHierarchyRequest,
  msdyn_ForecastGenerateHierarchyResponse,
} from "./msdyn_ForecastGenerateHierarchyMessage.js";
export {
  msdyn_ForecastInstanceActionsRequest,
  msdyn_ForecastInstanceActionsResponse,
} from "./msdyn_ForecastInstanceActionsMessage.js";
export {
  msdyn_ForecastRecalculateRequest,
  msdyn_ForecastRecalculateResponse,
} from "./msdyn_ForecastRecalculateMessage.js";
export {
  msdyn_ForecastRecalculateAllRequest,
  msdyn_ForecastRecalculateAllResponse,
} from "./msdyn_ForecastRecalculateAllMessage.js";
export {
  msdyn_ForecastRecalculateAsyncRequest,
  msdyn_ForecastRecalculateAsyncResponse,
} from "./msdyn_ForecastRecalculateAsyncMessage.js";
export { msdyn_FpsActionRequest, msdyn_FpsActionResponse } from "./msdyn_FpsActionMessage.js";
export {
  msdyn_FSDemoDataRequestRequest,
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
  msdyn_GDPROptoutContactResponse,
} from "./msdyn_GDPROptoutContactMessage.js";
export {
  msdyn_GDPROptoutLeadRequest,
  msdyn_GDPROptoutLeadResponse,
} from "./msdyn_GDPROptoutLeadMessage.js";
export {
  msdyn_GDPROptoutUserRequest,
  msdyn_GDPROptoutUserResponse,
} from "./msdyn_GDPROptoutUserMessage.js";
export {
  msdyn_GenerateGeofenceEventRequest,
  msdyn_GenerateGeofenceEventResponse,
} from "./msdyn_GenerateGeofenceEventMessage.js";
export {
  msdyn_GeneratePlatformSummaryRequest,
  msdyn_GeneratePlatformSummaryResponse,
} from "./msdyn_GeneratePlatformSummaryMessage.js";
export {
  msdyn_GeneratePlatformSummaryConfigRecordsRequest,
  msdyn_GeneratePlatformSummaryConfigRecordsResponse,
} from "./msdyn_GeneratePlatformSummaryConfigRecordsMessage.js";
export {
  msdyn_GeocodeAddressRequest,
  msdyn_GeocodeAddressResponse,
} from "./msdyn_GeocodeAddressMessage.js";
export {
  msdyn_GeolocationLocationTrackingDataRequest,
  msdyn_GeolocationLocationTrackingDataResponse,
} from "./msdyn_GeolocationLocationTrackingDataMessage.js";
export {
  msdyn_GeolocationLocationTrackingEnabledRequest,
  msdyn_GeolocationLocationTrackingEnabledResponse,
} from "./msdyn_GeolocationLocationTrackingEnabledMessage.js";
export {
  msdyn_get_required_fieldsRequest,
  msdyn_get_required_fieldsResponse,
} from "./msdyn_get_required_fieldsMessage.js";
export {
  msdyn_GetACIMarsConnectorStatusRequest,
  msdyn_GetACIMarsConnectorStatusResponse,
} from "./msdyn_GetACIMarsConnectorStatusMessage.js";
export {
  msdyn_GetActionTypesRequest,
  msdyn_GetActionTypesResponse,
} from "./msdyn_GetActionTypesMessage.js";
export {
  msdyn_GetAdditionalPropertiesMetadataRequest,
  msdyn_GetAdditionalPropertiesMetadataResponse,
} from "./msdyn_GetAdditionalPropertiesMetadataMessage.js";
export {
  msdyn_GetAgentAssistStreamRequest,
  msdyn_GetAgentAssistStreamResponse,
} from "./msdyn_GetAgentAssistStreamMessage.js";
export {
  msdyn_GetAISuggestedContactsRequest,
  msdyn_GetAISuggestedContactsResponse,
} from "./msdyn_GetAISuggestedContactsMessage.js";
export {
  msdyn_GetAllAttributesDataRequest,
  msdyn_GetAllAttributesDataResponse,
} from "./msdyn_GetAllAttributesDataMessage.js";
export {
  msdyn_GetAllLeadPredictionModelsRequest,
  msdyn_GetAllLeadPredictionModelsResponse,
} from "./msdyn_GetAllLeadPredictionModelsMessage.js";
export {
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest,
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse,
} from "./msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsMessage.js";
export {
  msdyn_GetAnalyticsReportDetailRequest,
  msdyn_GetAnalyticsReportDetailResponse,
} from "./msdyn_GetAnalyticsReportDetailMessage.js";
export {
  msdyn_GetAnalyticsReportTokenRequest,
  msdyn_GetAnalyticsReportTokenResponse,
} from "./msdyn_GetAnalyticsReportTokenMessage.js";
export {
  msdyn_GetAnswerFromDocumentsRequest,
  msdyn_GetAnswerFromDocumentsResponse,
} from "./msdyn_GetAnswerFromDocumentsMessage.js";
export {
  msdyn_getAppConfigRequest,
  msdyn_getAppConfigResponse,
} from "./msdyn_getAppConfigMessage.js";
export {
  msdyn_getAppConfigByContextRequest,
  msdyn_getAppConfigByContextResponse,
} from "./msdyn_getAppConfigByContextMessage.js";
export {
  msdyn_GetAppInsightsTelemetryRequest,
  msdyn_GetAppInsightsTelemetryResponse,
} from "./msdyn_GetAppInsightsTelemetryMessage.js";
export {
  msdyn_GetAppModuleSettingsRequest,
  msdyn_GetAppModuleSettingsResponse,
} from "./msdyn_GetAppModuleSettingsMessage.js";
export {
  msdyn_GetAttributeInfluenceStatisticsRequest,
  msdyn_GetAttributeInfluenceStatisticsResponse,
} from "./msdyn_GetAttributeInfluenceStatisticsMessage.js";
export {
  msdyn_GetAuditStateRequest,
  msdyn_GetAuditStateResponse,
} from "./msdyn_GetAuditStateMessage.js";
export {
  msdyn_GetAutoCaptureUriRequest,
  msdyn_GetAutoCaptureUriResponse,
} from "./msdyn_GetAutoCaptureUriMessage.js";
export {
  msdyn_GetAutonomousAgentEmailAssistRequest,
  msdyn_GetAutonomousAgentEmailAssistResponse,
} from "./msdyn_GetAutonomousAgentEmailAssistMessage.js";
export {
  msdyn_GetAvailabilitySummaryFromDemandRequest,
  msdyn_GetAvailabilitySummaryFromDemandResponse,
} from "./msdyn_GetAvailabilitySummaryFromDemandMessage.js";
export {
  msdyn_GetAzureTokenRequest,
  msdyn_GetAzureTokenResponse,
} from "./msdyn_GetAzureTokenMessage.js";
export {
  msdyn_GetBookableResourcesRequest,
  msdyn_GetBookableResourcesResponse,
} from "./msdyn_GetBookableResourcesMessage.js";
export {
  msdyn_GetBookingDetailsByRequirementIdsRequest,
  msdyn_GetBookingDetailsByRequirementIdsResponse,
} from "./msdyn_GetBookingDetailsByRequirementIdsMessage.js";
export {
  msdyn_GetBoolFCSValueRequest,
  msdyn_GetBoolFCSValueResponse,
} from "./msdyn_GetBoolFCSValueMessage.js";
export {
  msdyn_GetBotConfigurationRequest,
  msdyn_GetBotConfigurationResponse,
} from "./msdyn_GetBotConfigurationMessage.js";
export {
  msdyn_GetCaseAggregationRequest,
  msdyn_GetCaseAggregationResponse,
} from "./msdyn_GetCaseAggregationMessage.js";
export {
  msdyn_GetCaseResolutionAgentSettingsRequest,
  msdyn_GetCaseResolutionAgentSettingsResponse,
} from "./msdyn_GetCaseResolutionAgentSettingsMessage.js";
export {
  msdyn_GetCaseSuggestionsRequest,
  msdyn_GetCaseSuggestionsResponse,
} from "./msdyn_GetCaseSuggestionsMessage.js";
export {
  msdyn_GetCecCompatibilityForOmniChannelRequest,
  msdyn_GetCecCompatibilityForOmniChannelResponse,
} from "./msdyn_GetCecCompatibilityForOmniChannelMessage.js";
export {
  msdyn_GetChatResponseRequest,
  msdyn_GetChatResponseResponse,
} from "./msdyn_GetChatResponseMessage.js";
export {
  msdyn_GetChildrensForHierarchyRequest,
  msdyn_GetChildrensForHierarchyResponse,
} from "./msdyn_GetChildrensForHierarchyMessage.js";
export {
  msdyn_GetChildResourcesRequest,
  msdyn_GetChildResourcesResponse,
} from "./msdyn_GetChildResourcesMessage.js";
export {
  msdyn_GetCJOTreeNodesRequest,
  msdyn_GetCJOTreeNodesResponse,
} from "./msdyn_GetCJOTreeNodesMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberRequest,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequest,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineMessage.js";
export {
  msdyn_GetContactsFromAssociatedConversationsRequest,
  msdyn_GetContactsFromAssociatedConversationsResponse,
} from "./msdyn_GetContactsFromAssociatedConversationsMessage.js";
export {
  msdyn_GetContactsFromTimelineRequest,
  msdyn_GetContactsFromTimelineResponse,
} from "./msdyn_GetContactsFromTimelineMessage.js";
export {
  msdyn_GetCopilotAgentStatusForEnvironmentRequest,
  msdyn_GetCopilotAgentStatusForEnvironmentResponse,
} from "./msdyn_GetCopilotAgentStatusForEnvironmentMessage.js";
export {
  msdyn_GetCopilotServiceStreamRequest,
  msdyn_GetCopilotServiceStreamResponse,
} from "./msdyn_GetCopilotServiceStreamMessage.js";
export {
  msdyn_GetCopilotSettingsDataRequest,
  msdyn_GetCopilotSettingsDataResponse,
} from "./msdyn_GetCopilotSettingsDataMessage.js";
export {
  msdyn_getCTandEACdisabledEntitiesRequest,
  msdyn_getCTandEACdisabledEntitiesResponse,
} from "./msdyn_getCTandEACdisabledEntitiesMessage.js";
export {
  msdyn_getcurrentemailcontentRequest,
  msdyn_getcurrentemailcontentResponse,
} from "./msdyn_getcurrentemailcontentMessage.js";
export {
  msdyn_GetCustomActionListRequest,
  msdyn_GetCustomActionListResponse,
} from "./msdyn_GetCustomActionListMessage.js";
export {
  msdyn_GetCustomActionParametersRequest,
  msdyn_GetCustomActionParametersResponse,
} from "./msdyn_GetCustomActionParametersMessage.js";
export {
  msdyn_GetDocumentContentRequest,
  msdyn_GetDocumentContentResponse,
} from "./msdyn_GetDocumentContentMessage.js";
export {
  msdyn_GetDuplicatesActionRequest,
  msdyn_GetDuplicatesActionResponse,
} from "./msdyn_GetDuplicatesActionMessage.js";
export {
  msdyn_GetDynamicFieldsForActionTypeRequest,
  msdyn_GetDynamicFieldsForActionTypeResponse,
} from "./msdyn_GetDynamicFieldsForActionTypeMessage.js";
export {
  msdyn_GetEligibleRegardingEntitiesRequest,
  msdyn_GetEligibleRegardingEntitiesResponse,
} from "./msdyn_GetEligibleRegardingEntitiesMessage.js";
export {
  msdyn_GetEmailAssistStreamRequest,
  msdyn_GetEmailAssistStreamResponse,
} from "./msdyn_GetEmailAssistStreamMessage.js";
export {
  msdyn_GetEntityListRequest,
  msdyn_GetEntityListResponse,
} from "./msdyn_GetEntityListMessage.js";
export {
  msdyn_GetEntityListForCustomActionRequest,
  msdyn_GetEntityListForCustomActionResponse,
} from "./msdyn_GetEntityListForCustomActionMessage.js";
export {
  msdyn_GetEntityViewsRequest,
  msdyn_GetEntityViewsResponse,
} from "./msdyn_GetEntityViewsMessage.js";
export {
  msdyn_GetExpandedContractRequest,
  msdyn_GetExpandedContractResponse,
} from "./msdyn_GetExpandedContractMessage.js";
export {
  msdyn_GetExtractsFromContentRequest,
  msdyn_GetExtractsFromContentResponse,
} from "./msdyn_GetExtractsFromContentMessage.js";
export {
  msdyn_GetFavoriteArticlesRequest,
  msdyn_GetFavoriteArticlesResponse,
} from "./msdyn_GetFavoriteArticlesMessage.js";
export { msdyn_GetFCBValueRequest, msdyn_GetFCBValueResponse } from "./msdyn_GetFCBValueMessage.js";
export { msdyn_GetFCSValueRequest, msdyn_GetFCSValueResponse } from "./msdyn_GetFCSValueMessage.js";
export {
  msdyn_GetFCSWithUserContextRequest,
  msdyn_GetFCSWithUserContextResponse,
} from "./msdyn_GetFCSWithUserContextMessage.js";
export {
  msdyn_GetFeatureConsentStatusRequest,
  msdyn_GetFeatureConsentStatusResponse,
} from "./msdyn_GetFeatureConsentStatusMessage.js";
export {
  msdyn_GetFeatureControlStatusRequest,
  msdyn_GetFeatureControlStatusResponse,
} from "./msdyn_GetFeatureControlStatusMessage.js";
export {
  msdyn_GetFormattedOpportunityDataRequest,
  msdyn_GetFormattedOpportunityDataResponse,
} from "./msdyn_GetFormattedOpportunityDataMessage.js";
export {
  msdyn_GetGPT3PredictionRequest,
  msdyn_GetGPT3PredictionResponse,
} from "./msdyn_GetGPT3PredictionMessage.js";
export {
  msdyn_GetHierarchyDataRequest,
  msdyn_GetHierarchyDataResponse,
} from "./msdyn_GetHierarchyDataMessage.js";
export { msdyn_GetInsightsRequest, msdyn_GetInsightsResponse } from "./msdyn_GetInsightsMessage.js";
export {
  msdyn_GetIntentAssistSuggestionsForBotRequest,
  msdyn_GetIntentAssistSuggestionsForBotResponse,
} from "./msdyn_GetIntentAssistSuggestionsForBotMessage.js";
export {
  msdyn_GetIoTAlertAggregationRequest,
  msdyn_GetIoTAlertAggregationResponse,
} from "./msdyn_GetIoTAlertAggregationMessage.js";
export {
  msdyn_GetIoTCommandMetadataRequest,
  msdyn_GetIoTCommandMetadataResponse,
} from "./msdyn_GetIoTCommandMetadataMessage.js";
export {
  msdyn_GetIoTVisualizationSummaryRequest,
  msdyn_GetIoTVisualizationSummaryResponse,
} from "./msdyn_GetIoTVisualizationSummaryMessage.js";
export {
  msdyn_getIslandUrlRequest,
  msdyn_getIslandUrlResponse,
} from "./msdyn_getIslandUrlMessage.js";
export {
  msdyn_GetKAObjectFromTemplateRequest,
  msdyn_GetKAObjectFromTemplateResponse,
} from "./msdyn_GetKAObjectFromTemplateMessage.js";
export { msdyn_GetKeywordsRequest, msdyn_GetKeywordsResponse } from "./msdyn_GetKeywordsMessage.js";
export {
  msdyn_GetKnowledgeDraftAssistStreamRequest,
  msdyn_GetKnowledgeDraftAssistStreamResponse,
} from "./msdyn_GetKnowledgeDraftAssistStreamMessage.js";
export {
  msdyn_GetKnowledgeSuggestionsRequest,
  msdyn_GetKnowledgeSuggestionsResponse,
} from "./msdyn_GetKnowledgeSuggestionsMessage.js";
export {
  msdyn_GetLeadCallPrepSheetDetailsRequest,
  msdyn_GetLeadCallPrepSheetDetailsResponse,
} from "./msdyn_GetLeadCallPrepSheetDetailsMessage.js";
export {
  msdyn_GetLeadPreferredOutreachCtaRequest,
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
  msdyn_GetLineOfBusinessOptionValueResponse,
} from "./msdyn_GetLineOfBusinessOptionValueMessage.js";
export {
  msdyn_GetMessageForCaseFollowupAndClosureAgentRequest,
  msdyn_GetMessageForCaseFollowupAndClosureAgentResponse,
} from "./msdyn_GetMessageForCaseFollowupAndClosureAgentMessage.js";
export {
  msdyn_GetMessageIdsForOpportunityCustomActionRequest,
  msdyn_GetMessageIdsForOpportunityCustomActionResponse,
} from "./msdyn_GetMessageIdsForOpportunityCustomActionMessage.js";
export {
  msdyn_GetMLPredictionRequest,
  msdyn_GetMLPredictionResponse,
} from "./msdyn_GetMLPredictionMessage.js";
export {
  msdyn_GetMultipleResourceBookingDetailsRequest,
  msdyn_GetMultipleResourceBookingDetailsResponse,
} from "./msdyn_GetMultipleResourceBookingDetailsMessage.js";
export {
  msdyn_GetNotesAnalysisRequest,
  msdyn_GetNotesAnalysisResponse,
} from "./msdyn_GetNotesAnalysisMessage.js";
export {
  msdyn_GetOCSharedServiceURIRequest,
  msdyn_GetOCSharedServiceURIResponse,
} from "./msdyn_GetOCSharedServiceURIMessage.js";
export {
  msdyn_GetODOSFeatureEnabledRolesRequest,
  msdyn_GetODOSFeatureEnabledRolesResponse,
} from "./msdyn_GetODOSFeatureEnabledRolesMessage.js";
export {
  msdyn_GetODOSFeatureProvisioningStatusRequest,
  msdyn_GetODOSFeatureProvisioningStatusResponse,
} from "./msdyn_GetODOSFeatureProvisioningStatusMessage.js";
export {
  msdyn_GetODOSMetadataRequest,
  msdyn_GetODOSMetadataResponse,
} from "./msdyn_GetODOSMetadataMessage.js";
export {
  msdyn_GetOpportunityResearchResultRequest,
  msdyn_GetOpportunityResearchResultResponse,
} from "./msdyn_GetOpportunityResearchResultMessage.js";
export {
  msdyn_GetOrCreateBookableResourcesRequest,
  msdyn_GetOrCreateBookableResourcesResponse,
} from "./msdyn_GetOrCreateBookableResourcesMessage.js";
export {
  msdyn_GetOrCreateExtUserSettingRequest,
  msdyn_GetOrCreateExtUserSettingResponse,
} from "./msdyn_GetOrCreateExtUserSettingMessage.js";
export {
  msdyn_GetOrCreateLinkedActivityRequest,
  msdyn_GetOrCreateLinkedActivityResponse,
} from "./msdyn_GetOrCreateLinkedActivityMessage.js";
export {
  msdyn_GetOrganizationalUnitsWithinRadiusRequest,
  msdyn_GetOrganizationalUnitsWithinRadiusResponse,
} from "./msdyn_GetOrganizationalUnitsWithinRadiusMessage.js";
export {
  msdyn_GetOrganizationProvisioningStatusRequest,
  msdyn_GetOrganizationProvisioningStatusResponse,
} from "./msdyn_GetOrganizationProvisioningStatusMessage.js";
export {
  msdyn_GetORReasonExplanationRequest,
  msdyn_GetORReasonExplanationResponse,
} from "./msdyn_GetORReasonExplanationMessage.js";
export { msdyn_GetPoPTokenRequest, msdyn_GetPoPTokenResponse } from "./msdyn_GetPoPTokenMessage.js";
export {
  msdyn_GetPostOperationsRequest,
  msdyn_GetPostOperationsResponse,
} from "./msdyn_GetPostOperationsMessage.js";
export {
  msdyn_GetPredictionModelStatusRequest,
  msdyn_GetPredictionModelStatusResponse,
} from "./msdyn_GetPredictionModelStatusMessage.js";
export {
  msdyn_GetPremiumOrgStatusRequest,
  msdyn_GetPremiumOrgStatusResponse,
} from "./msdyn_GetPremiumOrgStatusMessage.js";
export {
  msdyn_GetPromoContentFromIrisRequest,
  msdyn_GetPromoContentFromIrisResponse,
} from "./msdyn_GetPromoContentFromIrisMessage.js";
export {
  msdyn_GetRecordUsersRequest,
  msdyn_GetRecordUsersResponse,
} from "./msdyn_GetRecordUsersMessage.js";
export {
  msdyn_GetRelatedIoTDevicesByEntityRequest,
  msdyn_GetRelatedIoTDevicesByEntityResponse,
} from "./msdyn_GetRelatedIoTDevicesByEntityMessage.js";
export {
  msdyn_GetRelatedOpportunitiesForOpptyResearchRequest,
  msdyn_GetRelatedOpportunitiesForOpptyResearchResponse,
} from "./msdyn_GetRelatedOpportunitiesForOpptyResearchMessage.js";
export {
  msdyn_GetRequirementChartDataRequest,
  msdyn_GetRequirementChartDataResponse,
} from "./msdyn_GetRequirementChartDataMessage.js";
export {
  msdyn_GetRequirementDemandRequest,
  msdyn_GetRequirementDemandResponse,
} from "./msdyn_GetRequirementDemandMessage.js";
export {
  msdyn_GetRequirementDemandDisplayRequest,
  msdyn_GetRequirementDemandDisplayResponse,
} from "./msdyn_GetRequirementDemandDisplayMessage.js";
export {
  msdyn_GetRequirementDependencySetRequest,
  msdyn_GetRequirementDependencySetResponse,
} from "./msdyn_GetRequirementDependencySetMessage.js";
export {
  msdyn_GetRequirementModelsRequest,
  msdyn_GetRequirementModelsResponse,
} from "./msdyn_GetRequirementModelsMessage.js";
export {
  msdyn_GetResourceBookingDetailsRequest,
  msdyn_GetResourceBookingDetailsResponse,
} from "./msdyn_GetResourceBookingDetailsMessage.js";
export {
  msdyn_GetResourceBookingFormParametersRequest,
  msdyn_GetResourceBookingFormParametersResponse,
} from "./msdyn_GetResourceBookingFormParametersMessage.js";
export {
  msdyn_GetResourceGroupMembershipsRequest,
  msdyn_GetResourceGroupMembershipsResponse,
} from "./msdyn_GetResourceGroupMembershipsMessage.js";
export {
  msdyn_GetResourcePopupDetailsRequest,
  msdyn_GetResourcePopupDetailsResponse,
} from "./msdyn_GetResourcePopupDetailsMessage.js";
export {
  msdyn_GetResourcesRequest,
  msdyn_GetResourcesResponse,
} from "./msdyn_GetResourcesMessage.js";
export {
  msdyn_GetResourceUtilizationGridRequest,
  msdyn_GetResourceUtilizationGridResponse,
} from "./msdyn_GetResourceUtilizationGridMessage.js";
export {
  msdyn_GetResourceWorkHoursForTimeFrameRequest,
  msdyn_GetResourceWorkHoursForTimeFrameResponse,
} from "./msdyn_GetResourceWorkHoursForTimeFrameMessage.js";
export {
  msdyn_GetRICommonFCBStatusRequest,
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
  msdyn_GetSalesAcceleratedSellerResponse,
} from "./msdyn_GetSalesAcceleratedSellerMessage.js";
export {
  msdyn_GetSalesAcceleratedSellerDetailsRequest,
  msdyn_GetSalesAcceleratedSellerDetailsResponse,
} from "./msdyn_GetSalesAcceleratedSellerDetailsMessage.js";
export {
  msdyn_GetSalesAccelerationConfigurationStatusRequest,
  msdyn_GetSalesAccelerationConfigurationStatusResponse,
} from "./msdyn_GetSalesAccelerationConfigurationStatusMessage.js";
export {
  msdyn_GetSalesCopilotConsentAndInfraStatusRequest,
  msdyn_GetSalesCopilotConsentAndInfraStatusResponse,
} from "./msdyn_GetSalesCopilotConsentAndInfraStatusMessage.js";
export {
  msdyn_GetSalesCopilotEmailInsightsRequest,
  msdyn_GetSalesCopilotEmailInsightsResponse,
} from "./msdyn_GetSalesCopilotEmailInsightsMessage.js";
export {
  msdyn_GetSalesMeetingsRequest,
  msdyn_GetSalesMeetingsResponse,
} from "./msdyn_GetSalesMeetingsMessage.js";
export {
  msdyn_GetSalesRowSummaryRequest,
  msdyn_GetSalesRowSummaryResponse,
} from "./msdyn_GetSalesRowSummaryMessage.js";
export {
  msdyn_getSalesSequenceExperimentSettingsRequest,
  msdyn_getSalesSequenceExperimentSettingsResponse,
} from "./msdyn_getSalesSequenceExperimentSettingsMessage.js";
export {
  msdyn_getSalesSequenceExperimentStatusRequest,
  msdyn_getSalesSequenceExperimentStatusResponse,
} from "./msdyn_getSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_getSalesSequenceExperimentVersionRequest,
  msdyn_getSalesSequenceExperimentVersionResponse,
} from "./msdyn_getSalesSequenceExperimentVersionMessage.js";
export {
  msdyn_GetSankeyDataRequest,
  msdyn_GetSankeyDataResponse,
} from "./msdyn_GetSankeyDataMessage.js";
export {
  msdyn_GetSankeyViewKPIsRequest,
  msdyn_GetSankeyViewKPIsResponse,
} from "./msdyn_GetSankeyViewKPIsMessage.js";
export {
  msdyn_GetSellerAuditStateRequest,
  msdyn_GetSellerAuditStateResponse,
} from "./msdyn_GetSellerAuditStateMessage.js";
export {
  msdyn_GetSequenceAnalyticsKPIsRequest,
  msdyn_GetSequenceAnalyticsKPIsResponse,
} from "./msdyn_GetSequenceAnalyticsKPIsMessage.js";
export {
  msdyn_GetSequenceAssignedOwnersRequest,
  msdyn_GetSequenceAssignedOwnersResponse,
} from "./msdyn_GetSequenceAssignedOwnersMessage.js";
export {
  msdyn_GetServiceBaseUrlRequest,
  msdyn_GetServiceBaseUrlResponse,
} from "./msdyn_GetServiceBaseUrlMessage.js";
export {
  msdyn_GetSIFeatureConfigurationRequest,
  msdyn_GetSIFeatureConfigurationResponse,
} from "./msdyn_GetSIFeatureConfigurationMessage.js";
export {
  msdyn_GetSILicenseStatusRequest,
  msdyn_GetSILicenseStatusResponse,
} from "./msdyn_GetSILicenseStatusMessage.js";
export {
  msdyn_GetSIPackageStatusRequest,
  msdyn_GetSIPackageStatusResponse,
} from "./msdyn_GetSIPackageStatusMessage.js";
export {
  msdyn_GetSubjectHierarchyDataRequest,
  msdyn_GetSubjectHierarchyDataResponse,
} from "./msdyn_GetSubjectHierarchyDataMessage.js";
export {
  msdyn_GetSuggestedActionsForLeadRequest,
  msdyn_GetSuggestedActionsForLeadResponse,
} from "./msdyn_GetSuggestedActionsForLeadMessage.js";
export {
  msdyn_GetSuggestedContactsRequest,
  msdyn_GetSuggestedContactsResponse,
} from "./msdyn_GetSuggestedContactsMessage.js";
export {
  msdyn_GetSummaryBookingsRequest,
  msdyn_GetSummaryBookingsResponse,
} from "./msdyn_GetSummaryBookingsMessage.js";
export {
  msdyn_GetSwarmInvitationCardRequest,
  msdyn_GetSwarmInvitationCardResponse,
} from "./msdyn_GetSwarmInvitationCardMessage.js";
export {
  msdyn_GetSwarmResponseCardRequest,
  msdyn_GetSwarmResponseCardResponse,
} from "./msdyn_GetSwarmResponseCardMessage.js";
export {
  msdyn_GetSwarmSkillsRequest,
  msdyn_GetSwarmSkillsResponse,
} from "./msdyn_GetSwarmSkillsMessage.js";
export {
  msdyn_GetTalkingPointsRequest,
  msdyn_GetTalkingPointsResponse,
} from "./msdyn_GetTalkingPointsMessage.js";
export {
  msdyn_GetTimeLineRecordsRequest,
  msdyn_GetTimeLineRecordsResponse,
} from "./msdyn_GetTimeLineRecordsMessage.js";
export {
  msdyn_GetTrainingResultsRequest,
  msdyn_GetTrainingResultsResponse,
} from "./msdyn_GetTrainingResultsMessage.js";
export {
  msdyn_GetUserConsentStatusRequest,
  msdyn_GetUserConsentStatusResponse,
} from "./msdyn_GetUserConsentStatusMessage.js";
export {
  msdyn_GetWidgetsDataRequest,
  msdyn_GetWidgetsDataResponse,
} from "./msdyn_GetWidgetsDataMessage.js";
export {
  msdyn_GetWorkListConfigurationRequest,
  msdyn_GetWorkListConfigurationResponse,
} from "./msdyn_GetWorkListConfigurationMessage.js";
export {
  msdyn_GetWorkOrderAggregationRequest,
  msdyn_GetWorkOrderAggregationResponse,
} from "./msdyn_GetWorkOrderAggregationMessage.js";
export {
  msdyn_HandleTrainingStatusRequest,
  msdyn_HandleTrainingStatusResponse,
} from "./msdyn_HandleTrainingStatusMessage.js";
export {
  msdyn_ImportAnalyticsReportRequest,
  msdyn_ImportAnalyticsReportResponse,
} from "./msdyn_ImportAnalyticsReportMessage.js";
export {
  msdyn_IngestAnalyticsDataRequest,
  msdyn_IngestAnalyticsDataResponse,
} from "./msdyn_IngestAnalyticsDataMessage.js";
export {
  msdyn_IngestAnalyticsDataCustomChannelsRequest,
  msdyn_IngestAnalyticsDataCustomChannelsResponse,
} from "./msdyn_IngestAnalyticsDataCustomChannelsMessage.js";
export {
  msdyn_InitEntityRoutingRequest,
  msdyn_InitEntityRoutingResponse,
} from "./msdyn_InitEntityRoutingMessage.js";
export {
  msdyn_InitEntityRoutingFlowRequest,
  msdyn_InitEntityRoutingFlowResponse,
} from "./msdyn_InitEntityRoutingFlowMessage.js";
export {
  msdyn_initializedefaultclonequeryRequest,
  msdyn_initializedefaultclonequeryResponse,
} from "./msdyn_initializedefaultclonequeryMessage.js";
export {
  msdyn_InitializeSessionChannelRequest,
  msdyn_InitializeSessionChannelResponse,
} from "./msdyn_InitializeSessionChannelMessage.js";
export {
  msdyn_InitiateCCaaSAPIsAsyncRequest,
  msdyn_InitiateCCaaSAPIsAsyncResponse,
} from "./msdyn_InitiateCCaaSAPIsAsyncMessage.js";
export {
  msdyn_InitiateCCaaSCloseConversationRequest,
  msdyn_InitiateCCaaSCloseConversationResponse,
} from "./msdyn_InitiateCCaaSCloseConversationMessage.js";
export {
  msdyn_InitiateCCaaSPickConversationRequest,
  msdyn_InitiateCCaaSPickConversationResponse,
} from "./msdyn_InitiateCCaaSPickConversationMessage.js";
export {
  msdyn_InsertTrainingRecordsRequest,
  msdyn_InsertTrainingRecordsResponse,
} from "./msdyn_InsertTrainingRecordsMessage.js";
export {
  msdyn_InstallSalesInsightsSolutionRequest,
  msdyn_InstallSalesInsightsSolutionResponse,
} from "./msdyn_InstallSalesInsightsSolutionMessage.js";
export {
  msdyn_IntentServiceAPICallProxyRequest,
  msdyn_IntentServiceAPICallProxyResponse,
} from "./msdyn_IntentServiceAPICallProxyMessage.js";
export {
  msdyn_invokeCaseProcessingAgentRequest,
  msdyn_invokeCaseProcessingAgentResponse,
} from "./msdyn_invokeCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeCopilotAPIRequest,
  msdyn_InvokeCopilotAPIResponse,
} from "./msdyn_InvokeCopilotAPIMessage.js";
export {
  msdyn_invokeCustomAgentForCaseProcessingAgentRequest,
  msdyn_invokeCustomAgentForCaseProcessingAgentResponse,
} from "./msdyn_invokeCustomAgentForCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeEvaluationActionRequest,
  msdyn_InvokeEvaluationActionResponse,
} from "./msdyn_InvokeEvaluationActionMessage.js";
export {
  msdyn_InvokeGetNextSuggestionRequest,
  msdyn_InvokeGetNextSuggestionResponse,
} from "./msdyn_InvokeGetNextSuggestionMessage.js";
export {
  msdyn_InvokeIntelligenceActionRequest,
  msdyn_InvokeIntelligenceActionResponse,
} from "./msdyn_InvokeIntelligenceActionMessage.js";
export {
  msdyn_InvokeOutboundAPIRequest,
  msdyn_InvokeOutboundAPIResponse,
} from "./msdyn_InvokeOutboundAPIMessage.js";
export {
  msdyn_InvokeServiceStoredProcRequest,
  msdyn_InvokeServiceStoredProcResponse,
} from "./msdyn_InvokeServiceStoredProcMessage.js";
export {
  msdyn_InvokeStoredProcRequest,
  msdyn_InvokeStoredProcResponse,
} from "./msdyn_InvokeStoredProcMessage.js";
export {
  msdyn_IoTCheckIfRecordExistsInEntityRequest,
  msdyn_IoTCheckIfRecordExistsInEntityResponse,
} from "./msdyn_IoTCheckIfRecordExistsInEntityMessage.js";
export {
  msdyn_IoTGetDeviceEventsRequest,
  msdyn_IoTGetDeviceEventsResponse,
} from "./msdyn_IoTGetDeviceEventsMessage.js";
export {
  msdyn_IoTGetEditablePropertiesMetadataRequest,
  msdyn_IoTGetEditablePropertiesMetadataResponse,
} from "./msdyn_IoTGetEditablePropertiesMetadataMessage.js";
export {
  msdyn_IoTGetIoTAlertCustomAttributesRequest,
  msdyn_IoTGetIoTAlertCustomAttributesResponse,
} from "./msdyn_IoTGetIoTAlertCustomAttributesMessage.js";
export {
  msdyn_IoTGetModelStatusInternalRequest,
  msdyn_IoTGetModelStatusInternalResponse,
} from "./msdyn_IoTGetModelStatusInternalMessage.js";
export {
  msdyn_IoTGetTagsMetadataRequest,
  msdyn_IoTGetTagsMetadataResponse,
} from "./msdyn_IoTGetTagsMetadataMessage.js";
export {
  msdyn_IoTHubGetAggregatedDeviceReadingsRequest,
  msdyn_IoTHubGetAggregatedDeviceReadingsResponse,
} from "./msdyn_IoTHubGetAggregatedDeviceReadingsMessage.js";
export {
  msdyn_IoTHubPullDeviceDataRequest,
  msdyn_IoTHubPullDeviceDataResponse,
} from "./msdyn_IoTHubPullDeviceDataMessage.js";
export {
  msdyn_IoTHubQueryDeviceReadingsRequest,
  msdyn_IoTHubQueryDeviceReadingsResponse,
} from "./msdyn_IoTHubQueryDeviceReadingsMessage.js";
export {
  msdyn_IoTHubRegisterDeviceRequest,
  msdyn_IoTHubRegisterDeviceResponse,
} from "./msdyn_IoTHubRegisterDeviceMessage.js";
export {
  msdyn_IoTNewPrimaryAlertRequest,
  msdyn_IoTNewPrimaryAlertResponse,
} from "./msdyn_IoTNewPrimaryAlertMessage.js";
export {
  msdyn_IoTPullDeviceDataActionHandlerRequest,
  msdyn_IoTPullDeviceDataActionHandlerResponse,
} from "./msdyn_IoTPullDeviceDataActionHandlerMessage.js";
export {
  msdyn_IoTRegisterActionHandlerRequest,
  msdyn_IoTRegisterActionHandlerResponse,
} from "./msdyn_IoTRegisterActionHandlerMessage.js";
export {
  msdyn_IoTSendTestAlertRequest,
  msdyn_IoTSendTestAlertResponse,
} from "./msdyn_IoTSendTestAlertMessage.js";
export {
  msdyn_IoTSetConfigurationRequest,
  msdyn_IoTSetConfigurationResponse,
} from "./msdyn_IoTSetConfigurationMessage.js";
export {
  msdyn_IsAdvancedUnifiedRoutingEnabledRequest,
  msdyn_IsAdvancedUnifiedRoutingEnabledResponse,
} from "./msdyn_IsAdvancedUnifiedRoutingEnabledMessage.js";
export {
  msdyn_IsBotUserConfiguredRequest,
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
  msdyn_JoinLinkedChatConversationResponse,
} from "./msdyn_JoinLinkedChatConversationMessage.js";
export {
  msdyn_JsonGetBooleanRequest,
  msdyn_JsonGetBooleanResponse,
} from "./msdyn_JsonGetBooleanMessage.js";
export {
  msdyn_JsonGetNumberRequest,
  msdyn_JsonGetNumberResponse,
} from "./msdyn_JsonGetNumberMessage.js";
export {
  msdyn_JsonGetStringRequest,
  msdyn_JsonGetStringResponse,
} from "./msdyn_JsonGetStringMessage.js";
export {
  msdyn_knowledgeHarvestAgentTriggerRequest,
  msdyn_knowledgeHarvestAgentTriggerResponse,
} from "./msdyn_knowledgeHarvestAgentTriggerMessage.js";
export {
  msdyn_knowledgeHarvestCreateArticleRequest,
  msdyn_knowledgeHarvestCreateArticleResponse,
} from "./msdyn_knowledgeHarvestCreateArticleMessage.js";
export {
  msdyn_KnowledgeHarvestFetchDataRequest,
  msdyn_KnowledgeHarvestFetchDataResponse,
} from "./msdyn_KnowledgeHarvestFetchDataMessage.js";
export {
  msdyn_LeadResearchCustomActionRequest,
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
  msdyn_LoadCalendarsResponse,
} from "./msdyn_LoadCalendarsMessage.js";
export { msdyn_LogCMAEventRequest, msdyn_LogCMAEventResponse } from "./msdyn_LogCMAEventMessage.js";
export {
  msdyn_LogPlatformSummaryInteractionRequest,
  msdyn_LogPlatformSummaryInteractionResponse,
} from "./msdyn_LogPlatformSummaryInteractionMessage.js";
export {
  msdyn_ManageSLAInstancesRequest,
  msdyn_ManageSLAInstancesResponse,
} from "./msdyn_ManageSLAInstancesMessage.js";
export {
  msdyn_MarkAgreementAsExpiredRequest,
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
  msdyn_markunmarkfavoritearticleResponse,
} from "./msdyn_markunmarkfavoritearticleMessage.js";
export {
  msdyn_McMcbyValuesRequest,
  msdyn_McMcbyValuesResponse,
} from "./msdyn_McMcbyValuesMessage.js";
export {
  msdyn_MergeDuplicatesActionRequest,
  msdyn_MergeDuplicatesActionResponse,
} from "./msdyn_MergeDuplicatesActionMessage.js";
export { msdyn_MigrateArcRequest, msdyn_MigrateArcResponse } from "./msdyn_MigrateArcMessage.js";
export {
  msdyn_MigrateArcProactiveRunRequest,
  msdyn_MigrateArcProactiveRunResponse,
} from "./msdyn_MigrateArcProactiveRunMessage.js";
export {
  msdyn_MigrateFeaturesToCoreServiceRequest,
  msdyn_MigrateFeaturesToCoreServiceResponse,
} from "./msdyn_MigrateFeaturesToCoreServiceMessage.js";
export {
  msdyn_MigrateRICommonRSARequest,
  msdyn_MigrateRICommonRSAResponse,
} from "./msdyn_MigrateRICommonRSAMessage.js";
export {
  msdyn_MigrateSequenceRequest,
  msdyn_MigrateSequenceResponse,
} from "./msdyn_MigrateSequenceMessage.js";
export { msdyn_MigrateSlaRequest, msdyn_MigrateSlaResponse } from "./msdyn_MigrateSlaMessage.js";
export {
  msdyn_MigrateSlaProactiveRunRequest,
  msdyn_MigrateSlaProactiveRunResponse,
} from "./msdyn_MigrateSlaProactiveRunMessage.js";
export {
  msdyn_MobileAppBuildRequest,
  msdyn_MobileAppBuildResponse,
} from "./msdyn_MobileAppBuildMessage.js";
export {
  msdyn_MobileAppBuildStatusRequest,
  msdyn_MobileAppBuildStatusResponse,
} from "./msdyn_MobileAppBuildStatusMessage.js";
export {
  msdyn_ModelAppDiagnosisRequest,
  msdyn_ModelAppDiagnosisResponse,
} from "./msdyn_ModelAppDiagnosisMessage.js";
export {
  msdyn_ModelAppRepairRequest,
  msdyn_ModelAppRepairResponse,
} from "./msdyn_ModelAppRepairMessage.js";
export {
  msdyn_msdyn_ValidateWorkStreamSMSConnectionRequest,
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
  msdyn_OCResetInviteParamsInfoResponse,
} from "./msdyn_OCResetInviteParamsInfoMessage.js";
export {
  msdyn_OCResetLastMessageInfoRequest,
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
  msdyn_ODOSMetadataCleanUpResponse,
} from "./msdyn_ODOSMetadataCleanUpMessage.js";
export {
  msdyn_OnNewActivityForARCRecordRequest,
  msdyn_OnNewActivityForARCRecordResponse,
} from "./msdyn_OnNewActivityForARCRecordMessage.js";
export {
  msdyn_OperatingHoursUpgradeFlowRequest,
  msdyn_OperatingHoursUpgradeFlowResponse,
} from "./msdyn_OperatingHoursUpgradeFlowMessage.js";
export {
  msdyn_OpportunityResearchResultUserActionRequest,
  msdyn_OpportunityResearchResultUserActionResponse,
} from "./msdyn_OpportunityResearchResultUserActionMessage.js";
export {
  msdyn_OrphanCalendarCleanupRequest,
  msdyn_OrphanCalendarCleanupResponse,
} from "./msdyn_OrphanCalendarCleanupMessage.js";
export {
  msdyn_OSApplyPredictionRequest,
  msdyn_OSApplyPredictionResponse,
} from "./msdyn_OSApplyPredictionMessage.js";
export {
  msdyn_OSConvertToLocalizedFeaturesRequest,
  msdyn_OSConvertToLocalizedFeaturesResponse,
} from "./msdyn_OSConvertToLocalizedFeaturesMessage.js";
export {
  msdyn_OSCreatePredictionRequest,
  msdyn_OSCreatePredictionResponse,
} from "./msdyn_OSCreatePredictionMessage.js";
export {
  msdyn_OSDeletePredictionRequest,
  msdyn_OSDeletePredictionResponse,
} from "./msdyn_OSDeletePredictionMessage.js";
export {
  msdyn_OSGetAllOpportunityPredictionModelsRequest,
  msdyn_OSGetAllOpportunityPredictionModelsResponse,
} from "./msdyn_OSGetAllOpportunityPredictionModelsMessage.js";
export {
  msdyn_OSGetPredictionModelStatusRequest,
  msdyn_OSGetPredictionModelStatusResponse,
} from "./msdyn_OSGetPredictionModelStatusMessage.js";
export {
  msdyn_OSGetTrainingResultsRequest,
  msdyn_OSGetTrainingResultsResponse,
} from "./msdyn_OSGetTrainingResultsMessage.js";
export {
  msdyn_OSUpdateModelGradesRequest,
  msdyn_OSUpdateModelGradesResponse,
} from "./msdyn_OSUpdateModelGradesMessage.js";
export {
  msdyn_OverflowMigrationAPIRequest,
  msdyn_OverflowMigrationAPIResponse,
} from "./msdyn_OverflowMigrationAPIMessage.js";
export {
  msdyn_ParentIoTAlertsRequest,
  msdyn_ParentIoTAlertsResponse,
} from "./msdyn_ParentIoTAlertsMessage.js";
export {
  msdyn_PerformChecksForEnrichRecordRequest,
  msdyn_PerformChecksForEnrichRecordResponse,
} from "./msdyn_PerformChecksForEnrichRecordMessage.js";
export {
  msdyn_PerformNotesAnalysisActionRequest,
  msdyn_PerformNotesAnalysisActionResponse,
} from "./msdyn_PerformNotesAnalysisActionMessage.js";
export {
  msdyn_PollCopilotAgentResponsesRequest,
  msdyn_PollCopilotAgentResponsesResponse,
} from "./msdyn_PollCopilotAgentResponsesMessage.js";
export {
  msdyn_PollODOSForConsentRequest,
  msdyn_PollODOSForConsentResponse,
} from "./msdyn_PollODOSForConsentMessage.js";
export {
  msdyn_PollODOSForExtractionsRequest,
  msdyn_PollODOSForExtractionsResponse,
} from "./msdyn_PollODOSForExtractionsMessage.js";
export {
  msdyn_PostCreateAutonomousEmailRequest,
  msdyn_PostCreateAutonomousEmailResponse,
} from "./msdyn_PostCreateAutonomousEmailMessage.js";
export {
  msdyn_PostOperationRevokeUsrConsentRequest,
  msdyn_PostOperationRevokeUsrConsentResponse,
} from "./msdyn_PostOperationRevokeUsrConsentMessage.js";
export {
  msdyn_PostOrganizationProvisioningStatusRequest,
  msdyn_PostOrganizationProvisioningStatusResponse,
} from "./msdyn_PostOrganizationProvisioningStatusMessage.js";
export {
  msdyn_PostRetrieveRealTimeSuggestedActivitiesRequest,
  msdyn_PostRetrieveRealTimeSuggestedActivitiesResponse,
} from "./msdyn_PostRetrieveRealTimeSuggestedActivitiesMessage.js";
export {
  msdyn_PowerAutomateLoggerRequest,
  msdyn_PowerAutomateLoggerResponse,
} from "./msdyn_PowerAutomateLoggerMessage.js";
export {
  msdyn_PredictFieldsBasedOnRulesRequest,
  msdyn_PredictFieldsBasedOnRulesResponse,
} from "./msdyn_PredictFieldsBasedOnRulesMessage.js";
export {
  msdyn_PredictiveScoringBackgroundJobRequest,
  msdyn_PredictiveScoringBackgroundJobResponse,
} from "./msdyn_PredictiveScoringBackgroundJobMessage.js";
export {
  msdyn_PredictiveScoringDataMigrationRequest,
  msdyn_PredictiveScoringDataMigrationResponse,
} from "./msdyn_PredictiveScoringDataMigrationMessage.js";
export {
  msdyn_ProcessPostProposalFollowupRequest,
  msdyn_ProcessPostProposalFollowupResponse,
} from "./msdyn_ProcessPostProposalFollowupMessage.js";
export {
  msdyn_processsentimentresponseRequest,
  msdyn_processsentimentresponseResponse,
} from "./msdyn_processsentimentresponseMessage.js";
export {
  msdyn_ProductDeterminationActionRequest,
  msdyn_ProductDeterminationActionResponse,
} from "./msdyn_ProductDeterminationActionMessage.js";
export {
  msdyn_ProductDeterminationProvisioningActionRequest,
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
  msdyn_ProvisionIoTSuggestionsMLModelInternalResponse,
} from "./msdyn_ProvisionIoTSuggestionsMLModelInternalMessage.js";
export {
  msdyn_ProvisionODOSRequest,
  msdyn_ProvisionODOSResponse,
} from "./msdyn_ProvisionODOSMessage.js";
export {
  msdyn_ProvisionSharePointDocumentLibrariesRequest,
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
  msdyn_PublishEffortAIModelResponse,
} from "./msdyn_PublishEffortAIModelMessage.js";
export {
  msdyn_publishScheduledRolloutRequest,
  msdyn_publishScheduledRolloutResponse,
} from "./msdyn_publishScheduledRolloutMessage.js";
export {
  msdyn_PullDataForIoTDeviceRequest,
  msdyn_PullDataForIoTDeviceResponse,
} from "./msdyn_PullDataForIoTDeviceMessage.js";
export {
  msdyn_QueryExchangeRequest,
  msdyn_QueryExchangeResponse,
} from "./msdyn_QueryExchangeMessage.js";
export {
  msdyn_QueueItemCreateOperationRequest,
  msdyn_QueueItemCreateOperationResponse,
} from "./msdyn_QueueItemCreateOperationMessage.js";
export {
  msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequest,
  msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse,
} from "./msdyn_QueueItemOperationsOnLwiDeleteOrClosureMessage.js";
export {
  msdyn_reassignmentbatchRequest,
  msdyn_reassignmentbatchResponse,
} from "./msdyn_reassignmentbatchMessage.js";
export {
  msdyn_reassignmentrunRequest,
  msdyn_reassignmentrunResponse,
} from "./msdyn_reassignmentrunMessage.js";
export {
  msdyn_RecommendedEmailTemplatesRequest,
  msdyn_RecommendedEmailTemplatesResponse,
} from "./msdyn_RecommendedEmailTemplatesMessage.js";
export {
  msdyn_recurringsegmentactionRequest,
  msdyn_recurringsegmentactionResponse,
} from "./msdyn_recurringsegmentactionMessage.js";
export {
  msdyn_RegisterCustomEntityRequest,
  msdyn_RegisterCustomEntityResponse,
} from "./msdyn_RegisterCustomEntityMessage.js";
export {
  msdyn_RegisterIoTDeviceRequest,
  msdyn_RegisterIoTDeviceResponse,
} from "./msdyn_RegisterIoTDeviceMessage.js";
export {
  msdyn_RegisterSolutionHealthRuleRequest,
  msdyn_RegisterSolutionHealthRuleResponse,
} from "./msdyn_RegisterSolutionHealthRuleMessage.js";
export {
  msdyn_RemoveRequirementModelRequest,
  msdyn_RemoveRequirementModelResponse,
} from "./msdyn_RemoveRequirementModelMessage.js";
export {
  msdyn_RequirementGroupOverviewRequest,
  msdyn_RequirementGroupOverviewResponse,
} from "./msdyn_RequirementGroupOverviewMessage.js";
export {
  msdyn_ResetOmnichannelProviderRequest,
  msdyn_ResetOmnichannelProviderResponse,
} from "./msdyn_ResetOmnichannelProviderMessage.js";
export {
  msdyn_ResetWorkDistributionFlowRequest,
  msdyn_ResetWorkDistributionFlowResponse,
} from "./msdyn_ResetWorkDistributionFlowMessage.js";
export {
  msdyn_ResetWorkstreamChannelScenarioRequest,
  msdyn_ResetWorkstreamChannelScenarioResponse,
} from "./msdyn_ResetWorkstreamChannelScenarioMessage.js";
export {
  msdyn_ResolveSolutionHealthRuleFailureRequest,
  msdyn_ResolveSolutionHealthRuleFailureResponse,
} from "./msdyn_ResolveSolutionHealthRuleFailureMessage.js";
export {
  msdyn_ResolveTimezoneRequest,
  msdyn_ResolveTimezoneResponse,
} from "./msdyn_ResolveTimezoneMessage.js";
export {
  msdyn_RestartAgreementRelatedWorkflowRequest,
  msdyn_RestartAgreementRelatedWorkflowResponse,
} from "./msdyn_RestartAgreementRelatedWorkflowMessage.js";
export {
  msdyn_RestartUniqueNumberWorkflowRequest,
  msdyn_RestartUniqueNumberWorkflowResponse,
} from "./msdyn_RestartUniqueNumberWorkflowMessage.js";
export {
  msdyn_RetrieveActivitiesRequest,
  msdyn_RetrieveActivitiesResponse,
} from "./msdyn_RetrieveActivitiesMessage.js";
export {
  msdyn_RetrieveActivityAnalyticsConfigurationRequest,
  msdyn_RetrieveActivityAnalyticsConfigurationResponse,
} from "./msdyn_RetrieveActivityAnalyticsConfigurationMessage.js";
export {
  msdyn_RetrieveAppointmentsByAttendeesRequest,
  msdyn_RetrieveAppointmentsByAttendeesResponse,
} from "./msdyn_RetrieveAppointmentsByAttendeesMessage.js";
export {
  msdyn_RetrieveCadenceSuggestionsRequest,
  msdyn_RetrieveCadenceSuggestionsResponse,
} from "./msdyn_RetrieveCadenceSuggestionsMessage.js";
export {
  msdyn_retrieveConnectionsRequest,
  msdyn_retrieveConnectionsResponse,
} from "./msdyn_retrieveConnectionsMessage.js";
export {
  msdyn_RetrieveConversationPayloadRequest,
  msdyn_RetrieveConversationPayloadResponse,
} from "./msdyn_RetrieveConversationPayloadMessage.js";
export {
  msdyn_RetrieveCustomMessagingApplicationSecretRequest,
  msdyn_RetrieveCustomMessagingApplicationSecretResponse,
} from "./msdyn_RetrieveCustomMessagingApplicationSecretMessage.js";
export {
  msdyn_RetrieveDistanceMatrixRequest,
  msdyn_RetrieveDistanceMatrixResponse,
} from "./msdyn_RetrieveDistanceMatrixMessage.js";
export {
  msdyn_RetrieveEmailNBARequest,
  msdyn_RetrieveEmailNBAResponse,
} from "./msdyn_RetrieveEmailNBAMessage.js";
export {
  msdyn_RetrieveEnvironmentVariableValueForCSRequest,
  msdyn_RetrieveEnvironmentVariableValueForCSResponse,
} from "./msdyn_RetrieveEnvironmentVariableValueForCSMessage.js";
export {
  msdyn_RetrieveEvaluationCriteriaRequest,
  msdyn_RetrieveEvaluationCriteriaResponse,
} from "./msdyn_RetrieveEvaluationCriteriaMessage.js";
export {
  msdyn_RetrieveKnowledgeManagementSettingsRequest,
  msdyn_RetrieveKnowledgeManagementSettingsResponse,
} from "./msdyn_RetrieveKnowledgeManagementSettingsMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchFiltersRequest,
  msdyn_RetrieveKnowledgeSearchFiltersResponse,
} from "./msdyn_RetrieveKnowledgeSearchFiltersMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchModifiersRequest,
  msdyn_RetrieveKnowledgeSearchModifiersResponse,
} from "./msdyn_RetrieveKnowledgeSearchModifiersMessage.js";
export {
  msdyn_RetrieveKnowledgeSuggestionsRequest,
  msdyn_RetrieveKnowledgeSuggestionsResponse,
} from "./msdyn_RetrieveKnowledgeSuggestionsMessage.js";
export {
  msdyn_RetrieveKpiItemRecordRequest,
  msdyn_RetrieveKpiItemRecordResponse,
} from "./msdyn_RetrieveKpiItemRecordMessage.js";
export {
  msdyn_RetrieveKPIValuesForGDPRRequest,
  msdyn_RetrieveKPIValuesForGDPRResponse,
} from "./msdyn_RetrieveKPIValuesForGDPRMessage.js";
export {
  msdyn_RetrieveKPIvaluesfromDCIRequest,
  msdyn_RetrieveKPIvaluesfromDCIResponse,
} from "./msdyn_RetrieveKPIvaluesfromDCIMessage.js";
export {
  msdyn_RetrieveKpiValuesFromRIRequest,
  msdyn_RetrieveKpiValuesFromRIResponse,
} from "./msdyn_RetrieveKpiValuesFromRIMessage.js";
export {
  msdyn_RetrieveOutlookSchedulesRequest,
  msdyn_RetrieveOutlookSchedulesResponse,
} from "./msdyn_RetrieveOutlookSchedulesMessage.js";
export {
  msdyn_RetrievePersonalizationFiltersRequest,
  msdyn_RetrievePersonalizationFiltersResponse,
} from "./msdyn_RetrievePersonalizationFiltersMessage.js";
export {
  msdyn_RetrievePlatformCopilotSettingsRequest,
  msdyn_RetrievePlatformCopilotSettingsResponse,
} from "./msdyn_RetrievePlatformCopilotSettingsMessage.js";
export {
  msdyn_RetrieveRelationshipActivityKPIValuesRequest,
  msdyn_RetrieveRelationshipActivityKPIValuesResponse,
} from "./msdyn_RetrieveRelationshipActivityKPIValuesMessage.js";
export {
  msdyn_RetrieveRequirementGroupCandidatesRequest,
  msdyn_RetrieveRequirementGroupCandidatesResponse,
} from "./msdyn_RetrieveRequirementGroupCandidatesMessage.js";
export {
  msdyn_RetrieveResourceAvailabilityRequest,
  msdyn_RetrieveResourceAvailabilityResponse,
} from "./msdyn_RetrieveResourceAvailabilityMessage.js";
export {
  msdyn_RetrieveSearchProvidersRequest,
  msdyn_RetrieveSearchProvidersResponse,
} from "./msdyn_RetrieveSearchProvidersMessage.js";
export {
  msdyn_RetrieveSuggestionPayloadsRequest,
  msdyn_RetrieveSuggestionPayloadsResponse,
} from "./msdyn_RetrieveSuggestionPayloadsMessage.js";
export {
  msdyn_RetrieveTypeValuesFromDCIRequest,
  msdyn_RetrieveTypeValuesFromDCIResponse,
} from "./msdyn_RetrieveTypeValuesFromDCIMessage.js";
export {
  msdyn_RouteToOperationRequest,
  msdyn_RouteToOperationResponse,
} from "./msdyn_RouteToOperationMessage.js";
export {
  msdyn_RunSAUpgradeScriptRequest,
  msdyn_RunSAUpgradeScriptResponse,
} from "./msdyn_RunSAUpgradeScriptMessage.js";
export {
  msdyn_RunSolutionCheckerRulesRequest,
  msdyn_RunSolutionCheckerRulesResponse,
} from "./msdyn_RunSolutionCheckerRulesMessage.js";
export {
  msdyn_SalesAcceleratorMailNotificationToAdminRequest,
  msdyn_SalesAcceleratorMailNotificationToAdminResponse,
} from "./msdyn_SalesAcceleratorMailNotificationToAdminMessage.js";
export {
  msdyn_SalesAccountCatchupRequest,
  msdyn_SalesAccountCatchupResponse,
} from "./msdyn_SalesAccountCatchupMessage.js";
export {
  msdyn_SalesAccountSummaryRequest,
  msdyn_SalesAccountSummaryResponse,
} from "./msdyn_SalesAccountSummaryMessage.js";
export {
  msdyn_SalesAdaptiveCardResponseRequest,
  msdyn_SalesAdaptiveCardResponseResponse,
} from "./msdyn_SalesAdaptiveCardResponseMessage.js";
export {
  msdyn_SalesAgents_ActivateMicroAgentConfigurationRequest,
  msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse,
} from "./msdyn_SalesAgents_ActivateMicroAgentConfigurationMessage.js";
export {
  msdyn_SalesAgents_ActivateSalesAgentProfileRequest,
  msdyn_SalesAgents_ActivateSalesAgentProfileResponse,
} from "./msdyn_SalesAgents_ActivateSalesAgentProfileMessage.js";
export {
  msdyn_SalesAgents_BatchUpdateSARStatesRequest,
  msdyn_SalesAgents_BatchUpdateSARStatesResponse,
} from "./msdyn_SalesAgents_BatchUpdateSARStatesMessage.js";
export {
  msdyn_SalesAgents_CompleteOrchestrationRequest,
  msdyn_SalesAgents_CompleteOrchestrationResponse,
} from "./msdyn_SalesAgents_CompleteOrchestrationMessage.js";
export {
  msdyn_SalesAgents_CreateDefaultTemplateInSharepointRequest,
  msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse,
} from "./msdyn_SalesAgents_CreateDefaultTemplateInSharepointMessage.js";
export {
  msdyn_SalesAgents_CreateSARBasedOnPreviousAgentRequest,
  msdyn_SalesAgents_CreateSARBasedOnPreviousAgentResponse,
} from "./msdyn_SalesAgents_CreateSARBasedOnPreviousAgentMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsRequest,
  msdyn_SalesAgents_CreateSARRecordsResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequest,
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigMessage.js";
export {
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateRequest,
  msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateResponse,
} from "./msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentProcessingStateMessage.js";
export {
  msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksRequest,
  msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResponse,
} from "./msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksMessage.js";
export {
  msdyn_SalesAgents_ExtractAutoReplyInfoRequest,
  msdyn_SalesAgents_ExtractAutoReplyInfoResponse,
} from "./msdyn_SalesAgents_ExtractAutoReplyInfoMessage.js";
export {
  msdyn_SalesAgents_FetchOutreachEmailForAgentRequest,
  msdyn_SalesAgents_FetchOutreachEmailForAgentResponse,
} from "./msdyn_SalesAgents_FetchOutreachEmailForAgentMessage.js";
export {
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequest,
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest,
  msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequest,
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest,
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse,
} from "./msdyn_SalesAgents_FetchSARRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest,
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse,
} from "./msdyn_SalesAgents_GetAgentStatusAndGenAIConsentMessage.js";
export {
  msdyn_SalesAgents_GetEngageAgentInputPayloadRequest,
  msdyn_SalesAgents_GetEngageAgentInputPayloadResponse,
} from "./msdyn_SalesAgents_GetEngageAgentInputPayloadMessage.js";
export {
  msdyn_SalesAgents_GetExecutionConfigPropertyRequest,
  msdyn_SalesAgents_GetExecutionConfigPropertyResponse,
} from "./msdyn_SalesAgents_GetExecutionConfigPropertyMessage.js";
export {
  msdyn_SalesAgents_GetHandoverDetailsRequest,
  msdyn_SalesAgents_GetHandoverDetailsResponse,
} from "./msdyn_SalesAgents_GetHandoverDetailsMessage.js";
export {
  msdyn_SalesAgents_GetM365ConsentRequest,
  msdyn_SalesAgents_GetM365ConsentResponse,
} from "./msdyn_SalesAgents_GetM365ConsentMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentActivationDetailsRequest,
  msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse,
} from "./msdyn_SalesAgents_GetMicroAgentActivationDetailsMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentsConfigurationRequest,
  msdyn_SalesAgents_GetMicroAgentsConfigurationResponse,
} from "./msdyn_SalesAgents_GetMicroAgentsConfigurationMessage.js";
export {
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequest,
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse,
} from "./msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsMessage.js";
export {
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsRequest,
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse,
} from "./msdyn_SalesAgents_GetSalesAgentsFeatureSettingsMessage.js";
export {
  msdyn_SalesAgents_HandoverInitiateRequest,
  msdyn_SalesAgents_HandoverInitiateResponse,
} from "./msdyn_SalesAgents_HandoverInitiateMessage.js";
export {
  msdyn_SalesAgents_HandoverNotifySingleRequest,
  msdyn_SalesAgents_HandoverNotifySingleResponse,
} from "./msdyn_SalesAgents_HandoverNotifySingleMessage.js";
export {
  msdyn_SalesAgents_IsOrchestrationCompleteRequest,
  msdyn_SalesAgents_IsOrchestrationCompleteResponse,
} from "./msdyn_SalesAgents_IsOrchestrationCompleteMessage.js";
export {
  msdyn_SalesAgents_IsOwnerAssignedRequest,
  msdyn_SalesAgents_IsOwnerAssignedResponse,
} from "./msdyn_SalesAgents_IsOwnerAssignedMessage.js";
export {
  msdyn_SalesAgents_IsTenantAdminRequest,
  msdyn_SalesAgents_IsTenantAdminResponse,
} from "./msdyn_SalesAgents_IsTenantAdminMessage.js";
export {
  msdyn_SalesAgents_LogEngageReadinessFlowRunStateRequest,
  msdyn_SalesAgents_LogEngageReadinessFlowRunStateResponse,
} from "./msdyn_SalesAgents_LogEngageReadinessFlowRunStateMessage.js";
export {
  msdyn_SalesAgents_LogMicroagentFlowDataRequest,
  msdyn_SalesAgents_LogMicroagentFlowDataResponse,
} from "./msdyn_SalesAgents_LogMicroagentFlowDataMessage.js";
export {
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequest,
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse,
} from "./msdyn_SalesAgents_NotifyReactivatedEntityOwnerMessage.js";
export {
  msdyn_SalesAgents_ProcessEngageAgentResponseRequest,
  msdyn_SalesAgents_ProcessEngageAgentResponseResponse,
} from "./msdyn_SalesAgents_ProcessEngageAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProcessOutreachAgentResponseRequest,
  msdyn_SalesAgents_ProcessOutreachAgentResponseResponse,
} from "./msdyn_SalesAgents_ProcessOutreachAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIRequest,
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse,
} from "./msdyn_SalesAgents_ProvideConsentAndM365SetupAPIMessage.js";
export {
  msdyn_SalesAgents_ReEngageEntityRequest,
  msdyn_SalesAgents_ReEngageEntityResponse,
} from "./msdyn_SalesAgents_ReEngageEntityMessage.js";
export {
  msdyn_SalesAgents_RunAgentEvalsRequest,
  msdyn_SalesAgents_RunAgentEvalsResponse,
} from "./msdyn_SalesAgents_RunAgentEvalsMessage.js";
export {
  msdyn_SalesAgents_SendEmailReplyRequest,
  msdyn_SalesAgents_SendEmailReplyResponse,
} from "./msdyn_SalesAgents_SendEmailReplyMessage.js";
export {
  msdyn_SalesAgents_SetExecutionConfigPropertyRequest,
  msdyn_SalesAgents_SetExecutionConfigPropertyResponse,
} from "./msdyn_SalesAgents_SetExecutionConfigPropertyMessage.js";
export {
  msdyn_SalesAgents_ShouldRunAgentOrchestrationRequest,
  msdyn_SalesAgents_ShouldRunAgentOrchestrationResponse,
} from "./msdyn_SalesAgents_ShouldRunAgentOrchestrationMessage.js";
export {
  msdyn_SalesAgents_TriggerOutreachAgentRequest,
  msdyn_SalesAgents_TriggerOutreachAgentResponse,
} from "./msdyn_SalesAgents_TriggerOutreachAgentMessage.js";
export {
  msdyn_SalesAgents_UpsertAgentProcessingStateRequest,
  msdyn_SalesAgents_UpsertAgentProcessingStateResponse,
} from "./msdyn_SalesAgents_UpsertAgentProcessingStateMessage.js";
export {
  msdyn_SalesAnswerFromDocumentsRequest,
  msdyn_SalesAnswerFromDocumentsResponse,
} from "./msdyn_SalesAnswerFromDocumentsMessage.js";
export {
  msdyn_SalesCopilotM365SkillInfraSetupRequest,
  msdyn_SalesCopilotM365SkillInfraSetupResponse,
} from "./msdyn_SalesCopilotM365SkillInfraSetupMessage.js";
export {
  msdyn_SalesCopilotNBASkillInfraSetupRequest,
  msdyn_SalesCopilotNBASkillInfraSetupResponse,
} from "./msdyn_SalesCopilotNBASkillInfraSetupMessage.js";
export {
  msdyn_SalesExternalServiceInvokeRequest,
  msdyn_SalesExternalServiceInvokeResponse,
} from "./msdyn_SalesExternalServiceInvokeMessage.js";
export {
  msdyn_SalesInsightsGetEuclidConsentStatusRequest,
  msdyn_SalesInsightsGetEuclidConsentStatusResponse,
} from "./msdyn_SalesInsightsGetEuclidConsentStatusMessage.js";
export {
  msdyn_SalesInsightsTpsPackageRequest,
  msdyn_SalesInsightsTpsPackageResponse,
} from "./msdyn_SalesInsightsTpsPackageMessage.js";
export {
  msdyn_SalesLeadCatchupRequest,
  msdyn_SalesLeadCatchupResponse,
} from "./msdyn_SalesLeadCatchupMessage.js";
export {
  msdyn_SalesLeadSummaryRequest,
  msdyn_SalesLeadSummaryResponse,
} from "./msdyn_SalesLeadSummaryMessage.js";
export {
  msdyn_SalesMeetingPreparationRequest,
  msdyn_SalesMeetingPreparationResponse,
} from "./msdyn_SalesMeetingPreparationMessage.js";
export {
  msdyn_SalesOpportunityCatchupRequest,
  msdyn_SalesOpportunityCatchupResponse,
} from "./msdyn_SalesOpportunityCatchupMessage.js";
export {
  msdyn_SalesOpportunitySummaryRequest,
  msdyn_SalesOpportunitySummaryResponse,
} from "./msdyn_SalesOpportunitySummaryMessage.js";
export {
  msdyn_SalesOutlookMeetingPreparationRequest,
  msdyn_SalesOutlookMeetingPreparationResponse,
} from "./msdyn_SalesOutlookMeetingPreparationMessage.js";
export {
  msdyn_SalesRoutingIdentifyAttributesRequest,
  msdyn_SalesRoutingIdentifyAttributesResponse,
} from "./msdyn_SalesRoutingIdentifyAttributesMessage.js";
export {
  msdyn_SaveAgentContentCustomActionRequest,
  msdyn_SaveAgentContentCustomActionResponse,
} from "./msdyn_SaveAgentContentCustomActionMessage.js";
export {
  msdyn_SaveCalendarRequest,
  msdyn_SaveCalendarResponse,
} from "./msdyn_SaveCalendarMessage.js";
export {
  msdyn_SaveMicrosoftCopilotStudioSurveyResponseRequest,
  msdyn_SaveMicrosoftCopilotStudioSurveyResponseResponse,
} from "./msdyn_SaveMicrosoftCopilotStudioSurveyResponseMessage.js";
export {
  msdyn_SaveOpportunityResearchAgentContentCustomActionRequest,
  msdyn_SaveOpportunityResearchAgentContentCustomActionResponse,
} from "./msdyn_SaveOpportunityResearchAgentContentCustomActionMessage.js";
export {
  msdyn_SaveOpportunityResearchResultRequest,
  msdyn_SaveOpportunityResearchResultResponse,
} from "./msdyn_SaveOpportunityResearchResultMessage.js";
export {
  msdyn_SaveSalesCopilotEmailInsightsRequest,
  msdyn_SaveSalesCopilotEmailInsightsResponse,
} from "./msdyn_SaveSalesCopilotEmailInsightsMessage.js";
export {
  msdyn_ScheduleRealTimeScoringRequest,
  msdyn_ScheduleRealTimeScoringResponse,
} from "./msdyn_ScheduleRealTimeScoringMessage.js";
export {
  msdyn_ScheduleRequirementGroupRequest,
  msdyn_ScheduleRequirementGroupResponse,
} from "./msdyn_ScheduleRequirementGroupMessage.js";
export {
  msdyn_ScheduleRolloutsOrchestrationRequest,
  msdyn_ScheduleRolloutsOrchestrationResponse,
} from "./msdyn_ScheduleRolloutsOrchestrationMessage.js";
export {
  msdyn_SearchResourceAvailabilityRequest,
  msdyn_SearchResourceAvailabilityResponse,
} from "./msdyn_SearchResourceAvailabilityMessage.js";
export {
  msdyn_SearchResourceAvailabilityForRequirementGroupRequest,
  msdyn_SearchResourceAvailabilityForRequirementGroupResponse,
} from "./msdyn_SearchResourceAvailabilityForRequirementGroupMessage.js";
export {
  msdyn_SendEmailFromTemplateRequest,
  msdyn_SendEmailFromTemplateResponse,
} from "./msdyn_SendEmailFromTemplateMessage.js";
export {
  msdyn_SendEmailsToOptedInResourcesRequest,
  msdyn_SendEmailsToOptedInResourcesResponse,
} from "./msdyn_SendEmailsToOptedInResourcesMessage.js";
export {
  msdyn_SendEmailToTechniciansRequest,
  msdyn_SendEmailToTechniciansResponse,
} from "./msdyn_SendEmailToTechniciansMessage.js";
export {
  msdyn_sendFeedbackRequest,
  msdyn_sendFeedbackResponse,
} from "./msdyn_sendFeedbackMessage.js";
export {
  msdyn_SendMCSSurveyRequest,
  msdyn_SendMCSSurveyResponse,
} from "./msdyn_SendMCSSurveyMessage.js";
export {
  msdyn_SendMessageToOCServiceRequest,
  msdyn_SendMessageToOCServiceResponse,
} from "./msdyn_SendMessageToOCServiceMessage.js";
export {
  msdyn_SendRecordEventUpdateRequest,
  msdyn_SendRecordEventUpdateResponse,
} from "./msdyn_SendRecordEventUpdateMessage.js";
export {
  msdyn_SetAutoBlockedFlagRequest,
  msdyn_SetAutoBlockedFlagResponse,
} from "./msdyn_SetAutoBlockedFlagMessage.js";
export {
  msdyn_SetCaseSentimentCustomAPIRequest,
  msdyn_SetCaseSentimentCustomAPIResponse,
} from "./msdyn_SetCaseSentimentCustomAPIMessage.js";
export {
  msdyn_SetFeatureStatusRequest,
  msdyn_SetFeatureStatusResponse,
} from "./msdyn_SetFeatureStatusMessage.js";
export {
  msdyn_SetLegalAcceptanceStatusRequest,
  msdyn_SetLegalAcceptanceStatusResponse,
} from "./msdyn_SetLegalAcceptanceStatusMessage.js";
export {
  msdyn_SetSharePointDocumentStatusRequest,
  msdyn_SetSharePointDocumentStatusResponse,
} from "./msdyn_SetSharePointDocumentStatusMessage.js";
export {
  msdyn_SetTalkingPointLikedStatusRequest,
  msdyn_SetTalkingPointLikedStatusResponse,
} from "./msdyn_SetTalkingPointLikedStatusMessage.js";
export {
  msdyn_SetTeamsDocumentStatusRequest,
  msdyn_SetTeamsDocumentStatusResponse,
} from "./msdyn_SetTeamsDocumentStatusMessage.js";
export {
  msdyn_SetupRelationshipForEnablingEntityRoutingRequest,
  msdyn_SetupRelationshipForEnablingEntityRoutingResponse,
} from "./msdyn_SetupRelationshipForEnablingEntityRoutingMessage.js";
export {
  msdyn_ShouldEnableRoutingCommandRequest,
  msdyn_ShouldEnableRoutingCommandResponse,
} from "./msdyn_ShouldEnableRoutingCommandMessage.js";
export {
  msdyn_ShowConsumerCredentialsRequest,
  msdyn_ShowConsumerCredentialsResponse,
} from "./msdyn_ShowConsumerCredentialsMessage.js";
export {
  msdyn_ShowPrivacyTermsRequest,
  msdyn_ShowPrivacyTermsResponse,
} from "./msdyn_ShowPrivacyTermsMessage.js";
export {
  msdyn_SIGetFCBStatusRequest,
  msdyn_SIGetFCBStatusResponse,
} from "./msdyn_SIGetFCBStatusMessage.js";
export {
  msdyn_SignalRInstanceActionsRequest,
  msdyn_SignalRInstanceActionsResponse,
} from "./msdyn_SignalRInstanceActionsMessage.js";
export {
  msdyn_SimulateBookingResourceRequest,
  msdyn_SimulateBookingResourceResponse,
} from "./msdyn_SimulateBookingResourceMessage.js";
export {
  msdyn_SiteMapDiagnosisRequest,
  msdyn_SiteMapDiagnosisResponse,
} from "./msdyn_SiteMapDiagnosisMessage.js";
export {
  msdyn_SiteMapRepairRequest,
  msdyn_SiteMapRepairResponse,
} from "./msdyn_SiteMapRepairMessage.js";
export {
  msdyn_SLACustomTimeCalculationTemplateRequest,
  msdyn_SLACustomTimeCalculationTemplateResponse,
} from "./msdyn_SLACustomTimeCalculationTemplateMessage.js";
export {
  msdyn_SLATimeCalculationRequest,
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
  msdyn_SnoozeEmailInfraActionCardResponse,
} from "./msdyn_SnoozeEmailInfraActionCardMessage.js";
export {
  msdyn_StartCaseFollowupMonitoringRequest,
  msdyn_StartCaseFollowupMonitoringResponse,
} from "./msdyn_StartCaseFollowupMonitoringMessage.js";
export {
  msdyn_StartODOSDeprovisioningRequest,
  msdyn_StartODOSDeprovisioningResponse,
} from "./msdyn_StartODOSDeprovisioningMessage.js";
export {
  msdyn_StartODOSProvisioningRequest,
  msdyn_StartODOSProvisioningResponse,
} from "./msdyn_StartODOSProvisioningMessage.js";
export {
  msdyn_StartRIProvisioningRequest,
  msdyn_StartRIProvisioningResponse,
} from "./msdyn_StartRIProvisioningMessage.js";
export {
  msdyn_startSequenceStatsCopyJobRequest,
  msdyn_startSequenceStatsCopyJobResponse,
} from "./msdyn_startSequenceStatsCopyJobMessage.js";
export {
  msdyn_StoreQualityEvaluationResultRequest,
  msdyn_StoreQualityEvaluationResultResponse,
} from "./msdyn_StoreQualityEvaluationResultMessage.js";
export {
  msdyn_SuggestPrimaryForMergeActionRequest,
  msdyn_SuggestPrimaryForMergeActionResponse,
} from "./msdyn_SuggestPrimaryForMergeActionMessage.js";
export {
  msdyn_SummarySynthesizerStatusRequest,
  msdyn_SummarySynthesizerStatusResponse,
} from "./msdyn_SummarySynthesizerStatusMessage.js";
export {
  msdyn_SwarmExpertFinderRequest,
  msdyn_SwarmExpertFinderResponse,
} from "./msdyn_SwarmExpertFinderMessage.js";
export {
  msdyn_SyncKnowledgeManagementSettingsV2Request,
  msdyn_SyncKnowledgeManagementSettingsV2Response,
} from "./msdyn_SyncKnowledgeManagementSettingsV2Message.js";
export {
  msdyn_SyncODOSProvisioningStatusRequest,
  msdyn_SyncODOSProvisioningStatusResponse,
} from "./msdyn_SyncODOSProvisioningStatusMessage.js";
export {
  msdyn_TableOperationRequest,
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
  msdyn_TelephonyACSResourceUsageDetailsActionResponse,
} from "./msdyn_TelephonyACSResourceUsageDetailsActionMessage.js";
export {
  msdyn_TelephonyACSSyncPhoneNumbersActionRequest,
  msdyn_TelephonyACSSyncPhoneNumbersActionResponse,
} from "./msdyn_TelephonyACSSyncPhoneNumbersActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberAreaCodeActionRequest,
  msdyn_TelephonyPhoneNumberAreaCodeActionResponse,
} from "./msdyn_TelephonyPhoneNumberAreaCodeActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberPlanUpgradeActionRequest,
  msdyn_TelephonyPhoneNumberPlanUpgradeActionResponse,
} from "./msdyn_TelephonyPhoneNumberPlanUpgradeActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberReservationActionRequest,
  msdyn_TelephonyPhoneNumberReservationActionResponse,
} from "./msdyn_TelephonyPhoneNumberReservationActionMessage.js";
export {
  msdyn_TelephonyPhoneNumberReservationStatusActionRequest,
  msdyn_TelephonyPhoneNumberReservationStatusActionResponse,
} from "./msdyn_TelephonyPhoneNumberReservationStatusActionMessage.js";
export {
  msdyn_TelephonyPhoneNumbersDeprovisionActionRequest,
  msdyn_TelephonyPhoneNumbersDeprovisionActionResponse,
} from "./msdyn_TelephonyPhoneNumbersDeprovisionActionMessage.js";
export {
  msdyn_TelephonyPhoneNumbersProvisionActionRequest,
  msdyn_TelephonyPhoneNumbersProvisionActionResponse,
} from "./msdyn_TelephonyPhoneNumbersProvisionActionMessage.js";
export {
  msdyn_TelephonyPlanLocationDetailsActionRequest,
  msdyn_TelephonyPlanLocationDetailsActionResponse,
} from "./msdyn_TelephonyPlanLocationDetailsActionMessage.js";
export {
  msdyn_TelephonyResourceDeprovisionActionRequest,
  msdyn_TelephonyResourceDeprovisionActionResponse,
} from "./msdyn_TelephonyResourceDeprovisionActionMessage.js";
export {
  msdyn_TelephonyResourceProvisionActionRequest,
  msdyn_TelephonyResourceProvisionActionResponse,
} from "./msdyn_TelephonyResourceProvisionActionMessage.js";
export {
  msdyn_TelephonySupportedCountryActionRequest,
  msdyn_TelephonySupportedCountryActionResponse,
} from "./msdyn_TelephonySupportedCountryActionMessage.js";
export {
  msdyn_TelephonySupportedPlansActionRequest,
  msdyn_TelephonySupportedPlansActionResponse,
} from "./msdyn_TelephonySupportedPlansActionMessage.js";
export {
  msdyn_timetrackerapiRequest,
  msdyn_timetrackerapiResponse,
} from "./msdyn_timetrackerapiMessage.js";
export {
  msdyn_TrackExchangeActivityRequest,
  msdyn_TrackExchangeActivityResponse,
} from "./msdyn_TrackExchangeActivityMessage.js";
export {
  msdyn_TrainAIModelRequest,
  msdyn_TrainAIModelResponse,
} from "./msdyn_TrainAIModelMessage.js";
export {
  msdyn_TrainEffortModelRequest,
  msdyn_TrainEffortModelResponse,
} from "./msdyn_TrainEffortModelMessage.js";
export { msdyn_TrainModelRequest, msdyn_TrainModelResponse } from "./msdyn_TrainModelMessage.js";
export {
  msdyn_transformentityRequest,
  msdyn_transformentityResponse,
} from "./msdyn_transformentityMessage.js";
export {
  msdyn_TriggerARCWithRuleRequest,
  msdyn_TriggerARCWithRuleResponse,
} from "./msdyn_TriggerARCWithRuleMessage.js";
export {
  msdyn_TriggerForecastPredictionsRequest,
  msdyn_TriggerForecastPredictionsResponse,
} from "./msdyn_TriggerForecastPredictionsMessage.js";
export {
  msdyn_TriggerForecastRecomputeRequest,
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
  msdyn_TwitterSigninResponse,
} from "./msdyn_TwitterSigninMessage.js";
export {
  msdyn_UnifiedRoutingQueueItemOperationsRequest,
  msdyn_UnifiedRoutingQueueItemOperationsResponse,
} from "./msdyn_UnifiedRoutingQueueItemOperationsMessage.js";
export {
  msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckRequest,
  msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckResponse,
} from "./msdyn_UnifiedRoutingSetupTrackerProvisionStatusCheckMessage.js";
export {
  msdyn_UpdateAuditStateRequest,
  msdyn_UpdateAuditStateResponse,
} from "./msdyn_UpdateAuditStateMessage.js";
export {
  msdyn_UpdateAutoCaptureSettingsRequest,
  msdyn_UpdateAutoCaptureSettingsResponse,
} from "./msdyn_UpdateAutoCaptureSettingsMessage.js";
export {
  msdyn_UpdateAutoScheduledTrainingStatusRequest,
  msdyn_UpdateAutoScheduledTrainingStatusResponse,
} from "./msdyn_UpdateAutoScheduledTrainingStatusMessage.js";
export {
  msdyn_UpdateBookingsStatusRequest,
  msdyn_UpdateBookingsStatusResponse,
} from "./msdyn_UpdateBookingsStatusMessage.js";
export {
  msdyn_UpdateCadenceRunStatusRequest,
  msdyn_UpdateCadenceRunStatusResponse,
} from "./msdyn_UpdateCadenceRunStatusMessage.js";
export {
  msdyn_UpdateCopilotSettingsRequest,
  msdyn_UpdateCopilotSettingsResponse,
} from "./msdyn_UpdateCopilotSettingsMessage.js";
export {
  msdyn_UpdateEffortModelStatusRequest,
  msdyn_UpdateEffortModelStatusResponse,
} from "./msdyn_UpdateEffortModelStatusMessage.js";
export {
  msdyn_updateevaluationdetailsRequest,
  msdyn_updateevaluationdetailsResponse,
} from "./msdyn_updateevaluationdetailsMessage.js";
export {
  msdyn_UpdatefeatureconfigRequest,
  msdyn_UpdatefeatureconfigResponse,
} from "./msdyn_UpdatefeatureconfigMessage.js";
export {
  msdyn_UpdateIsCustomFieldForOrganizationEntityRequest,
  msdyn_UpdateIsCustomFieldForOrganizationEntityResponse,
} from "./msdyn_UpdateIsCustomFieldForOrganizationEntityMessage.js";
export {
  msdyn_UpdateKBArticleRequest,
  msdyn_UpdateKBArticleResponse,
} from "./msdyn_UpdateKBArticleMessage.js";
export {
  msdyn_UpdateKbAttachmentPrivilegeRequest,
  msdyn_UpdateKbAttachmentPrivilegeResponse,
} from "./msdyn_UpdateKbAttachmentPrivilegeMessage.js";
export {
  msdyn_updatelivechatconfigsRequest,
  msdyn_updatelivechatconfigsResponse,
} from "./msdyn_updatelivechatconfigsMessage.js";
export {
  msdyn_UpdateModelGradesRequest,
  msdyn_UpdateModelGradesResponse,
} from "./msdyn_UpdateModelGradesMessage.js";
export {
  msdyn_UpdateModelStatusRequest,
  msdyn_UpdateModelStatusResponse,
} from "./msdyn_UpdateModelStatusMessage.js";
export {
  msdyn_UpdateNBACardStateRequest,
  msdyn_UpdateNBACardStateResponse,
} from "./msdyn_UpdateNBACardStateMessage.js";
export {
  msdyn_UpdateNewEntityAdditionOptedStatusRequest,
  msdyn_UpdateNewEntityAdditionOptedStatusResponse,
} from "./msdyn_UpdateNewEntityAdditionOptedStatusMessage.js";
export {
  msdyn_UpdateODOSFeatureEnabledRolesRequest,
  msdyn_UpdateODOSFeatureEnabledRolesResponse,
} from "./msdyn_UpdateODOSFeatureEnabledRolesMessage.js";
export {
  msdyn_UpdatePrivacyTermsRequest,
  msdyn_UpdatePrivacyTermsResponse,
} from "./msdyn_UpdatePrivacyTermsMessage.js";
export {
  msdyn_UpdateRecordWithRuleBasedPredictionsRequest,
  msdyn_UpdateRecordWithRuleBasedPredictionsResponse,
} from "./msdyn_UpdateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_UpdateRequirementDemandRequest,
  msdyn_UpdateRequirementDemandResponse,
} from "./msdyn_UpdateRequirementDemandMessage.js";
export {
  msdyn_UpdateRequirementModelRequest,
  msdyn_UpdateRequirementModelResponse,
} from "./msdyn_UpdateRequirementModelMessage.js";
export {
  msdyn_UpdateRITenantInfoRequest,
  msdyn_UpdateRITenantInfoResponse,
} from "./msdyn_UpdateRITenantInfoMessage.js";
export {
  msdyn_UpdateSalesCopilotUserSettingsRequest,
  msdyn_UpdateSalesCopilotUserSettingsResponse,
} from "./msdyn_UpdateSalesCopilotUserSettingsMessage.js";
export {
  msdyn_UpdateSdkMessageProcessingStepStateRequest,
  msdyn_UpdateSdkMessageProcessingStepStateResponse,
} from "./msdyn_UpdateSdkMessageProcessingStepStateMessage.js";
export {
  msdyn_UpdateSequenceDailyUsageMetricRequest,
  msdyn_UpdateSequenceDailyUsageMetricResponse,
} from "./msdyn_UpdateSequenceDailyUsageMetricMessage.js";
export {
  msdyn_updatesequencetargetstepdataRequest,
  msdyn_updatesequencetargetstepdataResponse,
} from "./msdyn_updatesequencetargetstepdataMessage.js";
export {
  msdyn_UpdateSurveyBotTopicsRequest,
  msdyn_UpdateSurveyBotTopicsResponse,
} from "./msdyn_UpdateSurveyBotTopicsMessage.js";
export {
  msdyn_UpdateSurveyJsonRequest,
  msdyn_UpdateSurveyJsonResponse,
} from "./msdyn_UpdateSurveyJsonMessage.js";
export {
  msdyn_UpdateUserConsentBasedonSecurityRolesRequest,
  msdyn_UpdateUserConsentBasedonSecurityRolesResponse,
} from "./msdyn_UpdateUserConsentBasedonSecurityRolesMessage.js";
export {
  msdyn_UpgradeTelemetryRequest,
  msdyn_UpgradeTelemetryResponse,
} from "./msdyn_UpgradeTelemetryMessage.js";
export {
  msdyn_UpsertEvaluationCriteriaRequest,
  msdyn_UpsertEvaluationCriteriaResponse,
} from "./msdyn_UpsertEvaluationCriteriaMessage.js";
export {
  msdyn_upsertSalesRoutingDiagnosticRequest,
  msdyn_upsertSalesRoutingDiagnosticResponse,
} from "./msdyn_upsertSalesRoutingDiagnosticMessage.js";
export {
  msdyn_UpsertSellerAssignmentMapRequest,
  msdyn_UpsertSellerAssignmentMapResponse,
} from "./msdyn_UpsertSellerAssignmentMapMessage.js";
export {
  msdyn_URFirstPartyIntegrationApiRequest,
  msdyn_URFirstPartyIntegrationApiResponse,
} from "./msdyn_URFirstPartyIntegrationApiMessage.js";
export {
  msdyn_UserOptOutActorRequest,
  msdyn_UserOptOutActorResponse,
} from "./msdyn_UserOptOutActorMessage.js";
export {
  msdyn_UserSecurityRoleDeltaSyncActorRequest,
  msdyn_UserSecurityRoleDeltaSyncActorResponse,
} from "./msdyn_UserSecurityRoleDeltaSyncActorMessage.js";
export {
  msdyn_ValidateCustomMessagingApplicationRequest,
  msdyn_ValidateCustomMessagingApplicationResponse,
} from "./msdyn_ValidateCustomMessagingApplicationMessage.js";
export {
  msdyn_ValidateKeyVaultRequest,
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
  msdyn_WKWDeleteGDPRDataResponse,
} from "./msdyn_WKWDeleteGDPRDataMessage.js";
export {
  msdyn_WKWGDPRDeleteStatusRequest,
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
  msdyncrm_UpsertFileResponse,
} from "./msdyncrm_UpsertFileMessage.js";
export {
  msdynmkt_ChannelContentPersonalizeRequest,
  msdynmkt_ChannelContentPersonalizeResponse,
} from "./msdynmkt_ChannelContentPersonalizeMessage.js";
export {
  msdynmkt_ChartWidgetDataCustomActionRequest,
  msdynmkt_ChartWidgetDataCustomActionResponse,
} from "./msdynmkt_ChartWidgetDataCustomActionMessage.js";
export {
  msdynmkt_checkconsentRequest,
  msdynmkt_checkconsentResponse,
} from "./msdynmkt_checkconsentMessage.js";
export {
  msdynmkt_checkconsentbatchRequest,
  msdynmkt_checkconsentbatchResponse,
} from "./msdynmkt_checkconsentbatchMessage.js";
export {
  msdynmkt_consentprovidervalidateRequest,
  msdynmkt_consentprovidervalidateResponse,
} from "./msdynmkt_consentprovidervalidateMessage.js";
export {
  msdynmkt_consentsubmissionRequest,
  msdynmkt_consentsubmissionResponse,
} from "./msdynmkt_consentsubmissionMessage.js";
export {
  msdynmkt_consentvalidateformRequest,
  msdynmkt_consentvalidateformResponse,
} from "./msdynmkt_consentvalidateformMessage.js";
export {
  msdynmkt_ContactabilitySnapshotCustomActionRequest,
  msdynmkt_ContactabilitySnapshotCustomActionResponse,
} from "./msdynmkt_ContactabilitySnapshotCustomActionMessage.js";
export {
  msdynmkt_contactablefieldsactionRequest,
  msdynmkt_contactablefieldsactionResponse,
} from "./msdynmkt_contactablefieldsactionMessage.js";
export {
  msdynmkt_DateTimeFormatOptionsRequest,
  msdynmkt_DateTimeFormatOptionsResponse,
} from "./msdynmkt_DateTimeFormatOptionsMessage.js";
export {
  msdynmkt_DiscoverPlaceholdersRequest,
  msdynmkt_DiscoverPlaceholdersResponse,
} from "./msdynmkt_DiscoverPlaceholdersMessage.js";
export {
  msdynmkt_doubleoptinstatusRequest,
  msdynmkt_doubleoptinstatusResponse,
} from "./msdynmkt_doubleoptinstatusMessage.js";
export {
  msdynmkt_enabledoubleoptincomplianceRequest,
  msdynmkt_enabledoubleoptincomplianceResponse,
} from "./msdynmkt_enabledoubleoptincomplianceMessage.js";
export {
  msdynmkt_EnableDoubleOptInComplianceV2Request,
  msdynmkt_EnableDoubleOptInComplianceV2Response,
} from "./msdynmkt_EnableDoubleOptInComplianceV2Message.js";
export {
  msdynmkt_GetAllCjoEventsMetadataItemsRequest,
  msdynmkt_GetAllCjoEventsMetadataItemsResponse,
} from "./msdynmkt_GetAllCjoEventsMetadataItemsMessage.js";
export {
  msdynmkt_GetAllLegalMetadataItemsRequest,
  msdynmkt_GetAllLegalMetadataItemsResponse,
} from "./msdynmkt_GetAllLegalMetadataItemsMessage.js";
export {
  msdynmkt_GetCjoEventsMetadataItemsByNamesRequest,
  msdynmkt_GetCjoEventsMetadataItemsByNamesResponse,
} from "./msdynmkt_GetCjoEventsMetadataItemsByNamesMessage.js";
export {
  msdynmkt_GetDataverseTableMetadataItemsRequest,
  msdynmkt_GetDataverseTableMetadataItemsResponse,
} from "./msdynmkt_GetDataverseTableMetadataItemsMessage.js";
export {
  msdynmkt_getdigitalassetcdnurlv2Request,
  msdynmkt_getdigitalassetcdnurlv2Response,
} from "./msdynmkt_getdigitalassetcdnurlv2Message.js";
export {
  msdynmkt_GetMetadataItemsForRequest,
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
  msdynmkt_getsuppressionlistentriesResponse,
} from "./msdynmkt_getsuppressionlistentriesMessage.js";
export {
  msdynmkt_getsuppressionlistentryRequest,
  msdynmkt_getsuppressionlistentryResponse,
} from "./msdynmkt_getsuppressionlistentryMessage.js";
export {
  msdynmkt_getunsubscribelinkRequest,
  msdynmkt_getunsubscribelinkResponse,
} from "./msdynmkt_getunsubscribelinkMessage.js";
export {
  msdynmkt_leadcapturev3submissionRequest,
  msdynmkt_leadcapturev3submissionResponse,
} from "./msdynmkt_leadcapturev3submissionMessage.js";
export {
  msdynmkt_leadcapturev4submissionRequest,
  msdynmkt_leadcapturev4submissionResponse,
} from "./msdynmkt_leadcapturev4submissionMessage.js";
export {
  msdynmkt_ListWidgetDataCustomActionRequest,
  msdynmkt_ListWidgetDataCustomActionResponse,
} from "./msdynmkt_ListWidgetDataCustomActionMessage.js";
export {
  msdynmkt_normalizecontactpointRequest,
  msdynmkt_normalizecontactpointResponse,
} from "./msdynmkt_normalizecontactpointMessage.js";
export {
  msdynmkt_optoutofallvoicecommunicationRequest,
  msdynmkt_optoutofallvoicecommunicationResponse,
} from "./msdynmkt_optoutofallvoicecommunicationMessage.js";
export {
  msdynmkt_optoutofvoicecommunicationRequest,
  msdynmkt_optoutofvoicecommunicationResponse,
} from "./msdynmkt_optoutofvoicecommunicationMessage.js";
export {
  msdynmkt_PersonalizationDynamicTextAiRequest,
  msdynmkt_PersonalizationDynamicTextAiResponse,
} from "./msdynmkt_PersonalizationDynamicTextAiMessage.js";
export {
  msdynmkt_PersonalizationGetEntityAttributesRequest,
  msdynmkt_PersonalizationGetEntityAttributesResponse,
} from "./msdynmkt_PersonalizationGetEntityAttributesMessage.js";
export {
  msdynmkt_PersonalizationGetEntityProvidersRequest,
  msdynmkt_PersonalizationGetEntityProvidersResponse,
} from "./msdynmkt_PersonalizationGetEntityProvidersMessage.js";
export {
  msdynmkt_PersonalizationGetEntityTypesRequest,
  msdynmkt_PersonalizationGetEntityTypesResponse,
} from "./msdynmkt_PersonalizationGetEntityTypesMessage.js";
export {
  msdynmkt_PersonalizationGetEventsByNameRequest,
  msdynmkt_PersonalizationGetEventsByNameResponse,
} from "./msdynmkt_PersonalizationGetEventsByNameMessage.js";
export {
  msdynmkt_PredefinedPlaceholderAddCountRequest,
  msdynmkt_PredefinedPlaceholderAddCountResponse,
} from "./msdynmkt_PredefinedPlaceholderAddCountMessage.js";
export {
  msdynmkt_purposecreationandassociationRequest,
  msdynmkt_purposecreationandassociationResponse,
} from "./msdynmkt_purposecreationandassociationMessage.js";
export {
  msdynmkt_removesuppressionlistentryRequest,
  msdynmkt_removesuppressionlistentryResponse,
} from "./msdynmkt_removesuppressionlistentryMessage.js";
export {
  msdynmkt_RetrieveAllFeatureConfigurationsRequest,
  msdynmkt_RetrieveAllFeatureConfigurationsResponse,
} from "./msdynmkt_RetrieveAllFeatureConfigurationsMessage.js";
export {
  msdynmkt_RetrieveAnalyitcsAriaCountsRequest,
  msdynmkt_RetrieveAnalyitcsAriaCountsResponse,
} from "./msdynmkt_RetrieveAnalyitcsAriaCountsMessage.js";
export {
  msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryRequest,
  msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryResponse,
} from "./msdynmkt_RetrieveAnalyitcsAriaCountsWithQueryMessage.js";
export {
  msdynmkt_RetrieveServiceFeatureFlagsRequest,
  msdynmkt_RetrieveServiceFeatureFlagsResponse,
} from "./msdynmkt_RetrieveServiceFeatureFlagsMessage.js";
export {
  msdynmkt_StartLoadConsentV4CustomActionRequest,
  msdynmkt_StartLoadConsentV4CustomActionResponse,
} from "./msdynmkt_StartLoadConsentV4CustomActionMessage.js";
export {
  msdynmkt_StartMigrationCustomActionRequest,
  msdynmkt_StartMigrationCustomActionResponse,
} from "./msdynmkt_StartMigrationCustomActionMessage.js";
export {
  msdynmkt_updategdprconfigurationRequest,
  msdynmkt_updategdprconfigurationResponse,
} from "./msdynmkt_updategdprconfigurationMessage.js";
export {
  msdynmkt_ValidatePlaceholdersRequest,
  msdynmkt_ValidatePlaceholdersResponse,
} from "./msdynmkt_ValidatePlaceholdersMessage.js";
export {
  msdynmkt_ValueWidgetDataCustomActionRequest,
  msdynmkt_ValueWidgetDataCustomActionResponse,
} from "./msdynmkt_ValueWidgetDataCustomActionMessage.js";
export {
  msft_DataEngineIndexMgmt_CreateIndexRequest,
  msft_DataEngineIndexMgmt_CreateIndexResponse,
} from "./msft_DataEngineIndexMgmt_CreateIndexMessage.js";
export {
  msft_GetSecHubFeatureDataRequest,
  msft_GetSecHubFeatureDataResponse,
} from "./msft_GetSecHubFeatureDataMessage.js";
export {
  msft_LabelAttributeMappingRequest,
  msft_LabelAttributeMappingResponse,
} from "./msft_LabelAttributeMappingMessage.js";
export {
  NotifyEnvironmentVariableSecretChangeRequest,
  NotifyEnvironmentVariableSecretChangeResponse,
} from "./NotifyEnvironmentVariableSecretChangeMessage.js";
export {
  OnBackgroundOperationCompleteRequest,
  OnBackgroundOperationCompleteResponse,
} from "./OnBackgroundOperationCompleteMessage.js";
export { OnExternalCreatedRequest, OnExternalCreatedResponse } from "./OnExternalCreatedMessage.js";
export { OnExternalDeletedRequest, OnExternalDeletedResponse } from "./OnExternalDeletedMessage.js";
export { OnExternalUpdatedRequest, OnExternalUpdatedResponse } from "./OnExternalUpdatedMessage.js";
export { OrderOptionRequest, OrderOptionResponse } from "./OrderOptionMessage.js";
export { ParseImportRequest, ParseImportResponse } from "./ParseImportMessage.js";
export {
  pbi_CloneAndAddPowerBIDatasetRequest,
  pbi_CloneAndAddPowerBIDatasetResponse,
} from "./pbi_CloneAndAddPowerBIDatasetMessage.js";
export {
  pbi_CloneAndAddPowerBIReportRequest,
  pbi_CloneAndAddPowerBIReportResponse,
} from "./pbi_CloneAndAddPowerBIReportMessage.js";
export {
  PBIAutoRefreshDatasetRequest,
  PBIAutoRefreshDatasetResponse,
} from "./PBIAutoRefreshDatasetMessage.js";
export { PickFromQueueRequest, PickFromQueueResponse } from "./PickFromQueueMessage.js";
export { pm_CreateProcessRequest, pm_CreateProcessResponse } from "./pm_CreateProcessMessage.js";
export {
  pm_RefreshProcessMiningLicensingCapacityRequest,
  pm_RefreshProcessMiningLicensingCapacityResponse,
} from "./pm_RefreshProcessMiningLicensingCapacityMessage.js";
export {
  PowerAutomateProxyRequest,
  PowerAutomateProxyResponse,
} from "./PowerAutomateProxyMessage.js";
export { PredictRequest, PredictResponse } from "./PredictMessage.js";
export {
  PredictByReferenceRequest,
  PredictByReferenceResponse,
} from "./PredictByReferenceMessage.js";
export { PredictionSchemaRequest, PredictionSchemaResponse } from "./PredictionSchemaMessage.js";
export {
  PreValidateGitComponentsRequest,
  PreValidateGitComponentsResponse,
} from "./PreValidateGitComponentsMessage.js";
export {
  ProcessInboundEmailRequest,
  ProcessInboundEmailResponse,
} from "./ProcessInboundEmailMessage.js";
export {
  PropagateByExpressionRequest,
  PropagateByExpressionResponse,
} from "./PropagateByExpressionMessage.js";
export {
  ProvisionDelegationRequest,
  ProvisionDelegationResponse,
} from "./ProvisionDelegationMessage.js";
export { ProvisionLanguageRequest, ProvisionLanguageResponse } from "./ProvisionLanguageMessage.js";
export {
  ProvisionLanguageAsyncRequest,
  ProvisionLanguageAsyncResponse,
} from "./ProvisionLanguageAsyncMessage.js";
export {
  PublishAIConfigurationRequest,
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
export { PublishXmlRequest, PublishXmlResponse } from "./PublishXmlMessage.js";
export {
  PullChangesFromGitRequest,
  PullChangesFromGitResponse,
} from "./PullChangesFromGitMessage.js";
export {
  PurgeRetainedContentRequest,
  PurgeRetainedContentResponse,
} from "./PurgeRetainedContentMessage.js";
export { PvaAuthorizeRequest, PvaAuthorizeResponse } from "./PvaAuthorizeMessage.js";
export {
  PvaComponentCollectionAuthorizeRequest,
  PvaComponentCollectionAuthorizeResponse,
} from "./PvaComponentCollectionAuthorizeMessage.js";
export {
  PvaCreateBotComponentsRequest,
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
export { PvaGetUserBotsRequest, PvaGetUserBotsResponse } from "./PvaGetUserBotsMessage.js";
export { PvaProvisionRequest, PvaProvisionResponse } from "./PvaProvisionMessage.js";
export { PvaPublishRequest, PvaPublishResponse } from "./PvaPublishMessage.js";
export { PvaPublishStatusRequest, PvaPublishStatusResponse } from "./PvaPublishStatusMessage.js";
export {
  PvaShareConnectionRequest,
  PvaShareConnectionResponse,
} from "./PvaShareConnectionMessage.js";
export {
  PvaStartConversationRequest,
  PvaStartConversationResponse,
} from "./PvaStartConversationMessage.js";
export { QualifyLeadRequest, QualifyLeadResponse } from "./QualifyLeadMessage.js";
export { QualifyMemberListRequest, QualifyMemberListResponse } from "./QualifyMemberListMessage.js";
export {
  QueryDvUnstructuredDataRequest,
  QueryDvUnstructuredDataResponse,
} from "./QueryDvUnstructuredDataMessage.js";
export {
  QueryExpressionToFetchXmlRequest,
  QueryExpressionToFetchXmlResponse,
} from "./QueryExpressionToFetchXmlMessage.js";
export {
  QuerySalesforceUnstructuredDataRequest,
  QuerySalesforceUnstructuredDataResponse,
} from "./QuerySalesforceUnstructuredDataMessage.js";
export {
  querystructureddatastreamRequest,
  querystructureddatastreamResponse,
} from "./querystructureddatastreamMessage.js";
export {
  QueryZendeskUnstructuredArticlesRequest,
  QueryZendeskUnstructuredArticlesResponse,
} from "./QueryZendeskUnstructuredArticlesMessage.js";
export { QuestionAnalyticsRequest, QuestionAnalyticsResponse } from "./QuestionAnalyticsMessage.js";
export {
  QueueUpdateRibbonClientMetadataRequest,
  QueueUpdateRibbonClientMetadataResponse,
} from "./QueueUpdateRibbonClientMetadataMessage.js";
export { QuickTestRequest, QuickTestResponse } from "./QuickTestMessage.js";
export {
  ReactivateEntityKeyRequest,
  ReactivateEntityKeyResponse,
} from "./ReactivateEntityKeyMessage.js";
export {
  ReassignObjectsOwnerRequest,
  ReassignObjectsOwnerResponse,
} from "./ReassignObjectsOwnerMessage.js";
export {
  ReassignObjectsSystemUserRequest,
  ReassignObjectsSystemUserResponse,
} from "./ReassignObjectsSystemUserMessage.js";
export { RecalculateRequest, RecalculateResponse } from "./RecalculateMessage.js";
export { RecalculatePriceRequest, RecalculatePriceResponse } from "./RecalculatePriceMessage.js";
export { RecognizeTextRequest, RecognizeTextResponse } from "./RecognizeTextMessage.js";
export {
  RefreshChangesFromGitRequest,
  RefreshChangesFromGitResponse,
} from "./RefreshChangesFromGitMessage.js";
export {
  RefreshRpaLicensingCapacityRequest,
  RefreshRpaLicensingCapacityResponse,
} from "./RefreshRpaLicensingCapacityMessage.js";
export {
  RegisterFlowMachineRequest,
  RegisterFlowMachineResponse,
} from "./RegisterFlowMachineMessage.js";
export { ReleaseToQueueRequest, ReleaseToQueueResponse } from "./ReleaseToQueueMessage.js";
export {
  RemoveActiveCustomizationRequest,
  RemoveActiveCustomizationResponse,
} from "./RemoveActiveCustomizationMessage.js";
export {
  RemoveAppComponentsRequest,
  RemoveAppComponentsResponse,
} from "./RemoveAppComponentsMessage.js";
export {
  RemoveCertificateCredentialRequest,
  RemoveCertificateCredentialResponse,
} from "./RemoveCertificateCredentialMessage.js";
export { RemoveFromQueueRequest, RemoveFromQueueResponse } from "./RemoveFromQueueMessage.js";
export {
  RemoveItemCampaignRequest,
  RemoveItemCampaignResponse,
} from "./RemoveItemCampaignMessage.js";
export {
  RemoveItemCampaignActivityRequest,
  RemoveItemCampaignActivityResponse,
} from "./RemoveItemCampaignActivityMessage.js";
export {
  RemoveListMembersListRequest,
  RemoveListMembersListResponse,
} from "./RemoveListMembersListMessage.js";
export { RemoveMemberListRequest, RemoveMemberListResponse } from "./RemoveMemberListMessage.js";
export { RemoveMembersTeamRequest, RemoveMembersTeamResponse } from "./RemoveMembersTeamMessage.js";
export { RemoveParentRequest, RemoveParentResponse } from "./RemoveParentMessage.js";
export {
  RemovePrivilegeRoleRequest,
  RemovePrivilegeRoleResponse,
} from "./RemovePrivilegeRoleMessage.js";
export {
  RemoveSolutionComponentRequest,
  RemoveSolutionComponentResponse,
} from "./RemoveSolutionComponentMessage.js";
export {
  RemoveUserFromRecordTeamRequest,
  RemoveUserFromRecordTeamResponse,
} from "./RemoveUserFromRecordTeamMessage.js";
export { RenewContractRequest, RenewContractResponse } from "./RenewContractMessage.js";
export { RenewEntitlementRequest, RenewEntitlementResponse } from "./RenewEntitlementMessage.js";
export {
  ReplacePrivilegesRoleRequest,
  ReplacePrivilegesRoleResponse,
} from "./ReplacePrivilegesRoleMessage.js";
export { RescheduleRequest, RescheduleResponse } from "./RescheduleMessage.js";
export { ResetUserFiltersRequest, ResetUserFiltersResponse } from "./ResetUserFiltersMessage.js";
export {
  RestartHostedMachineRequest,
  RestartHostedMachineResponse,
} from "./RestartHostedMachineMessage.js";
export { RestoreRequest, RestoreResponse } from "./RestoreMessage.js";
export { RetainRequest, RetainResponse } from "./RetainMessage.js";
export {
  RetrieveAppsWithDelegatedAccessPermissionsRequest,
  RetrieveAppsWithDelegatedAccessPermissionsResponse,
} from "./RetrieveAppsWithDelegatedAccessPermissionsMessage.js";
export {
  RetrieveBoolFeatureControlSettingRequest,
  RetrieveBoolFeatureControlSettingResponse,
} from "./RetrieveBoolFeatureControlSettingMessage.js";
export {
  RetrieveConnectorActionsRequest,
  RetrieveConnectorActionsResponse,
} from "./RetrieveConnectorActionsMessage.js";
export {
  RetrieveConnectorSettingsRequest,
  RetrieveConnectorSettingsResponse,
} from "./RetrieveConnectorSettingsMessage.js";
export {
  RetrieveEnvironmentVariableSecretValueRequest,
  RetrieveEnvironmentVariableSecretValueResponse,
} from "./RetrieveEnvironmentVariableSecretValueMessage.js";
export {
  RetrieveFeatureControlSettingRequest,
  RetrieveFeatureControlSettingResponse,
} from "./RetrieveFeatureControlSettingMessage.js";
export {
  RetrieveFeatureControlSettingsRequest,
  RetrieveFeatureControlSettingsResponse,
} from "./RetrieveFeatureControlSettingsMessage.js";
export {
  RetrieveFeatureControlSettingsByNamespaceRequest,
  RetrieveFeatureControlSettingsByNamespaceResponse,
} from "./RetrieveFeatureControlSettingsByNamespaceMessage.js";
export {
  RetrieveFeatureControlStringSettingsRequest,
  RetrieveFeatureControlStringSettingsResponse,
} from "./RetrieveFeatureControlStringSettingsMessage.js";
export {
  RetrieveFeatureControlStringSettingsForNamespaceRequest,
  RetrieveFeatureControlStringSettingsForNamespaceResponse,
} from "./RetrieveFeatureControlStringSettingsForNamespaceMessage.js";
export {
  RetrieveFlowUpdatesRequest,
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
export { RevertProductRequest, RevertProductResponse } from "./RevertProductMessage.js";
export { ReviseQuoteRequest, ReviseQuoteResponse } from "./ReviseQuoteMessage.js";
export { RevokeAccessRequest, RevokeAccessResponse } from "./RevokeAccessMessage.js";
export { RevokeSharedLinkRequest, RevokeSharedLinkResponse } from "./RevokeSharedLinkMessage.js";
export { RollbackRetainRequest, RollbackRetainResponse } from "./RollbackRetainMessage.js";
export { RotateGroupKeyRequest, RotateGroupKeyResponse } from "./RotateGroupKeyMessage.js";
export { RouteToRequest, RouteToResponse } from "./RouteToMessage.js";
export {
  RunDataProcessingModuleRequest,
  RunDataProcessingModuleResponse,
} from "./RunDataProcessingModuleMessage.js";
export { RunDesktopFlowRequest, RunDesktopFlowResponse } from "./RunDesktopFlowMessage.js";
export { SaveAsDesktopFlowRequest, SaveAsDesktopFlowResponse } from "./SaveAsDesktopFlowMessage.js";
export {
  SaveAsDesktopFlowModuleRequest,
  SaveAsDesktopFlowModuleResponse,
} from "./SaveAsDesktopFlowModuleMessage.js";
export { SaveSettingValueRequest, SaveSettingValueResponse } from "./SaveSettingValueMessage.js";
export {
  SchedulePredictionRequest,
  SchedulePredictionResponse,
} from "./SchedulePredictionMessage.js";
export { ScheduleRetrainRequest, ScheduleRetrainResponse } from "./ScheduleRetrainMessage.js";
export { ScheduleTrainingRequest, ScheduleTrainingResponse } from "./ScheduleTrainingMessage.js";
export {
  searchautocompleteRequest,
  searchautocompleteResponse,
} from "./searchautocompleteMessage.js";
export { searchqueryRequest, searchqueryResponse } from "./searchqueryMessage.js";
export { searchsuggestRequest, searchsuggestResponse } from "./searchsuggestMessage.js";
export { SearchWebRequest, SearchWebResponse } from "./SearchWebMessage.js";
export {
  SendAppNotificationRequest,
  SendAppNotificationResponse,
} from "./SendAppNotificationMessage.js";
export { SendBulkMailRequest, SendBulkMailResponse } from "./SendBulkMailMessage.js";
export { SendEmailRequest, SendEmailResponse } from "./SendEmailMessage.js";
export {
  SendEmailFromTemplateRequest,
  SendEmailFromTemplateResponse,
} from "./SendEmailFromTemplateMessage.js";
export { SendFaxRequest, SendFaxResponse } from "./SendFaxMessage.js";
export { SendTemplateRequest, SendTemplateResponse } from "./SendTemplateMessage.js";
export { SetAutoNumberSeedRequest, SetAutoNumberSeedResponse } from "./SetAutoNumberSeedMessage.js";
export {
  SetBusinessEquipmentRequest,
  SetBusinessEquipmentResponse,
} from "./SetBusinessEquipmentMessage.js";
export {
  SetBusinessSystemUserRequest,
  SetBusinessSystemUserResponse,
} from "./SetBusinessSystemUserMessage.js";
export {
  SetDataEncryptionKeyRequest,
  SetDataEncryptionKeyResponse,
} from "./SetDataEncryptionKeyMessage.js";
export { SetFeatureStatusRequest, SetFeatureStatusResponse } from "./SetFeatureStatusMessage.js";
export { SetLocLabelsRequest, SetLocLabelsResponse } from "./SetLocLabelsMessage.js";
export {
  SetParentSystemUserRequest,
  SetParentSystemUserResponse,
} from "./SetParentSystemUserMessage.js";
export { SetParentTeamRequest, SetParentTeamResponse } from "./SetParentTeamMessage.js";
export {
  SetPreferredSolutionRequest,
  SetPreferredSolutionResponse,
} from "./SetPreferredSolutionMessage.js";
export { SetProcessRequest, SetProcessResponse } from "./SetProcessMessage.js";
export { SetReportRelatedRequest, SetReportRelatedResponse } from "./SetReportRelatedMessage.js";
export { SetupAiConnectionRequest, SetupAiConnectionResponse } from "./SetupAiConnectionMessage.js";
export { ShareRequest, ShareResponse } from "./ShareMessage.js";
export {
  SnapshotDatasourceRequest,
  SnapshotDatasourceResponse,
} from "./SnapshotDatasourceMessage.js";
export { StageAndUpgradeRequest, StageAndUpgradeResponse } from "./StageAndUpgradeMessage.js";
export {
  StageAndUpgradeAsyncRequest,
  StageAndUpgradeAsyncResponse,
} from "./StageAndUpgradeAsyncMessage.js";
export { StageSolutionRequest, StageSolutionResponse } from "./StageSolutionMessage.js";
export {
  SubstituteForAttributeRequest,
  SubstituteForAttributeResponse,
} from "./SubstituteForAttributeMessage.js";
export {
  SubstituteForComponentRequest,
  SubstituteForComponentResponse,
} from "./SubstituteForComponentMessage.js";
export { SummarizeRecordRequest, SummarizeRecordResponse } from "./SummarizeRecordMessage.js";
export { SyncBulkOperationRequest, SyncBulkOperationResponse } from "./SyncBulkOperationMessage.js";
export {
  SyncCopresenceStateRequest,
  SyncCopresenceStateResponse,
} from "./SyncCopresenceStateMessage.js";
export {
  SyncGroupMembersToTeamRequest,
  SyncGroupMembersToTeamResponse,
} from "./SyncGroupMembersToTeamMessage.js";
export { TrainRequest, TrainResponse } from "./TrainMessage.js";
export { TransformImportRequest, TransformImportResponse } from "./TransformImportMessage.js";
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
export { UninstallSolutionRequest, UninstallSolutionResponse } from "./UninstallSolutionMessage.js";
export {
  UninstallSolutionAsyncRequest,
  UninstallSolutionAsyncResponse,
} from "./UninstallSolutionAsyncMessage.js";
export {
  UnlockInvoicePricingRequest,
  UnlockInvoicePricingResponse,
} from "./UnlockInvoicePricingMessage.js";
export {
  UnlockSalesOrderPricingRequest,
  UnlockSalesOrderPricingResponse,
} from "./UnlockSalesOrderPricingMessage.js";
export {
  UnpublishAIConfigurationRequest,
  UnpublishAIConfigurationResponse,
} from "./UnpublishAIConfigurationMessage.js";
export {
  UnpublishDuplicateRuleRequest,
  UnpublishDuplicateRuleResponse,
} from "./UnpublishDuplicateRuleMessage.js";
export {
  UnschedulePredictionRequest,
  UnschedulePredictionResponse,
} from "./UnschedulePredictionMessage.js";
export {
  UnscheduleTrainingRequest,
  UnscheduleTrainingResponse,
} from "./UnscheduleTrainingMessage.js";
export {
  UpdateAccountCredentialsRequest,
  UpdateAccountCredentialsResponse,
} from "./UpdateAccountCredentialsMessage.js";
export {
  UpdateAutomatedPluginRequest,
  UpdateAutomatedPluginResponse,
} from "./UpdateAutomatedPluginMessage.js";
export {
  UpdateFeatureConfigRequest,
  UpdateFeatureConfigResponse,
} from "./UpdateFeatureConfigMessage.js";
export {
  UpdateFlowMachineNetworkRequest,
  UpdateFlowMachineNetworkResponse,
} from "./UpdateFlowMachineNetworkMessage.js";
export {
  UpdateInstantPluginRequest,
  UpdateInstantPluginResponse,
} from "./UpdateInstantPluginMessage.js";
export { UpdateMultipleRequest, UpdateMultipleResponse } from "./UpdateMultipleMessage.js";
export { UpdateOptionValueRequest, UpdateOptionValueResponse } from "./UpdateOptionValueMessage.js";
export {
  UpdateProductPropertiesRequest,
  UpdateProductPropertiesResponse,
} from "./UpdateProductPropertiesMessage.js";
export {
  UpdateRibbonClientMetadataRequest,
  UpdateRibbonClientMetadataResponse,
} from "./UpdateRibbonClientMetadataMessage.js";
export {
  UpdateSolutionComponentRequest,
  UpdateSolutionComponentResponse,
} from "./UpdateSolutionComponentMessage.js";
export { UpdateStateValueRequest, UpdateStateValueResponse } from "./UpdateStateValueMessage.js";
export { UploadBlockRequest, UploadBlockResponse } from "./UploadBlockMessage.js";
export {
  UpsertCompositeDataSourceRequest,
  UpsertCompositeDataSourceResponse,
} from "./UpsertCompositeDataSourceMessage.js";
export {
  UpsertEnvironmentVariableRequest,
  UpsertEnvironmentVariableResponse,
} from "./UpsertEnvironmentVariableMessage.js";
export { UpsertMultipleRequest, UpsertMultipleResponse } from "./UpsertMultipleMessage.js";
export { ValidateRequest, ValidateResponse } from "./ValidateMessage.js";
export {
  ValidateAIConfigurationRequest,
  ValidateAIConfigurationResponse,
} from "./ValidateAIConfigurationMessage.js";
export {
  ValidateRetentionConfigRequest,
  ValidateRetentionConfigResponse,
} from "./ValidateRetentionConfigMessage.js";
export {
  ValidateSavedQueryRequest,
  ValidateSavedQueryResponse,
} from "./ValidateSavedQueryMessage.js";
export {
  ValidateUnpublishedRequest,
  ValidateUnpublishedResponse,
} from "./ValidateUnpublishedMessage.js";
export { WinOpportunityRequest, WinOpportunityResponse } from "./WinOpportunityMessage.js";
export { WinQuoteRequest, WinQuoteResponse } from "./WinQuoteMessage.js";
