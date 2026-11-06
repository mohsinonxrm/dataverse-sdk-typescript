import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_executeemailsentimentbot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_executeemailsentimentbotResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_executeemailsentimentbotResponse;
  }
}
