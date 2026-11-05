import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProcessPostProposalFollowup request message
 *
 * Web API Action: msdyn_ProcessPostProposalFollowup
 */
export class msdyn_ProcessPostProposalFollowupRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessPostProposalFollowupResponse>
{
  constructor(
    public msdyn_Thread: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_ProcessPostProposalFollowup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessPostProposalFollowup`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };

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
    const data = await response.json();
    return msdyn_ProcessPostProposalFollowupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_ProcessPostProposalFollowup response message
 */
export class msdyn_ProcessPostProposalFollowupResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessPostProposalFollowupResponse) {
    super("msdyn_ProcessPostProposalFollowup");
  }

  static fromResponse(data: unknown): msdyn_ProcessPostProposalFollowupResponse {
    return new msdyn_ProcessPostProposalFollowupResponse((data as any).value);
  }
}
