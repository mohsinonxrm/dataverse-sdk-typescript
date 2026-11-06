import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateSolutionComponent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateSolutionComponentResponse = void;

/**
 * Parameters of the UpdateSolutionComponent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateSolutionComponentActionParameters {
  ComponentId: string;
  ComponentType: number;
  SolutionUniqueName: string;
  IncludedComponentSettingsValues?: string[];
}

/**
 * UpdateSolutionComponent action
 *
 * Unbound action
 */
export class UpdateSolutionComponentAction implements Executable<UpdateSolutionComponentResponse> {
  constructor(public readonly parameters: UpdateSolutionComponentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateSolutionComponent`;

    const body = requestBody({
      ComponentId: this.parameters.ComponentId,
      ComponentType: this.parameters.ComponentType,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      IncludedComponentSettingsValues: this.parameters.IncludedComponentSettingsValues,
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

  parseResponse(_response: Response): Promise<UpdateSolutionComponentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
