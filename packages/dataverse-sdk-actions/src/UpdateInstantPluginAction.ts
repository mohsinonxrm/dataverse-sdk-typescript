import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateInstantPlugin action
 */
export interface UpdateInstantPluginResponse {
  // No content returned
}

/**
 * Parameters of the UpdateInstantPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateInstantPluginActionParameters {
  Description?: string;
  FxExpressionUniqueName: string;
  Parameters?: string;
  Context?: string;
  EntityLogicalName?: string;
  SolutionUniqueName?: string;
  Expression?: string;
  Name?: string;
}

/**
 * UpdateInstantPlugin action
 *
 * Unbound action
 */
export class UpdateInstantPluginAction implements Executable<UpdateInstantPluginResponse> {
  constructor(public readonly parameters: UpdateInstantPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateInstantPlugin`;

    const body = requestBody({
      Description: this.parameters.Description,
      FxExpressionUniqueName: this.parameters.FxExpressionUniqueName,
      Parameters: this.parameters.Parameters,
      Context: this.parameters.Context,
      EntityLogicalName: this.parameters.EntityLogicalName,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Expression: this.parameters.Expression,
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

  async parseResponse(response: Response): Promise<UpdateInstantPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateInstantPluginResponse;
  }
}
