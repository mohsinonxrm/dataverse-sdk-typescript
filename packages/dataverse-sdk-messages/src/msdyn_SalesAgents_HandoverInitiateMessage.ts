import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_HandoverInitiate request message
 *
 * Web API Action: msdyn_SalesAgents_HandoverInitiate
 */
export class msdyn_SalesAgents_HandoverInitiateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_HandoverInitiateResponse>
{
  constructor(
    public msdyn_AssignTo: number,
    public msdyn_HandoverIntent: number,
    public msdyn_GetHandoverDetailsInfo: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_HandoverTarget: number,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_HandoverInitiate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverInitiate`;

    const body: Record<string, unknown> = {
      msdyn_AssignTo: this.msdyn_AssignTo,
      msdyn_HandoverIntent: this.msdyn_HandoverIntent,
      msdyn_GetHandoverDetailsInfo: this.msdyn_GetHandoverDetailsInfo,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.msdyn_HandoverTarget,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverInitiateResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_HandoverInitiateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_AssignTo: this.msdyn_AssignTo,
      msdyn_HandoverIntent: this.msdyn_HandoverIntent,
      msdyn_GetHandoverDetailsInfo: this.msdyn_GetHandoverDetailsInfo,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_HandoverTarget: this.msdyn_HandoverTarget,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_SalesAgents_HandoverInitiate response message
 */
export class msdyn_SalesAgents_HandoverInitiateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverInitiateResponse) {
    super("msdyn_SalesAgents_HandoverInitiate");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverInitiateResponse {
    return new msdyn_SalesAgents_HandoverInitiateResponse((data as any).value);
  }
}
