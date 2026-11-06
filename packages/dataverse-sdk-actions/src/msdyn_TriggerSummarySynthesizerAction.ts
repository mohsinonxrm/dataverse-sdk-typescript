import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerSummarySynthesizer action
 */
export interface msdyn_TriggerSummarySynthesizerResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_TriggerSummarySynthesizer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerSummarySynthesizerActionParameters {
  TriggerSummarySynthesizerRequest: string;
}

/**
 * msdyn_TriggerSummarySynthesizer action
 *
 * Unbound action
 */
export class msdyn_TriggerSummarySynthesizerAction implements Executable<msdyn_TriggerSummarySynthesizerResponse> {
  constructor(public readonly parameters: msdyn_TriggerSummarySynthesizerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSummarySynthesizer`;

    const body = requestBody({
      TriggerSummarySynthesizerRequest: this.parameters.TriggerSummarySynthesizerRequest,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerSummarySynthesizerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerSummarySynthesizerResponse;
    return (await response.json()) as msdyn_TriggerSummarySynthesizerResponse;
  }
}
