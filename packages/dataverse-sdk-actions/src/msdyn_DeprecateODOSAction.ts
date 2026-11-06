import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DeprecateODOS action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DeprecateODOSResponse = void;

/**
 * Parameters of the msdyn_DeprecateODOS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeprecateODOSActionParameters {
  InputData: string;
}

/**
 * msdyn_DeprecateODOS action
 *
 * Unbound action
 */
export class msdyn_DeprecateODOSAction implements Executable<msdyn_DeprecateODOSResponse> {
  constructor(public readonly parameters: msdyn_DeprecateODOSActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprecateODOS`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_DeprecateODOSResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
