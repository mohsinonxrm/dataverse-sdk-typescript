import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_HandoverNotifySingle request message
 *
 * Web API Action: msdyn_SalesAgents_HandoverNotifySingle
 */
export class msdyn_SalesAgents_HandoverNotifySingleRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_HandoverNotifySingleResponse>
{
  constructor(
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId: string,
    public msdyn_HandoverContext: string
  ) {
    super("msdyn_SalesAgents_HandoverNotifySingle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_HandoverNotifySingle`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_HandoverContext: this.msdyn_HandoverContext,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_HandoverNotifySingleResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_HandoverNotifySingleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_HandoverContext: this.msdyn_HandoverContext,
    };
  }
}

/**
 * msdyn_SalesAgents_HandoverNotifySingle response message
 */
export class msdyn_SalesAgents_HandoverNotifySingleResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_HandoverNotifySingleResponse) {
    super("msdyn_SalesAgents_HandoverNotifySingle");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_HandoverNotifySingleResponse {
    return new msdyn_SalesAgents_HandoverNotifySingleResponse((data as any).value);
  }
}
