import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GenerateInstantPlugin action
 */
export interface GenerateInstantPluginResponse {
  msdyn_functionid: string;
  CustomApiId: string;
  FxExpressionId: string;
}

/**
 * Parameters of the GenerateInstantPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateInstantPluginActionParameters {
  SolutionUniqueName?: string;
  Expression: string;
  Context?: string;
  Description: string;
  EntityLogicalName?: string;
  Parameters?: string;
  Name: string;
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
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      Expression: this.parameters.Expression,
      Context: this.parameters.Context,
      Description: this.parameters.Description,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Parameters: this.parameters.Parameters,
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

  async parseResponse(response: Response): Promise<GenerateInstantPluginResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateInstantPluginResponse;
    return (await response.json()) as GenerateInstantPluginResponse;
  }
}
