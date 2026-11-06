import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GenerateAutomatedPlugin action
 */
export interface GenerateAutomatedPluginResponse {
  FxExpressionId: string;
  pluginid: string;
}

/**
 * Parameters of the GenerateAutomatedPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateAutomatedPluginActionParameters {
  Stage: number;
  Context?: string;
  SolutionUniqueName?: string;
  Expression: string;
  EntityLogicalName: string;
  MessageName: string;
  Name: string;
}

/**
 * GenerateAutomatedPlugin action
 *
 * Unbound action
 */
export class GenerateAutomatedPluginAction implements Executable<GenerateAutomatedPluginResponse> {
  constructor(public readonly parameters: GenerateAutomatedPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateAutomatedPlugin`;

    const body = requestBody({
      Stage: this.parameters.Stage,
      Context: this.parameters.Context,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Expression: this.parameters.Expression,
      EntityLogicalName: this.parameters.EntityLogicalName,
      MessageName: this.parameters.MessageName,
      Name: this.parameters.Name,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GenerateAutomatedPluginResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateAutomatedPluginResponse;
    return (await response.json()) as GenerateAutomatedPluginResponse;
  }
}
