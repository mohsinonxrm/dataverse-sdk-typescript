/**
 * CCaaS_GetCallStateResponse
 */
export interface CCaaS_GetCallStateResponse {
  callId?: string;
  conversationId?: string;
  participants?: string;
  recordingState?: string;
  transcriptionState?: string;
}
