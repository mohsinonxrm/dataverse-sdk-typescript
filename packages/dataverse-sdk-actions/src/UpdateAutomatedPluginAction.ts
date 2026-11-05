import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateAutomatedPlugin action
 */
export interface UpdateAutomatedPluginResponse {
  // No content returned
}

/**
 * UpdateAutomatedPlugin action
 *
 * Unbound action
 */
export class UpdateAutomatedPluginAction implements Executable<UpdateAutomatedPluginResponse> {
  constructor(
    public readonly expression: string,
    public readonly solutionUniqueName: string,
    public readonly entityLogicalName: string,
    public readonly context: string,
    public readonly name: string,
    public readonly stage: number,
    public readonly fxExpressionUniqueName: string,
    public readonly messageName: string
  ) {}

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
    return {};
  }
}
