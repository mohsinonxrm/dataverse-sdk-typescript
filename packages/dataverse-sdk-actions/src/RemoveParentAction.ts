import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RemoveParent action
 */
export interface RemoveParentResponse {
  // No content returned
}

/**
 * Parameters of the RemoveParent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveParentActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * RemoveParent action
 *
 * Unbound action
 */
export class RemoveParentAction implements Executable<RemoveParentResponse> {
  constructor(public readonly parameters: RemoveParentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveParent`;

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

  async parseResponse(response: Response): Promise<RemoveParentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RemoveParentResponse;
  }
}
