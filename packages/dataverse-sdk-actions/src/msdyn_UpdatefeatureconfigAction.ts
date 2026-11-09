import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_Updatefeatureconfig action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdatefeatureconfigResponse = void;

/**
 * Parameters of the msdyn_Updatefeatureconfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatefeatureconfigActionParameters {
  featureType?: number;
  configuration?: string;
}

/**
 * msdyn_Updatefeatureconfig action
 *
 * Unbound action
 */
export class msdyn_UpdatefeatureconfigAction implements Executable<msdyn_UpdatefeatureconfigResponse> {
  constructor(public readonly parameters: msdyn_UpdatefeatureconfigActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Updatefeatureconfig`;

    const body = requestBody({
      featureType: this.parameters.featureType,
      configuration: this.parameters.configuration,
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

  parseResponse(_response: Response): Promise<msdyn_UpdatefeatureconfigResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
