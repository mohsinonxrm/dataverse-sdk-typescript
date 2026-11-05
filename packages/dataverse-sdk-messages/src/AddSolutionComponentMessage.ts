import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddSolutionComponent request message
 *
 * Web API Action: AddSolutionComponent
 */
export class AddSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<AddSolutionComponentResponse>
{
  constructor(
    public componentId: string,
    public componentType: number,
    public solutionUniqueName: string,
    public addRequiredComponents: boolean,
    public doNotIncludeSubcomponents: boolean,
    public includedComponentSettingsValues: string[]
  ) {
    super("AddSolutionComponent");
  }

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
    return AddSolutionComponentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ComponentId: this.componentId,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
      AddRequiredComponents: this.addRequiredComponents,
      DoNotIncludeSubcomponents: this.doNotIncludeSubcomponents,
      IncludedComponentSettingsValues: this.includedComponentSettingsValues,
    };
  }
}

/**
 * AddSolutionComponent response message
 */
export class AddSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: AddSolutionComponentResponse) {
    super("AddSolutionComponent");
  }

  static fromResponse(data: unknown): AddSolutionComponentResponse {
    return new AddSolutionComponentResponse((data as any).value);
  }
}
