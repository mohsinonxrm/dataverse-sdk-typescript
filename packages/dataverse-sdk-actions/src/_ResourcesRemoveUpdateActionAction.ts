import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from _ResourcesRemoveUpdateAction action
 */
export interface _ResourcesRemoveUpdateActionResponse {
  // No content returned
}

/**
 * Parameters of the _ResourcesRemoveUpdateAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ResourcesRemoveUpdateActionActionParameters {
  ResourcesToBeRemoved?: string;
  ResourceGroupId?: string;
}

/**
 * _ResourcesRemoveUpdateAction action
 *
 * Unbound action
 */
export class _ResourcesRemoveUpdateActionAction implements Executable<_ResourcesRemoveUpdateActionResponse> {
  constructor(public readonly parameters: _ResourcesRemoveUpdateActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesRemoveUpdateAction`;

    const body = requestBody({
      ResourcesToBeRemoved: this.parameters.ResourcesToBeRemoved,
      ResourceGroupId: this.parameters.ResourceGroupId,
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

  async parseResponse(response: Response): Promise<_ResourcesRemoveUpdateActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as _ResourcesRemoveUpdateActionResponse;
  }
}
