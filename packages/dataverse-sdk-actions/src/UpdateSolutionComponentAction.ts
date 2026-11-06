import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateSolutionComponent action
 */
export interface UpdateSolutionComponentResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<UpdateSolutionComponentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateSolutionComponentResponse;
    return (await response.json()) as UpdateSolutionComponentResponse;
  }
}
