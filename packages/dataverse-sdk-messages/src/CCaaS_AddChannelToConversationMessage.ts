import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_AddChannelToConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_AddChannelToConversationRequestParameters {
  ApiVersion: string;
  ChannelType: string;
  AgentId?: string;
  DestinationPhoneNumber?: string;
}

/**
 * CCaaS_AddChannelToConversation request message
 *
 * Web API Action: CCaaS_AddChannelToConversation
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_AddChannelToConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AddChannelToConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_AddChannelToConversationRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_AddChannelToConversationRequestParameters
  ) {
    super("CCaaS_AddChannelToConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_AddChannelToConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ChannelType: this.Parameters.ChannelType,
      AgentId: this.Parameters.AgentId,
      DestinationPhoneNumber: this.Parameters.DestinationPhoneNumber,
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

  async parseResponse(response: Response): Promise<CCaaS_AddChannelToConversationResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_AddChannelToConversationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_AddChannelToConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_AddChannelToConversationResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * CCaaS_AddChannelToConversation response message
 *
 * `result` is the value the CCaaS_AddChannelToConversation action returns (see {@link CCaaS_AddChannelToConversationResult}).
 */
export class CCaaS_AddChannelToConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_AddChannelToConversationResult) {
    super("CCaaS_AddChannelToConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_AddChannelToConversationResponse {
    return new CCaaS_AddChannelToConversationResponse(data as CCaaS_AddChannelToConversationResult);
  }
}
