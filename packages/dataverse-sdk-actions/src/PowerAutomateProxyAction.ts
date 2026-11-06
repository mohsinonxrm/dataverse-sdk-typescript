import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PowerAutomateProxy action
 */
export interface PowerAutomateProxyResponse {
  HttpStatusCode: number;
  ResponseHeaders: string;
  ResponseBody: string;
}

/**
 * Parameters of the PowerAutomateProxy action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PowerAutomateProxyActionParameters {
  HttpMethod: string;
  RelativeUrl: string;
  RequestHeaders?: string;
  RequestBody?: string;
}

/**
 * PowerAutomateProxy action
 *
 * Unbound action
 */
export class PowerAutomateProxyAction implements Executable<PowerAutomateProxyResponse> {
  constructor(public readonly parameters: PowerAutomateProxyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PowerAutomateProxy`;

    const body = requestBody({
      HttpMethod: this.parameters.HttpMethod,
      RelativeUrl: this.parameters.RelativeUrl,
      RequestHeaders: this.parameters.RequestHeaders,
      RequestBody: this.parameters.RequestBody,
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

  async parseResponse(response: Response): Promise<PowerAutomateProxyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PowerAutomateProxyResponse;
    return (await response.json()) as PowerAutomateProxyResponse;
  }
}
