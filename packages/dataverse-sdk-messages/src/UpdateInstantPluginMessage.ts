import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateInstantPlugin request message
 *
 * Web API Action: UpdateInstantPlugin
 */
export class UpdateInstantPluginRequest
  extends OrganizationRequest
  implements Executable<UpdateInstantPluginResponse>
{
  constructor(
    public description: string,
    public fxExpressionUniqueName: string,
    public parameters: string,
    public context: string,
    public entityLogicalName: string,
    public solutionUniqueName: string,
    public expression: string,
    public name: string
  ) {
    super("UpdateInstantPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateInstantPlugin`;

    const body: Record<string, unknown> = {
      Description: this.description,
      FxExpressionUniqueName: this.fxExpressionUniqueName,
      Parameters: this.parameters,
      Context: this.context,
      EntityLogicalName: this.entityLogicalName,
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      Name: this.name,
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

  async parseResponse(response: Response): Promise<UpdateInstantPluginResponse> {
    // No return value (204 No Content)
    return new UpdateInstantPluginResponse();
  }
}

/**
 * UpdateInstantPlugin response message
 */
export class UpdateInstantPluginResponse extends OrganizationResponse {
  constructor() {
    super("UpdateInstantPlugin");
  }

  static fromResponse(_data: unknown): UpdateInstantPluginResponse {
    return new UpdateInstantPluginResponse();
  }
}
