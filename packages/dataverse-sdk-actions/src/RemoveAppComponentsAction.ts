import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RemoveAppComponents action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveAppComponentsResponse = void;

/**
 * Parameters of the RemoveAppComponents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveAppComponentsActionParameters {
  AppId: string;
  Components: Record<string, unknown>[];
}

/**
 * RemoveAppComponents action
 *
 * Unbound action
 */
export class RemoveAppComponentsAction implements Executable<RemoveAppComponentsResponse> {
  constructor(public readonly parameters: RemoveAppComponentsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveAppComponents`;

    const body = requestBody({
      AppId: this.parameters.AppId,
      Components: this.parameters.Components,
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

  parseResponse(_response: Response): Promise<RemoveAppComponentsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
