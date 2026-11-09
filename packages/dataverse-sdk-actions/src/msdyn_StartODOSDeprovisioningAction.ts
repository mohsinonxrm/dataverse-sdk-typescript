import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartODOSDeprovisioning action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_StartODOSDeprovisioningResponse = void;

/**
 * Parameters of the msdyn_StartODOSDeprovisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartODOSDeprovisioningActionParameters {
  FeatureName: string;
  IsDeprecationDeprovisioning?: boolean;
}

/**
 * msdyn_StartODOSDeprovisioning action
 *
 * Unbound action
 */
export class msdyn_StartODOSDeprovisioningAction implements Executable<msdyn_StartODOSDeprovisioningResponse> {
  constructor(public readonly parameters: msdyn_StartODOSDeprovisioningActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartODOSDeprovisioning`;

    const body = requestBody({
      FeatureName: this.parameters.FeatureName,
      IsDeprecationDeprovisioning: this.parameters.IsDeprecationDeprovisioning,
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

  parseResponse(_response: Response): Promise<msdyn_StartODOSDeprovisioningResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
