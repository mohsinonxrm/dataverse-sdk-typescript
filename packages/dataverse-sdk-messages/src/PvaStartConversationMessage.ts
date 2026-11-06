import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the PvaStartConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaStartConversationRequestParameters {
  Version: string;
  Request: EntityReference | AnyEntityPayload;
}

/**
 * PvaStartConversation request message
 *
 * Web API Action: PvaStartConversation
 */
export class PvaStartConversationRequest
  extends OrganizationRequest
  implements Executable<PvaStartConversationResponse>
{
  declare readonly Parameters: Readonly<PvaStartConversationRequestParameters>;

  constructor(parameters: PvaStartConversationRequestParameters) {
    super("PvaStartConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaStartConversation`;

    const body = requestBody({
      Version: this.Parameters.Version,
      Request: this.Parameters.Request,
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return PvaStartConversationResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return PvaStartConversationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaStartConversation action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type PvaStartConversationResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * PvaStartConversation response message
 *
 * `result` is the value the PvaStartConversation action returns (see {@link PvaStartConversationResult}).
 */
export class PvaStartConversationResponse extends OrganizationResponse {
  constructor(public result: PvaStartConversationResult) {
    super("PvaStartConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaStartConversationResponse {
    return new PvaStartConversationResponse((data ?? null) as PvaStartConversationResult);
  }
}
