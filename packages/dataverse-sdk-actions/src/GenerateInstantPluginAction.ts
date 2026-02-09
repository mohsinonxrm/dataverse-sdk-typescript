import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GenerateInstantPlugin action
 */
export interface GenerateInstantPluginResponse {
  msdyn_functionid: string;
  CustomApiId: string;
  FxExpressionId: string;
}

/**
 * GenerateInstantPlugin action
 *
 * Unbound action
 */
export class GenerateInstantPluginAction implements Executable<GenerateInstantPluginResponse> {
  constructor(
    public readonly solutionUniqueName: string,
    public readonly expression: string,
    public readonly context: string,
    public readonly description: string,
    public readonly entityLogicalName: string,
    public readonly parameters: string,
    public readonly name: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInstantPlugin`;

    const body: Record<string, unknown> = {
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      Context: this.context,
      Description: this.description,
      EntityLogicalName: this.entityLogicalName,
      Parameters: this.parameters,
      Name: this.name,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    const data = await response.json();
    return data as GenerateInstantPluginResponse;
  }
}
