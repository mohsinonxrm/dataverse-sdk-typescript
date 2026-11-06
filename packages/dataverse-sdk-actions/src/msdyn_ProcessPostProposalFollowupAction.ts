import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ProcessPostProposalFollowup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessPostProposalFollowupResponse {
  "@odata.context"?: string;
  msdyn_IsPostProposalFollowupHandled: boolean;
  msdyn_IsPostProposalTimedOut: boolean;
}

/**
 * Parameters of the msdyn_ProcessPostProposalFollowup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessPostProposalFollowupActionParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_Thread: string;
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
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_Thread: this.parameters.msdyn_Thread,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ProcessPostProposalFollowupResponse;
  }
}
