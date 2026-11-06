import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InitiateCCaaSCloseConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSCloseConversationRequestParameters {
  SessionId: string;
  LiveWorkItemId: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSCloseConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSCloseConversation
 */
export class msdyn_InitiateCCaaSCloseConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSCloseConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitiateCCaaSCloseConversationRequestParameters>;

  constructor(parameters: msdyn_InitiateCCaaSCloseConversationRequestParameters) {
    super("msdyn_InitiateCCaaSCloseConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSCloseConversation`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
      InitiatingUser: this.Parameters.InitiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSCloseConversationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InitiateCCaaSCloseConversationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InitiateCCaaSCloseConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InitiateCCaaSCloseConversationResult {
  "@odata.context"?: string;
  msdyn_InitiateCCaaSCloseConversationAPIResponse: string;
}

/**
 * msdyn_InitiateCCaaSCloseConversation response message
 *
 * `result` is the value the msdyn_InitiateCCaaSCloseConversation action returns (see {@link msdyn_InitiateCCaaSCloseConversationResult}).
 */
export class msdyn_InitiateCCaaSCloseConversationResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSCloseConversationResult) {
    super("msdyn_InitiateCCaaSCloseConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InitiateCCaaSCloseConversationResponse {
    return new msdyn_InitiateCCaaSCloseConversationResponse(
      data as msdyn_InitiateCCaaSCloseConversationResult
    );
  }
}
