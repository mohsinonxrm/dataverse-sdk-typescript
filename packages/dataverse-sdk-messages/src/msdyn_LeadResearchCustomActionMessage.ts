import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LeadResearchCustomAction request message
 *
 * Web API Action: msdyn_LeadResearchCustomAction
 */
export class msdyn_LeadResearchCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LeadResearchCustomActionResponse>
{
  constructor(public researchRequest: string) {
    super("msdyn_LeadResearchCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadResearchCustomAction`;

    const body: Record<string, unknown> = {
      ResearchRequest: this.researchRequest,
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

  async parseResponse(response: Response): Promise<msdyn_LeadResearchCustomActionResponse> {
    const data = await response.json();
    return msdyn_LeadResearchCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ResearchRequest: this.researchRequest,
    };
  }
}

/**
 * msdyn_LeadResearchCustomAction response message
 */
export class msdyn_LeadResearchCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LeadResearchCustomActionResponse) {
    super("msdyn_LeadResearchCustomAction");
  }

  static fromResponse(data: unknown): msdyn_LeadResearchCustomActionResponse {
    return new msdyn_LeadResearchCustomActionResponse((data as any).value);
  }
}
