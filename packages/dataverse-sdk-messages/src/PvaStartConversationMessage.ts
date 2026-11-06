import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return PvaStartConversationResponse.fromResponse({});
    return PvaStartConversationResponse.fromResponse(await response.json());
  }
}

/**
 * PvaStartConversation response message
 */
export class PvaStartConversationResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("PvaStartConversation");
  }

  static fromResponse(data: unknown): PvaStartConversationResponse {
    return new PvaStartConversationResponse(responseObject<Record<string, unknown>>(data));
  }
}
