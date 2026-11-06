import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action
 *
 * Unbound action
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailAction implements Executable<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse> {
  constructor(
    public readonly parameters: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse;
    return (await response.json()) as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse;
  }
}
