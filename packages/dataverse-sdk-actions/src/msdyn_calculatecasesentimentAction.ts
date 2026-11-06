import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_calculatecasesentiment action
 */
export interface msdyn_calculatecasesentimentResponse {
  SentimentLabel: number;
}

/**
 * Parameters of the msdyn_calculatecasesentiment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_calculatecasesentimentActionParameters {
  CaseId: string;
}

/**
 * msdyn_calculatecasesentiment action
 *
 * Unbound action
 */
export class msdyn_calculatecasesentimentAction implements Executable<msdyn_calculatecasesentimentResponse> {
  constructor(public readonly parameters: msdyn_calculatecasesentimentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_calculatecasesentiment`;

    const body = requestBody({
      CaseId: this.parameters.CaseId,
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

  async parseResponse(response: Response): Promise<msdyn_calculatecasesentimentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_calculatecasesentimentResponse;
    return (await response.json()) as msdyn_calculatecasesentimentResponse;
  }
}
