import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetTalkingPointLikedStatus action
 */
export interface msdyn_SetTalkingPointLikedStatusResponse {
  IsSuccessfull: boolean;
}

/**
 * msdyn_SetTalkingPointLikedStatus action
 *
 * Unbound action
 */
export class msdyn_SetTalkingPointLikedStatusAction implements Executable<msdyn_SetTalkingPointLikedStatusResponse> {
  constructor(
    public readonly messageId: string,
    public readonly inferredMessageId: string,
    public readonly isLiked: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTalkingPointLikedStatus`;

    const body: Record<string, unknown> = {
      MessageId: this.messageId,
      InferredMessageId: this.inferredMessageId,
      IsLiked: this.isLiked,
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

  async parseResponse(response: Response): Promise<msdyn_SetTalkingPointLikedStatusResponse> {
    const data = await response.json();
    return data as msdyn_SetTalkingPointLikedStatusResponse;
  }
}
