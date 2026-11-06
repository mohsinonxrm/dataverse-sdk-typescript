import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ValidateConversationPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateConversationPayloadRequestParameters {
  ConversationId: string;
}

/**
 * msdyn_ValidateConversationPayload request message
 *
 * Web API Action: msdyn_ValidateConversationPayload
 */
export class msdyn_ValidateConversationPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateConversationPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_ValidateConversationPayloadRequestParameters>;

  constructor(parameters: msdyn_ValidateConversationPayloadRequestParameters) {
    super("msdyn_ValidateConversationPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateConversationPayload`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_ValidateConversationPayloadResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ValidateConversationPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ValidateConversationPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateConversationPayloadResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_ValidateConversationPayload response message
 *
 * `result` is the value the msdyn_ValidateConversationPayload action returns (see {@link msdyn_ValidateConversationPayloadResult}).
 */
export class msdyn_ValidateConversationPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateConversationPayloadResult) {
    super("msdyn_ValidateConversationPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ValidateConversationPayloadResponse {
    return new msdyn_ValidateConversationPayloadResponse(
      data as msdyn_ValidateConversationPayloadResult
    );
  }
}
