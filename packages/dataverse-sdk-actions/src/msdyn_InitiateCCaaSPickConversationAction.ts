import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitiateCCaaSPickConversation action
 */
export interface msdyn_InitiateCCaaSPickConversationResponse {
  msdyn_InitiateCCaaSPickConversationAPIResponse: string;
}

/**
 * msdyn_InitiateCCaaSPickConversation action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSPickConversationAction implements Executable<msdyn_InitiateCCaaSPickConversationResponse> {
  constructor(
    public readonly liveWorkItemId: string,
    public readonly initiatingUser: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSPickConversation`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
      InitiatingUser: this.initiatingUser,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSPickConversationResponse> {
    const data = await response.json();
    return data as msdyn_InitiateCCaaSPickConversationResponse;
  }
}
