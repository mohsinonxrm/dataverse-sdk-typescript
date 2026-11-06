import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ProcessPostProposalFollowup action
 */
export interface msdyn_ProcessPostProposalFollowupResponse {
  msdyn_IsPostProposalFollowupHandled: boolean;
  msdyn_IsPostProposalTimedOut: boolean;
}

/**
 * Parameters of the msdyn_ProcessPostProposalFollowup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessPostProposalFollowupActionParameters {
  msdyn_Thread: string;
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId: string;
}

/**
 * msdyn_ProcessPostProposalFollowup action
 *
 * Unbound action
 */
export class msdyn_ProcessPostProposalFollowupAction implements Executable<msdyn_ProcessPostProposalFollowupResponse> {
  constructor(public readonly parameters: msdyn_ProcessPostProposalFollowupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessPostProposalFollowup`;

    const body = requestBody({
      msdyn_Thread: this.parameters.msdyn_Thread,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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

  async parseResponse(response: Response): Promise<msdyn_ProcessPostProposalFollowupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ProcessPostProposalFollowupResponse;
  }
}
