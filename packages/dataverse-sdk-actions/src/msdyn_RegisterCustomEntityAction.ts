import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RegisterCustomEntity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_RegisterCustomEntityResponse = void;

/**
 * Parameters of the msdyn_RegisterCustomEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterCustomEntityActionParameters {
  EntityIds: string;
  EntityLogicalName: string;
  DeviceIds?: string;
  Names?: string;
  AccountIds?: string;
}

/**
 * msdyn_RegisterCustomEntity action
 *
 * Unbound action
 */
export class msdyn_RegisterCustomEntityAction implements Executable<msdyn_RegisterCustomEntityResponse> {
  constructor(public readonly parameters: msdyn_RegisterCustomEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterCustomEntity`;

    const body = requestBody({
      EntityIds: this.parameters.EntityIds,
      EntityLogicalName: this.parameters.EntityLogicalName,
      DeviceIds: this.parameters.DeviceIds,
      Names: this.parameters.Names,
      AccountIds: this.parameters.AccountIds,
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

  parseResponse(_response: Response): Promise<msdyn_RegisterCustomEntityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
