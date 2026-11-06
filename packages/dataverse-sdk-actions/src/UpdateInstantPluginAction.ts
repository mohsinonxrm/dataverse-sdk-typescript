import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateInstantPlugin action
 */
export interface UpdateInstantPluginResponse {
  // No content returned
}

/**
 * UpdateInstantPlugin action
 *
 * Unbound action
 */
export class UpdateInstantPluginAction implements Executable<UpdateInstantPluginResponse> {
  constructor(
    public readonly description: string | undefined,
    public readonly fxExpressionUniqueName: string,
    public readonly parameters?: string,
    public readonly context?: string,
    public readonly entityLogicalName?: string,
    public readonly solutionUniqueName?: string,
    public readonly expression?: string,
    public readonly name?: string
  ) {}

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
    return {};
  }
}
