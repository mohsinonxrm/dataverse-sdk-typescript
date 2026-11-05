import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitiateCCaaSCloseConversation action
 */
export interface msdyn_InitiateCCaaSCloseConversationResponse {
  msdyn_InitiateCCaaSCloseConversationAPIResponse: string;
}

/**
 * msdyn_InitiateCCaaSCloseConversation action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSCloseConversationAction implements Executable<msdyn_InitiateCCaaSCloseConversationResponse> {
  constructor(
    public readonly sessionId: string,
    public readonly initiatingUser: string,
    public readonly liveWorkItemId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSCloseConversation`;

    const body: Record<string, unknown> = {
      SessionId: this.sessionId,
      InitiatingUser: this.initiatingUser,
      LiveWorkItemId: this.liveWorkItemId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSCloseConversationResponse> {
    const data = await response.json();
    return data as msdyn_InitiateCCaaSCloseConversationResponse;
  }
}
