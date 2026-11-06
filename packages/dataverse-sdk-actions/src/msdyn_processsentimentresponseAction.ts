import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_processsentimentresponse action
 */
export interface msdyn_processsentimentresponseResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_processsentimentresponseResponse;
    return (await response.json()) as msdyn_processsentimentresponseResponse;
  }
}
