import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteInstantPlugin action
 */
export interface DeleteInstantPluginResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<DeleteInstantPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteInstantPluginResponse;
  }
}
