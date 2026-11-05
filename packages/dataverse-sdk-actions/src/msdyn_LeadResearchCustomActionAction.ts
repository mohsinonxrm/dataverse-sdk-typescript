import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LeadResearchCustomAction action
 */
export interface msdyn_LeadResearchCustomActionResponse {
  ResearchResponse: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_LeadResearchCustomAction action
 *
 * Unbound action
 */
export class msdyn_LeadResearchCustomActionAction implements Executable<msdyn_LeadResearchCustomActionResponse> {
  constructor(public readonly researchRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadResearchCustomAction`;

    const body: Record<string, unknown> = {
      ResearchRequest: this.researchRequest,
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

  async parseResponse(response: Response): Promise<msdyn_LeadResearchCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_LeadResearchCustomActionResponse;
  }
}
