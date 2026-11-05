import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SummarySynthesizerStatus action
 */
export interface msdyn_SummarySynthesizerStatusResponse {
  IsSuccess: boolean;
  IsComplete: boolean;
  ErrorMessage: string;
}

/**
 * msdyn_SummarySynthesizerStatus action
 *
 * Unbound action
 */
export class msdyn_SummarySynthesizerStatusAction implements Executable<msdyn_SummarySynthesizerStatusResponse> {
  constructor(public readonly leadId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SummarySynthesizerStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    const data = await response.json();
    return data as msdyn_SummarySynthesizerStatusResponse;
  }
}
