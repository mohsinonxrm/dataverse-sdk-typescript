import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_MigrateFeaturesToCoreService action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_MigrateFeaturesToCoreServiceResponse = void;

/**
 * Parameters of the msdyn_MigrateFeaturesToCoreService action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateFeaturesToCoreServiceActionParameters {
  InputData: string;
}

/**
 * msdyn_MigrateFeaturesToCoreService action
 *
 * Unbound action
 */
export class msdyn_MigrateFeaturesToCoreServiceAction implements Executable<msdyn_MigrateFeaturesToCoreServiceResponse> {
  constructor(public readonly parameters: msdyn_MigrateFeaturesToCoreServiceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateFeaturesToCoreService`;

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

  parseResponse(_response: Response): Promise<msdyn_MigrateFeaturesToCoreServiceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
