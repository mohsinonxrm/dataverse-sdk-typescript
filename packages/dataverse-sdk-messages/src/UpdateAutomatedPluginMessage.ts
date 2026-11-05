import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateAutomatedPlugin request message
 *
 * Web API Action: UpdateAutomatedPlugin
 */
export class UpdateAutomatedPluginRequest
  extends OrganizationRequest
  implements Executable<UpdateAutomatedPluginResponse>
{
  constructor(
    public expression: string,
    public solutionUniqueName: string,
    public entityLogicalName: string,
    public context: string,
    public name: string,
    public stage: number,
    public fxExpressionUniqueName: string,
    public messageName: string
  ) {
    super("UpdateAutomatedPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateAutomatedPlugin`;

    const body: Record<string, unknown> = {
      Expression: this.expression,
      SolutionUniqueName: this.solutionUniqueName,
      EntityLogicalName: this.entityLogicalName,
      Context: this.context,
      Name: this.name,
      Stage: this.stage,
      FxExpressionUniqueName: this.fxExpressionUniqueName,
      MessageName: this.messageName,
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

  async parseResponse(response: Response): Promise<UpdateAutomatedPluginResponse> {
    // No return value (204 No Content)
    return new UpdateAutomatedPluginResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Expression: this.expression,
      SolutionUniqueName: this.solutionUniqueName,
      EntityLogicalName: this.entityLogicalName,
      Context: this.context,
      Name: this.name,
      Stage: this.stage,
      FxExpressionUniqueName: this.fxExpressionUniqueName,
      MessageName: this.messageName,
    };
  }
}

/**
 * UpdateAutomatedPlugin response message
 */
export class UpdateAutomatedPluginResponse extends OrganizationResponse {
  constructor() {
    super("UpdateAutomatedPlugin");
  }

  static fromResponse(_data: unknown): UpdateAutomatedPluginResponse {
    return new UpdateAutomatedPluginResponse();
  }
}
