import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from OnExternalCreated action
 */
export interface OnExternalCreatedResponse {
  // No content returned
}

/**
 * Parameters of the OnExternalCreated action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OnExternalCreatedActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * OnExternalCreated action
 *
 * Unbound action
 */
export class OnExternalCreatedAction implements Executable<OnExternalCreatedResponse> {
  constructor(public readonly parameters: OnExternalCreatedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalCreated`;

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

  async parseResponse(response: Response): Promise<OnExternalCreatedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as OnExternalCreatedResponse;
  }
}
