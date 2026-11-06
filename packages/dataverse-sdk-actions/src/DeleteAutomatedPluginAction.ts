import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteAutomatedPlugin action
 */
export interface DeleteAutomatedPluginResponse {
  // No content returned
}

/**
 * Parameters of the DeleteAutomatedPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAutomatedPluginActionParameters {
  pluginid: string;
}

/**
 * DeleteAutomatedPlugin action
 *
 * Unbound action
 */
export class DeleteAutomatedPluginAction implements Executable<DeleteAutomatedPluginResponse> {
  constructor(public readonly parameters: DeleteAutomatedPluginActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAutomatedPlugin`;

    const body = requestBody({
      pluginid: this.parameters.pluginid,
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

  async parseResponse(response: Response): Promise<DeleteAutomatedPluginResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteAutomatedPluginResponse;
  }
}
