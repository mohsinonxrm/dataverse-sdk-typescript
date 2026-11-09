import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AddAppComponents action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddAppComponentsResponse = void;

/**
 * Parameters of the AddAppComponents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddAppComponentsActionParameters {
  AppId: string;
  Components: Record<string, unknown>[];
}

/**
 * AddAppComponents action
 *
 * Unbound action
 */
export class AddAppComponentsAction implements Executable<AddAppComponentsResponse> {
  constructor(public readonly parameters: AddAppComponentsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddAppComponents`;

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

  parseResponse(_response: Response): Promise<AddAppComponentsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
