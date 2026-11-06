import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateAutomatedPlugin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateAutomatedPluginResponse = void;

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

  parseResponse(_response: Response): Promise<UpdateAutomatedPluginResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
