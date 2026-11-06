import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AddSolutionComponent action
 */
export interface AddSolutionComponentResponse {
  id: string;
}

/**
 * Parameters of the AddSolutionComponent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddSolutionComponentActionParameters {
  ComponentId: string;
  ComponentType: number;
  SolutionUniqueName: string;
  AddRequiredComponents: boolean;
  DoNotIncludeSubcomponents?: boolean;
  IncludedComponentSettingsValues?: string[];
}

/**
 * AddSolutionComponent action
 *
 * Unbound action
 */
export class AddSolutionComponentAction implements Executable<AddSolutionComponentResponse> {
  constructor(public readonly parameters: AddSolutionComponentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddSolutionComponent`;

    const body = requestBody({
      ComponentId: this.parameters.ComponentId,
      ComponentType: this.parameters.ComponentType,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      AddRequiredComponents: this.parameters.AddRequiredComponents,
      DoNotIncludeSubcomponents: this.parameters.DoNotIncludeSubcomponents,
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

  async parseResponse(response: Response): Promise<AddSolutionComponentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AddSolutionComponentResponse;
    return (await response.json()) as AddSolutionComponentResponse;
  }
}
