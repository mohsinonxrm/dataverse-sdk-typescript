import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerSummarySynthesizer action
 */
export interface msdyn_TriggerSummarySynthesizerResponse {
  IsSuccess: boolean;
  ErrorMessage: string;
}

/**
 * msdyn_TriggerSummarySynthesizer action
 *
 * Unbound action
 */
export class msdyn_TriggerSummarySynthesizerAction implements Executable<msdyn_TriggerSummarySynthesizerResponse> {
  constructor(public readonly triggerSummarySynthesizerRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSummarySynthesizer`;

    const body: Record<string, unknown> = {
      TriggerSummarySynthesizerRequest: this.triggerSummarySynthesizerRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerSummarySynthesizerResponse> {
    const data = await response.json();
    return data as msdyn_TriggerSummarySynthesizerResponse;
  }
}
