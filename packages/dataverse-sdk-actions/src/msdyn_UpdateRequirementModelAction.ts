import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateRequirementModel action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateRequirementModelResponse = void;

/**
 * Parameters of the msdyn_UpdateRequirementModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRequirementModelActionParameters {
  From?: string;
  To?: string;
  RequirementGroupId?: string;
  Attributes: string;
}

/**
 * msdyn_UpdateRequirementModel action
 *
 * Unbound action
 */
export class msdyn_UpdateRequirementModelAction implements Executable<msdyn_UpdateRequirementModelResponse> {
  constructor(public readonly parameters: msdyn_UpdateRequirementModelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementModel`;

    const body = requestBody({
      From: this.parameters.From,
      To: this.parameters.To,
      RequirementGroupId: this.parameters.RequirementGroupId,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateRequirementModelResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
