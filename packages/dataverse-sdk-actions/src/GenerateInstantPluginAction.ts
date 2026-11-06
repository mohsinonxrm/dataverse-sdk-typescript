import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GenerateInstantPlugin action
 */
export interface GenerateInstantPluginResponse {
  CustomApiId: string;
  FxExpressionId: string;
  msdyn_functionid: string;
}

/**
 * Parameters of the GenerateInstantPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInstantPluginActionParameters {
  Parameters?: string;
  Expression: string;
  Description: string;
  Name: string;
  Context?: string;
  SolutionUniqueName?: string;
  EntityLogicalName?: string;
}

/**
 * GenerateInstantPlugin action
 *
 * Unbound action
 */
export class GenerateInstantPluginAction implements Executable<GenerateInstantPluginResponse> {
  constructor(public readonly parameters: GenerateInstantPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateInstantPlugin`;

    const body = requestBody({
      Parameters: this.parameters.Parameters,
      Expression: this.parameters.Expression,
      Description: this.parameters.Description,
      Name: this.parameters.Name,
      Context: this.parameters.Context,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateInstantPluginResponse;
    return (await response.json()) as GenerateInstantPluginResponse;
  }
}
