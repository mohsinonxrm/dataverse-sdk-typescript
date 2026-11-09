import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ODOSMetadataCleanUp action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ODOSMetadataCleanUpResponse = void;

/**
 * Parameters of the msdyn_ODOSMetadataCleanUp action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ODOSMetadataCleanUpActionParameters {
  InputData: string;
}

/**
 * msdyn_ODOSMetadataCleanUp action
 *
 * Unbound action
 */
export class msdyn_ODOSMetadataCleanUpAction implements Executable<msdyn_ODOSMetadataCleanUpResponse> {
  constructor(public readonly parameters: msdyn_ODOSMetadataCleanUpActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ODOSMetadataCleanUp`;

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

  parseResponse(_response: Response): Promise<msdyn_ODOSMetadataCleanUpResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
