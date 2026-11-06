import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_GetAvailabilityForConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetAvailabilityForConversationRequestParameters {
  ApiVersion: string;
  ConversationId?: string;
  CustomContextItems?: string;
}

/**
 * CCaaS_GetAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetAvailabilityForConversation
 */
export class CCaaS_GetAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetAvailabilityForConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetAvailabilityForConversationRequestParameters>;

  constructor(parameters: CCaaS_GetAvailabilityForConversationRequestParameters) {
    super("CCaaS_GetAvailabilityForConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetAvailabilityForConversation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
      CustomContextItems: this.Parameters.CustomContextItems,
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

  async parseResponse(response: Response): Promise<CCaaS_GetAvailabilityForConversationResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_GetAvailabilityForConversationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_GetAvailabilityForConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetAvailabilityForConversationResult {
  "@odata.context"?: string;
  AverageWaitTime: number;
  EndTimeOfNextOperatingHour: string;
  IsAgentAvailable: boolean;
  IsQueueAvailable: boolean;
  NextTransitionTime: string;
  PositionInQueue: number;
  QueueId: string;
  StartTimeOfNextOperatingHour: string;
}

/**
 * CCaaS_GetAvailabilityForConversation response message
 *
 * `result` is the value the CCaaS_GetAvailabilityForConversation action returns (see {@link CCaaS_GetAvailabilityForConversationResult}).
 */
export class CCaaS_GetAvailabilityForConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetAvailabilityForConversationResult) {
    super("CCaaS_GetAvailabilityForConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_GetAvailabilityForConversationResponse {
    return new CCaaS_GetAvailabilityForConversationResponse(
      data as CCaaS_GetAvailabilityForConversationResult
    );
  }
}
