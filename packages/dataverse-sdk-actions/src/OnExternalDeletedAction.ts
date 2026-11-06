import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from OnExternalDeleted action
 */
export interface OnExternalDeletedResponse {
  // No content returned
}

/**
 * Parameters of the OnExternalDeleted action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalDeletedActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * OnExternalDeleted action
 *
 * Unbound action
 */
export class OnExternalDeletedAction implements Executable<OnExternalDeletedResponse> {
  constructor(public readonly parameters: OnExternalDeletedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalDeleted`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<OnExternalDeletedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as OnExternalDeletedResponse;
    return (await response.json()) as OnExternalDeletedResponse;
  }
}
