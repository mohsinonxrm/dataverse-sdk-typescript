import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GenerateAutomatedPlugin action
 */
export interface GenerateAutomatedPluginResponse {
  FxExpressionId: string;
  pluginid: string;
}

/**
 * GenerateAutomatedPlugin action
 *
 * Unbound action
 */
export class GenerateAutomatedPluginAction implements Executable<GenerateAutomatedPluginResponse> {
  constructor(
    public readonly stage: number,
    public readonly context: string,
    public readonly solutionUniqueName: string,
    public readonly expression: string,
    public readonly entityLogicalName: string,
    public readonly messageName: string,
    public readonly name: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateAutomatedPlugin`;

    const body: Record<string, unknown> = {
      Stage: this.stage,
      Context: this.context,
      SolutionUniqueName: this.solutionUniqueName,
      Expression: this.expression,
      EntityLogicalName: this.entityLogicalName,
      MessageName: this.messageName,
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

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    const data = await response.json();
    return data as GenerateAutomatedPluginResponse;
  }
}
