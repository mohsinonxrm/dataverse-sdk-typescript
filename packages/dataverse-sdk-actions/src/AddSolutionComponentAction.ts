import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddSolutionComponent action
 */
export interface AddSolutionComponentResponse {
  id: string;
}

/**
 * AddSolutionComponent action
 *
 * Unbound action
 */
export class AddSolutionComponentAction implements Executable<AddSolutionComponentResponse> {
  constructor(
    public readonly componentId: string,
    public readonly componentType: number,
    public readonly solutionUniqueName: string,
    public readonly addRequiredComponents: boolean,
    public readonly doNotIncludeSubcomponents?: boolean,
    public readonly includedComponentSettingsValues?: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddSolutionComponent`;

    const body: Record<string, unknown> = {
      ComponentId: this.componentId,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
      AddRequiredComponents: this.addRequiredComponents,
      DoNotIncludeSubcomponents: this.doNotIncludeSubcomponents,
      IncludedComponentSettingsValues: this.includedComponentSettingsValues,
    };

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
    const data = await response.json();
    return data as AddSolutionComponentResponse;
  }
}
