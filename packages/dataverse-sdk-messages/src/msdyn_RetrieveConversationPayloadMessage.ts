import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveConversationPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveConversationPayloadRequestParameters {
  ConversationId: string;
  ParticipantScope?: number;
}

/**
 * msdyn_RetrieveConversationPayload request message
 *
 * Web API Action: msdyn_RetrieveConversationPayload
 */
export class msdyn_RetrieveConversationPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveConversationPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveConversationPayloadRequestParameters>;

  constructor(parameters: msdyn_RetrieveConversationPayloadRequestParameters) {
    super("msdyn_RetrieveConversationPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveConversationPayload`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      ParticipantScope: this.Parameters.ParticipantScope,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveConversationPayloadResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveConversationPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveConversationPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveConversationPayloadResult {
  "@odata.context"?: string;
  ConversationPayload: string;
  Representative: string;
}

/**
 * msdyn_RetrieveConversationPayload response message
 *
 * `result` is the value the msdyn_RetrieveConversationPayload action returns (see {@link msdyn_RetrieveConversationPayloadResult}).
 */
export class msdyn_RetrieveConversationPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveConversationPayloadResult) {
    super("msdyn_RetrieveConversationPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveConversationPayloadResponse {
    return new msdyn_RetrieveConversationPayloadResponse(
      data as msdyn_RetrieveConversationPayloadResult
    );
  }
}
