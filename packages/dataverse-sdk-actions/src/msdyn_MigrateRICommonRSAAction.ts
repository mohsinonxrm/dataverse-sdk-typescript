import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_MigrateRICommonRSA action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_MigrateRICommonRSAResponse = void;

/**
 * Parameters of the msdyn_MigrateRICommonRSA action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateRICommonRSAActionParameters {
  InputData: string;
}

/**
 * msdyn_MigrateRICommonRSA action
 *
 * Unbound action
 */
export class msdyn_MigrateRICommonRSAAction implements Executable<msdyn_MigrateRICommonRSAResponse> {
  constructor(public readonly parameters: msdyn_MigrateRICommonRSAActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateRICommonRSA`;

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

  parseResponse(_response: Response): Promise<msdyn_MigrateRICommonRSAResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
