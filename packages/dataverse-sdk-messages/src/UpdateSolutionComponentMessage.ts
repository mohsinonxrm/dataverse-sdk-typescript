import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateSolutionComponent request message
 *
 * Web API Action: UpdateSolutionComponent
 */
export class UpdateSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<UpdateSolutionComponentResponse>
{
  constructor(
    public componentId: string,
    public componentType: number,
    public solutionUniqueName: string,
    public includedComponentSettingsValues?: string[]
  ) {
    super("UpdateSolutionComponent");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateSolutionComponentResponse> {
    // No return value (204 No Content)
    return new UpdateSolutionComponentResponse();
  }
}

/**
 * UpdateSolutionComponent response message
 */
export class UpdateSolutionComponentResponse extends OrganizationResponse {
  constructor() {
    super("UpdateSolutionComponent");
  }

  static fromResponse(_data: unknown): UpdateSolutionComponentResponse {
    return new UpdateSolutionComponentResponse();
  }
}
