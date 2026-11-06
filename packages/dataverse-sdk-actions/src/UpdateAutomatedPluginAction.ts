import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateAutomatedPlugin action
 */
export interface UpdateAutomatedPluginResponse {
  // No content returned
}

/**
 * Parameters of the UpdateAutomatedPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateAutomatedPluginActionParameters {
  SolutionUniqueName?: string;
  Expression?: string;
  FxExpressionUniqueName: string;
  Stage?: number;
  EntityLogicalName?: string;
  Context?: string;
  MessageName?: string;
  Name?: string;
}

/**
 * UpdateAutomatedPlugin action
 *
 * Unbound action
 */
export class UpdateAutomatedPluginAction implements Executable<UpdateAutomatedPluginResponse> {
  constructor(public readonly parameters: UpdateAutomatedPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateAutomatedPlugin`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Expression: this.parameters.Expression,
      FxExpressionUniqueName: this.parameters.FxExpressionUniqueName,
      Stage: this.parameters.Stage,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Context: this.parameters.Context,
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

  async parseResponse(response: Response): Promise<UpdateAutomatedPluginResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateAutomatedPluginResponse;
    return (await response.json()) as UpdateAutomatedPluginResponse;
  }
}
