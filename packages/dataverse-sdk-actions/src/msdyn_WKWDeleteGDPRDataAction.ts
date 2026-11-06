import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_WKWDeleteGDPRData action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_WKWDeleteGDPRDataResponse = void;

/**
 * Parameters of the msdyn_WKWDeleteGDPRData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WKWDeleteGDPRDataActionParameters {
  UserIds: string[];
}

/**
 * msdyn_WKWDeleteGDPRData action
 *
 * Unbound action
 */
export class msdyn_WKWDeleteGDPRDataAction implements Executable<msdyn_WKWDeleteGDPRDataResponse> {
  constructor(public readonly parameters: msdyn_WKWDeleteGDPRDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWDeleteGDPRData`;

    const body = requestBody({
      UserIds: this.parameters.UserIds,
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

  parseResponse(_response: Response): Promise<msdyn_WKWDeleteGDPRDataResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
