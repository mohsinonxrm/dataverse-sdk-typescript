import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_processsentimentresponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_processsentimentresponseResponse {
  "@odata.context"?: string;
  sentimentResponse: string;
}

/**
 * Parameters of the msdyn_processsentimentresponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_processsentimentresponseActionParameters {
  conversationId: string;
  emailId: string;
  copilotResponse: string[];
}

/**
 * msdyn_processsentimentresponse action
 *
 * Unbound action
 */
export class msdyn_processsentimentresponseAction implements Executable<msdyn_processsentimentresponseResponse> {
  constructor(public readonly parameters: msdyn_processsentimentresponseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_processsentimentresponse`;

    const body = requestBody({
      conversationId: this.parameters.conversationId,
      emailId: this.parameters.emailId,
      copilotResponse: this.parameters.copilotResponse,
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

  async parseResponse(response: Response): Promise<msdyn_processsentimentresponseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_processsentimentresponseResponse;
  }
}
