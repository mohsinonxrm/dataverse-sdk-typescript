import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProcessPostProposalFollowup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessPostProposalFollowupRequestParameters {
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
  msdyn_Thread: string;
}

/**
 * msdyn_ProcessPostProposalFollowup request message
 *
 * Web API Action: msdyn_ProcessPostProposalFollowup
 */
export class msdyn_ProcessPostProposalFollowupRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessPostProposalFollowupResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProcessPostProposalFollowupRequestParameters>;

  constructor(parameters: msdyn_ProcessPostProposalFollowupRequestParameters) {
    super("msdyn_ProcessPostProposalFollowup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessPostProposalFollowup`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_Thread: this.Parameters.msdyn_Thread,
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
    return msdyn_ProcessPostProposalFollowupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProcessPostProposalFollowup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessPostProposalFollowupResult {
  "@odata.context"?: string;
  msdyn_IsPostProposalFollowupHandled: boolean;
  msdyn_IsPostProposalTimedOut: boolean;
}

/**
 * msdyn_ProcessPostProposalFollowup response message
 *
 * `result` is the value the msdyn_ProcessPostProposalFollowup action returns (see {@link msdyn_ProcessPostProposalFollowupResult}).
 */
export class msdyn_ProcessPostProposalFollowupResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessPostProposalFollowupResult) {
    super("msdyn_ProcessPostProposalFollowup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProcessPostProposalFollowupResponse {
    return new msdyn_ProcessPostProposalFollowupResponse(
      data as msdyn_ProcessPostProposalFollowupResult
    );
  }
}
