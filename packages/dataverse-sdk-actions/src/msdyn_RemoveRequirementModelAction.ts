import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RemoveRequirementModel action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_RemoveRequirementModelResponse = void;

/**
 * Parameters of the msdyn_RemoveRequirementModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RemoveRequirementModelActionParameters {
  Attributes: string;
}

/**
 * msdyn_RemoveRequirementModel action
 *
 * Unbound action
 */
export class msdyn_RemoveRequirementModelAction implements Executable<msdyn_RemoveRequirementModelResponse> {
  constructor(public readonly parameters: msdyn_RemoveRequirementModelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RemoveRequirementModel`;

    const body = requestBody({
      Attributes: this.parameters.Attributes,
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

  parseResponse(_response: Response): Promise<msdyn_RemoveRequirementModelResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
