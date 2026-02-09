import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent request message
 *
 * Web API Action: msdyn_SalesAgents_FetchOutreachEmailForAgent
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse>
{
  constructor(
    public msdyn_SalesAgentRunId: string,
    public msdyn_RegardingEntityName: string,
    public msdyn_TrackingId: string,
    public msdyn_OutreachConfig: string,
    public msdyn_RegardingEntityId: string
  ) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_FetchOutreachEmailForAgent`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRunId: this.msdyn_SalesAgentRunId,
      msdyn_RegardingEntityName: this.msdyn_RegardingEntityName,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.msdyn_RegardingEntityId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_FetchOutreachEmailForAgentResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_FetchOutreachEmailForAgentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentRunId: this.msdyn_SalesAgentRunId,
      msdyn_RegardingEntityName: this.msdyn_RegardingEntityName,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_OutreachConfig: this.msdyn_OutreachConfig,
      msdyn_RegardingEntityId: this.msdyn_RegardingEntityId,
    };
  }
}

/**
 * msdyn_SalesAgents_FetchOutreachEmailForAgent response message
 */
export class msdyn_SalesAgents_FetchOutreachEmailForAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_FetchOutreachEmailForAgentResponse) {
    super("msdyn_SalesAgents_FetchOutreachEmailForAgent");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_FetchOutreachEmailForAgentResponse {
    return new msdyn_SalesAgents_FetchOutreachEmailForAgentResponse((data as any).value);
  }
}
