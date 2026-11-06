import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse;
  }
}
