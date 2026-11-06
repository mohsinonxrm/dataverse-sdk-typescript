import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from cascadeAsync_SuccessAPI action
 */
export interface cascadeAsync_SuccessAPIResponse {
  // No content returned
}

/**
 * Parameters of the cascadeAsync_SuccessAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface cascadeAsync_SuccessAPIActionParameters {
  casadeAsync_JobName: string;
}

/**
 * cascadeAsync_SuccessAPI action
 *
 * Unbound action
 */
export class cascadeAsync_SuccessAPIAction implements Executable<cascadeAsync_SuccessAPIResponse> {
  constructor(public readonly parameters: cascadeAsync_SuccessAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cascadeAsync_SuccessAPI`;

    const body = requestBody({
      casadeAsync_JobName: this.parameters.casadeAsync_JobName,
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

  async parseResponse(response: Response): Promise<cascadeAsync_SuccessAPIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as cascadeAsync_SuccessAPIResponse;
  }
}
