import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_TriggerOutreachAgent request message
 *
 * Web API Action: msdyn_SalesAgents_TriggerOutreachAgent
 */
export class msdyn_SalesAgents_TriggerOutreachAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_TriggerOutreachAgentResponse>
{
  constructor(
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_OutreachConfig: string
  ) {
    super("msdyn_SalesAgents_TriggerOutreachAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_TriggerOutreachAgent`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_TriggerOutreachAgentResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_TriggerOutreachAgentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
    };
  }
}

/**
 * msdyn_SalesAgents_TriggerOutreachAgent response message
 */
export class msdyn_SalesAgents_TriggerOutreachAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_TriggerOutreachAgentResponse) {
    super("msdyn_SalesAgents_TriggerOutreachAgent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_TriggerOutreachAgentResponse {
    return new msdyn_SalesAgents_TriggerOutreachAgentResponse((data as any).value);
  }
}
