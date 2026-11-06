import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AssociateConversation action
 */
export interface msdyn_AssociateConversationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AssociateConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssociateConversationActionParameters {
  msdyn_TeamsConversationId: string;
  msdyn_RegardingEntityId: string;
  msdyn_RegardingEntityName: string;
}

/**
 * msdyn_AssociateConversation action
 *
 * Unbound action
 */
export class msdyn_AssociateConversationAction implements Executable<msdyn_AssociateConversationResponse> {
  constructor(public readonly parameters: msdyn_AssociateConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssociateConversation`;

    const body = requestBody({
      msdyn_TeamsConversationId: this.parameters.msdyn_TeamsConversationId,
      msdyn_RegardingEntityId: this.parameters.msdyn_RegardingEntityId,
      msdyn_RegardingEntityName: this.parameters.msdyn_RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_AssociateConversationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AssociateConversationResponse;
    return (await response.json()) as msdyn_AssociateConversationResponse;
  }
}
