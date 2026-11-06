import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_executeemailsentimentbot action
 */
export interface msdyn_executeemailsentimentbotResponse {
  emailSentimentResponse: string;
}

/**
 * Parameters of the msdyn_executeemailsentimentbot action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeemailsentimentbotActionParameters {
  environmentId: string;
  emailId: string;
}

/**
 * msdyn_executeemailsentimentbot action
 *
 * Unbound action
 */
export class msdyn_executeemailsentimentbotAction implements Executable<msdyn_executeemailsentimentbotResponse> {
  constructor(public readonly parameters: msdyn_executeemailsentimentbotActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeemailsentimentbot`;

    const body = requestBody({
      environmentId: this.parameters.environmentId,
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

  async parseResponse(response: Response): Promise<msdyn_executeemailsentimentbotResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_executeemailsentimentbotResponse;
    return (await response.json()) as msdyn_executeemailsentimentbotResponse;
  }
}
