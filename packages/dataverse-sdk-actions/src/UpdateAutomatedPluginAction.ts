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
    public readonly expression: string | undefined,
    public readonly solutionUniqueName: string | undefined,
    public readonly entityLogicalName: string | undefined,
    public readonly context: string | undefined,
    public readonly name: string | undefined,
    public readonly stage: number | undefined,
    public readonly fxExpressionUniqueName: string,
    public readonly messageName?: string
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
