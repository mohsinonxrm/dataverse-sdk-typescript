import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetMessage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetMessageRequestParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * GetMessage request message
 *
 * Web API Action: GetMessage
 */
export class GetMessageRequest
  extends OrganizationRequest
  implements Executable<GetMessageResponse>
{
  declare readonly Parameters: Readonly<GetMessageRequestParameters>;

  constructor(parameters: GetMessageRequestParameters) {
    super("GetMessage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetMessage`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<GetMessageResponse> {
    // The body is the complex value, with its @odata.context
    return GetMessageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetMessage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetMessageResult {
  "@odata.context"?: string;
  Messages: string;
}

/**
 * GetMessage response message
 *
 * `result` is the value the GetMessage action returns (see {@link GetMessageResult}).
 */
export class GetMessageResponse extends OrganizationResponse {
  constructor(public result: GetMessageResult) {
    super("GetMessage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetMessageResponse {
    return new GetMessageResponse(data as GetMessageResult);
  }
}
