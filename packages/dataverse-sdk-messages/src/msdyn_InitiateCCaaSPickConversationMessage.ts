import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InitiateCCaaSPickConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSPickConversationRequestParameters {
  LiveWorkItemId: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSPickConversation request message
 *
 * Web API Action: msdyn_InitiateCCaaSPickConversation
 */
export class msdyn_InitiateCCaaSPickConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSPickConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitiateCCaaSPickConversationRequestParameters>;

  constructor(parameters: msdyn_InitiateCCaaSPickConversationRequestParameters) {
    super("msdyn_InitiateCCaaSPickConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSPickConversation`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSPickConversationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InitiateCCaaSPickConversationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InitiateCCaaSPickConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InitiateCCaaSPickConversationResult {
  "@odata.context"?: string;
  msdyn_InitiateCCaaSPickConversationAPIResponse: string;
}

/**
 * msdyn_InitiateCCaaSPickConversation response message
 *
 * `result` is the value the msdyn_InitiateCCaaSPickConversation action returns (see {@link msdyn_InitiateCCaaSPickConversationResult}).
 */
export class msdyn_InitiateCCaaSPickConversationResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSPickConversationResult) {
    super("msdyn_InitiateCCaaSPickConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InitiateCCaaSPickConversationResponse {
    return new msdyn_InitiateCCaaSPickConversationResponse(
      data as msdyn_InitiateCCaaSPickConversationResult
    );
  }
}
