import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SetTalkingPointLikedStatus action
 */
export interface msdyn_SetTalkingPointLikedStatusResponse {
  IsSuccessfull: boolean;
}

/**
 * Parameters of the msdyn_SetTalkingPointLikedStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetTalkingPointLikedStatusActionParameters {
  MessageId?: string;
  InferredMessageId?: string;
  IsLiked?: boolean;
}

/**
 * msdyn_SetTalkingPointLikedStatus action
 *
 * Unbound action
 */
export class msdyn_SetTalkingPointLikedStatusAction implements Executable<msdyn_SetTalkingPointLikedStatusResponse> {
  constructor(public readonly parameters: msdyn_SetTalkingPointLikedStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTalkingPointLikedStatus`;

    const body = requestBody({
      MessageId: this.parameters.MessageId,
      InferredMessageId: this.parameters.InferredMessageId,
      IsLiked: this.parameters.IsLiked,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SetTalkingPointLikedStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SetTalkingPointLikedStatusResponse;
    return (await response.json()) as msdyn_SetTalkingPointLikedStatusResponse;
  }
}
