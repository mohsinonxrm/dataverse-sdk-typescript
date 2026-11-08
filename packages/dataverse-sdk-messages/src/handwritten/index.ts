/**
 * The hand-written messages (#344): the CRUD messages, which are HTTP verbs on entity sets rather
 * than Web API actions or functions, and ExecuteMultiple / ExecuteTransaction, which are `$batch`
 * requests. The package index (generated) re-exports these names; tools/generate-sdk-types lists
 * them in `HAND_WRITTEN_MESSAGES` and keeps this folder when it regenerates the package.
 */
export {
  AssociateRequest,
  type AssociateRequestParameters,
  AssociateResponse,
} from "./AssociateMessage.js";
export {
  CreateRequest,
  type CreateRequestParameters,
  CreateResponse,
  type CreateResult,
} from "./CreateMessage.js";
export { DeleteRequest, type DeleteRequestParameters, DeleteResponse } from "./DeleteMessage.js";
export {
  DisassociateRequest,
  type DisassociateRequestParameters,
  DisassociateResponse,
} from "./DisassociateMessage.js";
export {
  type ExecuteResponses,
  ExecuteMultipleRequest,
  type ExecuteMultipleRequestParameters,
  ExecuteMultipleResponse,
  type ExecuteMultipleResponseItem,
  type ExecuteMultipleResult,
  type ExecuteMultipleSettings,
} from "./ExecuteMultipleMessage.js";
export {
  ExecuteTransactionRequest,
  type ExecuteTransactionRequestParameters,
  ExecuteTransactionResponse,
} from "./ExecuteTransactionMessage.js";
export {
  RetrieveRequest,
  type RetrieveRequestParameters,
  RetrieveResponse,
  type RetrieveResult,
} from "./RetrieveMessage.js";
export {
  RetrieveMultipleRequest,
  type RetrieveMultipleRequestParameters,
  RetrieveMultipleResponse,
  type RetrieveMultipleResult,
} from "./RetrieveMultipleMessage.js";
export { UpdateRequest, type UpdateRequestParameters, UpdateResponse } from "./UpdateMessage.js";
