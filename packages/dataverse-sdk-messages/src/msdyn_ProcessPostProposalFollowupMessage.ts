import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProcessPostProposalFollowupResponse as msdyn_ProcessPostProposalFollowupResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ProcessPostProposalFollowupResponse.fromResponse({});
    return msdyn_ProcessPostProposalFollowupResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProcessPostProposalFollowup response message
 */
export class msdyn_ProcessPostProposalFollowupResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessPostProposalFollowupResponseData) {
    super("msdyn_ProcessPostProposalFollowup");
  }

  static fromResponse(data: unknown): msdyn_ProcessPostProposalFollowupResponse {
    return new msdyn_ProcessPostProposalFollowupResponse(
      responseObject<msdyn_ProcessPostProposalFollowupResponseData>(data)
    );
  }
}
