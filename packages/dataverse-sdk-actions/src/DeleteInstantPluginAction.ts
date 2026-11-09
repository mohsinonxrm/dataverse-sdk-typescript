import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteInstantPlugin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteInstantPluginResponse = void;

/**
 * Parameters of the DeleteInstantPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteInstantPluginActionParameters {
  FxExpressionUniqueName: string;
}

/**
 * DeleteInstantPlugin action
 *
 * Unbound action
 */
export class DeleteInstantPluginAction implements Executable<DeleteInstantPluginResponse> {
  constructor(public readonly parameters: DeleteInstantPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteInstantPlugin`;

    const body = requestBody({
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

  parseResponse(_response: Response): Promise<DeleteInstantPluginResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
