import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteAutomatedPlugin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteAutomatedPluginResponse = void;

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

  parseResponse(_response: Response): Promise<DeleteAutomatedPluginResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
