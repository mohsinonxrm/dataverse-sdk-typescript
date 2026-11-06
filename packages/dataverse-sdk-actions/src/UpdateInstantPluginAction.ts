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
  Parameters?: string;
  Expression?: string;
  SolutionUniqueName?: string;
  Name?: string;
  EntityLogicalName?: string;
  Context?: string;
  FxExpressionUniqueName: string;
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
      Parameters: this.parameters.Parameters,
      Expression: this.parameters.Expression,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Name: this.parameters.Name,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Context: this.parameters.Context,
      FxExpressionUniqueName: this.parameters.FxExpressionUniqueName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateInstantPluginResponse;
    return (await response.json()) as UpdateInstantPluginResponse;
  }
}
