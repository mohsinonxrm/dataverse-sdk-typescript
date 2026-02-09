import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse request message
 *
 * Web API Action: msdyn_SalesAgents_ProcessEngageAgentResponse
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_ProcessEngageAgentResponseResponse>
{
  constructor(
    public msdyn_Thread: string,
    public msdyn_TrackingId: string,
    public msdyn_SalesMacroAgentType: number,
    public msdyn_SalesAgentRun: string,
    public msdyn_EngageAgentActivities: string
  ) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProcessEngageAgentResponse`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_EngageAgentActivities: this.msdyn_EngageAgentActivities,
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
  ): Promise<msdyn_SalesAgents_ProcessEngageAgentResponseResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_ProcessEngageAgentResponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_EngageAgentActivities: this.msdyn_EngageAgentActivities,
    };
  }
}

/**
 * msdyn_SalesAgents_ProcessEngageAgentResponse response message
 */
export class msdyn_SalesAgents_ProcessEngageAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_ProcessEngageAgentResponseResponse) {
    super("msdyn_SalesAgents_ProcessEngageAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_ProcessEngageAgentResponseResponse {
    return new msdyn_SalesAgents_ProcessEngageAgentResponseResponse((data as any).value);
  }
}
