import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SummarySynthesizerStatus action
 */
export interface msdyn_SummarySynthesizerStatusResponse {
  IsSuccess: boolean;
  IsComplete: boolean;
  ErrorMessage: string;
}

/**
 * Parameters of the msdyn_SummarySynthesizerStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SummarySynthesizerStatusActionParameters {
  LeadId: string;
}

/**
 * msdyn_SummarySynthesizerStatus action
 *
 * Unbound action
 */
export class msdyn_SummarySynthesizerStatusAction implements Executable<msdyn_SummarySynthesizerStatusResponse> {
  constructor(public readonly parameters: msdyn_SummarySynthesizerStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SummarySynthesizerStatus`;

    const body = requestBody({
      LeadId: this.parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SummarySynthesizerStatusResponse;
    return (await response.json()) as msdyn_SummarySynthesizerStatusResponse;
  }
}
