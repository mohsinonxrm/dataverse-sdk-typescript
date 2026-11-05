import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DraftOutreachEmail action
 */
export interface msdyn_DraftOutreachEmailResponse {
  IsSuccess: string;
  Result: string;
  ErrorMessage: string;
}

/**
 * msdyn_DraftOutreachEmail action
 *
 * Unbound action
 */
export class msdyn_DraftOutreachEmailAction implements Executable<msdyn_DraftOutreachEmailResponse> {
  constructor(public readonly leadId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftOutreachEmail`;

    const body: Record<string, unknown> = {
      LeadId: this.leadId,
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

  async parseResponse(response: Response): Promise<msdyn_DraftOutreachEmailResponse> {
    const data = await response.json();
    return data as msdyn_DraftOutreachEmailResponse;
  }
}
