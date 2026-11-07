/**
 * Web API Action Messages
 *
 * Auto-generated TypeScript wrappers for Dataverse Web API actions.
 * Use with IOrganizationService.execute() for C#-familiar patterns.
 */

// Base classes and types
export { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
export type { OrganizationRequestOptions } from "./OrganizationRequest.js";
export {
  type EntityReference,
  type EntityReferenceOptions,
  type WebApiEntityReference,
  createEntityReference,
  getEntitySetNameFromReference,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
export type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
export type { MessageRequest, MessageResponse } from "./types.js";

// Message classes
export {
  _CloneRoutingRuleSetRequest,
  type _CloneRoutingRuleSetRequestParameters,
  _CloneRoutingRuleSetResponse,
  type _CloneRoutingRuleSetResult,
} from "./_CloneRoutingRuleSetMessage.js";
export {
  _DownloademailasattachmentRequest,
  type _DownloademailasattachmentRequestParameters,
  _DownloademailasattachmentResponse,
  type _DownloademailasattachmentResult,
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
  type _EvaluateSearchRequestResult,
} from "./_EvaluateSearchRequestMessage.js";
export {
  _GetServiceTreeDataRequest,
  type _GetServiceTreeDataRequestParameters,
  _GetServiceTreeDataResponse,
  type _GetServiceTreeDataResult,
} from "./_GetServiceTreeDataMessage.js";
export {
  _InvokeHideReserveEntitiesRequest,
  _InvokeHideReserveEntitiesResponse,
  type _InvokeHideReserveEntitiesResult,
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
  type _ResourcesAddUpdateActionResult,
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
  type _RetrieveActivitiesByResourcesResult,
} from "./_RetrieveActivitiesByResourcesMessage.js";
export {
  _RoutingRuleSetValidationRequest,
  type _RoutingRuleSetValidationRequestParameters,
  _RoutingRuleSetValidationResponse,
  type _RoutingRuleSetValidationResult,
} from "./_RoutingRuleSetValidationMessage.js";
export {
  _SaveServiceTreeDataRequest,
  type _SaveServiceTreeDataRequestParameters,
  _SaveServiceTreeDataResponse,
  type _SaveServiceTreeDataResult,
} from "./_SaveServiceTreeDataMessage.js";
export {
  _ServiceCalendarActionRequest,
  type _ServiceCalendarActionRequestParameters,
  _ServiceCalendarActionResponse,
  type _ServiceCalendarActionResult,
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
  type _ValidateAndAllocateBusinessCardReaderCurrencyResult,
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
  type AddComponentsToSolutionAsyncResult,
} from "./AddComponentsToSolutionAsyncMessage.js";
export {
  AddComponentToSolutionAsyncRequest,
  type AddComponentToSolutionAsyncRequestParameters,
  AddComponentToSolutionAsyncResponse,
  type AddComponentToSolutionAsyncResult,
} from "./AddComponentToSolutionAsyncMessage.js";
export {
  AddItemCampaign_campaignRequest,
  type AddItemCampaign_campaignRequestParameters,
  AddItemCampaign_campaignResponse,
  type AddItemCampaign_campaignResult,
} from "./AddItemCampaign_campaignMessage.js";
export {
  AddItemCampaign_listRequest,
  type AddItemCampaign_listRequestParameters,
  AddItemCampaign_listResponse,
  type AddItemCampaign_listResult,
} from "./AddItemCampaign_listMessage.js";
export {
  AddItemCampaign_productRequest,
  type AddItemCampaign_productRequestParameters,
  AddItemCampaign_productResponse,
  type AddItemCampaign_productResult,
} from "./AddItemCampaign_productMessage.js";
export {
  AddItemCampaign_salesliteratureRequest,
  type AddItemCampaign_salesliteratureRequestParameters,
  AddItemCampaign_salesliteratureResponse,
  type AddItemCampaign_salesliteratureResult,
} from "./AddItemCampaign_salesliteratureMessage.js";
export {
  AddItemCampaignActivityRequest,
  type AddItemCampaignActivityRequestParameters,
  AddItemCampaignActivityResponse,
  type AddItemCampaignActivityResult,
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
  type AddMemberListResult,
} from "./AddMemberListMessage.js";
export {
  AddMembersBatchListRequest,
  type AddMembersBatchListRequestParameters,
  AddMembersBatchListResponse,
  type AddMembersBatchListResult,
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
  type AddRecurrenceResult,
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
  type AddSolutionComponentResult,
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
  type AddToQueueResult,
} from "./AddToQueueMessage.js";
export {
  AddUserToRecordTeamRequest,
  type AddUserToRecordTeamRequestParameters,
  AddUserToRecordTeamResponse,
  type AddUserToRecordTeamResult,
} from "./AddUserToRecordTeamMessage.js";
export {
  AddWorkQueueItemProcessingHistoryEntryRequest,
  type AddWorkQueueItemProcessingHistoryEntryRequestParameters,
  AddWorkQueueItemProcessingHistoryEntryResponse,
} from "./AddWorkQueueItemProcessingHistoryEntryMessage.js";
export {
  AIClassifyRequest,
  type AIClassifyRequestParameters,
  AIClassifyResponse,
  type AIClassifyResult,
} from "./AIClassifyMessage.js";
export {
  AIExtractRequest,
  type AIExtractRequestParameters,
  AIExtractResponse,
  type AIExtractResult,
} from "./AIExtractMessage.js";
export {
  AIModelPublishRequest,
  type AIModelPublishRequestParameters,
  AIModelPublishResponse,
  type AIModelPublishResult,
} from "./AIModelPublishMessage.js";
export {
  AIReplyRequest,
  type AIReplyRequestParameters,
  AIReplyResponse,
  type AIReplyResult,
} from "./AIReplyMessage.js";
export {
  AISentimentRequest,
  type AISentimentRequestParameters,
  AISentimentResponse,
  type AISentimentResult,
} from "./AISentimentMessage.js";
export {
  AISummarizeRequest,
  type AISummarizeRequestParameters,
  AISummarizeResponse,
  type AISummarizeResult,
} from "./AISummarizeMessage.js";
export {
  AISummarizeRecordRequest,
  type AISummarizeRecordRequestParameters,
  AISummarizeRecordResponse,
  type AISummarizeRecordResult,
} from "./AISummarizeRecordMessage.js";
export {
  AITranslateRequest,
  type AITranslateRequestParameters,
  AITranslateResponse,
  type AITranslateResult,
} from "./AITranslateMessage.js";
export {
  AlmHandlerRequest,
  type AlmHandlerRequestParameters,
  AlmHandlerResponse,
  type AlmHandlerResult,
} from "./AlmHandlerMessage.js";
export {
  AnalyzeSentimentRequest,
  type AnalyzeSentimentRequestParameters,
  AnalyzeSentimentResponse,
  type AnalyzeSentimentResult,
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
  type BackgroundSendEmailResult,
} from "./BackgroundSendEmailMessage.js";
export {
  BatchGetFlowMachineStatusRequest,
  type BatchGetFlowMachineStatusRequestParameters,
  BatchGetFlowMachineStatusResponse,
  type BatchGetFlowMachineStatusResult,
} from "./BatchGetFlowMachineStatusMessage.js";
export {
  BatchPredictionRequest,
  type BatchPredictionRequestParameters,
  BatchPredictionResponse,
  type BatchPredictionResult,
} from "./BatchPredictionMessage.js";
export {
  BeginMachineImageProvisioningRequest,
  type BeginMachineImageProvisioningRequestParameters,
  BeginMachineImageProvisioningResponse,
  type BeginMachineImageProvisioningResult,
} from "./BeginMachineImageProvisioningMessage.js";
export {
  BookRequest,
  type BookRequestParameters,
  BookResponse,
  type BookResult,
} from "./BookMessage.js";
export {
  BulkDeleteRequest,
  type BulkDeleteRequestParameters,
  BulkDeleteResponse,
  type BulkDeleteResult,
} from "./BulkDeleteMessage.js";
export {
  BulkDetectDuplicatesRequest,
  type BulkDetectDuplicatesRequestParameters,
  BulkDetectDuplicatesResponse,
  type BulkDetectDuplicatesResult,
} from "./BulkDetectDuplicatesMessage.js";
export {
  BulkRemoveActiveCustomizationsAsyncRequest,
  type BulkRemoveActiveCustomizationsAsyncRequestParameters,
  BulkRemoveActiveCustomizationsAsyncResponse,
  type BulkRemoveActiveCustomizationsAsyncResult,
} from "./BulkRemoveActiveCustomizationsAsyncMessage.js";
export {
  BulkRetainRequest,
  type BulkRetainRequestParameters,
  BulkRetainResponse,
  type BulkRetainResult,
} from "./BulkRetainMessage.js";
export {
  CalculateActualValueOpportunityRequest,
  CalculateActualValueOpportunityResponse,
  type CalculateActualValueOpportunityResult,
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
  type CanBeReferencedResult,
} from "./CanBeReferencedMessage.js";
export {
  CanBeReferencingRequest,
  type CanBeReferencingRequestParameters,
  CanBeReferencingResponse,
  type CanBeReferencingResult,
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
  type CancelTrainingResult,
} from "./CancelTrainingMessage.js";
export {
  CanManyToManyRequest,
  type CanManyToManyRequestParameters,
  CanManyToManyResponse,
  type CanManyToManyResult,
} from "./CanManyToManyMessage.js";
export {
  CardCreateCloneRequest,
  type CardCreateCloneRequestParameters,
  CardCreateCloneResponse,
  type CardCreateCloneResult,
} from "./CardCreateCloneMessage.js";
export {
  CardGetFullJsonRequest,
  type CardGetFullJsonRequestParameters,
  CardGetFullJsonResponse,
  type CardGetFullJsonResult,
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
  type CategorizeTextResult,
} from "./CategorizeTextMessage.js";
export {
  ClearWorkQueueRequest,
  ClearWorkQueueResponse,
  type ClearWorkQueueResult,
} from "./ClearWorkQueueMessage.js";
export {
  CloneAsPatchRequest,
  type CloneAsPatchRequestParameters,
  CloneAsPatchResponse,
  type CloneAsPatchResult,
} from "./CloneAsPatchMessage.js";
export {
  CloneAsSolutionRequest,
  type CloneAsSolutionRequestParameters,
  CloneAsSolutionResponse,
  type CloneAsSolutionResult,
} from "./CloneAsSolutionMessage.js";
export {
  CloneContractRequest,
  type CloneContractRequestParameters,
  CloneContractResponse,
  type CloneContractResult,
} from "./CloneContractMessage.js";
export {
  CloneMobileOfflineProfileRequest,
  CloneMobileOfflineProfileResponse,
  type CloneMobileOfflineProfileResult,
} from "./CloneMobileOfflineProfileMessage.js";
export {
  CloneProductRequest,
  CloneProductResponse,
  type CloneProductResult,
} from "./CloneProductMessage.js";
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
  type CommitAnnotationBlocksUploadResult,
} from "./CommitAnnotationBlocksUploadMessage.js";
export {
  CommitAttachmentBlocksUploadRequest,
  type CommitAttachmentBlocksUploadRequestParameters,
  CommitAttachmentBlocksUploadResponse,
  type CommitAttachmentBlocksUploadResult,
} from "./CommitAttachmentBlocksUploadMessage.js";
export {
  CommitFileBlocksUploadRequest,
  type CommitFileBlocksUploadRequestParameters,
  CommitFileBlocksUploadResponse,
  type CommitFileBlocksUploadResult,
} from "./CommitFileBlocksUploadMessage.js";
export {
  CommitToGitRequest,
  type CommitToGitRequestParameters,
  CommitToGitResponse,
  type CommitToGitResult,
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
  type ConvertQuoteToSalesOrderResult,
} from "./ConvertQuoteToSalesOrderMessage.js";
export {
  ConvertSalesOrderToInvoiceRequest,
  type ConvertSalesOrderToInvoiceRequestParameters,
  ConvertSalesOrderToInvoiceResponse,
  type ConvertSalesOrderToInvoiceResult,
} from "./ConvertSalesOrderToInvoiceMessage.js";
export {
  copilotquerytextcontextRequest,
  type copilotquerytextcontextRequestParameters,
  copilotquerytextcontextResponse,
  type copilotquerytextcontextResult,
} from "./copilotquerytextcontextMessage.js";
export {
  CopyCampaignRequest,
  type CopyCampaignRequestParameters,
  CopyCampaignResponse,
  type CopyCampaignResult,
} from "./CopyCampaignMessage.js";
export {
  CopyCampaignResponseRequest,
  CopyCampaignResponseResponse,
  type CopyCampaignResponseResult,
} from "./CopyCampaignResponseMessage.js";
export {
  CopyDynamicListToStaticRequest,
  CopyDynamicListToStaticResponse,
  type CopyDynamicListToStaticResult,
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
  type CopySystemFormResult,
} from "./CopySystemFormMessage.js";
export {
  CreateActivitiesListRequest,
  type CreateActivitiesListRequestParameters,
  CreateActivitiesListResponse,
  type CreateActivitiesListResult,
} from "./CreateActivitiesListMessage.js";
export {
  CreateAndSendNewEmailRequest,
  type CreateAndSendNewEmailRequestParameters,
  CreateAndSendNewEmailResponse,
  type CreateAndSendNewEmailResult,
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
  type CreateCustomerRelationshipsResult,
} from "./CreateCustomerRelationshipsMessage.js";
export {
  CreateExceptionRequest,
  type CreateExceptionRequestParameters,
  CreateExceptionResponse,
  type CreateExceptionResult,
} from "./CreateExceptionMessage.js";
export {
  CreateFlowCredentialApplicationRequest,
  type CreateFlowCredentialApplicationRequestParameters,
  CreateFlowCredentialApplicationResponse,
  type CreateFlowCredentialApplicationResult,
} from "./CreateFlowCredentialApplicationMessage.js";
export {
  CreateFlowMachineNetworkRequest,
  type CreateFlowMachineNetworkRequestParameters,
  CreateFlowMachineNetworkResponse,
  type CreateFlowMachineNetworkResult,
} from "./CreateFlowMachineNetworkMessage.js";
export {
  CreateHostedFlowMachineGroupRequest,
  type CreateHostedFlowMachineGroupRequestParameters,
  CreateHostedFlowMachineGroupResponse,
  type CreateHostedFlowMachineGroupResult,
} from "./CreateHostedFlowMachineGroupMessage.js";
export {
  CreateInstanceRequest,
  type CreateInstanceRequestParameters,
  CreateInstanceResponse,
  type CreateInstanceResult,
} from "./CreateInstanceMessage.js";
export {
  CreateKnowledgeArticleTranslationRequest,
  type CreateKnowledgeArticleTranslationRequestParameters,
  CreateKnowledgeArticleTranslationResponse,
  type CreateKnowledgeArticleTranslationResult,
} from "./CreateKnowledgeArticleTranslationMessage.js";
export {
  CreateKnowledgeArticleVersionRequest,
  type CreateKnowledgeArticleVersionRequestParameters,
  CreateKnowledgeArticleVersionResponse,
  type CreateKnowledgeArticleVersionResult,
} from "./CreateKnowledgeArticleVersionMessage.js";
export {
  CreateMiniCampaignV2Request,
  type CreateMiniCampaignV2RequestParameters,
  CreateMiniCampaignV2Response,
  type CreateMiniCampaignV2Result,
} from "./CreateMiniCampaignV2Message.js";
export {
  CreateMultipleRequest,
  type CreateMultipleRequestParameters,
  CreateMultipleResponse,
  type CreateMultipleResult,
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
  type CreatePolymorphicLookupAttributeResult,
} from "./CreatePolymorphicLookupAttributeMessage.js";
export {
  CreateProcessWithWfomJsonRequest,
  type CreateProcessWithWfomJsonRequestParameters,
  CreateProcessWithWfomJsonResponse,
} from "./CreateProcessWithWfomJsonMessage.js";
export {
  CreateRoleWithPrivilegeCheckerRunRequest,
  type CreateRoleWithPrivilegeCheckerRunRequestParameters,
  CreateRoleWithPrivilegeCheckerRunResponse,
  type CreateRoleWithPrivilegeCheckerRunResult,
} from "./CreateRoleWithPrivilegeCheckerRunMessage.js";
export {
  CreateRpaBoxRequest,
  type CreateRpaBoxRequestParameters,
  CreateRpaBoxResponse,
  type CreateRpaBoxResult,
} from "./CreateRpaBoxMessage.js";
export {
  CreateVirtualConnectorTableRequest,
  type CreateVirtualConnectorTableRequestParameters,
  CreateVirtualConnectorTableResponse,
  type CreateVirtualConnectorTableResult,
} from "./CreateVirtualConnectorTableMessage.js";
export {
  CreateWorkflowFromTemplateRequest,
  type CreateWorkflowFromTemplateRequestParameters,
  CreateWorkflowFromTemplateResponse,
  type CreateWorkflowFromTemplateResult,
} from "./CreateWorkflowFromTemplateMessage.js";
export {
  DeactivateEntityKeyRequest,
  type DeactivateEntityKeyRequestParameters,
  DeactivateEntityKeyResponse,
} from "./DeactivateEntityKeyMessage.js";
export {
  DeleteAndPromoteRequest,
  type DeleteAndPromoteRequestParameters,
  DeleteAndPromoteResponse,
  type DeleteAndPromoteResult,
} from "./DeleteAndPromoteMessage.js";
export {
  DeleteAndPromoteAsyncRequest,
  type DeleteAndPromoteAsyncRequestParameters,
  DeleteAndPromoteAsyncResponse,
  type DeleteAndPromoteAsyncResult,
} from "./DeleteAndPromoteAsyncMessage.js";
export {
  DeleteAuditDataRequest,
  type DeleteAuditDataRequestParameters,
  DeleteAuditDataResponse,
  type DeleteAuditDataResult,
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
  type DeleteRecordChangeHistoryResult,
} from "./DeleteRecordChangeHistoryMessage.js";
export {
  DeliverImmediatePromoteEmailRequest,
  type DeliverImmediatePromoteEmailRequestParameters,
  DeliverImmediatePromoteEmailResponse,
  type DeliverImmediatePromoteEmailResult,
} from "./DeliverImmediatePromoteEmailMessage.js";
export {
  DeliverIncomingEmailRequest,
  type DeliverIncomingEmailRequestParameters,
  DeliverIncomingEmailResponse,
  type DeliverIncomingEmailResult,
} from "./DeliverIncomingEmailMessage.js";
export {
  DeliverPromoteEmailRequest,
  type DeliverPromoteEmailRequestParameters,
  DeliverPromoteEmailResponse,
  type DeliverPromoteEmailResult,
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
  type DequeueResult,
} from "./DequeueMessage.js";
export {
  DetectLanguageRequest,
  type DetectLanguageRequestParameters,
  DetectLanguageResponse,
  type DetectLanguageResult,
} from "./DetectLanguageMessage.js";
export {
  DisconnectFromGitRequest,
  type DisconnectFromGitRequestParameters,
  DisconnectFromGitResponse,
  type DisconnectFromGitResult,
} from "./DisconnectFromGitMessage.js";
export {
  DiscoverFabricAISkillsRequest,
  type DiscoverFabricAISkillsRequestParameters,
  DiscoverFabricAISkillsResponse,
  type DiscoverFabricAISkillsResult,
} from "./DiscoverFabricAISkillsMessage.js";
export {
  DiscoverFabricWorkspacesRequest,
  type DiscoverFabricWorkspacesRequestParameters,
  DiscoverFabricWorkspacesResponse,
  type DiscoverFabricWorkspacesResult,
} from "./DiscoverFabricWorkspacesMessage.js";
export {
  DistributeCampaignActivityRequest,
  type DistributeCampaignActivityRequestParameters,
  DistributeCampaignActivityResponse,
  type DistributeCampaignActivityResult,
} from "./DistributeCampaignActivityMessage.js";
export {
  DownloadBlockRequest,
  type DownloadBlockRequestParameters,
  DownloadBlockResponse,
  type DownloadBlockResult,
} from "./DownloadBlockMessage.js";
export {
  DownloadSolutionExportDataRequest,
  type DownloadSolutionExportDataRequestParameters,
  DownloadSolutionExportDataResponse,
  type DownloadSolutionExportDataResult,
} from "./DownloadSolutionExportDataMessage.js";
export {
  EmptyRecycleBinRequest,
  EmptyRecycleBinResponse,
  type EmptyRecycleBinResult,
} from "./EmptyRecycleBinMessage.js";
export {
  EnqueueWorkQueueItemRequest,
  type EnqueueWorkQueueItemRequestParameters,
  EnqueueWorkQueueItemResponse,
  type EnqueueWorkQueueItemResult,
} from "./EnqueueWorkQueueItemMessage.js";
export {
  ExecuteFxExpressionRequest,
  type ExecuteFxExpressionRequestParameters,
  ExecuteFxExpressionResponse,
  type ExecuteFxExpressionResult,
} from "./ExecuteFxExpressionMessage.js";
export {
  ExecuteWorkflowRequest,
  type ExecuteWorkflowRequestParameters,
  ExecuteWorkflowResponse,
  type ExecuteWorkflowResult,
} from "./ExecuteWorkflowMessage.js";
export {
  ExecuteWorkIQTaskRequest,
  type ExecuteWorkIQTaskRequestParameters,
  ExecuteWorkIQTaskResponse,
  type ExecuteWorkIQTaskResult,
} from "./ExecuteWorkIQTaskMessage.js";
export {
  ExportMappingsImportMapRequest,
  type ExportMappingsImportMapRequestParameters,
  ExportMappingsImportMapResponse,
  type ExportMappingsImportMapResult,
} from "./ExportMappingsImportMapMessage.js";
export {
  ExportRetainedDataRequest,
  type ExportRetainedDataRequestParameters,
  ExportRetainedDataResponse,
  type ExportRetainedDataResult,
} from "./ExportRetainedDataMessage.js";
export {
  ExportSolutionRequest,
  type ExportSolutionRequestParameters,
  ExportSolutionResponse,
  type ExportSolutionResult,
} from "./ExportSolutionMessage.js";
export {
  ExportSolutionAsyncRequest,
  type ExportSolutionAsyncRequestParameters,
  ExportSolutionAsyncResponse,
  type ExportSolutionAsyncResult,
} from "./ExportSolutionAsyncMessage.js";
export {
  ExportSolutionFromGitRequest,
  type ExportSolutionFromGitRequestParameters,
  ExportSolutionFromGitResponse,
  type ExportSolutionFromGitResult,
} from "./ExportSolutionFromGitMessage.js";
export {
  ExportSolutionFromGitAsyncRequest,
  type ExportSolutionFromGitAsyncRequestParameters,
  ExportSolutionFromGitAsyncResponse,
  type ExportSolutionFromGitAsyncResult,
} from "./ExportSolutionFromGitAsyncMessage.js";
export {
  ExportToExcelRequest,
  type ExportToExcelRequestParameters,
  ExportToExcelResponse,
  type ExportToExcelResult,
} from "./ExportToExcelMessage.js";
export {
  ExportTranslationRequest,
  type ExportTranslationRequestParameters,
  ExportTranslationResponse,
  type ExportTranslationResult,
} from "./ExportTranslationMessage.js";
export {
  ExtractKeyPhrasesRequest,
  type ExtractKeyPhrasesRequestParameters,
  ExtractKeyPhrasesResponse,
  type ExtractKeyPhrasesResult,
} from "./ExtractKeyPhrasesMessage.js";
export {
  ExtractTextEntitiesRequest,
  type ExtractTextEntitiesRequestParameters,
  ExtractTextEntitiesResponse,
  type ExtractTextEntitiesResult,
} from "./ExtractTextEntitiesMessage.js";
export {
  FormPredictRequest,
  type FormPredictRequestParameters,
  FormPredictResponse,
  type FormPredictResult,
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
  type FullTextSearchKnowledgeArticleResult,
} from "./FullTextSearchKnowledgeArticleMessage.js";
export {
  GenerateAutomatedPluginRequest,
  type GenerateAutomatedPluginRequestParameters,
  GenerateAutomatedPluginResponse,
  type GenerateAutomatedPluginResult,
} from "./GenerateAutomatedPluginMessage.js";
export {
  GenerateInstantPluginRequest,
  type GenerateInstantPluginRequestParameters,
  GenerateInstantPluginResponse,
  type GenerateInstantPluginResult,
} from "./GenerateInstantPluginMessage.js";
export {
  GenerateInvoiceFromOpportunityRequest,
  type GenerateInvoiceFromOpportunityRequestParameters,
  GenerateInvoiceFromOpportunityResponse,
  type GenerateInvoiceFromOpportunityResult,
} from "./GenerateInvoiceFromOpportunityMessage.js";
export {
  GeneratePowerFxFormulaRequest,
  type GeneratePowerFxFormulaRequestParameters,
  GeneratePowerFxFormulaResponse,
  type GeneratePowerFxFormulaResult,
} from "./GeneratePowerFxFormulaMessage.js";
export {
  GenerateQuoteFromOpportunityRequest,
  type GenerateQuoteFromOpportunityRequestParameters,
  GenerateQuoteFromOpportunityResponse,
  type GenerateQuoteFromOpportunityResult,
} from "./GenerateQuoteFromOpportunityMessage.js";
export {
  GenerateSalesOrderFromOpportunityRequest,
  type GenerateSalesOrderFromOpportunityRequestParameters,
  GenerateSalesOrderFromOpportunityResponse,
  type GenerateSalesOrderFromOpportunityResult,
} from "./GenerateSalesOrderFromOpportunityMessage.js";
export {
  GenerateSharedLinkRequest,
  type GenerateSharedLinkRequestParameters,
  GenerateSharedLinkResponse,
  type GenerateSharedLinkResult,
} from "./GenerateSharedLinkMessage.js";
export {
  GenerateSocialProfileRequest,
  type GenerateSocialProfileRequestParameters,
  GenerateSocialProfileResponse,
  type GenerateSocialProfileResult,
} from "./GenerateSocialProfileMessage.js";
export {
  GetAuditStorageDetailsRequest,
  GetAuditStorageDetailsResponse,
  type GetAuditStorageDetailsResult,
} from "./GetAuditStorageDetailsMessage.js";
export {
  GetAutoNumberSeedRequest,
  type GetAutoNumberSeedRequestParameters,
  GetAutoNumberSeedResponse,
  type GetAutoNumberSeedResult,
} from "./GetAutoNumberSeedMessage.js";
export {
  GetCertificateCredentialRequest,
  type GetCertificateCredentialRequestParameters,
  GetCertificateCredentialResponse,
  type GetCertificateCredentialResult,
} from "./GetCertificateCredentialMessage.js";
export {
  GetConsentLinkRequest,
  type GetConsentLinkRequestParameters,
  GetConsentLinkResponse,
  type GetConsentLinkResult,
} from "./GetConsentLinkMessage.js";
export {
  GetEntitiesEligibleForRecycleBinRequest,
  GetEntitiesEligibleForRecycleBinResponse,
  type GetEntitiesEligibleForRecycleBinResult,
} from "./GetEntitiesEligibleForRecycleBinMessage.js";
export {
  GetEntityLinkChatConfigRequest,
  type GetEntityLinkChatConfigRequestParameters,
  GetEntityLinkChatConfigResponse,
  type GetEntityLinkChatConfigResult,
} from "./GetEntityLinkChatConfigMessage.js";
export {
  GetFeatureControlStringSettingsForNamespaceWithUserContextRequest,
  type GetFeatureControlStringSettingsForNamespaceWithUserContextRequestParameters,
  GetFeatureControlStringSettingsForNamespaceWithUserContextResponse,
  type GetFeatureControlStringSettingsForNamespaceWithUserContextResult,
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
  type GetJobStatusResult,
} from "./GetJobStatusMessage.js";
export {
  GetLinkedChatsRequest,
  type GetLinkedChatsRequestParameters,
  GetLinkedChatsResponse,
  type GetLinkedChatsResult,
} from "./GetLinkedChatsMessage.js";
export {
  GetNextAutoNumberValueRequest,
  type GetNextAutoNumberValueRequestParameters,
  GetNextAutoNumberValueResponse,
  type GetNextAutoNumberValueResult,
} from "./GetNextAutoNumberValueMessage.js";
export {
  GetOrCreateSharedWorkspaceRequest,
  type GetOrCreateSharedWorkspaceRequestParameters,
  GetOrCreateSharedWorkspaceResponse,
  type GetOrCreateSharedWorkspaceResult,
} from "./GetOrCreateSharedWorkspaceMessage.js";
export {
  GetPBIReportRefreshStatusRequest,
  type GetPBIReportRefreshStatusRequestParameters,
  GetPBIReportRefreshStatusResponse,
  type GetPBIReportRefreshStatusResult,
} from "./GetPBIReportRefreshStatusMessage.js";
export {
  GetPublicKeyRequest,
  GetPublicKeyResponse,
  type GetPublicKeyResult,
} from "./GetPublicKeyMessage.js";
export {
  GetQuoteProductsFromOpportunityRequest,
  type GetQuoteProductsFromOpportunityRequestParameters,
  GetQuoteProductsFromOpportunityResponse,
} from "./GetQuoteProductsFromOpportunityMessage.js";
export {
  GetRunMapRequest,
  type GetRunMapRequestParameters,
  GetRunMapResponse,
  type GetRunMapResult,
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
  type GetTrackingTokenEmailResult,
} from "./GetTrackingTokenEmailMessage.js";
export {
  GetWorkIQTaskStatusRequest,
  type GetWorkIQTaskStatusRequestParameters,
  GetWorkIQTaskStatusResponse,
  type GetWorkIQTaskStatusResult,
} from "./GetWorkIQTaskStatusMessage.js";
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
  type ImmediateBookResult,
} from "./ImmediateBookMessage.js";
export {
  ImportCardTypeSchemaRequest,
  type ImportCardTypeSchemaRequestParameters,
  ImportCardTypeSchemaResponse,
  type ImportCardTypeSchemaResult,
} from "./ImportCardTypeSchemaMessage.js";
export {
  ImportFieldTranslationRequest,
  type ImportFieldTranslationRequestParameters,
  ImportFieldTranslationResponse,
  type ImportFieldTranslationResult,
} from "./ImportFieldTranslationMessage.js";
export {
  ImportMappingsImportMapRequest,
  type ImportMappingsImportMapRequestParameters,
  ImportMappingsImportMapResponse,
  type ImportMappingsImportMapResult,
} from "./ImportMappingsImportMapMessage.js";
export {
  ImportRecordsImportRequest,
  ImportRecordsImportResponse,
  type ImportRecordsImportResult,
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
  type ImportSolutionAsyncResult,
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
  type ImportTranslationAsyncResult,
} from "./ImportTranslationAsyncMessage.js";
export {
  InferEntityDefinitionRequest,
  type InferEntityDefinitionRequestParameters,
  InferEntityDefinitionResponse,
  type InferEntityDefinitionResult,
} from "./InferEntityDefinitionMessage.js";
export {
  InitializeAnnotationBlocksDownloadRequest,
  type InitializeAnnotationBlocksDownloadRequestParameters,
  InitializeAnnotationBlocksDownloadResponse,
  type InitializeAnnotationBlocksDownloadResult,
} from "./InitializeAnnotationBlocksDownloadMessage.js";
export {
  InitializeAnnotationBlocksUploadRequest,
  type InitializeAnnotationBlocksUploadRequestParameters,
  InitializeAnnotationBlocksUploadResponse,
  type InitializeAnnotationBlocksUploadResult,
} from "./InitializeAnnotationBlocksUploadMessage.js";
export {
  InitializeAttachmentBlocksDownloadRequest,
  type InitializeAttachmentBlocksDownloadRequestParameters,
  InitializeAttachmentBlocksDownloadResponse,
  type InitializeAttachmentBlocksDownloadResult,
} from "./InitializeAttachmentBlocksDownloadMessage.js";
export {
  InitializeAttachmentBlocksUploadRequest,
  type InitializeAttachmentBlocksUploadRequestParameters,
  InitializeAttachmentBlocksUploadResponse,
  type InitializeAttachmentBlocksUploadResult,
} from "./InitializeAttachmentBlocksUploadMessage.js";
export {
  InitializeFileBlocksDownloadRequest,
  type InitializeFileBlocksDownloadRequestParameters,
  InitializeFileBlocksDownloadResponse,
  type InitializeFileBlocksDownloadResult,
} from "./InitializeFileBlocksDownloadMessage.js";
export {
  InitializeFileBlocksUploadRequest,
  type InitializeFileBlocksUploadRequestParameters,
  InitializeFileBlocksUploadResponse,
  type InitializeFileBlocksUploadResult,
} from "./InitializeFileBlocksUploadMessage.js";
export {
  InitializeModernFlowFromAsyncWorkflowRequest,
  InitializeModernFlowFromAsyncWorkflowResponse,
  type InitializeModernFlowFromAsyncWorkflowResult,
} from "./InitializeModernFlowFromAsyncWorkflowMessage.js";
export {
  InitializeTemporaryFileBlocksUploadRequest,
  type InitializeTemporaryFileBlocksUploadRequestParameters,
  InitializeTemporaryFileBlocksUploadResponse,
  type InitializeTemporaryFileBlocksUploadResult,
} from "./InitializeTemporaryFileBlocksUploadMessage.js";
export {
  InsertOptionValueRequest,
  type InsertOptionValueRequestParameters,
  InsertOptionValueResponse,
  type InsertOptionValueResult,
} from "./InsertOptionValueMessage.js";
export {
  InsertStatusValueRequest,
  type InsertStatusValueRequestParameters,
  InsertStatusValueResponse,
  type InsertStatusValueResult,
} from "./InsertStatusValueMessage.js";
export {
  installRequest,
  type installRequestParameters,
  installResponse,
  type installResult,
} from "./installMessage.js";
export { InstallSampleDataRequest, InstallSampleDataResponse } from "./InstallSampleDataMessage.js";
export {
  InstantiateFiltersRequest,
  type InstantiateFiltersRequestParameters,
  InstantiateFiltersResponse,
} from "./InstantiateFiltersMessage.js";
export {
  InstantiateHtmlContentRequest,
  type InstantiateHtmlContentRequestParameters,
  InstantiateHtmlContentResponse,
  type InstantiateHtmlContentResult,
} from "./InstantiateHtmlContentMessage.js";
export {
  InstantiateTemplateRequest,
  type InstantiateTemplateRequestParameters,
  InstantiateTemplateResponse,
  type InstantiateTemplateResult,
} from "./InstantiateTemplateMessage.js";
export {
  InstantiateTemplateGenericRequest,
  type InstantiateTemplateGenericRequestParameters,
  InstantiateTemplateGenericResponse,
  type InstantiateTemplateGenericResult,
} from "./InstantiateTemplateGenericMessage.js";
export {
  IsPaiEnabledRequest,
  IsPaiEnabledResponse,
  type IsPaiEnabledResult,
} from "./IsPaiEnabledMessage.js";
export {
  JoinLinkedChatRequest,
  type JoinLinkedChatRequestParameters,
  JoinLinkedChatResponse,
} from "./JoinLinkedChatMessage.js";
export { LeaveGroupRequest, LeaveGroupResponse } from "./LeaveGroupMessage.js";
export {
  ListChildDesktopFlowsRequest,
  ListChildDesktopFlowsResponse,
  type ListChildDesktopFlowsResult,
} from "./ListChildDesktopFlowsMessage.js";
export {
  ListConnectionReferencesRequest,
  ListConnectionReferencesResponse,
  type ListConnectionReferencesResult,
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
  type McpCreateTableResult,
} from "./McpCreateTableMessage.js";
export {
  McpExecuteWorkIQTaskRequest,
  type McpExecuteWorkIQTaskRequestParameters,
  McpExecuteWorkIQTaskResponse,
  type McpExecuteWorkIQTaskResult,
} from "./McpExecuteWorkIQTaskMessage.js";
export {
  McpGetWorkIQTaskStatusRequest,
  type McpGetWorkIQTaskStatusRequestParameters,
  McpGetWorkIQTaskStatusResponse,
  type McpGetWorkIQTaskStatusResult,
} from "./McpGetWorkIQTaskStatusMessage.js";
export {
  McpUpdateGlobalOptionSetRequest,
  type McpUpdateGlobalOptionSetRequestParameters,
  McpUpdateGlobalOptionSetResponse,
  type McpUpdateGlobalOptionSetResult,
} from "./McpUpdateGlobalOptionSetMessage.js";
export {
  McpUpdateTableRequest,
  type McpUpdateTableRequestParameters,
  McpUpdateTableResponse,
  type McpUpdateTableResult,
} from "./McpUpdateTableMessage.js";
export { MergeRequest, type MergeRequestParameters, MergeResponse } from "./MergeMessage.js";
export {
  ModifyAccessRequest,
  type ModifyAccessRequestParameters,
  ModifyAccessResponse,
} from "./ModifyAccessMessage.js";
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
  type msdyn_ActivateProcessesResult,
} from "./msdyn_ActivateProcessesMessage.js";
export {
  msdyn_ActivateSdkMessageProcessingStepsRequest,
  type msdyn_ActivateSdkMessageProcessingStepsRequestParameters,
  msdyn_ActivateSdkMessageProcessingStepsResponse,
  type msdyn_ActivateSdkMessageProcessingStepsResult,
} from "./msdyn_ActivateSdkMessageProcessingStepsMessage.js";
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
  msdyn_AIAgentActionRequest,
  type msdyn_AIAgentActionRequestParameters,
  msdyn_AIAgentActionResponse,
  type msdyn_AIAgentActionResult,
} from "./msdyn_AIAgentActionMessage.js";
export {
  msdyn_AIBRealTimePredictRequest,
  type msdyn_AIBRealTimePredictRequestParameters,
  msdyn_AIBRealTimePredictResponse,
  type msdyn_AIBRealTimePredictResult,
} from "./msdyn_AIBRealTimePredictMessage.js";
export {
  msdyn_AIEvaluationMetricsRequest,
  type msdyn_AIEvaluationMetricsRequestParameters,
  msdyn_AIEvaluationMetricsResponse,
  type msdyn_AIEvaluationMetricsResult,
} from "./msdyn_AIEvaluationMetricsMessage.js";
export {
  msdyn_AIEvaluationMetricsWrapperRequest,
  type msdyn_AIEvaluationMetricsWrapperRequestParameters,
  msdyn_AIEvaluationMetricsWrapperResponse,
  type msdyn_AIEvaluationMetricsWrapperResult,
} from "./msdyn_AIEvaluationMetricsWrapperMessage.js";
export {
  msdyn_AITestRunRequest,
  type msdyn_AITestRunRequestParameters,
  msdyn_AITestRunResponse,
  type msdyn_AITestRunResult,
} from "./msdyn_AITestRunMessage.js";
export {
  msdyn_AnalyticsSaveDataInConfigStoreRequest,
  type msdyn_AnalyticsSaveDataInConfigStoreRequestParameters,
  msdyn_AnalyticsSaveDataInConfigStoreResponse,
} from "./msdyn_AnalyticsSaveDataInConfigStoreMessage.js";
export {
  msdyn_ApplyPredictionRequest,
  type msdyn_ApplyPredictionRequestParameters,
  msdyn_ApplyPredictionResponse,
} from "./msdyn_ApplyPredictionMessage.js";
export {
  msdyn_assignentityRequest,
  type msdyn_assignentityRequestParameters,
  msdyn_assignentityResponse,
} from "./msdyn_assignentityMessage.js";
export {
  msdyn_assignentitysyncRequest,
  type msdyn_assignentitysyncRequestParameters,
  msdyn_assignentitysyncResponse,
  type msdyn_assignentitysyncResult,
} from "./msdyn_assignentitysyncMessage.js";
export {
  msdyn_AssignOwnerToUnassignedRecordsRequest,
  type msdyn_AssignOwnerToUnassignedRecordsRequestParameters,
  msdyn_AssignOwnerToUnassignedRecordsResponse,
  type msdyn_AssignOwnerToUnassignedRecordsResult,
} from "./msdyn_AssignOwnerToUnassignedRecordsMessage.js";
export {
  msdyn_AssociateConversationRequest,
  type msdyn_AssociateConversationRequestParameters,
  msdyn_AssociateConversationResponse,
} from "./msdyn_AssociateConversationMessage.js";
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
  msdyn_AutoLinkingLeadCustomActionRequest,
  type msdyn_AutoLinkingLeadCustomActionRequestParameters,
  msdyn_AutoLinkingLeadCustomActionResponse,
  type msdyn_AutoLinkingLeadCustomActionResult,
} from "./msdyn_AutoLinkingLeadCustomActionMessage.js";
export {
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequest,
  type msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARRequestParameters,
  msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResponse,
  type msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARResult,
} from "./msdyn_AutonomousSQA_AssociateOutputForEngageAndReadinessSARMessage.js";
export {
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequest,
  type msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultRequestParameters,
  msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResponse,
  type msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultResult,
} from "./msdyn_AutonomousSQA_GetEngageAndReadinessAgentResultMessage.js";
export {
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequest,
  type msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequestParameters,
  msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse,
  type msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResult,
} from "./msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationMessage.js";
export {
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequest,
  type msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsRequestParameters,
  msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResponse,
  type msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsResult,
} from "./msdyn_AutonomousSQA_GetSARsAndAssociatedEmailThreadsMessage.js";
export {
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequest,
  type msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequestParameters,
  msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse,
} from "./msdyn_AutonomousSQA_ProcessBANTAndPIExtractionMessage.js";
export {
  msdyn_AutonomousSQA_ProvisionMCSAgentsRequest,
  type msdyn_AutonomousSQA_ProvisionMCSAgentsRequestParameters,
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
  msdyn_BulkAITestCaseUploadRequest,
  type msdyn_BulkAITestCaseUploadRequestParameters,
  msdyn_BulkAITestCaseUploadResponse,
  type msdyn_BulkAITestCaseUploadResult,
} from "./msdyn_BulkAITestCaseUploadMessage.js";
export {
  msdyn_BulkAITestRunRequest,
  type msdyn_BulkAITestRunRequestParameters,
  msdyn_BulkAITestRunResponse,
  type msdyn_BulkAITestRunResult,
} from "./msdyn_BulkAITestRunMessage.js";
export {
  msdyn_calculatecasesentimentRequest,
  type msdyn_calculatecasesentimentRequestParameters,
  msdyn_calculatecasesentimentResponse,
  type msdyn_calculatecasesentimentResult,
} from "./msdyn_calculatecasesentimentMessage.js";
export {
  msdyn_CancelDataProcessingModuleExecutionRequest,
  type msdyn_CancelDataProcessingModuleExecutionRequestParameters,
  msdyn_CancelDataProcessingModuleExecutionResponse,
  type msdyn_CancelDataProcessingModuleExecutionResult,
} from "./msdyn_CancelDataProcessingModuleExecutionMessage.js";
export {
  msdyn_CancelMobileAppBuildRequest,
  type msdyn_CancelMobileAppBuildRequestParameters,
  msdyn_CancelMobileAppBuildResponse,
  type msdyn_CancelMobileAppBuildResult,
} from "./msdyn_CancelMobileAppBuildMessage.js";
export {
  msdyn_CancelOptimizeRequest,
  type msdyn_CancelOptimizeRequestParameters,
  msdyn_CancelOptimizeResponse,
  type msdyn_CancelOptimizeResult,
} from "./msdyn_CancelOptimizeMessage.js";
export {
  msdyn_CaseClassificationRequest,
  type msdyn_CaseClassificationRequestParameters,
  msdyn_CaseClassificationResponse,
  type msdyn_CaseClassificationResult,
} from "./msdyn_CaseClassificationMessage.js";
export {
  msdyn_cesinvokeRequest,
  type msdyn_cesinvokeRequestParameters,
  msdyn_cesinvokeResponse,
  type msdyn_cesinvokeResult,
} from "./msdyn_cesinvokeMessage.js";
export {
  msdyn_CheckAnyUserIsIntegrationUserRequest,
  msdyn_CheckAnyUserIsIntegrationUserResponse,
  type msdyn_CheckAnyUserIsIntegrationUserResult,
} from "./msdyn_CheckAnyUserIsIntegrationUserMessage.js";
export {
  msdyn_CheckARCDependenciesRequest,
  type msdyn_CheckARCDependenciesRequestParameters,
  msdyn_CheckARCDependenciesResponse,
  type msdyn_CheckARCDependenciesResult,
} from "./msdyn_CheckARCDependenciesMessage.js";
export {
  msdyn_CheckDVCopilotStatusRequest,
  msdyn_CheckDVCopilotStatusResponse,
} from "./msdyn_CheckDVCopilotStatusMessage.js";
export {
  msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequest,
  type msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequestParameters,
  msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse,
  type msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResult,
} from "./msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesMessage.js";
export {
  msdyn_CheckForConditionXmlFormatRequest,
  type msdyn_CheckForConditionXmlFormatRequestParameters,
  msdyn_CheckForConditionXmlFormatResponse,
  type msdyn_CheckForConditionXmlFormatResult,
} from "./msdyn_CheckForConditionXmlFormatMessage.js";
export {
  msdyn_CheckForCustomizedAppModuleRequest,
  type msdyn_CheckForCustomizedAppModuleRequestParameters,
  msdyn_CheckForCustomizedAppModuleResponse,
  type msdyn_CheckForCustomizedAppModuleResult,
} from "./msdyn_CheckForCustomizedAppModuleMessage.js";
export {
  msdyn_CheckForCustomizedOptionSetRequest,
  type msdyn_CheckForCustomizedOptionSetRequestParameters,
  msdyn_CheckForCustomizedOptionSetResponse,
  type msdyn_CheckForCustomizedOptionSetResult,
} from "./msdyn_CheckForCustomizedOptionSetMessage.js";
export {
  msdyn_CheckForCustomizedSitemapRequest,
  type msdyn_CheckForCustomizedSitemapRequestParameters,
  msdyn_CheckForCustomizedSitemapResponse,
  type msdyn_CheckForCustomizedSitemapResult,
} from "./msdyn_CheckForCustomizedSitemapMessage.js";
export {
  msdyn_CheckForCustomizedWebResourcesRequest,
  type msdyn_CheckForCustomizedWebResourcesRequestParameters,
  msdyn_CheckForCustomizedWebResourcesResponse,
  type msdyn_CheckForCustomizedWebResourcesResult,
} from "./msdyn_CheckForCustomizedWebResourcesMessage.js";
export {
  msdyn_CheckForDeletedProcessRequest,
  type msdyn_CheckForDeletedProcessRequestParameters,
  msdyn_CheckForDeletedProcessResponse,
  type msdyn_CheckForDeletedProcessResult,
} from "./msdyn_CheckForDeletedProcessMessage.js";
export {
  msdyn_CheckForDeletedSDKMessageProcessingStepsRequest,
  type msdyn_CheckForDeletedSDKMessageProcessingStepsRequestParameters,
  msdyn_CheckForDeletedSDKMessageProcessingStepsResponse,
  type msdyn_CheckForDeletedSDKMessageProcessingStepsResult,
} from "./msdyn_CheckForDeletedSDKMessageProcessingStepsMessage.js";
export {
  msdyn_CheckForDeletedWebResourcesRequest,
  type msdyn_CheckForDeletedWebResourcesRequestParameters,
  msdyn_CheckForDeletedWebResourcesResponse,
  type msdyn_CheckForDeletedWebResourcesResult,
} from "./msdyn_CheckForDeletedWebResourcesMessage.js";
export {
  msdyn_CheckForDuplicatesActionRequest,
  type msdyn_CheckForDuplicatesActionRequestParameters,
  msdyn_CheckForDuplicatesActionResponse,
  type msdyn_CheckForDuplicatesActionResult,
} from "./msdyn_CheckForDuplicatesActionMessage.js";
export {
  msdyn_CheckForNoOrphanWorkflowsRequest,
  type msdyn_CheckForNoOrphanWorkflowsRequestParameters,
  msdyn_CheckForNoOrphanWorkflowsResponse,
  type msdyn_CheckForNoOrphanWorkflowsResult,
} from "./msdyn_CheckForNoOrphanWorkflowsMessage.js";
export {
  msdyn_CheckForPendingProcessesRequest,
  type msdyn_CheckForPendingProcessesRequestParameters,
  msdyn_CheckForPendingProcessesResponse,
  type msdyn_CheckForPendingProcessesResult,
} from "./msdyn_CheckForPendingProcessesMessage.js";
export {
  msdyn_CheckForWorkflowTypeOfRuleItemsRequest,
  type msdyn_CheckForWorkflowTypeOfRuleItemsRequestParameters,
  msdyn_CheckForWorkflowTypeOfRuleItemsResponse,
  type msdyn_CheckForWorkflowTypeOfRuleItemsResult,
} from "./msdyn_CheckForWorkflowTypeOfRuleItemsMessage.js";
export {
  msdyn_checkGovernanceAgentPoliciesRequest,
  type msdyn_checkGovernanceAgentPoliciesRequestParameters,
  msdyn_checkGovernanceAgentPoliciesResponse,
  type msdyn_checkGovernanceAgentPoliciesResult,
} from "./msdyn_checkGovernanceAgentPoliciesMessage.js";
export {
  msdyn_CheckHarvestingProvisioningStatusRequest,
  msdyn_CheckHarvestingProvisioningStatusResponse,
  type msdyn_CheckHarvestingProvisioningStatusResult,
} from "./msdyn_CheckHarvestingProvisioningStatusMessage.js";
export {
  msdyn_CheckIfActivityMonitorEnabledRequest,
  type msdyn_CheckIfActivityMonitorEnabledRequestParameters,
  msdyn_CheckIfActivityMonitorEnabledResponse,
  type msdyn_CheckIfActivityMonitorEnabledResult,
} from "./msdyn_CheckIfActivityMonitorEnabledMessage.js";
export {
  msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysRequest,
  msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse,
  type msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResult,
} from "./msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysMessage.js";
export {
  msdyn_CheckIfAppProfileHasGenericTemplatesRequest,
  msdyn_CheckIfAppProfileHasGenericTemplatesResponse,
  type msdyn_CheckIfAppProfileHasGenericTemplatesResult,
} from "./msdyn_CheckIfAppProfileHasGenericTemplatesMessage.js";
export {
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest,
  type msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters,
  msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse,
  type msdyn_CheckIfAutoRouteToOwnerQueueEnabledResult,
} from "./msdyn_CheckIfAutoRouteToOwnerQueueEnabledMessage.js";
export {
  msdyn_CheckIfCSFormsFromUnmanagedLayerRequest,
  msdyn_CheckIfCSFormsFromUnmanagedLayerResponse,
  type msdyn_CheckIfCSFormsFromUnmanagedLayerResult,
} from "./msdyn_CheckIfCSFormsFromUnmanagedLayerMessage.js";
export {
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequest,
  type msdyn_CheckIfEmailResponseTemplateEntityTypeMatchRequestParameters,
  msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse,
  type msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResult,
} from "./msdyn_CheckIfEmailResponseTemplateEntityTypeMatchMessage.js";
export {
  msdyn_CheckIfFormsHaveTooManyCustomControlsRequest,
  type msdyn_CheckIfFormsHaveTooManyCustomControlsRequestParameters,
  msdyn_CheckIfFormsHaveTooManyCustomControlsResponse,
  type msdyn_CheckIfFormsHaveTooManyCustomControlsResult,
} from "./msdyn_CheckIfFormsHaveTooManyCustomControlsMessage.js";
export {
  msdyn_CheckIfHasLegacyArcRulesRequest,
  msdyn_CheckIfHasLegacyArcRulesResponse,
  type msdyn_CheckIfHasLegacyArcRulesResult,
} from "./msdyn_CheckIfHasLegacyArcRulesMessage.js";
export {
  msdyn_CheckIfHasLegacySlaRulesRequest,
  msdyn_CheckIfHasLegacySlaRulesResponse,
  type msdyn_CheckIfHasLegacySlaRulesResult,
} from "./msdyn_CheckIfHasLegacySlaRulesMessage.js";
export {
  msdyn_CheckIfProcessesAreActiveRequest,
  type msdyn_CheckIfProcessesAreActiveRequestParameters,
  msdyn_CheckIfProcessesAreActiveResponse,
  type msdyn_CheckIfProcessesAreActiveResult,
} from "./msdyn_CheckIfProcessesAreActiveMessage.js";
export {
  msdyn_CheckIfProcessesOwnedByDisabledUsersRequest,
  type msdyn_CheckIfProcessesOwnedByDisabledUsersRequestParameters,
  msdyn_CheckIfProcessesOwnedByDisabledUsersResponse,
  type msdyn_CheckIfProcessesOwnedByDisabledUsersResult,
} from "./msdyn_CheckIfProcessesOwnedByDisabledUsersMessage.js";
export {
  msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetRequest,
  msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse,
  type msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResult,
} from "./msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetMessage.js";
export {
  msdyn_CheckIfQueueInRTQIsActiveRequest,
  msdyn_CheckIfQueueInRTQIsActiveResponse,
  type msdyn_CheckIfQueueInRTQIsActiveResult,
} from "./msdyn_CheckIfQueueInRTQIsActiveMessage.js";
export {
  msdyn_CheckIfQueueInWorkstreamHasAgentsRequest,
  msdyn_CheckIfQueueInWorkstreamHasAgentsResponse,
  type msdyn_CheckIfQueueInWorkstreamHasAgentsResult,
} from "./msdyn_CheckIfQueueInWorkstreamHasAgentsMessage.js";
export {
  msdyn_CheckIfRecordWorkstreamHasIntakeRulesRequest,
  msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse,
  type msdyn_CheckIfRecordWorkstreamHasIntakeRulesResult,
} from "./msdyn_CheckIfRecordWorkstreamHasIntakeRulesMessage.js";
export {
  msdyn_CheckIfSalesFormsFromUnmanagedLayerRequest,
  msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse,
  type msdyn_CheckIfSalesFormsFromUnmanagedLayerResult,
} from "./msdyn_CheckIfSalesFormsFromUnmanagedLayerMessage.js";
export {
  msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequest,
  type msdyn_CheckIfSDKMessageProcessingStepsAreActiveRequestParameters,
  msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse,
  type msdyn_CheckIfSDKMessageProcessingStepsAreActiveResult,
} from "./msdyn_CheckIfSDKMessageProcessingStepsAreActiveMessage.js";
export {
  msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest,
  type msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters,
  msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse,
  type msdyn_CheckIfSLAOwnerIsActiveOrInactiveResult,
} from "./msdyn_CheckIfSLAOwnerIsActiveOrInactiveMessage.js";
export {
  msdyn_CheckIfSLAStaticFlowIsDisabledRequest,
  msdyn_CheckIfSLAStaticFlowIsDisabledResponse,
  type msdyn_CheckIfSLAStaticFlowIsDisabledResult,
} from "./msdyn_CheckIfSLAStaticFlowIsDisabledMessage.js";
export {
  msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutRequest,
  msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse,
  type msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResult,
} from "./msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutMessage.js";
export {
  msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesRequest,
  msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResponse,
  type msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesResult,
} from "./msdyn_CheckIfWorkstreamHasDeletedSessionTemplatesMessage.js";
export {
  msdyn_checkKnowledgeManagementAgentRequest,
  msdyn_checkKnowledgeManagementAgentResponse,
  type msdyn_checkKnowledgeManagementAgentResult,
} from "./msdyn_checkKnowledgeManagementAgentMessage.js";
export {
  msdyn_CheckOrgSettingIsSOPIntegrationEnabledRequest,
  msdyn_CheckOrgSettingIsSOPIntegrationEnabledResponse,
  type msdyn_CheckOrgSettingIsSOPIntegrationEnabledResult,
} from "./msdyn_CheckOrgSettingIsSOPIntegrationEnabledMessage.js";
export {
  msdyn_CheckOrgSettingOOBPriceCalculationEnabledRequest,
  msdyn_CheckOrgSettingOOBPriceCalculationEnabledResponse,
  type msdyn_CheckOrgSettingOOBPriceCalculationEnabledResult,
} from "./msdyn_CheckOrgSettingOOBPriceCalculationEnabledMessage.js";
export {
  msdyn_CheckPredictionModelsRequest,
  type msdyn_CheckPredictionModelsRequestParameters,
  msdyn_CheckPredictionModelsResponse,
  type msdyn_CheckPredictionModelsResult,
} from "./msdyn_CheckPredictionModelsMessage.js";
export {
  msdyn_CheckReqRibbonCommandDefRequest,
  type msdyn_CheckReqRibbonCommandDefRequestParameters,
  msdyn_CheckReqRibbonCommandDefResponse,
  type msdyn_CheckReqRibbonCommandDefResult,
} from "./msdyn_CheckReqRibbonCommandDefMessage.js";
export {
  msdyn_CheckReqWebResourceOnSystemFormRequest,
  type msdyn_CheckReqWebResourceOnSystemFormRequestParameters,
  msdyn_CheckReqWebResourceOnSystemFormResponse,
  type msdyn_CheckReqWebResourceOnSystemFormResult,
} from "./msdyn_CheckReqWebResourceOnSystemFormMessage.js";
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
  msdyn_CompleteOptimizeWorkItemRequest,
  type msdyn_CompleteOptimizeWorkItemRequestParameters,
  msdyn_CompleteOptimizeWorkItemResponse,
  type msdyn_CompleteOptimizeWorkItemResult,
} from "./msdyn_CompleteOptimizeWorkItemMessage.js";
export {
  msdyn_ConditionXmlConversionRequest,
  type msdyn_ConditionXmlConversionRequestParameters,
  msdyn_ConditionXmlConversionResponse,
  type msdyn_ConditionXmlConversionResult,
} from "./msdyn_ConditionXmlConversionMessage.js";
export {
  msdyn_ConnectSequenceRequest,
  type msdyn_ConnectSequenceRequestParameters,
  msdyn_ConnectSequenceResponse,
  type msdyn_ConnectSequenceResult,
} from "./msdyn_ConnectSequenceMessage.js";
export {
  msdyn_ConvertCJOJsonToSequenceJsonRequest,
  type msdyn_ConvertCJOJsonToSequenceJsonRequestParameters,
  msdyn_ConvertCJOJsonToSequenceJsonResponse,
  type msdyn_ConvertCJOJsonToSequenceJsonResult,
} from "./msdyn_ConvertCJOJsonToSequenceJsonMessage.js";
export {
  msdyn_ConvertSequenceJsonToCJOJsonRequest,
  type msdyn_ConvertSequenceJsonToCJOJsonRequestParameters,
  msdyn_ConvertSequenceJsonToCJOJsonResponse,
  type msdyn_ConvertSequenceJsonToCJOJsonResult,
} from "./msdyn_ConvertSequenceJsonToCJOJsonMessage.js";
export {
  msdyn_ConvertToLocalizedFeaturesRequest,
  type msdyn_ConvertToLocalizedFeaturesRequestParameters,
  msdyn_ConvertToLocalizedFeaturesResponse,
  type msdyn_ConvertToLocalizedFeaturesResult,
} from "./msdyn_ConvertToLocalizedFeaturesMessage.js";
export {
  msdyn_CopilotCreateOutlookMessageOrAppointmentRequest,
  type msdyn_CopilotCreateOutlookMessageOrAppointmentRequestParameters,
  msdyn_CopilotCreateOutlookMessageOrAppointmentResponse,
  type msdyn_CopilotCreateOutlookMessageOrAppointmentResult,
} from "./msdyn_CopilotCreateOutlookMessageOrAppointmentMessage.js";
export {
  msdyn_CopyEntityRequest,
  type msdyn_CopyEntityRequestParameters,
  msdyn_CopyEntityResponse,
  type msdyn_CopyEntityResult,
} from "./msdyn_CopyEntityMessage.js";
export {
  msdyn_CRACaseClosureRequest,
  type msdyn_CRACaseClosureRequestParameters,
  msdyn_CRACaseClosureResponse,
  type msdyn_CRACaseClosureResult,
} from "./msdyn_CRACaseClosureMessage.js";
export {
  msdyn_create_virtual_table_v2Request,
  type msdyn_create_virtual_table_v2RequestParameters,
  msdyn_create_virtual_table_v2Response,
  type msdyn_create_virtual_table_v2Result,
} from "./msdyn_create_virtual_table_v2Message.js";
export {
  msdyn_CreateActionFlowRequest,
  type msdyn_CreateActionFlowRequestParameters,
  msdyn_CreateActionFlowResponse,
} from "./msdyn_CreateActionFlowMessage.js";
export {
  msdyn_CreateAISimulationRunRequest,
  type msdyn_CreateAISimulationRunRequestParameters,
  msdyn_CreateAISimulationRunResponse,
  type msdyn_CreateAISimulationRunResult,
} from "./msdyn_CreateAISimulationRunMessage.js";
export {
  msdyn_CreateAITestCaseRequest,
  type msdyn_CreateAITestCaseRequestParameters,
  msdyn_CreateAITestCaseResponse,
  type msdyn_CreateAITestCaseResult,
} from "./msdyn_CreateAITestCaseMessage.js";
export {
  msdyn_CreateApmEventHandlerRequest,
  type msdyn_CreateApmEventHandlerRequestParameters,
  msdyn_CreateApmEventHandlerResponse,
  type msdyn_CreateApmEventHandlerResult,
} from "./msdyn_CreateApmEventHandlerMessage.js";
export {
  msdyn_CreateAutonomousEmailRequest,
  type msdyn_CreateAutonomousEmailRequestParameters,
  msdyn_CreateAutonomousEmailResponse,
  type msdyn_CreateAutonomousEmailResult,
} from "./msdyn_CreateAutonomousEmailMessage.js";
export {
  msdyn_CreateAutonomousEmailWrapperRequest,
  type msdyn_CreateAutonomousEmailWrapperRequestParameters,
  msdyn_CreateAutonomousEmailWrapperResponse,
  type msdyn_CreateAutonomousEmailWrapperResult,
} from "./msdyn_CreateAutonomousEmailWrapperMessage.js";
export {
  msdyn_CreateCopilotRecordUpdateEventRequest,
  type msdyn_CreateCopilotRecordUpdateEventRequestParameters,
  msdyn_CreateCopilotRecordUpdateEventResponse,
  type msdyn_CreateCopilotRecordUpdateEventResult,
} from "./msdyn_CreateCopilotRecordUpdateEventMessage.js";
export {
  msdyn_CreateCustomActionDefinitionRequest,
  type msdyn_CreateCustomActionDefinitionRequestParameters,
  msdyn_CreateCustomActionDefinitionResponse,
  type msdyn_CreateCustomActionDefinitionResult,
} from "./msdyn_CreateCustomActionDefinitionMessage.js";
export {
  msdyn_CreateDraftResponseForActionRequest,
  type msdyn_CreateDraftResponseForActionRequestParameters,
  msdyn_CreateDraftResponseForActionResponse,
  type msdyn_CreateDraftResponseForActionResult,
} from "./msdyn_CreateDraftResponseForActionMessage.js";
export {
  msdyn_CreateEntityRequest,
  type msdyn_CreateEntityRequestParameters,
  msdyn_CreateEntityResponse,
  type msdyn_CreateEntityResult,
} from "./msdyn_CreateEntityMessage.js";
export {
  msdyn_CreateHarvestWorkItemRequest,
  type msdyn_CreateHarvestWorkItemRequestParameters,
  msdyn_CreateHarvestWorkItemResponse,
  type msdyn_CreateHarvestWorkItemResult,
} from "./msdyn_CreateHarvestWorkItemMessage.js";
export {
  msdyn_CreateKBArticleRequest,
  type msdyn_CreateKBArticleRequestParameters,
  msdyn_CreateKBArticleResponse,
  type msdyn_CreateKBArticleResult,
} from "./msdyn_CreateKBArticleMessage.js";
export {
  msdyn_CreateNewAnalysisJobRequest,
  type msdyn_CreateNewAnalysisJobRequestParameters,
  msdyn_CreateNewAnalysisJobResponse,
  type msdyn_CreateNewAnalysisJobResult,
} from "./msdyn_CreateNewAnalysisJobMessage.js";
export {
  msdyn_CreateNewAnalysisJobForRuleSetRequest,
  type msdyn_CreateNewAnalysisJobForRuleSetRequestParameters,
  msdyn_CreateNewAnalysisJobForRuleSetResponse,
  type msdyn_CreateNewAnalysisJobForRuleSetResult,
} from "./msdyn_CreateNewAnalysisJobForRuleSetMessage.js";
export {
  msdyn_CreatePredictionRequest,
  type msdyn_CreatePredictionRequestParameters,
  msdyn_CreatePredictionResponse,
} from "./msdyn_CreatePredictionMessage.js";
export {
  msdyn_CreateRecordWithRuleBasedPredictionsRequest,
  type msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters,
  msdyn_CreateRecordWithRuleBasedPredictionsResponse,
  type msdyn_CreateRecordWithRuleBasedPredictionsResult,
} from "./msdyn_CreateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_CreateSimilarOpportunitiyPredictionModelRequest,
  type msdyn_CreateSimilarOpportunitiyPredictionModelRequestParameters,
  msdyn_CreateSimilarOpportunitiyPredictionModelResponse,
} from "./msdyn_CreateSimilarOpportunitiyPredictionModelMessage.js";
export {
  msdyn_CreateSuggestedActivityRequest,
  type msdyn_CreateSuggestedActivityRequestParameters,
  msdyn_CreateSuggestedActivityResponse,
  type msdyn_CreateSuggestedActivityResult,
} from "./msdyn_CreateSuggestedActivityMessage.js";
export {
  msdyn_CreateSuggestedContactRequest,
  type msdyn_CreateSuggestedContactRequestParameters,
  msdyn_CreateSuggestedContactResponse,
  type msdyn_CreateSuggestedContactResult,
} from "./msdyn_CreateSuggestedContactMessage.js";
export {
  msdyn_CreateSuggestedNextActionRequest,
  type msdyn_CreateSuggestedNextActionRequestParameters,
  msdyn_CreateSuggestedNextActionResponse,
  type msdyn_CreateSuggestedNextActionResult,
} from "./msdyn_CreateSuggestedNextActionMessage.js";
export {
  msdyn_CreateSwarmParticipantsRequest,
  type msdyn_CreateSwarmParticipantsRequestParameters,
  msdyn_CreateSwarmParticipantsResponse,
} from "./msdyn_CreateSwarmParticipantsMessage.js";
export {
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequest,
  type msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationRequestParameters,
  msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResponse,
  type msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationResult,
} from "./msdyn_CSAdminCenterAppSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_CSCaseClosureProcessAgentResponseRequest,
  type msdyn_CSCaseClosureProcessAgentResponseRequestParameters,
  msdyn_CSCaseClosureProcessAgentResponseResponse,
  type msdyn_CSCaseClosureProcessAgentResponseResult,
} from "./msdyn_CSCaseClosureProcessAgentResponseMessage.js";
export {
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequest,
  type msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequestParameters,
  msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse,
  type msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResult,
} from "./msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailMessage.js";
export {
  msdyn_CSCopilotResolveCaseRequest,
  type msdyn_CSCopilotResolveCaseRequestParameters,
  msdyn_CSCopilotResolveCaseResponse,
  type msdyn_CSCopilotResolveCaseResult,
} from "./msdyn_CSCopilotResolveCaseMessage.js";
export {
  msdyn_CustomApiCustomerServiceCaseSummaryRequest,
  type msdyn_CustomApiCustomerServiceCaseSummaryRequestParameters,
  msdyn_CustomApiCustomerServiceCaseSummaryResponse,
  type msdyn_CustomApiCustomerServiceCaseSummaryResult,
} from "./msdyn_CustomApiCustomerServiceCaseSummaryMessage.js";
export {
  msdyn_CustomerServiceSolutionHealthRulesRegistrationRequest,
  type msdyn_CustomerServiceSolutionHealthRulesRegistrationRequestParameters,
  msdyn_CustomerServiceSolutionHealthRulesRegistrationResponse,
  type msdyn_CustomerServiceSolutionHealthRulesRegistrationResult,
} from "./msdyn_CustomerServiceSolutionHealthRulesRegistrationMessage.js";
export {
  msdyn_dataprovideroperationsRequest,
  type msdyn_dataprovideroperationsRequestParameters,
  msdyn_dataprovideroperationsResponse,
  type msdyn_dataprovideroperationsResult,
} from "./msdyn_dataprovideroperationsMessage.js";
export {
  msdyn_DataValidationApiRequest,
  type msdyn_DataValidationApiRequestParameters,
  msdyn_DataValidationApiResponse,
  type msdyn_DataValidationApiResult,
} from "./msdyn_DataValidationApiMessage.js";
export {
  msdyn_DCA_SendOutreachEmailRequest,
  type msdyn_DCA_SendOutreachEmailRequestParameters,
  msdyn_DCA_SendOutreachEmailResponse,
  type msdyn_DCA_SendOutreachEmailResult,
} from "./msdyn_DCA_SendOutreachEmailMessage.js";
export {
  msdyn_DeleteCalendarRequest,
  type msdyn_DeleteCalendarRequestParameters,
  msdyn_DeleteCalendarResponse,
  type msdyn_DeleteCalendarResult,
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
  msdyn_deprovisionCefInsightsRequest,
  type msdyn_deprovisionCefInsightsRequestParameters,
  msdyn_deprovisionCefInsightsResponse,
  type msdyn_deprovisionCefInsightsResult,
} from "./msdyn_deprovisionCefInsightsMessage.js";
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
  type msdyn_DismissEmailInfraActionCardResult,
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
  type msdyn_DoesKBExistResult,
} from "./msdyn_DoesKBExistMessage.js";
export {
  msdyn_DownloadMobileAppBuildRequest,
  type msdyn_DownloadMobileAppBuildRequestParameters,
  msdyn_DownloadMobileAppBuildResponse,
  type msdyn_DownloadMobileAppBuildResult,
} from "./msdyn_DownloadMobileAppBuildMessage.js";
export {
  msdyn_draftCefInsightRequest,
  type msdyn_draftCefInsightRequestParameters,
  msdyn_draftCefInsightResponse,
  type msdyn_draftCefInsightResult,
} from "./msdyn_draftCefInsightMessage.js";
export {
  msdyn_DraftEmailForCaseRequest,
  type msdyn_DraftEmailForCaseRequestParameters,
  msdyn_DraftEmailForCaseResponse,
  type msdyn_DraftEmailForCaseResult,
} from "./msdyn_DraftEmailForCaseMessage.js";
export {
  msdyn_DraftFollowupEmailWithTemplateRequest,
  type msdyn_DraftFollowupEmailWithTemplateRequestParameters,
  msdyn_DraftFollowupEmailWithTemplateResponse,
  type msdyn_DraftFollowupEmailWithTemplateResult,
} from "./msdyn_DraftFollowupEmailWithTemplateMessage.js";
export {
  msdyn_DraftOutreachEmailRequest,
  type msdyn_DraftOutreachEmailRequestParameters,
  msdyn_DraftOutreachEmailResponse,
  type msdyn_DraftOutreachEmailResult,
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
  type msdyn_DynamicForecastRetrievalResult,
} from "./msdyn_DynamicForecastRetrievalMessage.js";
export {
  msdyn_EditAndSaveSuggestedContactRequest,
  type msdyn_EditAndSaveSuggestedContactRequestParameters,
  msdyn_EditAndSaveSuggestedContactResponse,
  type msdyn_EditAndSaveSuggestedContactResult,
} from "./msdyn_EditAndSaveSuggestedContactMessage.js";
export {
  msdyn_editSalesSequenceExperimentStatusRequest,
  type msdyn_editSalesSequenceExperimentStatusRequestParameters,
  msdyn_editSalesSequenceExperimentStatusResponse,
  type msdyn_editSalesSequenceExperimentStatusResult,
} from "./msdyn_editSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_EditSequenceRequest,
  type msdyn_EditSequenceRequestParameters,
  msdyn_EditSequenceResponse,
  type msdyn_EditSequenceResult,
} from "./msdyn_EditSequenceMessage.js";
export {
  msdyn_emailAssistAdjustAPIRequest,
  type msdyn_emailAssistAdjustAPIRequestParameters,
  msdyn_emailAssistAdjustAPIResponse,
  type msdyn_emailAssistAdjustAPIResult,
} from "./msdyn_emailAssistAdjustAPIMessage.js";
export {
  msdyn_EmailClassificationCustomActionRequest,
  type msdyn_EmailClassificationCustomActionRequestParameters,
  msdyn_EmailClassificationCustomActionResponse,
  type msdyn_EmailClassificationCustomActionResult,
} from "./msdyn_EmailClassificationCustomActionMessage.js";
export {
  msdyn_EmailManagementAgentCustomActionRequest,
  type msdyn_EmailManagementAgentCustomActionRequestParameters,
  msdyn_EmailManagementAgentCustomActionResponse,
  type msdyn_EmailManagementAgentCustomActionResult,
} from "./msdyn_EmailManagementAgentCustomActionMessage.js";
export {
  msdyn_emailsentimentflowactionRequest,
  type msdyn_emailsentimentflowactionRequestParameters,
  msdyn_emailsentimentflowactionResponse,
  type msdyn_emailsentimentflowactionResult,
} from "./msdyn_emailsentimentflowactionMessage.js";
export {
  msdyn_EmailTemplateRecommendationRequest,
  type msdyn_EmailTemplateRecommendationRequestParameters,
  msdyn_EmailTemplateRecommendationResponse,
  type msdyn_EmailTemplateRecommendationResult,
} from "./msdyn_EmailTemplateRecommendationMessage.js";
export {
  msdyn_EmailValidationCustomActionRequest,
  type msdyn_EmailValidationCustomActionRequestParameters,
  msdyn_EmailValidationCustomActionResponse,
  type msdyn_EmailValidationCustomActionResult,
} from "./msdyn_EmailValidationCustomActionMessage.js";
export {
  msdyn_EnableDVCopilotRequest,
  msdyn_EnableDVCopilotResponse,
} from "./msdyn_EnableDVCopilotMessage.js";
export {
  msdyn_EnableLinkedInDataValidationRequest,
  msdyn_EnableLinkedInDataValidationResponse,
  type msdyn_EnableLinkedInDataValidationResult,
} from "./msdyn_EnableLinkedInDataValidationMessage.js";
export {
  msdyn_EnableSharePointRequest,
  msdyn_EnableSharePointResponse,
  type msdyn_EnableSharePointResult,
} from "./msdyn_EnableSharePointMessage.js";
export {
  msdyn_EnableUnstructuredDataRequest,
  msdyn_EnableUnstructuredDataResponse,
} from "./msdyn_EnableUnstructuredDataMessage.js";
export {
  msdyn_ExecuteAgentAssistToolsRequest,
  type msdyn_ExecuteAgentAssistToolsRequestParameters,
  msdyn_ExecuteAgentAssistToolsResponse,
  type msdyn_ExecuteAgentAssistToolsResult,
} from "./msdyn_ExecuteAgentAssistToolsMessage.js";
export {
  msdyn_ExecuteARCRequest,
  type msdyn_ExecuteARCRequestParameters,
  msdyn_ExecuteARCResponse,
  type msdyn_ExecuteARCResult,
} from "./msdyn_ExecuteARCMessage.js";
export {
  msdyn_executeCEFInsightsRequest,
  type msdyn_executeCEFInsightsRequestParameters,
  msdyn_executeCEFInsightsResponse,
  type msdyn_executeCEFInsightsResult,
} from "./msdyn_executeCEFInsightsMessage.js";
export {
  msdyn_ExecuteCopilotServiceJobRequest,
  type msdyn_ExecuteCopilotServiceJobRequestParameters,
  msdyn_ExecuteCopilotServiceJobResponse,
  type msdyn_ExecuteCopilotServiceJobResult,
} from "./msdyn_ExecuteCopilotServiceJobMessage.js";
export {
  msdyn_ExecuteCustomerNotificationRequestRequest,
  msdyn_ExecuteCustomerNotificationRequestResponse,
  type msdyn_ExecuteCustomerNotificationRequestResult,
} from "./msdyn_ExecuteCustomerNotificationRequestMessage.js";
export {
  msdyn_executeemailsentimentbotRequest,
  type msdyn_executeemailsentimentbotRequestParameters,
  msdyn_executeemailsentimentbotResponse,
  type msdyn_executeemailsentimentbotResult,
} from "./msdyn_executeemailsentimentbotMessage.js";
export {
  msdyn_executeGovernanceAgentGuardrailValidationRequest,
  type msdyn_executeGovernanceAgentGuardrailValidationRequestParameters,
  msdyn_executeGovernanceAgentGuardrailValidationResponse,
  type msdyn_executeGovernanceAgentGuardrailValidationResult,
} from "./msdyn_executeGovernanceAgentGuardrailValidationMessage.js";
export {
  msdyn_ExecuteHttpServiceRequestRequest,
  type msdyn_ExecuteHttpServiceRequestRequestParameters,
  msdyn_ExecuteHttpServiceRequestResponse,
  type msdyn_ExecuteHttpServiceRequestResult,
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
  msdyn_ExecuteSalesAgentByTaskKeyRequest,
  type msdyn_ExecuteSalesAgentByTaskKeyRequestParameters,
  msdyn_ExecuteSalesAgentByTaskKeyResponse,
  type msdyn_ExecuteSalesAgentByTaskKeyResult,
} from "./msdyn_ExecuteSalesAgentByTaskKeyMessage.js";
export {
  msdyn_ExecuteSandboxRequestRequest,
  type msdyn_ExecuteSandboxRequestRequestParameters,
  msdyn_ExecuteSandboxRequestResponse,
  type msdyn_ExecuteSandboxRequestResult,
} from "./msdyn_ExecuteSandboxRequestMessage.js";
export {
  msdyn_ExecuteSIRequestRequest,
  type msdyn_ExecuteSIRequestRequestParameters,
  msdyn_ExecuteSIRequestResponse,
  type msdyn_ExecuteSIRequestResult,
} from "./msdyn_ExecuteSIRequestMessage.js";
export {
  msdyn_ExecuteSISampleDataRequestRequest,
  type msdyn_ExecuteSISampleDataRequestRequestParameters,
  msdyn_ExecuteSISampleDataRequestResponse,
  type msdyn_ExecuteSISampleDataRequestResult,
} from "./msdyn_ExecuteSISampleDataRequestMessage.js";
export {
  msdyn_ExportAnalyticsReportRequest,
  type msdyn_ExportAnalyticsReportRequestParameters,
  msdyn_ExportAnalyticsReportResponse,
  type msdyn_ExportAnalyticsReportResult,
} from "./msdyn_ExportAnalyticsReportMessage.js";
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
  type msdyn_FetchAllPredictionModelsResult,
} from "./msdyn_FetchAllPredictionModelsMessage.js";
export {
  msdyn_fetchemailsentimentsapiRequest,
  type msdyn_fetchemailsentimentsapiRequestParameters,
  msdyn_fetchemailsentimentsapiResponse,
  type msdyn_fetchemailsentimentsapiResult,
} from "./msdyn_fetchemailsentimentsapiMessage.js";
export {
  msdyn_FetchKPIValuesRequest,
  type msdyn_FetchKPIValuesRequestParameters,
  msdyn_FetchKPIValuesResponse,
  type msdyn_FetchKPIValuesResult,
} from "./msdyn_FetchKPIValuesMessage.js";
export {
  msdyn_fetchmailboxmetricsRequest,
  type msdyn_fetchmailboxmetricsRequestParameters,
  msdyn_fetchmailboxmetricsResponse,
  type msdyn_fetchmailboxmetricsResult,
} from "./msdyn_fetchmailboxmetricsMessage.js";
export {
  msdyn_FilterInActiveNBACardsRequest,
  type msdyn_FilterInActiveNBACardsRequestParameters,
  msdyn_FilterInActiveNBACardsResponse,
  type msdyn_FilterInActiveNBACardsResult,
} from "./msdyn_FilterInActiveNBACardsMessage.js";
export {
  msdyn_FindEntityForPolymorphicLookupRequest,
  type msdyn_FindEntityForPolymorphicLookupRequestParameters,
  msdyn_FindEntityForPolymorphicLookupResponse,
  type msdyn_FindEntityForPolymorphicLookupResult,
} from "./msdyn_FindEntityForPolymorphicLookupMessage.js";
export {
  msdyn_FireDueSchedulesRequest,
  type msdyn_FireDueSchedulesRequestParameters,
  msdyn_FireDueSchedulesResponse,
  type msdyn_FireDueSchedulesResult,
} from "./msdyn_FireDueSchedulesMessage.js";
export {
  msdyn_FixSLARelationshipsOnTargetEntitiesRequest,
  type msdyn_FixSLARelationshipsOnTargetEntitiesRequestParameters,
  msdyn_FixSLARelationshipsOnTargetEntitiesResponse,
} from "./msdyn_FixSLARelationshipsOnTargetEntitiesMessage.js";
export {
  msdyn_ForecastApiRequest,
  type msdyn_ForecastApiRequestParameters,
  msdyn_ForecastApiResponse,
  type msdyn_ForecastApiResult,
} from "./msdyn_ForecastApiMessage.js";
export {
  msdyn_ForecastGenerateHierarchyRequest,
  type msdyn_ForecastGenerateHierarchyRequestParameters,
  msdyn_ForecastGenerateHierarchyResponse,
  type msdyn_ForecastGenerateHierarchyResult,
} from "./msdyn_ForecastGenerateHierarchyMessage.js";
export {
  msdyn_ForecastInstanceActionsRequest,
  type msdyn_ForecastInstanceActionsRequestParameters,
  msdyn_ForecastInstanceActionsResponse,
  type msdyn_ForecastInstanceActionsResult,
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
  msdyn_GenerateFieldDescriptionsRequest,
  type msdyn_GenerateFieldDescriptionsRequestParameters,
  msdyn_GenerateFieldDescriptionsResponse,
  type msdyn_GenerateFieldDescriptionsResult,
} from "./msdyn_GenerateFieldDescriptionsMessage.js";
export {
  msdyn_GenerateKBSearchPromptRequest,
  type msdyn_GenerateKBSearchPromptRequestParameters,
  msdyn_GenerateKBSearchPromptResponse,
  type msdyn_GenerateKBSearchPromptResult,
} from "./msdyn_GenerateKBSearchPromptMessage.js";
export {
  msdyn_GeneratePlatformSummaryRequest,
  type msdyn_GeneratePlatformSummaryRequestParameters,
  msdyn_GeneratePlatformSummaryResponse,
  type msdyn_GeneratePlatformSummaryResult,
} from "./msdyn_GeneratePlatformSummaryMessage.js";
export {
  msdyn_GeneratePlatformSummaryConfigRecordsRequest,
  type msdyn_GeneratePlatformSummaryConfigRecordsRequestParameters,
  msdyn_GeneratePlatformSummaryConfigRecordsResponse,
  type msdyn_GeneratePlatformSummaryConfigRecordsResult,
} from "./msdyn_GeneratePlatformSummaryConfigRecordsMessage.js";
export {
  msdyn_generatePromptForGovernanceAgentGuardrailRequest,
  type msdyn_generatePromptForGovernanceAgentGuardrailRequestParameters,
  msdyn_generatePromptForGovernanceAgentGuardrailResponse,
  type msdyn_generatePromptForGovernanceAgentGuardrailResult,
} from "./msdyn_generatePromptForGovernanceAgentGuardrailMessage.js";
export {
  msdyn_generateStructuredContentRequest,
  type msdyn_generateStructuredContentRequestParameters,
  msdyn_generateStructuredContentResponse,
  type msdyn_generateStructuredContentResult,
} from "./msdyn_generateStructuredContentMessage.js";
export {
  msdyn_get_required_fieldsRequest,
  type msdyn_get_required_fieldsRequestParameters,
  msdyn_get_required_fieldsResponse,
  type msdyn_get_required_fieldsResult,
} from "./msdyn_get_required_fieldsMessage.js";
export {
  msdyn_GetAccountResearchCacheRequest,
  type msdyn_GetAccountResearchCacheRequestParameters,
  msdyn_GetAccountResearchCacheResponse,
  type msdyn_GetAccountResearchCacheResult,
} from "./msdyn_GetAccountResearchCacheMessage.js";
export {
  msdyn_GetACIMarsConnectorStatusRequest,
  msdyn_GetACIMarsConnectorStatusResponse,
  type msdyn_GetACIMarsConnectorStatusResult,
} from "./msdyn_GetACIMarsConnectorStatusMessage.js";
export {
  msdyn_GetActionTypesRequest,
  type msdyn_GetActionTypesRequestParameters,
  msdyn_GetActionTypesResponse,
  type msdyn_GetActionTypesResult,
} from "./msdyn_GetActionTypesMessage.js";
export {
  msdyn_GetAgentAssistStreamRequest,
  type msdyn_GetAgentAssistStreamRequestParameters,
  msdyn_GetAgentAssistStreamResponse,
  type msdyn_GetAgentAssistStreamResult,
} from "./msdyn_GetAgentAssistStreamMessage.js";
export {
  msdyn_GetAISuggestedContactsRequest,
  type msdyn_GetAISuggestedContactsRequestParameters,
  msdyn_GetAISuggestedContactsResponse,
  type msdyn_GetAISuggestedContactsResult,
} from "./msdyn_GetAISuggestedContactsMessage.js";
export {
  msdyn_GetAllAttributesDataRequest,
  type msdyn_GetAllAttributesDataRequestParameters,
  msdyn_GetAllAttributesDataResponse,
  type msdyn_GetAllAttributesDataResult,
} from "./msdyn_GetAllAttributesDataMessage.js";
export {
  msdyn_GetAllLeadPredictionModelsRequest,
  msdyn_GetAllLeadPredictionModelsResponse,
  type msdyn_GetAllLeadPredictionModelsResult,
} from "./msdyn_GetAllLeadPredictionModelsMessage.js";
export {
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest,
  type msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters,
  msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse,
  type msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResult,
} from "./msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsMessage.js";
export {
  msdyn_GetAnalyticsReportDetailRequest,
  type msdyn_GetAnalyticsReportDetailRequestParameters,
  msdyn_GetAnalyticsReportDetailResponse,
  type msdyn_GetAnalyticsReportDetailResult,
} from "./msdyn_GetAnalyticsReportDetailMessage.js";
export {
  msdyn_GetAnalyticsReportTokenRequest,
  type msdyn_GetAnalyticsReportTokenRequestParameters,
  msdyn_GetAnalyticsReportTokenResponse,
  type msdyn_GetAnalyticsReportTokenResult,
} from "./msdyn_GetAnalyticsReportTokenMessage.js";
export {
  msdyn_getAndSyncInsightsStatusFromCefJobResultRequest,
  type msdyn_getAndSyncInsightsStatusFromCefJobResultRequestParameters,
  msdyn_getAndSyncInsightsStatusFromCefJobResultResponse,
  type msdyn_getAndSyncInsightsStatusFromCefJobResultResult,
} from "./msdyn_getAndSyncInsightsStatusFromCefJobResultMessage.js";
export {
  msdyn_GetAnswerFromDocumentsRequest,
  type msdyn_GetAnswerFromDocumentsRequestParameters,
  msdyn_GetAnswerFromDocumentsResponse,
  type msdyn_GetAnswerFromDocumentsResult,
} from "./msdyn_GetAnswerFromDocumentsMessage.js";
export {
  msdyn_getAppConfigRequest,
  msdyn_getAppConfigResponse,
} from "./msdyn_getAppConfigMessage.js";
export {
  msdyn_getAppConfigByContextRequest,
  type msdyn_getAppConfigByContextRequestParameters,
  msdyn_getAppConfigByContextResponse,
  type msdyn_getAppConfigByContextResult,
} from "./msdyn_getAppConfigByContextMessage.js";
export {
  msdyn_GetAppInsightsTelemetryRequest,
  type msdyn_GetAppInsightsTelemetryRequestParameters,
  msdyn_GetAppInsightsTelemetryResponse,
  type msdyn_GetAppInsightsTelemetryResult,
} from "./msdyn_GetAppInsightsTelemetryMessage.js";
export {
  msdyn_GetAppModuleSettingsRequest,
  msdyn_GetAppModuleSettingsResponse,
  type msdyn_GetAppModuleSettingsResult,
} from "./msdyn_GetAppModuleSettingsMessage.js";
export {
  msdyn_GetAttributeInfluenceStatisticsRequest,
  type msdyn_GetAttributeInfluenceStatisticsRequestParameters,
  msdyn_GetAttributeInfluenceStatisticsResponse,
  type msdyn_GetAttributeInfluenceStatisticsResult,
} from "./msdyn_GetAttributeInfluenceStatisticsMessage.js";
export {
  msdyn_GetAuditStateRequest,
  msdyn_GetAuditStateResponse,
  type msdyn_GetAuditStateResult,
} from "./msdyn_GetAuditStateMessage.js";
export {
  msdyn_GetAutoCaptureUriRequest,
  type msdyn_GetAutoCaptureUriRequestParameters,
  msdyn_GetAutoCaptureUriResponse,
  type msdyn_GetAutoCaptureUriResult,
} from "./msdyn_GetAutoCaptureUriMessage.js";
export {
  msdyn_GetAutonomousAgentEmailAssistRequest,
  type msdyn_GetAutonomousAgentEmailAssistRequestParameters,
  msdyn_GetAutonomousAgentEmailAssistResponse,
  type msdyn_GetAutonomousAgentEmailAssistResult,
} from "./msdyn_GetAutonomousAgentEmailAssistMessage.js";
export {
  msdyn_GetAutonomousDraftContentRequest,
  type msdyn_GetAutonomousDraftContentRequestParameters,
  msdyn_GetAutonomousDraftContentResponse,
  type msdyn_GetAutonomousDraftContentResult,
} from "./msdyn_GetAutonomousDraftContentMessage.js";
export {
  msdyn_GetCaseManagementAgentSettingsRequest,
  type msdyn_GetCaseManagementAgentSettingsRequestParameters,
  msdyn_GetCaseManagementAgentSettingsResponse,
  type msdyn_GetCaseManagementAgentSettingsResult,
} from "./msdyn_GetCaseManagementAgentSettingsMessage.js";
export {
  msdyn_GetCaseResolutionAgentSettingsRequest,
  type msdyn_GetCaseResolutionAgentSettingsRequestParameters,
  msdyn_GetCaseResolutionAgentSettingsResponse,
  type msdyn_GetCaseResolutionAgentSettingsResult,
} from "./msdyn_GetCaseResolutionAgentSettingsMessage.js";
export {
  msdyn_GetCaseSuggestionsRequest,
  type msdyn_GetCaseSuggestionsRequestParameters,
  msdyn_GetCaseSuggestionsResponse,
  type msdyn_GetCaseSuggestionsResult,
} from "./msdyn_GetCaseSuggestionsMessage.js";
export {
  msdyn_GetChatResponseRequest,
  type msdyn_GetChatResponseRequestParameters,
  msdyn_GetChatResponseResponse,
  type msdyn_GetChatResponseResult,
} from "./msdyn_GetChatResponseMessage.js";
export {
  msdyn_GetCJOTreeNodesRequest,
  type msdyn_GetCJOTreeNodesRequestParameters,
  msdyn_GetCJOTreeNodesResponse,
  type msdyn_GetCJOTreeNodesResult,
} from "./msdyn_GetCJOTreeNodesMessage.js";
export {
  msdyn_GetConnectionRefStatusRequest,
  type msdyn_GetConnectionRefStatusRequestParameters,
  msdyn_GetConnectionRefStatusResponse,
  type msdyn_GetConnectionRefStatusResult,
} from "./msdyn_GetConnectionRefStatusMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberRequest,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberRequestParameters,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberResponse,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberResult,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberMessage.js";
export {
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequest,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineRequestParameters,
  msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResponse,
  type msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineResult,
} from "./msdyn_GetContactsForOptyConnectedSalesTeamMemberInteractedTimelineMessage.js";
export {
  msdyn_GetContactsFromAssociatedConversationsRequest,
  type msdyn_GetContactsFromAssociatedConversationsRequestParameters,
  msdyn_GetContactsFromAssociatedConversationsResponse,
  type msdyn_GetContactsFromAssociatedConversationsResult,
} from "./msdyn_GetContactsFromAssociatedConversationsMessage.js";
export {
  msdyn_GetContactsFromTimelineRequest,
  type msdyn_GetContactsFromTimelineRequestParameters,
  msdyn_GetContactsFromTimelineResponse,
  type msdyn_GetContactsFromTimelineResult,
} from "./msdyn_GetContactsFromTimelineMessage.js";
export {
  msdyn_GetCopilotAgentStatusForEnvironmentRequest,
  type msdyn_GetCopilotAgentStatusForEnvironmentRequestParameters,
  msdyn_GetCopilotAgentStatusForEnvironmentResponse,
  type msdyn_GetCopilotAgentStatusForEnvironmentResult,
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
  type msdyn_GetCopilotSettingsDataResult,
} from "./msdyn_GetCopilotSettingsDataMessage.js";
export {
  msdyn_getCTandEACdisabledEntitiesRequest,
  type msdyn_getCTandEACdisabledEntitiesRequestParameters,
  msdyn_getCTandEACdisabledEntitiesResponse,
  type msdyn_getCTandEACdisabledEntitiesResult,
} from "./msdyn_getCTandEACdisabledEntitiesMessage.js";
export {
  msdyn_getcurrentemailcontentRequest,
  type msdyn_getcurrentemailcontentRequestParameters,
  msdyn_getcurrentemailcontentResponse,
  type msdyn_getcurrentemailcontentResult,
} from "./msdyn_getcurrentemailcontentMessage.js";
export {
  msdyn_GetCustomActionListRequest,
  type msdyn_GetCustomActionListRequestParameters,
  msdyn_GetCustomActionListResponse,
  type msdyn_GetCustomActionListResult,
} from "./msdyn_GetCustomActionListMessage.js";
export {
  msdyn_GetCustomActionParametersRequest,
  type msdyn_GetCustomActionParametersRequestParameters,
  msdyn_GetCustomActionParametersResponse,
  type msdyn_GetCustomActionParametersResult,
} from "./msdyn_GetCustomActionParametersMessage.js";
export {
  msdyn_GetDealRiskSuggestedActionsRequest,
  type msdyn_GetDealRiskSuggestedActionsRequestParameters,
  msdyn_GetDealRiskSuggestedActionsResponse,
  type msdyn_GetDealRiskSuggestedActionsResult,
} from "./msdyn_GetDealRiskSuggestedActionsMessage.js";
export {
  msdyn_GetDefaultAgentSelectionCriteriaRequest,
  msdyn_GetDefaultAgentSelectionCriteriaResponse,
  type msdyn_GetDefaultAgentSelectionCriteriaResult,
} from "./msdyn_GetDefaultAgentSelectionCriteriaMessage.js";
export {
  msdyn_GetDocumentContentRequest,
  type msdyn_GetDocumentContentRequestParameters,
  msdyn_GetDocumentContentResponse,
  type msdyn_GetDocumentContentResult,
} from "./msdyn_GetDocumentContentMessage.js";
export {
  msdyn_GetDuplicatesActionRequest,
  type msdyn_GetDuplicatesActionRequestParameters,
  msdyn_GetDuplicatesActionResponse,
  type msdyn_GetDuplicatesActionResult,
} from "./msdyn_GetDuplicatesActionMessage.js";
export {
  msdyn_GetDynamicFieldsForActionTypeRequest,
  type msdyn_GetDynamicFieldsForActionTypeRequestParameters,
  msdyn_GetDynamicFieldsForActionTypeResponse,
  type msdyn_GetDynamicFieldsForActionTypeResult,
} from "./msdyn_GetDynamicFieldsForActionTypeMessage.js";
export {
  msdyn_GetEligibleRegardingEntitiesRequest,
  type msdyn_GetEligibleRegardingEntitiesRequestParameters,
  msdyn_GetEligibleRegardingEntitiesResponse,
  type msdyn_GetEligibleRegardingEntitiesResult,
} from "./msdyn_GetEligibleRegardingEntitiesMessage.js";
export {
  msdyn_GetEmailAssistStreamRequest,
  type msdyn_GetEmailAssistStreamRequestParameters,
  msdyn_GetEmailAssistStreamResponse,
} from "./msdyn_GetEmailAssistStreamMessage.js";
export {
  msdyn_GetEnabledChannelsRequest,
  msdyn_GetEnabledChannelsResponse,
  type msdyn_GetEnabledChannelsResult,
} from "./msdyn_GetEnabledChannelsMessage.js";
export {
  msdyn_GetEntityListRequest,
  type msdyn_GetEntityListRequestParameters,
  msdyn_GetEntityListResponse,
  type msdyn_GetEntityListResult,
} from "./msdyn_GetEntityListMessage.js";
export {
  msdyn_GetEntityListForCustomActionRequest,
  type msdyn_GetEntityListForCustomActionRequestParameters,
  msdyn_GetEntityListForCustomActionResponse,
  type msdyn_GetEntityListForCustomActionResult,
} from "./msdyn_GetEntityListForCustomActionMessage.js";
export {
  msdyn_GetEntityViewsRequest,
  type msdyn_GetEntityViewsRequestParameters,
  msdyn_GetEntityViewsResponse,
  type msdyn_GetEntityViewsResult,
} from "./msdyn_GetEntityViewsMessage.js";
export {
  msdyn_GetExtractsFromContentRequest,
  type msdyn_GetExtractsFromContentRequestParameters,
  msdyn_GetExtractsFromContentResponse,
  type msdyn_GetExtractsFromContentResult,
} from "./msdyn_GetExtractsFromContentMessage.js";
export {
  msdyn_GetFavoriteArticlesRequest,
  type msdyn_GetFavoriteArticlesRequestParameters,
  msdyn_GetFavoriteArticlesResponse,
  type msdyn_GetFavoriteArticlesResult,
} from "./msdyn_GetFavoriteArticlesMessage.js";
export {
  msdyn_GetFCSValueRequest,
  type msdyn_GetFCSValueRequestParameters,
  msdyn_GetFCSValueResponse,
  type msdyn_GetFCSValueResult,
} from "./msdyn_GetFCSValueMessage.js";
export {
  msdyn_GetFCSWithUserContextRequest,
  type msdyn_GetFCSWithUserContextRequestParameters,
  msdyn_GetFCSWithUserContextResponse,
  type msdyn_GetFCSWithUserContextResult,
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
  type msdyn_GetFeatureControlStatusResult,
} from "./msdyn_GetFeatureControlStatusMessage.js";
export {
  msdyn_GetFieldCandidatesRequest,
  type msdyn_GetFieldCandidatesRequestParameters,
  msdyn_GetFieldCandidatesResponse,
  type msdyn_GetFieldCandidatesResult,
} from "./msdyn_GetFieldCandidatesMessage.js";
export {
  msdyn_GetFieldEvidenceRequest,
  type msdyn_GetFieldEvidenceRequestParameters,
  msdyn_GetFieldEvidenceResponse,
  type msdyn_GetFieldEvidenceResult,
} from "./msdyn_GetFieldEvidenceMessage.js";
export {
  msdyn_GetFieldsForPredictionsRequest,
  msdyn_GetFieldsForPredictionsResponse,
  type msdyn_GetFieldsForPredictionsResult,
} from "./msdyn_GetFieldsForPredictionsMessage.js";
export {
  msdyn_GetFormattedOpportunityDataRequest,
  type msdyn_GetFormattedOpportunityDataRequestParameters,
  msdyn_GetFormattedOpportunityDataResponse,
  type msdyn_GetFormattedOpportunityDataResult,
} from "./msdyn_GetFormattedOpportunityDataMessage.js";
export {
  msdyn_GetGPT3PredictionRequest,
  type msdyn_GetGPT3PredictionRequestParameters,
  msdyn_GetGPT3PredictionResponse,
  type msdyn_GetGPT3PredictionResult,
} from "./msdyn_GetGPT3PredictionMessage.js";
export {
  msdyn_GetInsightsRequest,
  type msdyn_GetInsightsRequestParameters,
  msdyn_GetInsightsResponse,
  type msdyn_GetInsightsResult,
} from "./msdyn_GetInsightsMessage.js";
export {
  msdyn_GetIntentAssistSuggestionsForBotRequest,
  type msdyn_GetIntentAssistSuggestionsForBotRequestParameters,
  msdyn_GetIntentAssistSuggestionsForBotResponse,
  type msdyn_GetIntentAssistSuggestionsForBotResult,
} from "./msdyn_GetIntentAssistSuggestionsForBotMessage.js";
export {
  msdyn_GetIntentNextActionRequest,
  type msdyn_GetIntentNextActionRequestParameters,
  msdyn_GetIntentNextActionResponse,
  type msdyn_GetIntentNextActionResult,
} from "./msdyn_GetIntentNextActionMessage.js";
export {
  msdyn_getIslandUrlRequest,
  msdyn_getIslandUrlResponse,
  type msdyn_getIslandUrlResult,
} from "./msdyn_getIslandUrlMessage.js";
export {
  msdyn_GetKAObjectFromTemplateRequest,
  type msdyn_GetKAObjectFromTemplateRequestParameters,
  msdyn_GetKAObjectFromTemplateResponse,
  type msdyn_GetKAObjectFromTemplateResult,
} from "./msdyn_GetKAObjectFromTemplateMessage.js";
export {
  msdyn_GetKeyOpportunityInsightsRequest,
  type msdyn_GetKeyOpportunityInsightsRequestParameters,
  msdyn_GetKeyOpportunityInsightsResponse,
  type msdyn_GetKeyOpportunityInsightsResult,
} from "./msdyn_GetKeyOpportunityInsightsMessage.js";
export {
  msdyn_GetKeyOpportunitySignalsRequest,
  type msdyn_GetKeyOpportunitySignalsRequestParameters,
  msdyn_GetKeyOpportunitySignalsResponse,
  type msdyn_GetKeyOpportunitySignalsResult,
} from "./msdyn_GetKeyOpportunitySignalsMessage.js";
export {
  msdyn_GetKeyOpportunityStakeholdersRequest,
  type msdyn_GetKeyOpportunityStakeholdersRequestParameters,
  msdyn_GetKeyOpportunityStakeholdersResponse,
  type msdyn_GetKeyOpportunityStakeholdersResult,
} from "./msdyn_GetKeyOpportunityStakeholdersMessage.js";
export {
  msdyn_GetKeywordsRequest,
  type msdyn_GetKeywordsRequestParameters,
  msdyn_GetKeywordsResponse,
  type msdyn_GetKeywordsResult,
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
  type msdyn_GetKnowledgeSuggestionsResult,
} from "./msdyn_GetKnowledgeSuggestionsMessage.js";
export {
  msdyn_GetLeadCallPrepSheetDetailsRequest,
  type msdyn_GetLeadCallPrepSheetDetailsRequestParameters,
  msdyn_GetLeadCallPrepSheetDetailsResponse,
  type msdyn_GetLeadCallPrepSheetDetailsResult,
} from "./msdyn_GetLeadCallPrepSheetDetailsMessage.js";
export {
  msdyn_GetLeadPreferredOutreachCtaRequest,
  type msdyn_GetLeadPreferredOutreachCtaRequestParameters,
  msdyn_GetLeadPreferredOutreachCtaResponse,
  type msdyn_GetLeadPreferredOutreachCtaResult,
} from "./msdyn_GetLeadPreferredOutreachCtaMessage.js";
export {
  msdyn_GetLegalAcceptanceStatusRequest,
  msdyn_GetLegalAcceptanceStatusResponse,
  type msdyn_GetLegalAcceptanceStatusResult,
} from "./msdyn_GetLegalAcceptanceStatusMessage.js";
export {
  msdyn_GetLicenseInfoRequest,
  msdyn_GetLicenseInfoResponse,
  type msdyn_GetLicenseInfoResult,
} from "./msdyn_GetLicenseInfoMessage.js";
export {
  msdyn_GetLineOfBusinessOptionValueRequest,
  type msdyn_GetLineOfBusinessOptionValueRequestParameters,
  msdyn_GetLineOfBusinessOptionValueResponse,
  type msdyn_GetLineOfBusinessOptionValueResult,
} from "./msdyn_GetLineOfBusinessOptionValueMessage.js";
export {
  msdyn_GetMessageForCaseFollowupAndClosureAgentRequest,
  type msdyn_GetMessageForCaseFollowupAndClosureAgentRequestParameters,
  msdyn_GetMessageForCaseFollowupAndClosureAgentResponse,
  type msdyn_GetMessageForCaseFollowupAndClosureAgentResult,
} from "./msdyn_GetMessageForCaseFollowupAndClosureAgentMessage.js";
export {
  msdyn_GetMessageIdsForOpportunityCustomActionRequest,
  type msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters,
  msdyn_GetMessageIdsForOpportunityCustomActionResponse,
  type msdyn_GetMessageIdsForOpportunityCustomActionResult,
} from "./msdyn_GetMessageIdsForOpportunityCustomActionMessage.js";
export {
  msdyn_GetMLPredictionRequest,
  type msdyn_GetMLPredictionRequestParameters,
  msdyn_GetMLPredictionResponse,
  type msdyn_GetMLPredictionResult,
} from "./msdyn_GetMLPredictionMessage.js";
export {
  msdyn_GetNotesAnalysisRequest,
  type msdyn_GetNotesAnalysisRequestParameters,
  msdyn_GetNotesAnalysisResponse,
  type msdyn_GetNotesAnalysisResult,
} from "./msdyn_GetNotesAnalysisMessage.js";
export {
  msdyn_GetODOSFeatureEnabledRolesRequest,
  type msdyn_GetODOSFeatureEnabledRolesRequestParameters,
  msdyn_GetODOSFeatureEnabledRolesResponse,
  type msdyn_GetODOSFeatureEnabledRolesResult,
} from "./msdyn_GetODOSFeatureEnabledRolesMessage.js";
export {
  msdyn_GetODOSFeatureProvisioningStatusRequest,
  type msdyn_GetODOSFeatureProvisioningStatusRequestParameters,
  msdyn_GetODOSFeatureProvisioningStatusResponse,
  type msdyn_GetODOSFeatureProvisioningStatusResult,
} from "./msdyn_GetODOSFeatureProvisioningStatusMessage.js";
export {
  msdyn_GetODOSMetadataRequest,
  msdyn_GetODOSMetadataResponse,
  type msdyn_GetODOSMetadataResult,
} from "./msdyn_GetODOSMetadataMessage.js";
export {
  msdyn_GetOpportunityHealthRequest,
  type msdyn_GetOpportunityHealthRequestParameters,
  msdyn_GetOpportunityHealthResponse,
  type msdyn_GetOpportunityHealthResult,
} from "./msdyn_GetOpportunityHealthMessage.js";
export {
  msdyn_GetOpportunityPainPointsAndNeedsRequest,
  type msdyn_GetOpportunityPainPointsAndNeedsRequestParameters,
  msdyn_GetOpportunityPainPointsAndNeedsResponse,
  type msdyn_GetOpportunityPainPointsAndNeedsResult,
} from "./msdyn_GetOpportunityPainPointsAndNeedsMessage.js";
export {
  msdyn_GetOpportunityResearchDataRequest,
  type msdyn_GetOpportunityResearchDataRequestParameters,
  msdyn_GetOpportunityResearchDataResponse,
  type msdyn_GetOpportunityResearchDataResult,
} from "./msdyn_GetOpportunityResearchDataMessage.js";
export {
  msdyn_GetOpportunityResearchResultRequest,
  type msdyn_GetOpportunityResearchResultRequestParameters,
  msdyn_GetOpportunityResearchResultResponse,
  type msdyn_GetOpportunityResearchResultResult,
} from "./msdyn_GetOpportunityResearchResultMessage.js";
export {
  msdyn_GetOrCreateExtUserSettingRequest,
  msdyn_GetOrCreateExtUserSettingResponse,
  type msdyn_GetOrCreateExtUserSettingResult,
} from "./msdyn_GetOrCreateExtUserSettingMessage.js";
export {
  msdyn_GetOrCreateLinkedActivityRequest,
  type msdyn_GetOrCreateLinkedActivityRequestParameters,
  msdyn_GetOrCreateLinkedActivityResponse,
  type msdyn_GetOrCreateLinkedActivityResult,
} from "./msdyn_GetOrCreateLinkedActivityMessage.js";
export {
  msdyn_GetOrganizationProvisioningStatusRequest,
  msdyn_GetOrganizationProvisioningStatusResponse,
  type msdyn_GetOrganizationProvisioningStatusResult,
} from "./msdyn_GetOrganizationProvisioningStatusMessage.js";
export {
  msdyn_GetORReasonExplanationRequest,
  type msdyn_GetORReasonExplanationRequestParameters,
  msdyn_GetORReasonExplanationResponse,
  type msdyn_GetORReasonExplanationResult,
} from "./msdyn_GetORReasonExplanationMessage.js";
export {
  msdyn_GetPoPTokenRequest,
  type msdyn_GetPoPTokenRequestParameters,
  msdyn_GetPoPTokenResponse,
  type msdyn_GetPoPTokenResult,
} from "./msdyn_GetPoPTokenMessage.js";
export {
  msdyn_GetPostOperationsRequest,
  type msdyn_GetPostOperationsRequestParameters,
  msdyn_GetPostOperationsResponse,
  type msdyn_GetPostOperationsResult,
} from "./msdyn_GetPostOperationsMessage.js";
export {
  msdyn_GetPredictionModelStatusRequest,
  type msdyn_GetPredictionModelStatusRequestParameters,
  msdyn_GetPredictionModelStatusResponse,
  type msdyn_GetPredictionModelStatusResult,
} from "./msdyn_GetPredictionModelStatusMessage.js";
export {
  msdyn_GetPremiumOrgStatusRequest,
  msdyn_GetPremiumOrgStatusResponse,
  type msdyn_GetPremiumOrgStatusResult,
} from "./msdyn_GetPremiumOrgStatusMessage.js";
export {
  msdyn_GetPromoContentFromIrisRequest,
  type msdyn_GetPromoContentFromIrisRequestParameters,
  msdyn_GetPromoContentFromIrisResponse,
  type msdyn_GetPromoContentFromIrisResult,
} from "./msdyn_GetPromoContentFromIrisMessage.js";
export {
  msdyn_GetRecordUsersRequest,
  type msdyn_GetRecordUsersRequestParameters,
  msdyn_GetRecordUsersResponse,
  type msdyn_GetRecordUsersResult,
} from "./msdyn_GetRecordUsersMessage.js";
export {
  msdyn_GetRelatedOpportunitiesForOpptyResearchRequest,
  type msdyn_GetRelatedOpportunitiesForOpptyResearchRequestParameters,
  msdyn_GetRelatedOpportunitiesForOpptyResearchResponse,
  type msdyn_GetRelatedOpportunitiesForOpptyResearchResult,
} from "./msdyn_GetRelatedOpportunitiesForOpptyResearchMessage.js";
export {
  msdyn_GetRICommonFCBStatusRequest,
  type msdyn_GetRICommonFCBStatusRequestParameters,
  msdyn_GetRICommonFCBStatusResponse,
  type msdyn_GetRICommonFCBStatusResult,
} from "./msdyn_GetRICommonFCBStatusMessage.js";
export {
  msdyn_GetRIProvisioningStatusRequest,
  msdyn_GetRIProvisioningStatusResponse,
  type msdyn_GetRIProvisioningStatusResult,
} from "./msdyn_GetRIProvisioningStatusMessage.js";
export {
  msdyn_GetRITenantEndpointRequest,
  msdyn_GetRITenantEndpointResponse,
  type msdyn_GetRITenantEndpointResult,
} from "./msdyn_GetRITenantEndpointMessage.js";
export {
  msdyn_GetSalesAcceleratedSellerRequest,
  type msdyn_GetSalesAcceleratedSellerRequestParameters,
  msdyn_GetSalesAcceleratedSellerResponse,
  type msdyn_GetSalesAcceleratedSellerResult,
} from "./msdyn_GetSalesAcceleratedSellerMessage.js";
export {
  msdyn_GetSalesAcceleratedSellerDetailsRequest,
  type msdyn_GetSalesAcceleratedSellerDetailsRequestParameters,
  msdyn_GetSalesAcceleratedSellerDetailsResponse,
  type msdyn_GetSalesAcceleratedSellerDetailsResult,
} from "./msdyn_GetSalesAcceleratedSellerDetailsMessage.js";
export {
  msdyn_GetSalesAccelerationConfigurationStatusRequest,
  msdyn_GetSalesAccelerationConfigurationStatusResponse,
  type msdyn_GetSalesAccelerationConfigurationStatusResult,
} from "./msdyn_GetSalesAccelerationConfigurationStatusMessage.js";
export {
  msdyn_GetSalesCopilotConsentAndInfraStatusRequest,
  type msdyn_GetSalesCopilotConsentAndInfraStatusRequestParameters,
  msdyn_GetSalesCopilotConsentAndInfraStatusResponse,
  type msdyn_GetSalesCopilotConsentAndInfraStatusResult,
} from "./msdyn_GetSalesCopilotConsentAndInfraStatusMessage.js";
export {
  msdyn_GetSalesCopilotEmailInsightsRequest,
  type msdyn_GetSalesCopilotEmailInsightsRequestParameters,
  msdyn_GetSalesCopilotEmailInsightsResponse,
  type msdyn_GetSalesCopilotEmailInsightsResult,
} from "./msdyn_GetSalesCopilotEmailInsightsMessage.js";
export {
  msdyn_GetSalesMeetingsRequest,
  type msdyn_GetSalesMeetingsRequestParameters,
  msdyn_GetSalesMeetingsResponse,
  type msdyn_GetSalesMeetingsResult,
} from "./msdyn_GetSalesMeetingsMessage.js";
export {
  msdyn_GetSalesRowSummaryRequest,
  type msdyn_GetSalesRowSummaryRequestParameters,
  msdyn_GetSalesRowSummaryResponse,
  type msdyn_GetSalesRowSummaryResult,
} from "./msdyn_GetSalesRowSummaryMessage.js";
export {
  msdyn_getSalesSequenceExperimentSettingsRequest,
  type msdyn_getSalesSequenceExperimentSettingsRequestParameters,
  msdyn_getSalesSequenceExperimentSettingsResponse,
  type msdyn_getSalesSequenceExperimentSettingsResult,
} from "./msdyn_getSalesSequenceExperimentSettingsMessage.js";
export {
  msdyn_getSalesSequenceExperimentStatusRequest,
  type msdyn_getSalesSequenceExperimentStatusRequestParameters,
  msdyn_getSalesSequenceExperimentStatusResponse,
  type msdyn_getSalesSequenceExperimentStatusResult,
} from "./msdyn_getSalesSequenceExperimentStatusMessage.js";
export {
  msdyn_getSalesSequenceExperimentVersionRequest,
  type msdyn_getSalesSequenceExperimentVersionRequestParameters,
  msdyn_getSalesSequenceExperimentVersionResponse,
  type msdyn_getSalesSequenceExperimentVersionResult,
} from "./msdyn_getSalesSequenceExperimentVersionMessage.js";
export {
  msdyn_GetSalesSuggestedActionsRequest,
  type msdyn_GetSalesSuggestedActionsRequestParameters,
  msdyn_GetSalesSuggestedActionsResponse,
  type msdyn_GetSalesSuggestedActionsResult,
} from "./msdyn_GetSalesSuggestedActionsMessage.js";
export {
  msdyn_GetSankeyDataRequest,
  type msdyn_GetSankeyDataRequestParameters,
  msdyn_GetSankeyDataResponse,
  type msdyn_GetSankeyDataResult,
} from "./msdyn_GetSankeyDataMessage.js";
export {
  msdyn_GetSankeyViewKPIsRequest,
  type msdyn_GetSankeyViewKPIsRequestParameters,
  msdyn_GetSankeyViewKPIsResponse,
  type msdyn_GetSankeyViewKPIsResult,
} from "./msdyn_GetSankeyViewKPIsMessage.js";
export {
  msdyn_GetSellerAuditStateRequest,
  msdyn_GetSellerAuditStateResponse,
  type msdyn_GetSellerAuditStateResult,
} from "./msdyn_GetSellerAuditStateMessage.js";
export {
  msdyn_GetSequenceAnalyticsKPIsRequest,
  type msdyn_GetSequenceAnalyticsKPIsRequestParameters,
  msdyn_GetSequenceAnalyticsKPIsResponse,
  type msdyn_GetSequenceAnalyticsKPIsResult,
} from "./msdyn_GetSequenceAnalyticsKPIsMessage.js";
export {
  msdyn_GetSequenceAssignedOwnersRequest,
  type msdyn_GetSequenceAssignedOwnersRequestParameters,
  msdyn_GetSequenceAssignedOwnersResponse,
  type msdyn_GetSequenceAssignedOwnersResult,
} from "./msdyn_GetSequenceAssignedOwnersMessage.js";
export {
  msdyn_GetServiceBaseUrlRequest,
  type msdyn_GetServiceBaseUrlRequestParameters,
  msdyn_GetServiceBaseUrlResponse,
  type msdyn_GetServiceBaseUrlResult,
} from "./msdyn_GetServiceBaseUrlMessage.js";
export {
  msdyn_GetSIFeatureConfigurationRequest,
  type msdyn_GetSIFeatureConfigurationRequestParameters,
  msdyn_GetSIFeatureConfigurationResponse,
  type msdyn_GetSIFeatureConfigurationResult,
} from "./msdyn_GetSIFeatureConfigurationMessage.js";
export {
  msdyn_GetSILicenseStatusRequest,
  msdyn_GetSILicenseStatusResponse,
  type msdyn_GetSILicenseStatusResult,
} from "./msdyn_GetSILicenseStatusMessage.js";
export {
  msdyn_GetSimilarOpportunitiesRequest,
  type msdyn_GetSimilarOpportunitiesRequestParameters,
  msdyn_GetSimilarOpportunitiesResponse,
  type msdyn_GetSimilarOpportunitiesResult,
} from "./msdyn_GetSimilarOpportunitiesMessage.js";
export {
  msdyn_GetSIPackageStatusRequest,
  type msdyn_GetSIPackageStatusRequestParameters,
  msdyn_GetSIPackageStatusResponse,
  type msdyn_GetSIPackageStatusResult,
} from "./msdyn_GetSIPackageStatusMessage.js";
export {
  msdyn_GetSubjectHierarchyDataRequest,
  type msdyn_GetSubjectHierarchyDataRequestParameters,
  msdyn_GetSubjectHierarchyDataResponse,
  type msdyn_GetSubjectHierarchyDataResult,
} from "./msdyn_GetSubjectHierarchyDataMessage.js";
export {
  msdyn_GetSuggestedActionsForLeadRequest,
  msdyn_GetSuggestedActionsForLeadResponse,
  type msdyn_GetSuggestedActionsForLeadResult,
} from "./msdyn_GetSuggestedActionsForLeadMessage.js";
export {
  msdyn_GetSuggestedContactsRequest,
  type msdyn_GetSuggestedContactsRequestParameters,
  msdyn_GetSuggestedContactsResponse,
  type msdyn_GetSuggestedContactsResult,
} from "./msdyn_GetSuggestedContactsMessage.js";
export {
  msdyn_GetSwarmInvitationCardRequest,
  type msdyn_GetSwarmInvitationCardRequestParameters,
  msdyn_GetSwarmInvitationCardResponse,
  type msdyn_GetSwarmInvitationCardResult,
} from "./msdyn_GetSwarmInvitationCardMessage.js";
export {
  msdyn_GetSwarmResponseCardRequest,
  type msdyn_GetSwarmResponseCardRequestParameters,
  msdyn_GetSwarmResponseCardResponse,
  type msdyn_GetSwarmResponseCardResult,
} from "./msdyn_GetSwarmResponseCardMessage.js";
export {
  msdyn_GetSwarmSkillsRequest,
  type msdyn_GetSwarmSkillsRequestParameters,
  msdyn_GetSwarmSkillsResponse,
  type msdyn_GetSwarmSkillsResult,
} from "./msdyn_GetSwarmSkillsMessage.js";
export {
  msdyn_GetTalkingPointsRequest,
  type msdyn_GetTalkingPointsRequestParameters,
  msdyn_GetTalkingPointsResponse,
  type msdyn_GetTalkingPointsResult,
} from "./msdyn_GetTalkingPointsMessage.js";
export {
  msdyn_GetTimeLineRecordsRequest,
  type msdyn_GetTimeLineRecordsRequestParameters,
  msdyn_GetTimeLineRecordsResponse,
  type msdyn_GetTimeLineRecordsResult,
} from "./msdyn_GetTimeLineRecordsMessage.js";
export {
  msdyn_GetTrainingResultsRequest,
  type msdyn_GetTrainingResultsRequestParameters,
  msdyn_GetTrainingResultsResponse,
  type msdyn_GetTrainingResultsResult,
} from "./msdyn_GetTrainingResultsMessage.js";
export {
  msdyn_GetUserConsentStatusRequest,
  msdyn_GetUserConsentStatusResponse,
  type msdyn_GetUserConsentStatusResult,
} from "./msdyn_GetUserConsentStatusMessage.js";
export {
  msdyn_GetWidgetsDataRequest,
  type msdyn_GetWidgetsDataRequestParameters,
  msdyn_GetWidgetsDataResponse,
  type msdyn_GetWidgetsDataResult,
} from "./msdyn_GetWidgetsDataMessage.js";
export {
  msdyn_GetWorkListConfigurationRequest,
  type msdyn_GetWorkListConfigurationRequestParameters,
  msdyn_GetWorkListConfigurationResponse,
  type msdyn_GetWorkListConfigurationResult,
} from "./msdyn_GetWorkListConfigurationMessage.js";
export {
  msdyn_GlobalSettingsRequest,
  type msdyn_GlobalSettingsRequestParameters,
  msdyn_GlobalSettingsResponse,
  type msdyn_GlobalSettingsResult,
} from "./msdyn_GlobalSettingsMessage.js";
export {
  msdyn_HandleTimedOutAgentProcessingStateRequest,
  type msdyn_HandleTimedOutAgentProcessingStateRequestParameters,
  msdyn_HandleTimedOutAgentProcessingStateResponse,
} from "./msdyn_HandleTimedOutAgentProcessingStateMessage.js";
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
  msdyn_InstallSalesInsightsSolutionRequest,
  type msdyn_InstallSalesInsightsSolutionRequestParameters,
  msdyn_InstallSalesInsightsSolutionResponse,
  type msdyn_InstallSalesInsightsSolutionResult,
} from "./msdyn_InstallSalesInsightsSolutionMessage.js";
export {
  msdyn_IntentQuickSetupProxyRequest,
  type msdyn_IntentQuickSetupProxyRequestParameters,
  msdyn_IntentQuickSetupProxyResponse,
  type msdyn_IntentQuickSetupProxyResult,
} from "./msdyn_IntentQuickSetupProxyMessage.js";
export {
  msdyn_InvokeAgentAssistToolsRequest,
  type msdyn_InvokeAgentAssistToolsRequestParameters,
  msdyn_InvokeAgentAssistToolsResponse,
  type msdyn_InvokeAgentAssistToolsResult,
} from "./msdyn_InvokeAgentAssistToolsMessage.js";
export {
  msdyn_invokeCaseProcessingAgentRequest,
  type msdyn_invokeCaseProcessingAgentRequestParameters,
  msdyn_invokeCaseProcessingAgentResponse,
} from "./msdyn_invokeCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeCopilotAPIRequest,
  type msdyn_InvokeCopilotAPIRequestParameters,
  msdyn_InvokeCopilotAPIResponse,
  type msdyn_InvokeCopilotAPIResult,
} from "./msdyn_InvokeCopilotAPIMessage.js";
export {
  msdyn_invokeCustomAgentForCaseProcessingAgentRequest,
  type msdyn_invokeCustomAgentForCaseProcessingAgentRequestParameters,
  msdyn_invokeCustomAgentForCaseProcessingAgentResponse,
} from "./msdyn_invokeCustomAgentForCaseProcessingAgentMessage.js";
export {
  msdyn_InvokeGetNextSuggestionRequest,
  type msdyn_InvokeGetNextSuggestionRequestParameters,
  msdyn_InvokeGetNextSuggestionResponse,
  type msdyn_InvokeGetNextSuggestionResult,
} from "./msdyn_InvokeGetNextSuggestionMessage.js";
export {
  msdyn_InvokeIntelligenceActionRequest,
  type msdyn_InvokeIntelligenceActionRequestParameters,
  msdyn_InvokeIntelligenceActionResponse,
  type msdyn_InvokeIntelligenceActionResult,
} from "./msdyn_InvokeIntelligenceActionMessage.js";
export {
  msdyn_InvokeOptimizeActionRequest,
  type msdyn_InvokeOptimizeActionRequestParameters,
  msdyn_InvokeOptimizeActionResponse,
  type msdyn_InvokeOptimizeActionResult,
} from "./msdyn_InvokeOptimizeActionMessage.js";
export {
  msdyn_InvokeServiceStoredProcRequest,
  type msdyn_InvokeServiceStoredProcRequestParameters,
  msdyn_InvokeServiceStoredProcResponse,
  type msdyn_InvokeServiceStoredProcResult,
} from "./msdyn_InvokeServiceStoredProcMessage.js";
export {
  msdyn_IsLinkedInDataValidationEnabledRequest,
  msdyn_IsLinkedInDataValidationEnabledResponse,
  type msdyn_IsLinkedInDataValidationEnabledResult,
} from "./msdyn_IsLinkedInDataValidationEnabledMessage.js";
export {
  msdyn_IsMSTeamsUserSyncFeatureEnabledRequest,
  msdyn_IsMSTeamsUserSyncFeatureEnabledResponse,
  type msdyn_IsMSTeamsUserSyncFeatureEnabledResult,
} from "./msdyn_IsMSTeamsUserSyncFeatureEnabledMessage.js";
export {
  msdyn_IsSharePointEnabledRequest,
  msdyn_IsSharePointEnabledResponse,
  type msdyn_IsSharePointEnabledResult,
} from "./msdyn_IsSharePointEnabledMessage.js";
export {
  msdyn_IsSSSEnabledRequest,
  msdyn_IsSSSEnabledResponse,
  type msdyn_IsSSSEnabledResult,
} from "./msdyn_IsSSSEnabledMessage.js";
export {
  msdyn_JoinLinkedChatConversationRequest,
  type msdyn_JoinLinkedChatConversationRequestParameters,
  msdyn_JoinLinkedChatConversationResponse,
} from "./msdyn_JoinLinkedChatConversationMessage.js";
export {
  msdyn_knowledgeHarvestAgentTriggerRequest,
  type msdyn_knowledgeHarvestAgentTriggerRequestParameters,
  msdyn_knowledgeHarvestAgentTriggerResponse,
} from "./msdyn_knowledgeHarvestAgentTriggerMessage.js";
export {
  msdyn_knowledgeHarvestAgentTriggerForMCPRequest,
  type msdyn_knowledgeHarvestAgentTriggerForMCPRequestParameters,
  msdyn_knowledgeHarvestAgentTriggerForMCPResponse,
  type msdyn_knowledgeHarvestAgentTriggerForMCPResult,
} from "./msdyn_knowledgeHarvestAgentTriggerForMCPMessage.js";
export {
  msdyn_knowledgeHarvestCreateArticleRequest,
  type msdyn_knowledgeHarvestCreateArticleRequestParameters,
  msdyn_knowledgeHarvestCreateArticleResponse,
  type msdyn_knowledgeHarvestCreateArticleResult,
} from "./msdyn_knowledgeHarvestCreateArticleMessage.js";
export {
  msdyn_KnowledgeHarvestFetchDataRequest,
  type msdyn_KnowledgeHarvestFetchDataRequestParameters,
  msdyn_KnowledgeHarvestFetchDataResponse,
  type msdyn_KnowledgeHarvestFetchDataResult,
} from "./msdyn_KnowledgeHarvestFetchDataMessage.js";
export {
  msdyn_LeadResearchCustomActionRequest,
  type msdyn_LeadResearchCustomActionRequestParameters,
  msdyn_LeadResearchCustomActionResponse,
  type msdyn_LeadResearchCustomActionResult,
} from "./msdyn_LeadResearchCustomActionMessage.js";
export {
  msdyn_LeadSqaResultUserActionRequest,
  type msdyn_LeadSqaResultUserActionRequestParameters,
  msdyn_LeadSqaResultUserActionResponse,
  type msdyn_LeadSqaResultUserActionResult,
} from "./msdyn_LeadSqaResultUserActionMessage.js";
export {
  msdyn_LoadCalendarsRequest,
  type msdyn_LoadCalendarsRequestParameters,
  msdyn_LoadCalendarsResponse,
  type msdyn_LoadCalendarsResult,
} from "./msdyn_LoadCalendarsMessage.js";
export {
  msdyn_LogCMAEventRequest,
  type msdyn_LogCMAEventRequestParameters,
  msdyn_LogCMAEventResponse,
  type msdyn_LogCMAEventResult,
} from "./msdyn_LogCMAEventMessage.js";
export {
  msdyn_LogPlatformSummaryInteractionRequest,
  type msdyn_LogPlatformSummaryInteractionRequestParameters,
  msdyn_LogPlatformSummaryInteractionResponse,
  type msdyn_LogPlatformSummaryInteractionResult,
} from "./msdyn_LogPlatformSummaryInteractionMessage.js";
export {
  msdyn_LookupCompetitorResearchCacheRequest,
  type msdyn_LookupCompetitorResearchCacheRequestParameters,
  msdyn_LookupCompetitorResearchCacheResponse,
  type msdyn_LookupCompetitorResearchCacheResult,
} from "./msdyn_LookupCompetitorResearchCacheMessage.js";
export {
  msdyn_ManageSLAInstancesRequest,
  type msdyn_ManageSLAInstancesRequestParameters,
  msdyn_ManageSLAInstancesResponse,
} from "./msdyn_ManageSLAInstancesMessage.js";
export {
  msdyn_MarketingListMetadataUpdateRequest,
  msdyn_MarketingListMetadataUpdateResponse,
  type msdyn_MarketingListMetadataUpdateResult,
} from "./msdyn_MarketingListMetadataUpdateMessage.js";
export {
  msdyn_MarketingMetadataUpdateRequest,
  msdyn_MarketingMetadataUpdateResponse,
  type msdyn_MarketingMetadataUpdateResult,
} from "./msdyn_MarketingMetadataUpdateMessage.js";
export {
  msdyn_MarketingMetadataUpdatePostImportRequest,
  msdyn_MarketingMetadataUpdatePostImportResponse,
  type msdyn_MarketingMetadataUpdatePostImportResult,
} from "./msdyn_MarketingMetadataUpdatePostImportMessage.js";
export {
  msdyn_markunmarkfavoritearticleRequest,
  type msdyn_markunmarkfavoritearticleRequestParameters,
  msdyn_markunmarkfavoritearticleResponse,
  type msdyn_markunmarkfavoritearticleResult,
} from "./msdyn_markunmarkfavoritearticleMessage.js";
export {
  msdyn_McMcbyValuesRequest,
  type msdyn_McMcbyValuesRequestParameters,
  msdyn_McMcbyValuesResponse,
  type msdyn_McMcbyValuesResult,
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
  type msdyn_MigrateArcResult,
} from "./msdyn_MigrateArcMessage.js";
export {
  msdyn_MigrateArcProactiveRunRequest,
  msdyn_MigrateArcProactiveRunResponse,
  type msdyn_MigrateArcProactiveRunResult,
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
  type msdyn_MigrateSlaResult,
} from "./msdyn_MigrateSlaMessage.js";
export {
  msdyn_MigrateSlaProactiveRunRequest,
  msdyn_MigrateSlaProactiveRunResponse,
  type msdyn_MigrateSlaProactiveRunResult,
} from "./msdyn_MigrateSlaProactiveRunMessage.js";
export {
  msdyn_MobileAppBuildRequest,
  type msdyn_MobileAppBuildRequestParameters,
  msdyn_MobileAppBuildResponse,
  type msdyn_MobileAppBuildResult,
} from "./msdyn_MobileAppBuildMessage.js";
export {
  msdyn_MobileAppBuildStatusRequest,
  type msdyn_MobileAppBuildStatusRequestParameters,
  msdyn_MobileAppBuildStatusResponse,
  type msdyn_MobileAppBuildStatusResult,
} from "./msdyn_MobileAppBuildStatusMessage.js";
export {
  msdyn_ModelAppDiagnosisRequest,
  type msdyn_ModelAppDiagnosisRequestParameters,
  msdyn_ModelAppDiagnosisResponse,
  type msdyn_ModelAppDiagnosisResult,
} from "./msdyn_ModelAppDiagnosisMessage.js";
export {
  msdyn_ModelAppRepairRequest,
  type msdyn_ModelAppRepairRequestParameters,
  msdyn_ModelAppRepairResponse,
  type msdyn_ModelAppRepairResult,
} from "./msdyn_ModelAppRepairMessage.js";
export {
  msdyn_ODOSMetadataCleanUpRequest,
  type msdyn_ODOSMetadataCleanUpRequestParameters,
  msdyn_ODOSMetadataCleanUpResponse,
} from "./msdyn_ODOSMetadataCleanUpMessage.js";
export {
  msdyn_OnClosureAgentClosedCaseRequest,
  type msdyn_OnClosureAgentClosedCaseRequestParameters,
  msdyn_OnClosureAgentClosedCaseResponse,
} from "./msdyn_OnClosureAgentClosedCaseMessage.js";
export {
  msdyn_OnClosureAgentDisengagedRequest,
  type msdyn_OnClosureAgentDisengagedRequestParameters,
  msdyn_OnClosureAgentDisengagedResponse,
} from "./msdyn_OnClosureAgentDisengagedMessage.js";
export {
  msdyn_OnNewActivityForARCRecordRequest,
  type msdyn_OnNewActivityForARCRecordRequestParameters,
  msdyn_OnNewActivityForARCRecordResponse,
} from "./msdyn_OnNewActivityForARCRecordMessage.js";
export {
  msdyn_OpportunityResearchResultUserActionRequest,
  type msdyn_OpportunityResearchResultUserActionRequestParameters,
  msdyn_OpportunityResearchResultUserActionResponse,
  type msdyn_OpportunityResearchResultUserActionResult,
} from "./msdyn_OpportunityResearchResultUserActionMessage.js";
export {
  msdyn_OptimizeCoordinatorTickRequest,
  type msdyn_OptimizeCoordinatorTickRequestParameters,
  msdyn_OptimizeCoordinatorTickResponse,
  type msdyn_OptimizeCoordinatorTickResult,
} from "./msdyn_OptimizeCoordinatorTickMessage.js";
export {
  msdyn_OSApplyPredictionRequest,
  type msdyn_OSApplyPredictionRequestParameters,
  msdyn_OSApplyPredictionResponse,
} from "./msdyn_OSApplyPredictionMessage.js";
export {
  msdyn_OSConvertToLocalizedFeaturesRequest,
  type msdyn_OSConvertToLocalizedFeaturesRequestParameters,
  msdyn_OSConvertToLocalizedFeaturesResponse,
  type msdyn_OSConvertToLocalizedFeaturesResult,
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
  type msdyn_OSGetAllOpportunityPredictionModelsResult,
} from "./msdyn_OSGetAllOpportunityPredictionModelsMessage.js";
export {
  msdyn_OSGetPredictionModelStatusRequest,
  type msdyn_OSGetPredictionModelStatusRequestParameters,
  msdyn_OSGetPredictionModelStatusResponse,
  type msdyn_OSGetPredictionModelStatusResult,
} from "./msdyn_OSGetPredictionModelStatusMessage.js";
export {
  msdyn_OSGetTrainingResultsRequest,
  type msdyn_OSGetTrainingResultsRequestParameters,
  msdyn_OSGetTrainingResultsResponse,
  type msdyn_OSGetTrainingResultsResult,
} from "./msdyn_OSGetTrainingResultsMessage.js";
export {
  msdyn_OSUpdateModelGradesRequest,
  type msdyn_OSUpdateModelGradesRequestParameters,
  msdyn_OSUpdateModelGradesResponse,
  type msdyn_OSUpdateModelGradesResult,
} from "./msdyn_OSUpdateModelGradesMessage.js";
export {
  msdyn_ParseKBResultRequest,
  type msdyn_ParseKBResultRequestParameters,
  msdyn_ParseKBResultResponse,
  type msdyn_ParseKBResultResult,
} from "./msdyn_ParseKBResultMessage.js";
export {
  msdyn_PerformChecksForEnrichRecordRequest,
  type msdyn_PerformChecksForEnrichRecordRequestParameters,
  msdyn_PerformChecksForEnrichRecordResponse,
  type msdyn_PerformChecksForEnrichRecordResult,
} from "./msdyn_PerformChecksForEnrichRecordMessage.js";
export {
  msdyn_PerformNotesAnalysisActionRequest,
  type msdyn_PerformNotesAnalysisActionRequestParameters,
  msdyn_PerformNotesAnalysisActionResponse,
  type msdyn_PerformNotesAnalysisActionResult,
} from "./msdyn_PerformNotesAnalysisActionMessage.js";
export {
  msdyn_PollCopilotAgentResponsesRequest,
  type msdyn_PollCopilotAgentResponsesRequestParameters,
  msdyn_PollCopilotAgentResponsesResponse,
  type msdyn_PollCopilotAgentResponsesResult,
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
  type msdyn_PostRetrieveRealTimeSuggestedActivitiesResult,
} from "./msdyn_PostRetrieveRealTimeSuggestedActivitiesMessage.js";
export {
  msdyn_PowerAutomateLoggerRequest,
  type msdyn_PowerAutomateLoggerRequestParameters,
  msdyn_PowerAutomateLoggerResponse,
  type msdyn_PowerAutomateLoggerResult,
} from "./msdyn_PowerAutomateLoggerMessage.js";
export {
  msdyn_PredictFieldsBasedOnRulesRequest,
  type msdyn_PredictFieldsBasedOnRulesRequestParameters,
  msdyn_PredictFieldsBasedOnRulesResponse,
  type msdyn_PredictFieldsBasedOnRulesResult,
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
  msdyn_PredictUserRequestedFieldsRequest,
  type msdyn_PredictUserRequestedFieldsRequestParameters,
  msdyn_PredictUserRequestedFieldsResponse,
  type msdyn_PredictUserRequestedFieldsResult,
} from "./msdyn_PredictUserRequestedFieldsMessage.js";
export {
  msdyn_ProcessDealInsightsBannerContentRequest,
  type msdyn_ProcessDealInsightsBannerContentRequestParameters,
  msdyn_ProcessDealInsightsBannerContentResponse,
  type msdyn_ProcessDealInsightsBannerContentResult,
} from "./msdyn_ProcessDealInsightsBannerContentMessage.js";
export {
  msdyn_ProcessInvokeCaseProcessingAgentRequestRequest,
  type msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters,
  msdyn_ProcessInvokeCaseProcessingAgentRequestResponse,
  type msdyn_ProcessInvokeCaseProcessingAgentRequestResult,
} from "./msdyn_ProcessInvokeCaseProcessingAgentRequestMessage.js";
export {
  msdyn_ProcessPostProposalFollowupRequest,
  type msdyn_ProcessPostProposalFollowupRequestParameters,
  msdyn_ProcessPostProposalFollowupResponse,
  type msdyn_ProcessPostProposalFollowupResult,
} from "./msdyn_ProcessPostProposalFollowupMessage.js";
export {
  msdyn_processsentimentresponseRequest,
  type msdyn_processsentimentresponseRequestParameters,
  msdyn_processsentimentresponseResponse,
  type msdyn_processsentimentresponseResult,
} from "./msdyn_processsentimentresponseMessage.js";
export {
  msdyn_ProductDeterminationActionRequest,
  type msdyn_ProductDeterminationActionRequestParameters,
  msdyn_ProductDeterminationActionResponse,
  type msdyn_ProductDeterminationActionResult,
} from "./msdyn_ProductDeterminationActionMessage.js";
export {
  msdyn_ProductDeterminationProvisioningActionRequest,
  type msdyn_ProductDeterminationProvisioningActionRequestParameters,
  msdyn_ProductDeterminationProvisioningActionResponse,
  type msdyn_ProductDeterminationProvisioningActionResult,
} from "./msdyn_ProductDeterminationProvisioningActionMessage.js";
export {
  msdyn_ProvisionAnalyticsRequest,
  msdyn_ProvisionAnalyticsResponse,
  type msdyn_ProvisionAnalyticsResult,
} from "./msdyn_ProvisionAnalyticsMessage.js";
export {
  msdyn_provisionCefInsightsRequest,
  type msdyn_provisionCefInsightsRequestParameters,
  msdyn_provisionCefInsightsResponse,
  type msdyn_provisionCefInsightsResult,
} from "./msdyn_provisionCefInsightsMessage.js";
export {
  msdyn_ProvisionODOSRequest,
  type msdyn_ProvisionODOSRequestParameters,
  msdyn_ProvisionODOSResponse,
} from "./msdyn_ProvisionODOSMessage.js";
export {
  msdyn_ProvisionSharePointDocumentLibrariesRequest,
  type msdyn_ProvisionSharePointDocumentLibrariesRequestParameters,
  msdyn_ProvisionSharePointDocumentLibrariesResponse,
  type msdyn_ProvisionSharePointDocumentLibrariesResult,
} from "./msdyn_ProvisionSharePointDocumentLibrariesMessage.js";
export {
  msdyn_publishCefInsightRequest,
  type msdyn_publishCefInsightRequestParameters,
  msdyn_publishCefInsightResponse,
  type msdyn_publishCefInsightResult,
} from "./msdyn_publishCefInsightMessage.js";
export {
  msdyn_publishScheduledRolloutRequest,
  type msdyn_publishScheduledRolloutRequestParameters,
  msdyn_publishScheduledRolloutResponse,
} from "./msdyn_publishScheduledRolloutMessage.js";
export {
  msdyn_PushActionDataToRecommendedActionAgentRequest,
  type msdyn_PushActionDataToRecommendedActionAgentRequestParameters,
  msdyn_PushActionDataToRecommendedActionAgentResponse,
} from "./msdyn_PushActionDataToRecommendedActionAgentMessage.js";
export {
  msdyn_QueryExchangeRequest,
  type msdyn_QueryExchangeRequestParameters,
  msdyn_QueryExchangeResponse,
  type msdyn_QueryExchangeResult,
} from "./msdyn_QueryExchangeMessage.js";
export {
  msdyn_QuickSetupCMARequest,
  type msdyn_QuickSetupCMARequestParameters,
  msdyn_QuickSetupCMAResponse,
  type msdyn_QuickSetupCMAResult,
} from "./msdyn_QuickSetupCMAMessage.js";
export {
  msdyn_RAAgent_GetRecommendationAgentConfigRequest,
  type msdyn_RAAgent_GetRecommendationAgentConfigRequestParameters,
  msdyn_RAAgent_GetRecommendationAgentConfigResponse,
  type msdyn_RAAgent_GetRecommendationAgentConfigResult,
} from "./msdyn_RAAgent_GetRecommendationAgentConfigMessage.js";
export {
  msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequest,
  type msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters,
  msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse,
  type msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResult,
} from "./msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIMessage.js";
export {
  msdyn_RAAgent_UpsertRecommendationAgentConfigRequest,
  type msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters,
  msdyn_RAAgent_UpsertRecommendationAgentConfigResponse,
  type msdyn_RAAgent_UpsertRecommendationAgentConfigResult,
} from "./msdyn_RAAgent_UpsertRecommendationAgentConfigMessage.js";
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
  type msdyn_RecommendedEmailTemplatesResult,
} from "./msdyn_RecommendedEmailTemplatesMessage.js";
export {
  msdyn_ReconcileAgentPrerequisitesRequest,
  type msdyn_ReconcileAgentPrerequisitesRequestParameters,
  msdyn_ReconcileAgentPrerequisitesResponse,
  type msdyn_ReconcileAgentPrerequisitesResult,
} from "./msdyn_ReconcileAgentPrerequisitesMessage.js";
export {
  msdyn_RecordEmailUsageRequest,
  type msdyn_RecordEmailUsageRequestParameters,
  msdyn_RecordEmailUsageResponse,
  type msdyn_RecordEmailUsageResult,
} from "./msdyn_RecordEmailUsageMessage.js";
export {
  msdyn_RecoverOptimizeLeasesRequest,
  type msdyn_RecoverOptimizeLeasesRequestParameters,
  msdyn_RecoverOptimizeLeasesResponse,
  type msdyn_RecoverOptimizeLeasesResult,
} from "./msdyn_RecoverOptimizeLeasesMessage.js";
export {
  msdyn_recurringsegmentactionRequest,
  type msdyn_recurringsegmentactionRequestParameters,
  msdyn_recurringsegmentactionResponse,
  type msdyn_recurringsegmentactionResult,
} from "./msdyn_recurringsegmentactionMessage.js";
export {
  msdyn_RegisterSolutionHealthRuleRequest,
  type msdyn_RegisterSolutionHealthRuleRequestParameters,
  msdyn_RegisterSolutionHealthRuleResponse,
  type msdyn_RegisterSolutionHealthRuleResult,
} from "./msdyn_RegisterSolutionHealthRuleMessage.js";
export {
  msdyn_ResolveEmailClassificationScopedCategoriesRequest,
  type msdyn_ResolveEmailClassificationScopedCategoriesRequestParameters,
  msdyn_ResolveEmailClassificationScopedCategoriesResponse,
  type msdyn_ResolveEmailClassificationScopedCategoriesResult,
} from "./msdyn_ResolveEmailClassificationScopedCategoriesMessage.js";
export {
  msdyn_ResolveSolutionHealthRuleFailureRequest,
  type msdyn_ResolveSolutionHealthRuleFailureRequestParameters,
  msdyn_ResolveSolutionHealthRuleFailureResponse,
} from "./msdyn_ResolveSolutionHealthRuleFailureMessage.js";
export {
  msdyn_RetrieveActivitiesRequest,
  type msdyn_RetrieveActivitiesRequestParameters,
  msdyn_RetrieveActivitiesResponse,
  type msdyn_RetrieveActivitiesResult,
} from "./msdyn_RetrieveActivitiesMessage.js";
export {
  msdyn_RetrieveActivityAnalyticsConfigurationRequest,
  type msdyn_RetrieveActivityAnalyticsConfigurationRequestParameters,
  msdyn_RetrieveActivityAnalyticsConfigurationResponse,
  type msdyn_RetrieveActivityAnalyticsConfigurationResult,
} from "./msdyn_RetrieveActivityAnalyticsConfigurationMessage.js";
export {
  msdyn_RetrieveCadenceSuggestionsRequest,
  type msdyn_RetrieveCadenceSuggestionsRequestParameters,
  msdyn_RetrieveCadenceSuggestionsResponse,
  type msdyn_RetrieveCadenceSuggestionsResult,
} from "./msdyn_RetrieveCadenceSuggestionsMessage.js";
export {
  msdyn_retrieveConnectionsRequest,
  type msdyn_retrieveConnectionsRequestParameters,
  msdyn_retrieveConnectionsResponse,
  type msdyn_retrieveConnectionsResult,
} from "./msdyn_retrieveConnectionsMessage.js";
export {
  msdyn_RetrieveEmailNBARequest,
  type msdyn_RetrieveEmailNBARequestParameters,
  msdyn_RetrieveEmailNBAResponse,
  type msdyn_RetrieveEmailNBAResult,
} from "./msdyn_RetrieveEmailNBAMessage.js";
export {
  msdyn_RetrieveEnvironmentVariableValueForCSRequest,
  type msdyn_RetrieveEnvironmentVariableValueForCSRequestParameters,
  msdyn_RetrieveEnvironmentVariableValueForCSResponse,
  type msdyn_RetrieveEnvironmentVariableValueForCSResult,
} from "./msdyn_RetrieveEnvironmentVariableValueForCSMessage.js";
export {
  msdyn_RetrieveKnowledgeManagementSettingsRequest,
  type msdyn_RetrieveKnowledgeManagementSettingsRequestParameters,
  msdyn_RetrieveKnowledgeManagementSettingsResponse,
  type msdyn_RetrieveKnowledgeManagementSettingsResult,
} from "./msdyn_RetrieveKnowledgeManagementSettingsMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchFiltersRequest,
  type msdyn_RetrieveKnowledgeSearchFiltersRequestParameters,
  msdyn_RetrieveKnowledgeSearchFiltersResponse,
  type msdyn_RetrieveKnowledgeSearchFiltersResult,
} from "./msdyn_RetrieveKnowledgeSearchFiltersMessage.js";
export {
  msdyn_RetrieveKnowledgeSearchModifiersRequest,
  type msdyn_RetrieveKnowledgeSearchModifiersRequestParameters,
  msdyn_RetrieveKnowledgeSearchModifiersResponse,
  type msdyn_RetrieveKnowledgeSearchModifiersResult,
} from "./msdyn_RetrieveKnowledgeSearchModifiersMessage.js";
export {
  msdyn_RetrieveKnowledgeSuggestionsRequest,
  type msdyn_RetrieveKnowledgeSuggestionsRequestParameters,
  msdyn_RetrieveKnowledgeSuggestionsResponse,
  type msdyn_RetrieveKnowledgeSuggestionsResult,
} from "./msdyn_RetrieveKnowledgeSuggestionsMessage.js";
export {
  msdyn_RetrieveKpiItemRecordRequest,
  type msdyn_RetrieveKpiItemRecordRequestParameters,
  msdyn_RetrieveKpiItemRecordResponse,
  type msdyn_RetrieveKpiItemRecordResult,
} from "./msdyn_RetrieveKpiItemRecordMessage.js";
export {
  msdyn_RetrieveKPIValuesForGDPRRequest,
  type msdyn_RetrieveKPIValuesForGDPRRequestParameters,
  msdyn_RetrieveKPIValuesForGDPRResponse,
  type msdyn_RetrieveKPIValuesForGDPRResult,
} from "./msdyn_RetrieveKPIValuesForGDPRMessage.js";
export {
  msdyn_RetrieveKPIvaluesfromDCIRequest,
  type msdyn_RetrieveKPIvaluesfromDCIRequestParameters,
  msdyn_RetrieveKPIvaluesfromDCIResponse,
  type msdyn_RetrieveKPIvaluesfromDCIResult,
} from "./msdyn_RetrieveKPIvaluesfromDCIMessage.js";
export {
  msdyn_RetrieveKpiValuesFromRIRequest,
  type msdyn_RetrieveKpiValuesFromRIRequestParameters,
  msdyn_RetrieveKpiValuesFromRIResponse,
  type msdyn_RetrieveKpiValuesFromRIResult,
} from "./msdyn_RetrieveKpiValuesFromRIMessage.js";
export {
  msdyn_RetrieveOptimizeEntityPayloadRequest,
  type msdyn_RetrieveOptimizeEntityPayloadRequestParameters,
  msdyn_RetrieveOptimizeEntityPayloadResponse,
  type msdyn_RetrieveOptimizeEntityPayloadResult,
} from "./msdyn_RetrieveOptimizeEntityPayloadMessage.js";
export {
  msdyn_RetrieveOptimizeSnapshotRequest,
  type msdyn_RetrieveOptimizeSnapshotRequestParameters,
  msdyn_RetrieveOptimizeSnapshotResponse,
  type msdyn_RetrieveOptimizeSnapshotResult,
} from "./msdyn_RetrieveOptimizeSnapshotMessage.js";
export {
  msdyn_RetrieveOptimizeWorkItemPayloadRequest,
  type msdyn_RetrieveOptimizeWorkItemPayloadRequestParameters,
  msdyn_RetrieveOptimizeWorkItemPayloadResponse,
  type msdyn_RetrieveOptimizeWorkItemPayloadResult,
} from "./msdyn_RetrieveOptimizeWorkItemPayloadMessage.js";
export {
  msdyn_RetrievePersonalizationFiltersRequest,
  type msdyn_RetrievePersonalizationFiltersRequestParameters,
  msdyn_RetrievePersonalizationFiltersResponse,
  type msdyn_RetrievePersonalizationFiltersResult,
} from "./msdyn_RetrievePersonalizationFiltersMessage.js";
export {
  msdyn_RetrievePlatformCopilotSettingsRequest,
  msdyn_RetrievePlatformCopilotSettingsResponse,
  type msdyn_RetrievePlatformCopilotSettingsResult,
} from "./msdyn_RetrievePlatformCopilotSettingsMessage.js";
export {
  msdyn_RetrieveRelationshipActivityKPIValuesRequest,
  type msdyn_RetrieveRelationshipActivityKPIValuesRequestParameters,
  msdyn_RetrieveRelationshipActivityKPIValuesResponse,
  type msdyn_RetrieveRelationshipActivityKPIValuesResult,
} from "./msdyn_RetrieveRelationshipActivityKPIValuesMessage.js";
export {
  msdyn_RetrieveSearchProvidersRequest,
  type msdyn_RetrieveSearchProvidersRequestParameters,
  msdyn_RetrieveSearchProvidersResponse,
  type msdyn_RetrieveSearchProvidersResult,
} from "./msdyn_RetrieveSearchProvidersMessage.js";
export {
  msdyn_RetrieveSuggestionPayloadsRequest,
  type msdyn_RetrieveSuggestionPayloadsRequestParameters,
  msdyn_RetrieveSuggestionPayloadsResponse,
  type msdyn_RetrieveSuggestionPayloadsResult,
} from "./msdyn_RetrieveSuggestionPayloadsMessage.js";
export {
  msdyn_RetrieveTypeValuesFromDCIRequest,
  type msdyn_RetrieveTypeValuesFromDCIRequestParameters,
  msdyn_RetrieveTypeValuesFromDCIResponse,
  type msdyn_RetrieveTypeValuesFromDCIResult,
} from "./msdyn_RetrieveTypeValuesFromDCIMessage.js";
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
  type msdyn_SalesAccountCatchupResult,
} from "./msdyn_SalesAccountCatchupMessage.js";
export {
  msdyn_SalesAccountSummaryRequest,
  type msdyn_SalesAccountSummaryRequestParameters,
  msdyn_SalesAccountSummaryResponse,
  type msdyn_SalesAccountSummaryResult,
} from "./msdyn_SalesAccountSummaryMessage.js";
export {
  msdyn_SalesAdaptiveCardResponseRequest,
  type msdyn_SalesAdaptiveCardResponseRequestParameters,
  msdyn_SalesAdaptiveCardResponseResponse,
  type msdyn_SalesAdaptiveCardResponseResult,
} from "./msdyn_SalesAdaptiveCardResponseMessage.js";
export {
  msdyn_SalesAgent_EnableAgentMailBoxRequest,
  type msdyn_SalesAgent_EnableAgentMailBoxRequestParameters,
  msdyn_SalesAgent_EnableAgentMailBoxResponse,
  type msdyn_SalesAgent_EnableAgentMailBoxResult,
} from "./msdyn_SalesAgent_EnableAgentMailBoxMessage.js";
export {
  msdyn_SalesAgent_GetAgentUserRequest,
  type msdyn_SalesAgent_GetAgentUserRequestParameters,
  msdyn_SalesAgent_GetAgentUserResponse,
  type msdyn_SalesAgent_GetAgentUserResult,
} from "./msdyn_SalesAgent_GetAgentUserMessage.js";
export {
  msdyn_SalesAgent_RetrieveAgentProfilesRequest,
  type msdyn_SalesAgent_RetrieveAgentProfilesRequestParameters,
  msdyn_SalesAgent_RetrieveAgentProfilesResponse,
  type msdyn_SalesAgent_RetrieveAgentProfilesResult,
} from "./msdyn_SalesAgent_RetrieveAgentProfilesMessage.js";
export {
  msdyn_SalesAgent_RetrieveConfigurationRequest,
  type msdyn_SalesAgent_RetrieveConfigurationRequestParameters,
  msdyn_SalesAgent_RetrieveConfigurationResponse,
  type msdyn_SalesAgent_RetrieveConfigurationResult,
} from "./msdyn_SalesAgent_RetrieveConfigurationMessage.js";
export {
  msdyn_SalesAgent_UpdateConfigurationRequest,
  type msdyn_SalesAgent_UpdateConfigurationRequestParameters,
  msdyn_SalesAgent_UpdateConfigurationResponse,
  type msdyn_SalesAgent_UpdateConfigurationResult,
} from "./msdyn_SalesAgent_UpdateConfigurationMessage.js";
export {
  msdyn_SalesAgents_ActivateAgentWorkflowsRequest,
  type msdyn_SalesAgents_ActivateAgentWorkflowsRequestParameters,
  msdyn_SalesAgents_ActivateAgentWorkflowsResponse,
  type msdyn_SalesAgents_ActivateAgentWorkflowsResult,
} from "./msdyn_SalesAgents_ActivateAgentWorkflowsMessage.js";
export {
  msdyn_SalesAgents_ActivateMicroAgentConfigurationRequest,
  type msdyn_SalesAgents_ActivateMicroAgentConfigurationRequestParameters,
  msdyn_SalesAgents_ActivateMicroAgentConfigurationResponse,
  type msdyn_SalesAgents_ActivateMicroAgentConfigurationResult,
} from "./msdyn_SalesAgents_ActivateMicroAgentConfigurationMessage.js";
export {
  msdyn_SalesAgents_ActivateSalesAgentProfileRequest,
  type msdyn_SalesAgents_ActivateSalesAgentProfileRequestParameters,
  msdyn_SalesAgents_ActivateSalesAgentProfileResponse,
  type msdyn_SalesAgents_ActivateSalesAgentProfileResult,
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
  type msdyn_SalesAgents_CreateDefaultTemplateInSharepointResult,
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
  type msdyn_SalesAgents_CreateSARRecordsResult,
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
  type msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksResult,
} from "./msdyn_SalesAgents_ExecuteEngageAndReadinessAgentPrerunChecksMessage.js";
export {
  msdyn_SalesAgents_ExtractAutoReplyInfoRequest,
  type msdyn_SalesAgents_ExtractAutoReplyInfoRequestParameters,
  msdyn_SalesAgents_ExtractAutoReplyInfoResponse,
  type msdyn_SalesAgents_ExtractAutoReplyInfoResult,
} from "./msdyn_SalesAgents_ExtractAutoReplyInfoMessage.js";
export {
  msdyn_SalesAgents_FetchOutreachEmailForAgentRequest,
  type msdyn_SalesAgents_FetchOutreachEmailForAgentRequestParameters,
  msdyn_SalesAgents_FetchOutreachEmailForAgentResponse,
  type msdyn_SalesAgents_FetchOutreachEmailForAgentResult,
} from "./msdyn_SalesAgents_FetchOutreachEmailForAgentMessage.js";
export {
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResponse,
  type msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingResult,
} from "./msdyn_SalesAgents_FetchReadyRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchRecordsForAgentProcessingResponse,
  type msdyn_SalesAgents_FetchRecordsForAgentProcessingResult,
} from "./msdyn_SalesAgents_FetchRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResponse,
  type msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingResult,
} from "./msdyn_SalesAgents_FetchRefreshRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequest,
  type msdyn_SalesAgents_FetchSARRecordsForAgentProcessingRequestParameters,
  msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResponse,
  type msdyn_SalesAgents_FetchSARRecordsForAgentProcessingResult,
} from "./msdyn_SalesAgents_FetchSARRecordsForAgentProcessingMessage.js";
export {
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequest,
  type msdyn_SalesAgents_GetAgentStatusAndGenAIConsentRequestParameters,
  msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResponse,
  type msdyn_SalesAgents_GetAgentStatusAndGenAIConsentResult,
} from "./msdyn_SalesAgents_GetAgentStatusAndGenAIConsentMessage.js";
export {
  msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequest,
  type msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequestParameters,
  msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse,
  type msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResult,
} from "./msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoMessage.js";
export {
  msdyn_SalesAgents_GetEngageAgentInputPayloadRequest,
  type msdyn_SalesAgents_GetEngageAgentInputPayloadRequestParameters,
  msdyn_SalesAgents_GetEngageAgentInputPayloadResponse,
  type msdyn_SalesAgents_GetEngageAgentInputPayloadResult,
} from "./msdyn_SalesAgents_GetEngageAgentInputPayloadMessage.js";
export {
  msdyn_SalesAgents_GetExecutionConfigPropertyRequest,
  type msdyn_SalesAgents_GetExecutionConfigPropertyRequestParameters,
  msdyn_SalesAgents_GetExecutionConfigPropertyResponse,
  type msdyn_SalesAgents_GetExecutionConfigPropertyResult,
} from "./msdyn_SalesAgents_GetExecutionConfigPropertyMessage.js";
export {
  msdyn_SalesAgents_GetHandoverDetailsRequest,
  type msdyn_SalesAgents_GetHandoverDetailsRequestParameters,
  msdyn_SalesAgents_GetHandoverDetailsResponse,
  type msdyn_SalesAgents_GetHandoverDetailsResult,
} from "./msdyn_SalesAgents_GetHandoverDetailsMessage.js";
export {
  msdyn_SalesAgents_GetM365ConsentRequest,
  msdyn_SalesAgents_GetM365ConsentResponse,
  type msdyn_SalesAgents_GetM365ConsentResult,
} from "./msdyn_SalesAgents_GetM365ConsentMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentActivationDetailsRequest,
  type msdyn_SalesAgents_GetMicroAgentActivationDetailsRequestParameters,
  msdyn_SalesAgents_GetMicroAgentActivationDetailsResponse,
  type msdyn_SalesAgents_GetMicroAgentActivationDetailsResult,
} from "./msdyn_SalesAgents_GetMicroAgentActivationDetailsMessage.js";
export {
  msdyn_SalesAgents_GetMicroAgentsConfigurationRequest,
  type msdyn_SalesAgents_GetMicroAgentsConfigurationRequestParameters,
  msdyn_SalesAgents_GetMicroAgentsConfigurationResponse,
  type msdyn_SalesAgents_GetMicroAgentsConfigurationResult,
} from "./msdyn_SalesAgents_GetMicroAgentsConfigurationMessage.js";
export {
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequest,
  type msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsRequestParameters,
  msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResponse,
  type msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsResult,
} from "./msdyn_SalesAgents_GetOutreachSalesAgentRunRecordsMessage.js";
export {
  msdyn_SalesAgents_GetRefreshFrequencyRequest,
  type msdyn_SalesAgents_GetRefreshFrequencyRequestParameters,
  msdyn_SalesAgents_GetRefreshFrequencyResponse,
  type msdyn_SalesAgents_GetRefreshFrequencyResult,
} from "./msdyn_SalesAgents_GetRefreshFrequencyMessage.js";
export {
  msdyn_SalesAgents_GetSalesAgentProcessingStateRequest,
  type msdyn_SalesAgents_GetSalesAgentProcessingStateRequestParameters,
  msdyn_SalesAgents_GetSalesAgentProcessingStateResponse,
  type msdyn_SalesAgents_GetSalesAgentProcessingStateResult,
} from "./msdyn_SalesAgents_GetSalesAgentProcessingStateMessage.js";
export {
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsRequest,
  msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResponse,
  type msdyn_SalesAgents_GetSalesAgentsFeatureSettingsResult,
} from "./msdyn_SalesAgents_GetSalesAgentsFeatureSettingsMessage.js";
export {
  msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequest,
  type msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsRequestParameters,
  msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResponse,
  type msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsResult,
} from "./msdyn_SalesAgents_GetSalesProfilerSalesAgentRunRecordsMessage.js";
export {
  msdyn_SalesAgents_GetSuggestedContactsRequest,
  type msdyn_SalesAgents_GetSuggestedContactsRequestParameters,
  msdyn_SalesAgents_GetSuggestedContactsResponse,
  type msdyn_SalesAgents_GetSuggestedContactsResult,
} from "./msdyn_SalesAgents_GetSuggestedContactsMessage.js";
export {
  msdyn_SalesAgents_HandoverInitiateRequest,
  type msdyn_SalesAgents_HandoverInitiateRequestParameters,
  msdyn_SalesAgents_HandoverInitiateResponse,
  type msdyn_SalesAgents_HandoverInitiateResult,
} from "./msdyn_SalesAgents_HandoverInitiateMessage.js";
export {
  msdyn_SalesAgents_HandoverNotifySingleRequest,
  type msdyn_SalesAgents_HandoverNotifySingleRequestParameters,
  msdyn_SalesAgents_HandoverNotifySingleResponse,
  type msdyn_SalesAgents_HandoverNotifySingleResult,
} from "./msdyn_SalesAgents_HandoverNotifySingleMessage.js";
export {
  msdyn_SalesAgents_IsOrchestrationCompleteRequest,
  type msdyn_SalesAgents_IsOrchestrationCompleteRequestParameters,
  msdyn_SalesAgents_IsOrchestrationCompleteResponse,
  type msdyn_SalesAgents_IsOrchestrationCompleteResult,
} from "./msdyn_SalesAgents_IsOrchestrationCompleteMessage.js";
export {
  msdyn_SalesAgents_IsOwnerAssignedRequest,
  type msdyn_SalesAgents_IsOwnerAssignedRequestParameters,
  msdyn_SalesAgents_IsOwnerAssignedResponse,
  type msdyn_SalesAgents_IsOwnerAssignedResult,
} from "./msdyn_SalesAgents_IsOwnerAssignedMessage.js";
export {
  msdyn_SalesAgents_IsTenantAdminRequest,
  msdyn_SalesAgents_IsTenantAdminResponse,
  type msdyn_SalesAgents_IsTenantAdminResult,
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
  type msdyn_SalesAgents_LogMicroagentFlowDataResult,
} from "./msdyn_SalesAgents_LogMicroagentFlowDataMessage.js";
export {
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequest,
  type msdyn_SalesAgents_NotifyReactivatedEntityOwnerRequestParameters,
  msdyn_SalesAgents_NotifyReactivatedEntityOwnerResponse,
  type msdyn_SalesAgents_NotifyReactivatedEntityOwnerResult,
} from "./msdyn_SalesAgents_NotifyReactivatedEntityOwnerMessage.js";
export {
  msdyn_SalesAgents_PrepareSalesProfilerPayloadRequest,
  type msdyn_SalesAgents_PrepareSalesProfilerPayloadRequestParameters,
  msdyn_SalesAgents_PrepareSalesProfilerPayloadResponse,
  type msdyn_SalesAgents_PrepareSalesProfilerPayloadResult,
} from "./msdyn_SalesAgents_PrepareSalesProfilerPayloadMessage.js";
export {
  msdyn_SalesAgents_ProcessEngageAgentResponseRequest,
  type msdyn_SalesAgents_ProcessEngageAgentResponseRequestParameters,
  msdyn_SalesAgents_ProcessEngageAgentResponseResponse,
  type msdyn_SalesAgents_ProcessEngageAgentResponseResult,
} from "./msdyn_SalesAgents_ProcessEngageAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProcessOutreachAgentResponseRequest,
  type msdyn_SalesAgents_ProcessOutreachAgentResponseRequestParameters,
  msdyn_SalesAgents_ProcessOutreachAgentResponseResponse,
  type msdyn_SalesAgents_ProcessOutreachAgentResponseResult,
} from "./msdyn_SalesAgents_ProcessOutreachAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequest,
  type msdyn_SalesAgents_ProcessSalesProfilerAgentResponseRequestParameters,
  msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResponse,
  type msdyn_SalesAgents_ProcessSalesProfilerAgentResponseResult,
} from "./msdyn_SalesAgents_ProcessSalesProfilerAgentResponseMessage.js";
export {
  msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Request,
  type msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2RequestParameters,
  msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Response,
  type msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Result,
} from "./msdyn_SalesAgents_ProcessSalesProfilerAgentResponseV2Message.js";
export {
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIRequest,
  msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse,
  type msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResult,
} from "./msdyn_SalesAgents_ProvideConsentAndM365SetupAPIMessage.js";
export {
  msdyn_SalesAgents_ReEngageEntityRequest,
  type msdyn_SalesAgents_ReEngageEntityRequestParameters,
  msdyn_SalesAgents_ReEngageEntityResponse,
} from "./msdyn_SalesAgents_ReEngageEntityMessage.js";
export {
  msdyn_SalesAgents_RevokeSellerM365ConsentRequest,
  msdyn_SalesAgents_RevokeSellerM365ConsentResponse,
  type msdyn_SalesAgents_RevokeSellerM365ConsentResult,
} from "./msdyn_SalesAgents_RevokeSellerM365ConsentMessage.js";
export {
  msdyn_SalesAgents_RunAgentEvalsRequest,
  type msdyn_SalesAgents_RunAgentEvalsRequestParameters,
  msdyn_SalesAgents_RunAgentEvalsResponse,
  type msdyn_SalesAgents_RunAgentEvalsResult,
} from "./msdyn_SalesAgents_RunAgentEvalsMessage.js";
export {
  msdyn_SalesAgents_SendEmailReplyRequest,
  type msdyn_SalesAgents_SendEmailReplyRequestParameters,
  msdyn_SalesAgents_SendEmailReplyResponse,
  type msdyn_SalesAgents_SendEmailReplyResult,
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
  type msdyn_SalesAgents_ShouldRunAgentOrchestrationResult,
} from "./msdyn_SalesAgents_ShouldRunAgentOrchestrationMessage.js";
export {
  msdyn_SalesAgents_TriggerOutreachAgentRequest,
  type msdyn_SalesAgents_TriggerOutreachAgentRequestParameters,
  msdyn_SalesAgents_TriggerOutreachAgentResponse,
  type msdyn_SalesAgents_TriggerOutreachAgentResult,
} from "./msdyn_SalesAgents_TriggerOutreachAgentMessage.js";
export {
  msdyn_SalesAgents_UpdateContactProfilerDetailRequest,
  type msdyn_SalesAgents_UpdateContactProfilerDetailRequestParameters,
  msdyn_SalesAgents_UpdateContactProfilerDetailResponse,
  type msdyn_SalesAgents_UpdateContactProfilerDetailResult,
} from "./msdyn_SalesAgents_UpdateContactProfilerDetailMessage.js";
export {
  msdyn_SalesAgents_UpsertAgentProcessingStateRequest,
  type msdyn_SalesAgents_UpsertAgentProcessingStateRequestParameters,
  msdyn_SalesAgents_UpsertAgentProcessingStateResponse,
} from "./msdyn_SalesAgents_UpsertAgentProcessingStateMessage.js";
export {
  msdyn_SalesAgents_ValidateContactabilityRequest,
  type msdyn_SalesAgents_ValidateContactabilityRequestParameters,
  msdyn_SalesAgents_ValidateContactabilityResponse,
  type msdyn_SalesAgents_ValidateContactabilityResult,
} from "./msdyn_SalesAgents_ValidateContactabilityMessage.js";
export {
  msdyn_SalesAnswerFromDocumentsRequest,
  type msdyn_SalesAnswerFromDocumentsRequestParameters,
  msdyn_SalesAnswerFromDocumentsResponse,
  type msdyn_SalesAnswerFromDocumentsResult,
} from "./msdyn_SalesAnswerFromDocumentsMessage.js";
export {
  msdyn_SalesCopilotM365SkillInfraSetupRequest,
  type msdyn_SalesCopilotM365SkillInfraSetupRequestParameters,
  msdyn_SalesCopilotM365SkillInfraSetupResponse,
  type msdyn_SalesCopilotM365SkillInfraSetupResult,
} from "./msdyn_SalesCopilotM365SkillInfraSetupMessage.js";
export {
  msdyn_SalesCopilotNBASkillInfraSetupRequest,
  type msdyn_SalesCopilotNBASkillInfraSetupRequestParameters,
  msdyn_SalesCopilotNBASkillInfraSetupResponse,
  type msdyn_SalesCopilotNBASkillInfraSetupResult,
} from "./msdyn_SalesCopilotNBASkillInfraSetupMessage.js";
export {
  msdyn_SalesDataQualityAgent_ActivateRequest,
  type msdyn_SalesDataQualityAgent_ActivateRequestParameters,
  msdyn_SalesDataQualityAgent_ActivateResponse,
  type msdyn_SalesDataQualityAgent_ActivateResult,
} from "./msdyn_SalesDataQualityAgent_ActivateMessage.js";
export {
  msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequest,
  type msdyn_SalesDataQualityAgent_ExecuteFieldPredictionRequestParameters,
  msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResponse,
  type msdyn_SalesDataQualityAgent_ExecuteFieldPredictionResult,
} from "./msdyn_SalesDataQualityAgent_ExecuteFieldPredictionMessage.js";
export {
  msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequest,
  type msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters,
  msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse,
  type msdyn_SalesDataQualityAgent_ExecutePostActivationActionResult,
} from "./msdyn_SalesDataQualityAgent_ExecutePostActivationActionMessage.js";
export {
  msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequest,
  type msdyn_SalesDataQualityAgent_ExecutePreActivationActionRequestParameters,
  msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse,
  type msdyn_SalesDataQualityAgent_ExecutePreActivationActionResult,
} from "./msdyn_SalesDataQualityAgent_ExecutePreActivationActionMessage.js";
export {
  msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequest,
  type msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequestParameters,
  msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse,
  type msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResult,
} from "./msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsMessage.js";
export {
  msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequest,
  type msdyn_SalesDataQualityAgent_GetFieldPredictionContextRequestParameters,
  msdyn_SalesDataQualityAgent_GetFieldPredictionContextResponse,
  type msdyn_SalesDataQualityAgent_GetFieldPredictionContextResult,
} from "./msdyn_SalesDataQualityAgent_GetFieldPredictionContextMessage.js";
export {
  msdyn_SalesDataQualityAgent_ProcessRCSInputRequest,
  type msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters,
  msdyn_SalesDataQualityAgent_ProcessRCSInputResponse,
  type msdyn_SalesDataQualityAgent_ProcessRCSInputResult,
} from "./msdyn_SalesDataQualityAgent_ProcessRCSInputMessage.js";
export {
  msdyn_SalesDataQualityAgent_ReassignEnrichmentRequest,
  type msdyn_SalesDataQualityAgent_ReassignEnrichmentRequestParameters,
  msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse,
  type msdyn_SalesDataQualityAgent_ReassignEnrichmentResult,
} from "./msdyn_SalesDataQualityAgent_ReassignEnrichmentMessage.js";
export {
  msdyn_SalesDataQualityAgent_SaveAgentResponseRequest,
  type msdyn_SalesDataQualityAgent_SaveAgentResponseRequestParameters,
  msdyn_SalesDataQualityAgent_SaveAgentResponseResponse,
  type msdyn_SalesDataQualityAgent_SaveAgentResponseResult,
} from "./msdyn_SalesDataQualityAgent_SaveAgentResponseMessage.js";
export {
  msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequest,
  type msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequestParameters,
  msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse,
  type msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResult,
} from "./msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSMessage.js";
export {
  msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequest,
  type msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequestParameters,
  msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse,
  type msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResult,
} from "./msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionMessage.js";
export {
  msdyn_SalesExternalServiceInvokeRequest,
  type msdyn_SalesExternalServiceInvokeRequestParameters,
  msdyn_SalesExternalServiceInvokeResponse,
  type msdyn_SalesExternalServiceInvokeResult,
} from "./msdyn_SalesExternalServiceInvokeMessage.js";
export {
  msdyn_SalesInsightsGetEuclidConsentStatusRequest,
  type msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters,
  msdyn_SalesInsightsGetEuclidConsentStatusResponse,
  type msdyn_SalesInsightsGetEuclidConsentStatusResult,
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
  type msdyn_SalesLeadCatchupResult,
} from "./msdyn_SalesLeadCatchupMessage.js";
export {
  msdyn_SalesLeadSummaryRequest,
  type msdyn_SalesLeadSummaryRequestParameters,
  msdyn_SalesLeadSummaryResponse,
  type msdyn_SalesLeadSummaryResult,
} from "./msdyn_SalesLeadSummaryMessage.js";
export {
  msdyn_SalesMeetingPreparationRequest,
  type msdyn_SalesMeetingPreparationRequestParameters,
  msdyn_SalesMeetingPreparationResponse,
  type msdyn_SalesMeetingPreparationResult,
} from "./msdyn_SalesMeetingPreparationMessage.js";
export {
  msdyn_SalesOpportunityCatchupRequest,
  type msdyn_SalesOpportunityCatchupRequestParameters,
  msdyn_SalesOpportunityCatchupResponse,
  type msdyn_SalesOpportunityCatchupResult,
} from "./msdyn_SalesOpportunityCatchupMessage.js";
export {
  msdyn_SalesOpportunitySummaryRequest,
  type msdyn_SalesOpportunitySummaryRequestParameters,
  msdyn_SalesOpportunitySummaryResponse,
  type msdyn_SalesOpportunitySummaryResult,
} from "./msdyn_SalesOpportunitySummaryMessage.js";
export {
  msdyn_SalesOutlookMeetingPreparationRequest,
  type msdyn_SalesOutlookMeetingPreparationRequestParameters,
  msdyn_SalesOutlookMeetingPreparationResponse,
  type msdyn_SalesOutlookMeetingPreparationResult,
} from "./msdyn_SalesOutlookMeetingPreparationMessage.js";
export {
  msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequest,
  type msdyn_SalesQualification_AddMCSOnlineEvalDefinitionRequestParameters,
  msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResponse,
  type msdyn_SalesQualification_AddMCSOnlineEvalDefinitionResult,
} from "./msdyn_SalesQualification_AddMCSOnlineEvalDefinitionMessage.js";
export {
  msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequest,
  type msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionRequestParameters,
  msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResponse,
  type msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionResult,
} from "./msdyn_SalesQualification_DeleteMCSOnlineEvalDefinitionMessage.js";
export {
  msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequest,
  type msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsRequestParameters,
  msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResponse,
  type msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsResult,
} from "./msdyn_SalesQualification_GetMCSOnlineEvalDefinitionsMessage.js";
export {
  msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequest,
  type msdyn_SalesQualification_GetMCSOnlineEvalSummaryRequestParameters,
  msdyn_SalesQualification_GetMCSOnlineEvalSummaryResponse,
  type msdyn_SalesQualification_GetMCSOnlineEvalSummaryResult,
} from "./msdyn_SalesQualification_GetMCSOnlineEvalSummaryMessage.js";
export {
  msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsRequest,
  msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse,
  type msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResult,
} from "./msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsMessage.js";
export {
  msdyn_SalesRoutingIdentifyAttributesRequest,
  msdyn_SalesRoutingIdentifyAttributesResponse,
  type msdyn_SalesRoutingIdentifyAttributesResult,
} from "./msdyn_SalesRoutingIdentifyAttributesMessage.js";
export {
  msdyn_SaveAgentContentCustomActionRequest,
  type msdyn_SaveAgentContentCustomActionRequestParameters,
  msdyn_SaveAgentContentCustomActionResponse,
  type msdyn_SaveAgentContentCustomActionResult,
} from "./msdyn_SaveAgentContentCustomActionMessage.js";
export {
  msdyn_SaveCalendarRequest,
  type msdyn_SaveCalendarRequestParameters,
  msdyn_SaveCalendarResponse,
  type msdyn_SaveCalendarResult,
} from "./msdyn_SaveCalendarMessage.js";
export {
  msdyn_SaveCompetitorResearchCacheRequest,
  type msdyn_SaveCompetitorResearchCacheRequestParameters,
  msdyn_SaveCompetitorResearchCacheResponse,
  type msdyn_SaveCompetitorResearchCacheResult,
} from "./msdyn_SaveCompetitorResearchCacheMessage.js";
export {
  msdyn_SaveOpportunityResearchAgentContentCustomActionRequest,
  type msdyn_SaveOpportunityResearchAgentContentCustomActionRequestParameters,
  msdyn_SaveOpportunityResearchAgentContentCustomActionResponse,
  type msdyn_SaveOpportunityResearchAgentContentCustomActionResult,
} from "./msdyn_SaveOpportunityResearchAgentContentCustomActionMessage.js";
export {
  msdyn_SaveOpportunityResearchResultRequest,
  type msdyn_SaveOpportunityResearchResultRequestParameters,
  msdyn_SaveOpportunityResearchResultResponse,
  type msdyn_SaveOpportunityResearchResultResult,
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
  msdyn_ScheduleRolloutsOrchestrationRequest,
  msdyn_ScheduleRolloutsOrchestrationResponse,
} from "./msdyn_ScheduleRolloutsOrchestrationMessage.js";
export {
  msdyn_SendEmailFromTemplateRequest,
  type msdyn_SendEmailFromTemplateRequestParameters,
  msdyn_SendEmailFromTemplateResponse,
} from "./msdyn_SendEmailFromTemplateMessage.js";
export {
  msdyn_sendFeedbackRequest,
  type msdyn_sendFeedbackRequestParameters,
  msdyn_sendFeedbackResponse,
} from "./msdyn_sendFeedbackMessage.js";
export {
  msdyn_SendRecordEventUpdateRequest,
  type msdyn_SendRecordEventUpdateRequestParameters,
  msdyn_SendRecordEventUpdateResponse,
} from "./msdyn_SendRecordEventUpdateMessage.js";
export {
  msdyn_SetAIAgentStatusRequest,
  type msdyn_SetAIAgentStatusRequestParameters,
  msdyn_SetAIAgentStatusResponse,
  type msdyn_SetAIAgentStatusResult,
} from "./msdyn_SetAIAgentStatusMessage.js";
export {
  msdyn_SetCaseSentimentCustomAPIRequest,
  type msdyn_SetCaseSentimentCustomAPIRequestParameters,
  msdyn_SetCaseSentimentCustomAPIResponse,
} from "./msdyn_SetCaseSentimentCustomAPIMessage.js";
export {
  msdyn_setCefInsightsEnabledRequest,
  type msdyn_setCefInsightsEnabledRequestParameters,
  msdyn_setCefInsightsEnabledResponse,
  type msdyn_setCefInsightsEnabledResult,
} from "./msdyn_setCefInsightsEnabledMessage.js";
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
  type msdyn_SetSharePointDocumentStatusResult,
} from "./msdyn_SetSharePointDocumentStatusMessage.js";
export {
  msdyn_SetTalkingPointLikedStatusRequest,
  type msdyn_SetTalkingPointLikedStatusRequestParameters,
  msdyn_SetTalkingPointLikedStatusResponse,
  type msdyn_SetTalkingPointLikedStatusResult,
} from "./msdyn_SetTalkingPointLikedStatusMessage.js";
export {
  msdyn_SetTeamsDocumentStatusRequest,
  type msdyn_SetTeamsDocumentStatusRequestParameters,
  msdyn_SetTeamsDocumentStatusResponse,
  type msdyn_SetTeamsDocumentStatusResult,
} from "./msdyn_SetTeamsDocumentStatusMessage.js";
export {
  msdyn_SIGetFCBStatusRequest,
  type msdyn_SIGetFCBStatusRequestParameters,
  msdyn_SIGetFCBStatusResponse,
  type msdyn_SIGetFCBStatusResult,
} from "./msdyn_SIGetFCBStatusMessage.js";
export {
  msdyn_SignalRInstanceActionsRequest,
  type msdyn_SignalRInstanceActionsRequestParameters,
  msdyn_SignalRInstanceActionsResponse,
  type msdyn_SignalRInstanceActionsResult,
} from "./msdyn_SignalRInstanceActionsMessage.js";
export {
  msdyn_simulateGovernanceAgentGuardrailValidationRequest,
  type msdyn_simulateGovernanceAgentGuardrailValidationRequestParameters,
  msdyn_simulateGovernanceAgentGuardrailValidationResponse,
  type msdyn_simulateGovernanceAgentGuardrailValidationResult,
} from "./msdyn_simulateGovernanceAgentGuardrailValidationMessage.js";
export {
  msdyn_SiteMapDiagnosisRequest,
  type msdyn_SiteMapDiagnosisRequestParameters,
  msdyn_SiteMapDiagnosisResponse,
  type msdyn_SiteMapDiagnosisResult,
} from "./msdyn_SiteMapDiagnosisMessage.js";
export {
  msdyn_SiteMapRepairRequest,
  type msdyn_SiteMapRepairRequestParameters,
  msdyn_SiteMapRepairResponse,
  type msdyn_SiteMapRepairResult,
} from "./msdyn_SiteMapRepairMessage.js";
export {
  msdyn_SLACustomTimeCalculationTemplateRequest,
  type msdyn_SLACustomTimeCalculationTemplateRequestParameters,
  msdyn_SLACustomTimeCalculationTemplateResponse,
  type msdyn_SLACustomTimeCalculationTemplateResult,
} from "./msdyn_SLACustomTimeCalculationTemplateMessage.js";
export {
  msdyn_SLATimeCalculationRequest,
  type msdyn_SLATimeCalculationRequestParameters,
  msdyn_SLATimeCalculationResponse,
  type msdyn_SLATimeCalculationResult,
} from "./msdyn_SLATimeCalculationMessage.js";
export {
  msdyn_SnoozeEmailInfraActionCardRequest,
  type msdyn_SnoozeEmailInfraActionCardRequestParameters,
  msdyn_SnoozeEmailInfraActionCardResponse,
  type msdyn_SnoozeEmailInfraActionCardResult,
} from "./msdyn_SnoozeEmailInfraActionCardMessage.js";
export {
  msdyn_StartCaseFollowupMonitoringRequest,
  msdyn_StartCaseFollowupMonitoringResponse,
} from "./msdyn_StartCaseFollowupMonitoringMessage.js";
export {
  msdyn_StartCRASimulationRequest,
  type msdyn_StartCRASimulationRequestParameters,
  msdyn_StartCRASimulationResponse,
} from "./msdyn_StartCRASimulationMessage.js";
export {
  msdyn_StartFollowupSimulationRequest,
  type msdyn_StartFollowupSimulationRequestParameters,
  msdyn_StartFollowupSimulationResponse,
} from "./msdyn_StartFollowupSimulationMessage.js";
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
  msdyn_StartOptimizeRequest,
  type msdyn_StartOptimizeRequestParameters,
  msdyn_StartOptimizeResponse,
  type msdyn_StartOptimizeResult,
} from "./msdyn_StartOptimizeMessage.js";
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
  msdyn_SuggestPrimaryForMergeActionRequest,
  type msdyn_SuggestPrimaryForMergeActionRequestParameters,
  msdyn_SuggestPrimaryForMergeActionResponse,
  type msdyn_SuggestPrimaryForMergeActionResult,
} from "./msdyn_SuggestPrimaryForMergeActionMessage.js";
export {
  msdyn_SummarySynthesizerStatusRequest,
  type msdyn_SummarySynthesizerStatusRequestParameters,
  msdyn_SummarySynthesizerStatusResponse,
  type msdyn_SummarySynthesizerStatusResult,
} from "./msdyn_SummarySynthesizerStatusMessage.js";
export {
  msdyn_SwarmExpertFinderRequest,
  type msdyn_SwarmExpertFinderRequestParameters,
  msdyn_SwarmExpertFinderResponse,
} from "./msdyn_SwarmExpertFinderMessage.js";
export {
  msdyn_SyncActionExecutionStateFromAgentRequest,
  type msdyn_SyncActionExecutionStateFromAgentRequestParameters,
  msdyn_SyncActionExecutionStateFromAgentResponse,
} from "./msdyn_SyncActionExecutionStateFromAgentMessage.js";
export {
  msdyn_SyncDealRiskActionFromNbaRequest,
  type msdyn_SyncDealRiskActionFromNbaRequestParameters,
  msdyn_SyncDealRiskActionFromNbaResponse,
  type msdyn_SyncDealRiskActionFromNbaResult,
} from "./msdyn_SyncDealRiskActionFromNbaMessage.js";
export {
  msdyn_SyncKnowledgeManagementSettingsV2Request,
  msdyn_SyncKnowledgeManagementSettingsV2Response,
} from "./msdyn_SyncKnowledgeManagementSettingsV2Message.js";
export {
  msdyn_SyncLeadActionFromNbaRequest,
  type msdyn_SyncLeadActionFromNbaRequestParameters,
  msdyn_SyncLeadActionFromNbaResponse,
  type msdyn_SyncLeadActionFromNbaResult,
} from "./msdyn_SyncLeadActionFromNbaMessage.js";
export {
  msdyn_SyncODOSProvisioningStatusRequest,
  type msdyn_SyncODOSProvisioningStatusRequestParameters,
  msdyn_SyncODOSProvisioningStatusResponse,
} from "./msdyn_SyncODOSProvisioningStatusMessage.js";
export {
  msdyn_TableOperationRequest,
  type msdyn_TableOperationRequestParameters,
  msdyn_TableOperationResponse,
  type msdyn_TableOperationResult,
} from "./msdyn_TableOperationMessage.js";
export {
  msdyn_timetrackerapiRequest,
  type msdyn_timetrackerapiRequestParameters,
  msdyn_timetrackerapiResponse,
  type msdyn_timetrackerapiResult,
} from "./msdyn_timetrackerapiMessage.js";
export {
  msdyn_TrackExchangeActivityRequest,
  type msdyn_TrackExchangeActivityRequestParameters,
  msdyn_TrackExchangeActivityResponse,
  type msdyn_TrackExchangeActivityResult,
} from "./msdyn_TrackExchangeActivityMessage.js";
export {
  msdyn_TriggerARCWithRuleRequest,
  type msdyn_TriggerARCWithRuleRequestParameters,
  msdyn_TriggerARCWithRuleResponse,
} from "./msdyn_TriggerARCWithRuleMessage.js";
export {
  msdyn_TriggerEmailManagementAgentRequest,
  type msdyn_TriggerEmailManagementAgentRequestParameters,
  msdyn_TriggerEmailManagementAgentResponse,
} from "./msdyn_TriggerEmailManagementAgentMessage.js";
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
  type msdyn_TriggerIntegratedSearchAnalyticsResult,
} from "./msdyn_TriggerIntegratedSearchAnalyticsMessage.js";
export {
  msdyn_TriggerIntegratedSearchIngestionRequest,
  msdyn_TriggerIntegratedSearchIngestionResponse,
  type msdyn_TriggerIntegratedSearchIngestionResult,
} from "./msdyn_TriggerIntegratedSearchIngestionMessage.js";
export {
  msdyn_TriggerIntegratedSearchProvisioningApiRequest,
  type msdyn_TriggerIntegratedSearchProvisioningApiRequestParameters,
  msdyn_TriggerIntegratedSearchProvisioningApiResponse,
  type msdyn_TriggerIntegratedSearchProvisioningApiResult,
} from "./msdyn_TriggerIntegratedSearchProvisioningApiMessage.js";
export {
  msdyn_TriggerIntegratedSearchSyncRequest,
  msdyn_TriggerIntegratedSearchSyncResponse,
  type msdyn_TriggerIntegratedSearchSyncResult,
} from "./msdyn_TriggerIntegratedSearchSyncMessage.js";
export {
  msdyn_triggerRecurringHarvestRunsRequest,
  msdyn_triggerRecurringHarvestRunsResponse,
} from "./msdyn_triggerRecurringHarvestRunsMessage.js";
export {
  msdyn_TriggerSequenceStatsDockerJobRequest,
  msdyn_TriggerSequenceStatsDockerJobResponse,
  type msdyn_TriggerSequenceStatsDockerJobResult,
} from "./msdyn_TriggerSequenceStatsDockerJobMessage.js";
export {
  msdyn_TriggerSummarySynthesizerRequest,
  type msdyn_TriggerSummarySynthesizerRequestParameters,
  msdyn_TriggerSummarySynthesizerResponse,
  type msdyn_TriggerSummarySynthesizerResult,
} from "./msdyn_TriggerSummarySynthesizerMessage.js";
export {
  msdyn_TryClaimOptimizeWorkItemRequest,
  type msdyn_TryClaimOptimizeWorkItemRequestParameters,
  msdyn_TryClaimOptimizeWorkItemResponse,
  type msdyn_TryClaimOptimizeWorkItemResult,
} from "./msdyn_TryClaimOptimizeWorkItemMessage.js";
export {
  msdyn_UpdateAuditStateRequest,
  type msdyn_UpdateAuditStateRequestParameters,
  msdyn_UpdateAuditStateResponse,
} from "./msdyn_UpdateAuditStateMessage.js";
export {
  msdyn_UpdateAutoCaptureSettingsRequest,
  type msdyn_UpdateAutoCaptureSettingsRequestParameters,
  msdyn_UpdateAutoCaptureSettingsResponse,
  type msdyn_UpdateAutoCaptureSettingsResult,
} from "./msdyn_UpdateAutoCaptureSettingsMessage.js";
export {
  msdyn_UpdateAutoScheduledTrainingStatusRequest,
  type msdyn_UpdateAutoScheduledTrainingStatusRequestParameters,
  msdyn_UpdateAutoScheduledTrainingStatusResponse,
} from "./msdyn_UpdateAutoScheduledTrainingStatusMessage.js";
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
  msdyn_UpdateEntityAttributePredictionRulesRequest,
  type msdyn_UpdateEntityAttributePredictionRulesRequestParameters,
  msdyn_UpdateEntityAttributePredictionRulesResponse,
  type msdyn_UpdateEntityAttributePredictionRulesResult,
} from "./msdyn_UpdateEntityAttributePredictionRulesMessage.js";
export {
  msdyn_UpdatefeatureconfigRequest,
  type msdyn_UpdatefeatureconfigRequestParameters,
  msdyn_UpdatefeatureconfigResponse,
} from "./msdyn_UpdatefeatureconfigMessage.js";
export {
  msdyn_updateGuardrailExecutionRecordRequest,
  type msdyn_updateGuardrailExecutionRecordRequestParameters,
  msdyn_updateGuardrailExecutionRecordResponse,
} from "./msdyn_updateGuardrailExecutionRecordMessage.js";
export {
  msdyn_updateGuardrailExecutionSendEmailFlagRequest,
  type msdyn_updateGuardrailExecutionSendEmailFlagRequestParameters,
  msdyn_updateGuardrailExecutionSendEmailFlagResponse,
} from "./msdyn_updateGuardrailExecutionSendEmailFlagMessage.js";
export {
  msdyn_UpdateIsCustomFieldForOrganizationEntityRequest,
  msdyn_UpdateIsCustomFieldForOrganizationEntityResponse,
  type msdyn_UpdateIsCustomFieldForOrganizationEntityResult,
} from "./msdyn_UpdateIsCustomFieldForOrganizationEntityMessage.js";
export {
  msdyn_UpdateKBArticleRequest,
  type msdyn_UpdateKBArticleRequestParameters,
  msdyn_UpdateKBArticleResponse,
  type msdyn_UpdateKBArticleResult,
} from "./msdyn_UpdateKBArticleMessage.js";
export {
  msdyn_UpdateKbAttachmentPrivilegeRequest,
  type msdyn_UpdateKbAttachmentPrivilegeRequestParameters,
  msdyn_UpdateKbAttachmentPrivilegeResponse,
} from "./msdyn_UpdateKbAttachmentPrivilegeMessage.js";
export {
  msdyn_UpdateModelGradesRequest,
  type msdyn_UpdateModelGradesRequestParameters,
  msdyn_UpdateModelGradesResponse,
  type msdyn_UpdateModelGradesResult,
} from "./msdyn_UpdateModelGradesMessage.js";
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
  msdyn_UpdateOrganizationSettingsRequest,
  type msdyn_UpdateOrganizationSettingsRequestParameters,
  msdyn_UpdateOrganizationSettingsResponse,
  type msdyn_UpdateOrganizationSettingsResult,
} from "./msdyn_UpdateOrganizationSettingsMessage.js";
export {
  msdyn_UpdateRecordWithRuleBasedPredictionsRequest,
  type msdyn_UpdateRecordWithRuleBasedPredictionsRequestParameters,
  msdyn_UpdateRecordWithRuleBasedPredictionsResponse,
  type msdyn_UpdateRecordWithRuleBasedPredictionsResult,
} from "./msdyn_UpdateRecordWithRuleBasedPredictionsMessage.js";
export {
  msdyn_UpdateRITenantInfoRequest,
  type msdyn_UpdateRITenantInfoRequestParameters,
  msdyn_UpdateRITenantInfoResponse,
} from "./msdyn_UpdateRITenantInfoMessage.js";
export {
  msdyn_UpdateSalesCopilotUserSettingsRequest,
  type msdyn_UpdateSalesCopilotUserSettingsRequestParameters,
  msdyn_UpdateSalesCopilotUserSettingsResponse,
  type msdyn_UpdateSalesCopilotUserSettingsResult,
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
  msdyn_UpdateTotalActiveRiskCountRequest,
  type msdyn_UpdateTotalActiveRiskCountRequestParameters,
  msdyn_UpdateTotalActiveRiskCountResponse,
} from "./msdyn_UpdateTotalActiveRiskCountMessage.js";
export {
  msdyn_UpdateUserConsentBasedonSecurityRolesRequest,
  type msdyn_UpdateUserConsentBasedonSecurityRolesRequestParameters,
  msdyn_UpdateUserConsentBasedonSecurityRolesResponse,
} from "./msdyn_UpdateUserConsentBasedonSecurityRolesMessage.js";
export {
  msdyn_UpgradeTelemetryRequest,
  type msdyn_UpgradeTelemetryRequestParameters,
  msdyn_UpgradeTelemetryResponse,
  type msdyn_UpgradeTelemetryResult,
} from "./msdyn_UpgradeTelemetryMessage.js";
export {
  msdyn_UpsertAISimulationResultRequest,
  type msdyn_UpsertAISimulationResultRequestParameters,
  msdyn_UpsertAISimulationResultResponse,
  type msdyn_UpsertAISimulationResultResult,
} from "./msdyn_UpsertAISimulationResultMessage.js";
export {
  msdyn_upsertSalesRoutingDiagnosticRequest,
  type msdyn_upsertSalesRoutingDiagnosticRequestParameters,
  msdyn_upsertSalesRoutingDiagnosticResponse,
} from "./msdyn_upsertSalesRoutingDiagnosticMessage.js";
export {
  msdyn_UpsertSellerAssignmentMapRequest,
  type msdyn_UpsertSellerAssignmentMapRequestParameters,
  msdyn_UpsertSellerAssignmentMapResponse,
  type msdyn_UpsertSellerAssignmentMapResult,
} from "./msdyn_UpsertSellerAssignmentMapMessage.js";
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
  msdyn_ValidateKeyVaultRequest,
  type msdyn_ValidateKeyVaultRequestParameters,
  msdyn_ValidateKeyVaultResponse,
  type msdyn_ValidateKeyVaultResult,
} from "./msdyn_ValidateKeyVaultMessage.js";
export {
  msdyn_WaitKBRequest,
  type msdyn_WaitKBRequestParameters,
  msdyn_WaitKBResponse,
  type msdyn_WaitKBResult,
} from "./msdyn_WaitKBMessage.js";
export {
  msdyn_WKWDeleteGDPRDataRequest,
  type msdyn_WKWDeleteGDPRDataRequestParameters,
  msdyn_WKWDeleteGDPRDataResponse,
} from "./msdyn_WKWDeleteGDPRDataMessage.js";
export {
  msdyn_WKWGDPRDeleteStatusRequest,
  type msdyn_WKWGDPRDeleteStatusRequestParameters,
  msdyn_WKWGDPRDeleteStatusResponse,
  type msdyn_WKWGDPRDeleteStatusResult,
} from "./msdyn_WKWGDPRDeleteStatusMessage.js";
export {
  msft_DataEngineIndexMgmt_CreateIndexRequest,
  type msft_DataEngineIndexMgmt_CreateIndexRequestParameters,
  msft_DataEngineIndexMgmt_CreateIndexResponse,
  type msft_DataEngineIndexMgmt_CreateIndexResult,
} from "./msft_DataEngineIndexMgmt_CreateIndexMessage.js";
export {
  msft_DismissStorageRecommendationRequest,
  type msft_DismissStorageRecommendationRequestParameters,
  msft_DismissStorageRecommendationResponse,
  type msft_DismissStorageRecommendationResult,
} from "./msft_DismissStorageRecommendationMessage.js";
export {
  msft_GetSecHubFeatureDataRequest,
  msft_GetSecHubFeatureDataResponse,
  type msft_GetSecHubFeatureDataResult,
} from "./msft_GetSecHubFeatureDataMessage.js";
export {
  msft_GetStorageRecommendationsRequest,
  type msft_GetStorageRecommendationsRequestParameters,
  msft_GetStorageRecommendationsResponse,
  type msft_GetStorageRecommendationsResult,
} from "./msft_GetStorageRecommendationsMessage.js";
export {
  msft_LabelAttributeMappingRequest,
  type msft_LabelAttributeMappingRequestParameters,
  msft_LabelAttributeMappingResponse,
  type msft_LabelAttributeMappingResult,
} from "./msft_LabelAttributeMappingMessage.js";
export {
  msft_RateStorageRecommendationRequest,
  type msft_RateStorageRecommendationRequestParameters,
  msft_RateStorageRecommendationResponse,
  type msft_RateStorageRecommendationResult,
} from "./msft_RateStorageRecommendationMessage.js";
export {
  NotifyEnvironmentVariableSecretChangeRequest,
  type NotifyEnvironmentVariableSecretChangeRequestParameters,
  NotifyEnvironmentVariableSecretChangeResponse,
} from "./NotifyEnvironmentVariableSecretChangeMessage.js";
export {
  OnBackgroundOperationCompleteRequest,
  type OnBackgroundOperationCompleteRequestParameters,
  OnBackgroundOperationCompleteResponse,
  type OnBackgroundOperationCompleteResult,
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
export {
  ParseImportRequest,
  ParseImportResponse,
  type ParseImportResult,
} from "./ParseImportMessage.js";
export {
  PBIAutoRefreshDatasetRequest,
  type PBIAutoRefreshDatasetRequestParameters,
  PBIAutoRefreshDatasetResponse,
  type PBIAutoRefreshDatasetResult,
} from "./PBIAutoRefreshDatasetMessage.js";
export {
  PickFromQueueRequest,
  type PickFromQueueRequestParameters,
  PickFromQueueResponse,
} from "./PickFromQueueMessage.js";
export {
  PowerAutomateProxyRequest,
  type PowerAutomateProxyRequestParameters,
  PowerAutomateProxyResponse,
  type PowerAutomateProxyResult,
} from "./PowerAutomateProxyMessage.js";
export {
  PredictRequest,
  type PredictRequestParameters,
  PredictResponse,
  type PredictResult,
} from "./PredictMessage.js";
export {
  PredictByReferenceRequest,
  type PredictByReferenceRequestParameters,
  PredictByReferenceResponse,
  type PredictByReferenceResult,
} from "./PredictByReferenceMessage.js";
export {
  PredictionSchemaRequest,
  type PredictionSchemaRequestParameters,
  PredictionSchemaResponse,
  type PredictionSchemaResult,
} from "./PredictionSchemaMessage.js";
export {
  PreValidateGitComponentsRequest,
  type PreValidateGitComponentsRequestParameters,
  PreValidateGitComponentsResponse,
  type PreValidateGitComponentsResult,
} from "./PreValidateGitComponentsMessage.js";
export {
  ProcessInboundEmailRequest,
  ProcessInboundEmailResponse,
} from "./ProcessInboundEmailMessage.js";
export {
  PropagateByExpressionRequest,
  type PropagateByExpressionRequestParameters,
  PropagateByExpressionResponse,
  type PropagateByExpressionResult,
} from "./PropagateByExpressionMessage.js";
export {
  ProvisionDelegationRequest,
  type ProvisionDelegationRequestParameters,
  ProvisionDelegationResponse,
  type ProvisionDelegationResult,
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
  type ProvisionLanguageAsyncResult,
} from "./ProvisionLanguageAsyncMessage.js";
export {
  PublishAIConfigurationRequest,
  type PublishAIConfigurationRequestParameters,
  PublishAIConfigurationResponse,
  type PublishAIConfigurationResult,
} from "./PublishAIConfigurationMessage.js";
export { PublishAllXmlRequest, PublishAllXmlResponse } from "./PublishAllXmlMessage.js";
export {
  PublishAllXmlAsyncRequest,
  PublishAllXmlAsyncResponse,
  type PublishAllXmlAsyncResult,
} from "./PublishAllXmlAsyncMessage.js";
export {
  PublishDuplicateRuleRequest,
  PublishDuplicateRuleResponse,
  type PublishDuplicateRuleResult,
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
  PullChangesFromGitAsyncRequest,
  type PullChangesFromGitAsyncRequestParameters,
  PullChangesFromGitAsyncResponse,
  type PullChangesFromGitAsyncResult,
} from "./PullChangesFromGitAsyncMessage.js";
export {
  PurgeRetainedContentRequest,
  type PurgeRetainedContentRequestParameters,
  PurgeRetainedContentResponse,
  type PurgeRetainedContentResult,
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
  type PvaCreateContentSnapshotResult,
} from "./PvaCreateContentSnapshotMessage.js";
export { PvaDeleteBotRequest, PvaDeleteBotResponse } from "./PvaDeleteBotMessage.js";
export {
  PvaDeleteBotComponentCollectionRequest,
  PvaDeleteBotComponentCollectionResponse,
} from "./PvaDeleteBotComponentCollectionMessage.js";
export {
  PvaGetDirectLineEndpointRequest,
  PvaGetDirectLineEndpointResponse,
  type PvaGetDirectLineEndpointResult,
} from "./PvaGetDirectLineEndpointMessage.js";
export {
  PvaGetFeatureControlSetRequest,
  PvaGetFeatureControlSetResponse,
  type PvaGetFeatureControlSetResult,
} from "./PvaGetFeatureControlSetMessage.js";
export {
  PvaGetMaxDatabaseVersionRequest,
  PvaGetMaxDatabaseVersionResponse,
  type PvaGetMaxDatabaseVersionResult,
} from "./PvaGetMaxDatabaseVersionMessage.js";
export {
  PvaGetUserBotsRequest,
  type PvaGetUserBotsRequestParameters,
  PvaGetUserBotsResponse,
  type PvaGetUserBotsResult,
} from "./PvaGetUserBotsMessage.js";
export { PvaProvisionRequest, PvaProvisionResponse } from "./PvaProvisionMessage.js";
export {
  PvaPublishRequest,
  PvaPublishResponse,
  type PvaPublishResult,
} from "./PvaPublishMessage.js";
export {
  PvaPublishStatusRequest,
  type PvaPublishStatusRequestParameters,
  PvaPublishStatusResponse,
  type PvaPublishStatusResult,
} from "./PvaPublishStatusMessage.js";
export {
  PvaShareConnectionRequest,
  PvaShareConnectionResponse,
} from "./PvaShareConnectionMessage.js";
export {
  PvaStartConversationRequest,
  type PvaStartConversationRequestParameters,
  PvaStartConversationResponse,
  type PvaStartConversationResult,
} from "./PvaStartConversationMessage.js";
export {
  QualifyLeadRequest,
  type QualifyLeadRequestParameters,
  QualifyLeadResponse,
  type QualifyLeadResult,
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
  type QueryDvUnstructuredDataResult,
} from "./QueryDvUnstructuredDataMessage.js";
export {
  QueryExpressionToFetchXmlRequest,
  type QueryExpressionToFetchXmlRequestParameters,
  QueryExpressionToFetchXmlResponse,
  type QueryExpressionToFetchXmlResult,
} from "./QueryExpressionToFetchXmlMessage.js";
export {
  QuestionAnalyticsRequest,
  type QuestionAnalyticsRequestParameters,
  QuestionAnalyticsResponse,
  type QuestionAnalyticsResult,
} from "./QuestionAnalyticsMessage.js";
export {
  QueueUpdateRibbonClientMetadataRequest,
  QueueUpdateRibbonClientMetadataResponse,
} from "./QueueUpdateRibbonClientMetadataMessage.js";
export {
  QuickTestRequest,
  type QuickTestRequestParameters,
  QuickTestResponse,
  type QuickTestResult,
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
  type RecognizeTextResult,
} from "./RecognizeTextMessage.js";
export {
  RefreshChangesFromGitRequest,
  type RefreshChangesFromGitRequestParameters,
  RefreshChangesFromGitResponse,
} from "./RefreshChangesFromGitMessage.js";
export {
  RefreshRpaLicensingCapacityRequest,
  RefreshRpaLicensingCapacityResponse,
  type RefreshRpaLicensingCapacityResult,
} from "./RefreshRpaLicensingCapacityMessage.js";
export {
  RegisterFlowMachineRequest,
  type RegisterFlowMachineRequestParameters,
  RegisterFlowMachineResponse,
  type RegisterFlowMachineResult,
} from "./RegisterFlowMachineMessage.js";
export { ReleaseToQueueRequest, ReleaseToQueueResponse } from "./ReleaseToQueueMessage.js";
export {
  RemoveActiveCustomizationRequest,
  type RemoveActiveCustomizationRequestParameters,
  RemoveActiveCustomizationResponse,
  type RemoveActiveCustomizationResult,
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
export {
  RemoveFlowFromFlowGroupRequest,
  type RemoveFlowFromFlowGroupRequestParameters,
  RemoveFlowFromFlowGroupResponse,
} from "./RemoveFlowFromFlowGroupMessage.js";
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
  type RemoveSolutionComponentResult,
} from "./RemoveSolutionComponentMessage.js";
export {
  RemoveUserFromRecordTeamRequest,
  type RemoveUserFromRecordTeamRequestParameters,
  RemoveUserFromRecordTeamResponse,
  type RemoveUserFromRecordTeamResult,
} from "./RemoveUserFromRecordTeamMessage.js";
export {
  RenewContractRequest,
  type RenewContractRequestParameters,
  RenewContractResponse,
  type RenewContractResult,
} from "./RenewContractMessage.js";
export {
  RenewEntitlementRequest,
  type RenewEntitlementRequestParameters,
  RenewEntitlementResponse,
  type RenewEntitlementResult,
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
  type RescheduleResult,
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
  type RestoreResult,
} from "./RestoreMessage.js";
export {
  RetainRequest,
  type RetainRequestParameters,
  RetainResponse,
  type RetainResult,
} from "./RetainMessage.js";
export {
  RetrieveAppsWithDelegatedAccessPermissionsRequest,
  type RetrieveAppsWithDelegatedAccessPermissionsRequestParameters,
  RetrieveAppsWithDelegatedAccessPermissionsResponse,
  type RetrieveAppsWithDelegatedAccessPermissionsResult,
} from "./RetrieveAppsWithDelegatedAccessPermissionsMessage.js";
export {
  RetrieveBoolFeatureControlSettingRequest,
  type RetrieveBoolFeatureControlSettingRequestParameters,
  RetrieveBoolFeatureControlSettingResponse,
  type RetrieveBoolFeatureControlSettingResult,
} from "./RetrieveBoolFeatureControlSettingMessage.js";
export {
  RetrieveConnectorActionsRequest,
  type RetrieveConnectorActionsRequestParameters,
  RetrieveConnectorActionsResponse,
  type RetrieveConnectorActionsResult,
} from "./RetrieveConnectorActionsMessage.js";
export {
  RetrieveConnectorSettingsRequest,
  RetrieveConnectorSettingsResponse,
  type RetrieveConnectorSettingsResult,
} from "./RetrieveConnectorSettingsMessage.js";
export {
  RetrieveEnvironmentVariableSecretValueRequest,
  type RetrieveEnvironmentVariableSecretValueRequestParameters,
  RetrieveEnvironmentVariableSecretValueResponse,
  type RetrieveEnvironmentVariableSecretValueResult,
} from "./RetrieveEnvironmentVariableSecretValueMessage.js";
export {
  RetrieveFeatureControlSettingRequest,
  type RetrieveFeatureControlSettingRequestParameters,
  RetrieveFeatureControlSettingResponse,
  type RetrieveFeatureControlSettingResult,
} from "./RetrieveFeatureControlSettingMessage.js";
export {
  RetrieveFeatureControlSettingsRequest,
  type RetrieveFeatureControlSettingsRequestParameters,
  RetrieveFeatureControlSettingsResponse,
  type RetrieveFeatureControlSettingsResult,
} from "./RetrieveFeatureControlSettingsMessage.js";
export {
  RetrieveFeatureControlSettingsByNamespaceRequest,
  type RetrieveFeatureControlSettingsByNamespaceRequestParameters,
  RetrieveFeatureControlSettingsByNamespaceResponse,
  type RetrieveFeatureControlSettingsByNamespaceResult,
} from "./RetrieveFeatureControlSettingsByNamespaceMessage.js";
export {
  RetrieveFeatureControlStringSettingsRequest,
  RetrieveFeatureControlStringSettingsResponse,
  type RetrieveFeatureControlStringSettingsResult,
} from "./RetrieveFeatureControlStringSettingsMessage.js";
export {
  RetrieveFeatureControlStringSettingsForNamespaceRequest,
  type RetrieveFeatureControlStringSettingsForNamespaceRequestParameters,
  RetrieveFeatureControlStringSettingsForNamespaceResponse,
  type RetrieveFeatureControlStringSettingsForNamespaceResult,
} from "./RetrieveFeatureControlStringSettingsForNamespaceMessage.js";
export {
  RetrieveFlowUpdatesRequest,
  type RetrieveFlowUpdatesRequestParameters,
  RetrieveFlowUpdatesResponse,
  type RetrieveFlowUpdatesResult,
} from "./RetrieveFlowUpdatesMessage.js";
export {
  RetrievePowerAppsConnectionsRequest,
  RetrievePowerAppsConnectionsResponse,
  type RetrievePowerAppsConnectionsResult,
} from "./RetrievePowerAppsConnectionsMessage.js";
export {
  RetrievePowerAppsConnectorApisRequest,
  RetrievePowerAppsConnectorApisResponse,
  type RetrievePowerAppsConnectorApisResult,
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
  type ReviseQuoteResult,
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
  type RollbackRetainResult,
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
  type RunDataProcessingModuleResult,
} from "./RunDataProcessingModuleMessage.js";
export {
  RunDesktopFlowRequest,
  type RunDesktopFlowRequestParameters,
  RunDesktopFlowResponse,
  type RunDesktopFlowResult,
} from "./RunDesktopFlowMessage.js";
export {
  SaveAsDesktopFlowRequest,
  type SaveAsDesktopFlowRequestParameters,
  SaveAsDesktopFlowResponse,
  type SaveAsDesktopFlowResult,
} from "./SaveAsDesktopFlowMessage.js";
export {
  SaveAsDesktopFlowModuleRequest,
  type SaveAsDesktopFlowModuleRequestParameters,
  SaveAsDesktopFlowModuleResponse,
  type SaveAsDesktopFlowModuleResult,
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
  type SchedulePredictionResult,
} from "./SchedulePredictionMessage.js";
export {
  ScheduleRetrainRequest,
  type ScheduleRetrainRequestParameters,
  ScheduleRetrainResponse,
  type ScheduleRetrainResult,
} from "./ScheduleRetrainMessage.js";
export {
  ScheduleTrainingRequest,
  type ScheduleTrainingRequestParameters,
  ScheduleTrainingResponse,
  type ScheduleTrainingResult,
} from "./ScheduleTrainingMessage.js";
export {
  searchautocompleteRequest,
  type searchautocompleteRequestParameters,
  searchautocompleteResponse,
  type searchautocompleteResult,
} from "./searchautocompleteMessage.js";
export {
  searchqueryRequest,
  type searchqueryRequestParameters,
  searchqueryResponse,
  type searchqueryResult,
} from "./searchqueryMessage.js";
export {
  searchsuggestRequest,
  type searchsuggestRequestParameters,
  searchsuggestResponse,
  type searchsuggestResult,
} from "./searchsuggestMessage.js";
export {
  SendAppNotificationRequest,
  type SendAppNotificationRequestParameters,
  SendAppNotificationResponse,
  type SendAppNotificationResult,
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
  type SendEmailResult,
} from "./SendEmailMessage.js";
export {
  SendEmailFromTemplateRequest,
  type SendEmailFromTemplateRequestParameters,
  SendEmailFromTemplateResponse,
  type SendEmailFromTemplateResult,
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
  type SetupAiConnectionResult,
} from "./SetupAiConnectionMessage.js";
export {
  SnapshotDatasourceRequest,
  type SnapshotDatasourceRequestParameters,
  SnapshotDatasourceResponse,
  type SnapshotDatasourceResult,
} from "./SnapshotDatasourceMessage.js";
export {
  StageAndUpgradeRequest,
  type StageAndUpgradeRequestParameters,
  StageAndUpgradeResponse,
  type StageAndUpgradeResult,
} from "./StageAndUpgradeMessage.js";
export {
  StageAndUpgradeAsyncRequest,
  type StageAndUpgradeAsyncRequestParameters,
  StageAndUpgradeAsyncResponse,
  type StageAndUpgradeAsyncResult,
} from "./StageAndUpgradeAsyncMessage.js";
export {
  StageSolutionRequest,
  type StageSolutionRequestParameters,
  StageSolutionResponse,
  type StageSolutionResult,
} from "./StageSolutionMessage.js";
export {
  SubstituteForAttributeRequest,
  type SubstituteForAttributeRequestParameters,
  SubstituteForAttributeResponse,
  type SubstituteForAttributeResult,
} from "./SubstituteForAttributeMessage.js";
export {
  SubstituteForComponentRequest,
  type SubstituteForComponentRequestParameters,
  SubstituteForComponentResponse,
  type SubstituteForComponentResult,
} from "./SubstituteForComponentMessage.js";
export {
  SummarizeRecordRequest,
  type SummarizeRecordRequestParameters,
  SummarizeRecordResponse,
  type SummarizeRecordResult,
} from "./SummarizeRecordMessage.js";
export {
  SyncBulkOperationRequest,
  type SyncBulkOperationRequestParameters,
  SyncBulkOperationResponse,
  type SyncBulkOperationResult,
} from "./SyncBulkOperationMessage.js";
export {
  SyncCopresenceStateRequest,
  type SyncCopresenceStateRequestParameters,
  SyncCopresenceStateResponse,
  type SyncCopresenceStateResult,
} from "./SyncCopresenceStateMessage.js";
export {
  SyncGroupMembersToTeamRequest,
  SyncGroupMembersToTeamResponse,
} from "./SyncGroupMembersToTeamMessage.js";
export {
  TrainRequest,
  type TrainRequestParameters,
  TrainResponse,
  type TrainResult,
} from "./TrainMessage.js";
export {
  TransformImportRequest,
  type TransformImportRequestParameters,
  TransformImportResponse,
  type TransformImportResult,
} from "./TransformImportMessage.js";
export {
  TriggerDesktopFlowRunCallbackRequest,
  TriggerDesktopFlowRunCallbackResponse,
  type TriggerDesktopFlowRunCallbackResult,
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
  type UninstallSolutionAsyncResult,
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
  type UnpublishAIConfigurationResult,
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
  type UnschedulePredictionResult,
} from "./UnschedulePredictionMessage.js";
export {
  UnscheduleTrainingRequest,
  type UnscheduleTrainingRequestParameters,
  UnscheduleTrainingResponse,
  type UnscheduleTrainingResult,
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
  UpdateProcessWithWfomJsonRequest,
  type UpdateProcessWithWfomJsonRequestParameters,
  UpdateProcessWithWfomJsonResponse,
} from "./UpdateProcessWithWfomJsonMessage.js";
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
  type UpsertMultipleResult,
} from "./UpsertMultipleMessage.js";
export {
  ValidateRequest,
  type ValidateRequestParameters,
  ValidateResponse,
  type ValidateResult,
} from "./ValidateMessage.js";
export {
  ValidateAIConfigurationRequest,
  type ValidateAIConfigurationRequestParameters,
  ValidateAIConfigurationResponse,
  type ValidateAIConfigurationResult,
} from "./ValidateAIConfigurationMessage.js";
export {
  ValidateRetentionConfigRequest,
  type ValidateRetentionConfigRequestParameters,
  ValidateRetentionConfigResponse,
  type ValidateRetentionConfigResult,
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
  RelationshipType,
  RibbonLocationFilters,
  RollupType,
  SearchDirection,
  SecurityTypes,
  ShareAccessRights,
  SolutionValidationResultType,
  StageSolutionStatus,
  StringFormat,
  SubCode,
  SubstitutionStatus,
  TargetFieldType,
  TimeCode,
  XrmAggregateType,
  XrmDateTimeGrouping,
} from "./types/index.js";

// The CSDL complex and entity types (#333), type-only. A complex type named like an operation's
// response (<Operation>Response) isn't re-exported: that name is the operation's response.
export type {
  activitymimeattachment,
  activityparty,
  activitypointer,
  TypedActivitypointer,
  AddComponentToSolutionParameters,
  AddComponentToSolutionParametersCollection,
  adx_inviteredemption,
  adx_portalcomment,
  aiplugin,
  aipluginconversationstarter,
  aipluginconversationstartermapping,
  aipluginoperation,
  aipluginoperationparameter,
  aipluginoperationresponsetemplate,
  aiplugintitle,
  AnalyticsStoreDetails,
  appconfig,
  appconfiginstance,
  ApplicationBasedAccessControlAuditDetail,
  appmodule,
  appointment,
  AppointmentProposal,
  AppointmentRequest,
  AppointmentsToIgnore,
  AppValidationResponse,
  AssociatedMenuConfiguration,
  asyncoperation,
  AttributeAuditDetail,
  AttributeMapping,
  AttributeMetadata,
  TypedAttributeMetadata,
  AttributePrivilege,
  AttributeQueryExpression,
  AttributeRequiredLevelManagedProperty,
  AttributeTypeDisplayName,
  audit,
  AuditDetail,
  TypedAuditDetail,
  AuditDetailCollection,
  AuditPartitionDetail,
  AuditStorageDetails,
  AuditStorageDetailsResult,
  BigIntAttributeMetadata,
  BooleanAttributeMetadata,
  BooleanManagedProperty,
  BooleanOptionSetMetadata,
  bot,
  botcomponentcollection,
  BulkDeleteOptions,
  bulkoperation,
  BulkRemoveActiveCustomizationsParameters,
  BusinessNotification,
  BusinessNotificationParameter,
  businessprocess,
  businessunit,
  CalculateTotalTimeIncidentResponse,
  calendar,
  campaign,
  campaignactivity,
  campaignactivityitem,
  campaignitem,
  campaignresponse,
  CascadeConfiguration,
  ChannelAccessProfilePrivilege,
  ChannelAccessProfileWithPrivileges,
  chat,
  CheckIncomingEmailResponse,
  CheckPromoteEmailResponse,
  Collection_Int32_String,
  Collection_String_AuditStorageDetails,
  Collection_String_String,
  ColumnSet,
  ComplexAttributeMetadata,
  TypedComplexAttributeMetadata,
  ComplexBigIntAttributeMetadata,
  ComplexBooleanAttributeMetadata,
  ComplexBooleanOptionSetMetadata,
  ComplexDateTimeAttributeMetadata,
  ComplexDecimalAttributeMetadata,
  ComplexDoubleAttributeMetadata,
  ComplexEntityKeyMetadata,
  ComplexEntityMetadata,
  ComplexEnumAttributeMetadata,
  ComplexFileAttributeMetadata,
  ComplexImageAttributeMetadata,
  ComplexIntegerAttributeMetadata,
  ComplexLookupAttributeMetadata,
  ComplexManagedPropertyAttributeMetadata,
  ComplexManyToManyRelationshipMetadata,
  ComplexMemoAttributeMetadata,
  ComplexMoneyAttributeMetadata,
  ComplexOneToManyRelationshipMetadata,
  ComplexOptionSetMetadata,
  ComplexStringAttributeMetadata,
  ComplexUniqueIdentifierAttributeMetadata,
  Component,
  ComponentDetail,
  ComponentPrincipalAccess,
  computeruseagent,
  ConditionExpression,
  connectioninstance,
  connectionreference,
  ConstraintRelation,
  contact,
  contract,
  copilottextdatastatusResponse,
  CreateVirtualConnectorTableMetadata,
  credential,
  customcontroldefaultconfig,
  DateTimeAttributeMetadata,
  DateTimeBehavior,
  DecimalAttributeMetadata,
  delegatedauthorization,
  DeletedMetadataCollection,
  dependency,
  DependencyMetadataCollection,
  DependencyMetadataInfo,
  desktopflowbinary,
  desktopflowmodule,
  DoubleAttributeMetadata,
  DownloadReportDefinitionResponse,
  duplicaterule,
  dynamicproperty,
  dynamicpropertyinstance,
  email,
  EndpointCollection,
  entitlement,
  EntityKeyMetadata,
  EntityKeyQueryExpression,
  EntityMetadata,
  EntityNameAttributeMetadata,
  EntityQueryExpression,
  EntityRecordCountCollection,
  EntitySetting,
  EnumAttributeMetadata,
  TypedEnumAttributeMetadata,
  ErrorInfo,
  ExpandCalendarResponse,
  ExportComponentDetails,
  ExportComponentsParams,
  ExportFieldTranslationResponse,
  fax,
  FeatureControlSettingData,
  FeatureControlStringSettingData,
  FetchExpression,
  FetchXmlToQueryExpressionResponse,
  FileAttributeMetadata,
  FileSasUrlResponse,
  FilterExpression,
  FindParentResourceGroupResponse,
  flowgroup,
  flowmachine,
  flowmachinegroup,
  flowmachinenetwork,
  flowsession,
  flowtrigger,
  FormatAddressResponse,
  GetComponentManagedIdentityFICResponse,
  GetDistinctValuesImportFileResponse,
  GetFileSasUrlForUploadResponse,
  GetFileSasUrlResponse,
  GetHeaderColumnsImportFileResponse,
  GetHostedRpaCapacityResponse,
  GetNextRunsForFlowTriggerResponse,
  GetNextRunsResponse,
  GetPluginCertificateInfoResponse,
  GetQuantityDecimalResponse,
  GetReportHistoryLimitResponse,
  GetSearchInformationResponse,
  GetTimeZoneCodeByLocalizedNameResponse,
  GetValidManyToManyResponse,
  GetValidReferencedEntitiesResponse,
  GetValidReferencingEntitiesResponse,
  githubappconfig,
  goal,
  GuidCollection,
  ImageAttributeMetadata,
  _import,
  importfile,
  importjob,
  importmap,
  incident,
  incidentresolution,
  InitializeUploadUsingSasResponse,
  InputArgument,
  InputArgumentCollection,
  IntegerAttributeMetadata,
  invoice,
  invoicedetail,
  IPFirewallAccessAuditDetail,
  IsCDS3ReadyResponse,
  IsComponentCustomizableResponse,
  IsDataEncryptionActiveResponse,
  IsValidStateTransitionResponse,
  kbarticle,
  knowledgearticle,
  Label,
  LabelQueryExpression,
  LayerDesiredOrder,
  lead,
  letter,
  LinkEntity,
  list,
  ListCredentialDependenciesResponse,
  listmember,
  LocalizedLabel,
  LocalTimeFromUtcTimeResponse,
  LookupAttributeMetadata,
  MailboxTrackingFolderMapping,
  ManagedPropertyAttributeMetadata,
  ManagedPropertyMetadata,
  ManyToManyRelationshipMetadata,
  McpGetGlobalOptionSetResponse,
  MemoAttributeMetadata,
  MemoFormatName,
  MetadataBase,
  TypedMetadataBase,
  MetadataConditionExpression,
  MetadataFilterExpression,
  MetadataPropertiesExpression,
  MissingComponent,
  MissingDependency,
  MissingPackage,
  mobileofflineprofile,
  mobileofflineprofileitem,
  MoneyAttributeMetadata,
  msdyn_aiagentstatus,
  msdyn_aiconfiguration,
  msdyn_aimodel,
  msdyn_aitestcase,
  msdyn_analysisjob,
  msdyn_bookingalert,
  msdyn_copilottranscript,
  msdyn_forecastdefinition,
  msdyn_GetSwarmParticipantDetailsResponse,
  msdyn_kbattachment,
  msdyn_mobileapp,
  msdyn_ocliveworkitem,
  msdyn_ocoutboundmessage,
  msdyn_ocsession,
  msdyn_ocvoicemail,
  msdyn_solutionhealthruleset,
  msfp_alert,
  msfp_surveyinvite,
  msfp_surveyresponse,
  msft_DataEngineIndexMgmt_GetIndexInfoResponse,
  MultiSelectPicklistAttributeMetadata,
  navigationsetting,
  Object,
  ObjectiveRelation,
  OneToManyRelationshipMetadata,
  opportunity,
  opportunityclose,
  opportunityproduct,
  OptionMetadata,
  TypedOptionMetadata,
  OptionSetMetadata,
  OptionSetMetadataBase,
  TypedOptionSetMetadataBase,
  orderclose,
  OrderExpression,
  organization,
  OrganizationDetail,
  OrganizationInfo,
  OrganizationResources,
  PagingInfo,
  ParameterCollection,
  phonecall,
  PicklistAttributeMetadata,
  post,
  PreferredSolutionDetails,
  PreferredSolutionUsedByResponse,
  pricelevel,
  PrincipalAccess,
  privilege,
  privilegecheckerrun,
  processstage,
  product,
  ProposalParty,
  PullChangesFromGitParameters,
  QueryBase,
  TypedQueryBase,
  QueryByAttribute,
  QueryExpression,
  QueryMultipleSchedulesResponse,
  QueryScheduleResponse,
  queue,
  queueitem,
  quote,
  quoteclose,
  quotedetail,
  recurrencerule,
  recurringappointmentmaster,
  RelationshipAttribute,
  RelationshipAuditDetail,
  RelationshipMetadataBase,
  TypedRelationshipMetadataBase,
  RelationshipQueryExpression,
  RemoveActiveCustomizationsResponse,
  report,
  RequiredResource,
  ResetInheritedAccessResponse,
  resource,
  resourcegroup,
  ResourceInfo,
  RetrieveAadUserPrivilegesResponse,
  RetrieveAadUserSetOfPrivilegesByIdsResponse,
  RetrieveAadUserSetOfPrivilegesByNamesResponse,
  RetrieveAbsoluteAndSiteCollectionUrlResponse,
  RetrieveAccessOriginResponse,
  RetrieveAllEntitiesResponse,
  RetrieveAnalyticsStoreDetailsResponse,
  RetrieveApplicationRibbonResponse,
  RetrieveAttributeChangeHistoryResponse,
  RetrieveAuditDetailsResponse,
  RetrieveAuditPartitionListResponse,
  RetrieveAvailableLanguagesResponse,
  RetrieveCascadeAssignAsyncJobIdResponse,
  RetrieveCascadeDeleteAsyncJobIdResponse,
  RetrieveChannelAccessProfilePrivilegesResponse,
  RetrieveCurrentOrganizationResponse,
  RetrieveDataEncryptionKeyResponse,
  RetrieveDeploymentLicenseTypeResponse,
  RetrieveDeprovisionedLanguagesResponse,
  RetrieveEntityResponse,
  RetrieveEntityRibbonResponse,
  RetrieveEnvironmentVariableValueResponse,
  RetrieveExchangeRateResponse,
  RetrieveFinanceAndOperationsIntegrationDetailsResponse,
  RetrieveFormattedImportJobResultsResponse,
  RetrieveInstalledLanguagePacksResponse,
  RetrieveInstalledLanguagePackVersionResponse,
  RetrieveLicenseInfoResponse,
  RetrieveLocLabelsResponse,
  RetrieveMailboxTrackingFoldersResponse,
  RetrieveMaskedAttributesForEntityResponse,
  RetrieveMetadataChangesResponse,
  RetrieveMissingComponentsResponse,
  RetrieveMissingDependenciesWithMetadataResponse,
  RetrieveOrganizationInfoResponse,
  RetrieveOrganizationResourcesResponse,
  RetrieveParsedDataImportFileResponse,
  RetrievePrincipalAccessInfoResponse,
  RetrievePrincipalAccessResponse,
  RetrievePrincipalAttributePrivilegesResponse,
  RetrievePrincipalSyncAttributeMappingsResponse,
  RetrieveProcessWithWfomJsonResponse,
  RetrieveProvisionedLanguagePackVersionResponse,
  RetrieveProvisionedLanguagesResponse,
  RetrieveRecordChangeHistoryResponse,
  RetrieveRolePrivilegesRoleResponse,
  RetrieveSettingResponse,
  RetrieveSharedPrincipalsAndAccessResponse,
  RetrieveTeamPrivilegesResponse,
  RetrieveTimelineWallRecordsResponse,
  RetrieveTimestampResponse,
  RetrieveTotalRecordCountResponse,
  RetrieveUserApplicationLicenseAccessResponse,
  RetrieveUserLicenseInfoResponse,
  RetrieveUserPrivilegeByPrivilegeIdResponse,
  RetrieveUserPrivilegeByPrivilegeNameResponse,
  RetrieveUserPrivilegesResponse,
  RetrieveUserSetOfPrivilegesByIdsResponse,
  RetrieveUserSetOfPrivilegesByNamesResponse,
  RetrieveUsersPrivilegesThroughTeamsResponse,
  RetrieveVersionResponse,
  role,
  RolePrivilege,
  RolePrivilegeAuditDetail,
  salesliterature,
  salesorder,
  salesorderdetail,
  savedquery,
  savedqueryvisualization,
  SearchResponse,
  SearchResults,
  searchstatisticsResponse,
  searchstatusResponse,
  SecurityPrivilegeMetadata,
  service,
  serviceappointment,
  serviceendpoint,
  ServicePlan,
  SettingDetail,
  ShareAuditDetail,
  sharedworkspace,
  sharepointdocumentlocation,
  sharepointsite,
  sitemap,
  socialactivity,
  socialprofile,
  solution,
  Solution,
  solutioncomponent,
  SolutionComponentDetails,
  SolutionComponentOption,
  SolutionComponentReference,
  SolutionDetails,
  SolutionInfo,
  SolutionParameters,
  SolutionValidationResult,
  StageSolutionResults,
  StateAttributeMetadata,
  StateOptionMetadata,
  StatusAttributeMetadata,
  StatusOptionMetadata,
  StringAttributeMetadata,
  StringCollection,
  StringFormatName,
  subject,
  SubstitutionResult,
  systemform,
  systemuser,
  task,
  team,
  teamtemplate,
  template,
  theme,
  TimeInfo,
  TimeInfoCollection,
  timezonedefinition,
  TraceInfo,
  transactioncurrency,
  _Type,
  UniqueIdentifierAttributeMetadata,
  uom,
  UpsertResponse,
  UserAccessAuditDetail,
  UserLicenseInfo,
  UserName,
  UtcTimeFromLocalTimeResponse,
  ValidateAppResponse,
  ValidateFetchXmlExpressionResponse,
  ValidateFetchXmlExpressionResult,
  ValidateRecurrenceRuleResponse,
  ValidationIssue,
  ValidationResult,
  ValidatorIssue,
  VirtualTableColumnCandidate,
  webresource,
  WhoAmIResponse,
  workflow,
  workqueue,
  workqueueitem,
  XrmAttributeExpression,
} from "./types/index.js";
