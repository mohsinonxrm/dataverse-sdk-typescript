import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RemoveAppComponents action
 */
export interface RemoveAppComponentsResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<RemoveAppComponentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveAppComponentsResponse;
    return (await response.json()) as RemoveAppComponentsResponse;
  }
}
