import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OpportunityResearchResultUserAction request message
 *
 * Web API Action: msdyn_OpportunityResearchResultUserAction
 */
export class msdyn_OpportunityResearchResultUserActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OpportunityResearchResultUserActionResponse>
{
  constructor(
    public id: string,
    public action: string,
    public topic: string,
    public macroAgentOrchestrationId: string,
    public opportunityId: string
  ) {
    super("msdyn_OpportunityResearchResultUserAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OpportunityResearchResultUserAction`;

    const body: Record<string, unknown> = {
      Id: this.id,
      Action: this.action,
      Topic: this.topic,
      MacroAgentOrchestrationId: this.macroAgentOrchestrationId,
      OpportunityId: this.opportunityId,
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
  ): Promise<msdyn_OpportunityResearchResultUserActionResponse> {
    const data = await response.json();
    return msdyn_OpportunityResearchResultUserActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Id: this.id,
      Action: this.action,
      Topic: this.topic,
      MacroAgentOrchestrationId: this.macroAgentOrchestrationId,
      OpportunityId: this.opportunityId,
    };
  }
}

/**
 * msdyn_OpportunityResearchResultUserAction response message
 */
export class msdyn_OpportunityResearchResultUserActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_OpportunityResearchResultUserActionResponse) {
    super("msdyn_OpportunityResearchResultUserAction");
  }

  static fromResponse(data: unknown): msdyn_OpportunityResearchResultUserActionResponse {
    return new msdyn_OpportunityResearchResultUserActionResponse((data as any).value);
  }
}
