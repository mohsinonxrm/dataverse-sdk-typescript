import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateSolutionComponent action
 */
export interface UpdateSolutionComponentResponse {
  // No content returned
}

/**
 * UpdateSolutionComponent action
 *
 * Unbound action
 */
export class UpdateSolutionComponentAction implements Executable<UpdateSolutionComponentResponse> {
  constructor(
    public readonly componentId: string,
    public readonly componentType: number,
    public readonly solutionUniqueName: string,
    public readonly includedComponentSettingsValues: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateSolutionComponent`;

    const body: Record<string, unknown> = {
      ComponentId: this.componentId,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
      IncludedComponentSettingsValues: this.includedComponentSettingsValues,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateSolutionComponentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
