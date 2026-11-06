import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateInstantPlugin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateInstantPluginResponse = void;

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

  parseResponse(_response: Response): Promise<UpdateInstantPluginResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
