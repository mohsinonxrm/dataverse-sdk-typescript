import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_emailsentimentflowaction action
 */
export interface msdyn_emailsentimentflowactionResponse {
  emailSentimentResponse: string;
}

/**
 * Parameters of the msdyn_emailsentimentflowaction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_emailsentimentflowactionActionParameters {
  emailId: string;
}

/**
 * msdyn_emailsentimentflowaction action
 *
 * Unbound action
 */
export class msdyn_emailsentimentflowactionAction implements Executable<msdyn_emailsentimentflowactionResponse> {
  constructor(public readonly parameters: msdyn_emailsentimentflowactionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailsentimentflowaction`;

    const body = requestBody({
      emailId: this.parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_emailsentimentflowactionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_emailsentimentflowactionResponse;
    return (await response.json()) as msdyn_emailsentimentflowactionResponse;
  }
}
