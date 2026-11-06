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
  Expression?: string;
  SolutionUniqueName?: string;
  EntityLogicalName?: string;
  Context?: string;
  Name?: string;
  Stage?: number;
  FxExpressionUniqueName: string;
  MessageName?: string;
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
      Expression: this.parameters.Expression,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Context: this.parameters.Context,
      Name: this.parameters.Name,
      Stage: this.parameters.Stage,
      FxExpressionUniqueName: this.parameters.FxExpressionUniqueName,
      MessageName: this.parameters.MessageName,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateAutomatedPluginResponse;
  }
}
