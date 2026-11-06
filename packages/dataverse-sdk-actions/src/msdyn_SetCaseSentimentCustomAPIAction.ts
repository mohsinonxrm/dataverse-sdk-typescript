import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SetCaseSentimentCustomAPI action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SetCaseSentimentCustomAPIResponse = void;

/**
 * Parameters of the msdyn_SetCaseSentimentCustomAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetCaseSentimentCustomAPIActionParameters {
  emailId: string;
}

/**
 * msdyn_SetCaseSentimentCustomAPI action
 *
 * Unbound action
 */
export class msdyn_SetCaseSentimentCustomAPIAction implements Executable<msdyn_SetCaseSentimentCustomAPIResponse> {
  constructor(public readonly parameters: msdyn_SetCaseSentimentCustomAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetCaseSentimentCustomAPI`;

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

  parseResponse(_response: Response): Promise<msdyn_SetCaseSentimentCustomAPIResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
