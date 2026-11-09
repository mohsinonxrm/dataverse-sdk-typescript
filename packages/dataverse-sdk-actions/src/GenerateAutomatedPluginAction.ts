import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GenerateAutomatedPlugin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GenerateAutomatedPluginResponse {
  "@odata.context"?: string;
  FxExpressionId: string;
  pluginid: string;
}

/**
 * Parameters of the GenerateAutomatedPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateAutomatedPluginActionParameters {
  SolutionUniqueName?: string;
  Name: string;
  MessageName: string;
  Stage: number;
  EntityLogicalName: string;
  Expression: string;
  Context?: string;
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
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Name: this.parameters.Name,
      MessageName: this.parameters.MessageName,
      Stage: this.parameters.Stage,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Expression: this.parameters.Expression,
      Context: this.parameters.Context,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GenerateAutomatedPluginResponse;
  }
}
