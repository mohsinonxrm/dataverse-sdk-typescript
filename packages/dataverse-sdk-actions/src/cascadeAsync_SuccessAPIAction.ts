import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the cascadeAsync_SuccessAPI action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type cascadeAsync_SuccessAPIResponse = void;

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

  parseResponse(_response: Response): Promise<cascadeAsync_SuccessAPIResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
