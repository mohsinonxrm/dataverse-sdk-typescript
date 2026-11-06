import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from PvaStartConversation action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface PvaStartConversationResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the PvaStartConversation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaStartConversationActionParameters {
  Version: string;
  Request: EntityReference | AnyEntityPayload;
}

/**
 * PvaStartConversation action
 *
 * Unbound action
 */
export class PvaStartConversationAction implements Executable<PvaStartConversationResponse> {
  constructor(public readonly parameters: PvaStartConversationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaStartConversation`;

    const body = requestBody({
      Version: this.parameters.Version,
      Request: this.parameters.Request,
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

  async parseResponse(response: Response): Promise<PvaStartConversationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PvaStartConversationResponse;
  }
}
