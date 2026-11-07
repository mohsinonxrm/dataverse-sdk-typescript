import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartRIProvisioning action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_StartRIProvisioningResponse = void;

/**
 * Parameters of the msdyn_StartRIProvisioning action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartRIProvisioningActionParameters {
  HubName?: string;
  PrimaryKey?: string;
}

/**
 * msdyn_StartRIProvisioning action
 *
 * Unbound action
 */
export class msdyn_StartRIProvisioningAction implements Executable<msdyn_StartRIProvisioningResponse> {
  constructor(public readonly parameters: msdyn_StartRIProvisioningActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartRIProvisioning`;

    const body = requestBody({
      HubName: this.parameters.HubName,
      PrimaryKey: this.parameters.PrimaryKey,
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

  parseResponse(_response: Response): Promise<msdyn_StartRIProvisioningResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
