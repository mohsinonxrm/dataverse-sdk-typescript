import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_GetRepresentativeAvailabilityBeforeConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters {
  CustomContextItems?: string;
  LiveWorkStreamId?: string;
  ChannelEngagementContext?: string;
  ApiVersion: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityBeforeConversation
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters>;

  constructor(parameters: CCaaS_GetRepresentativeAvailabilityBeforeConversationRequestParameters) {
    super("CCaaS_GetRepresentativeAvailabilityBeforeConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityBeforeConversation`;

    const body = requestBody({
      CustomContextItems: this.Parameters.CustomContextItems,
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
      ChannelEngagementContext: this.Parameters.ChannelEngagementContext,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the CCaaS_GetRepresentativeAvailabilityBeforeConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetRepresentativeAvailabilityBeforeConversationResult {
  "@odata.context"?: string;
  AverageWaitTime: number;
  AverageWaitTimeInSeconds: number;
  EndTimeOfNextOperatingHour: string;
  IsAgentAvailable: boolean;
  IsOverflowing: boolean;
  IsQueueAvailable: boolean;
  NextTransitionTime: string;
  NumberOfExpertsAvailableInQueue: number;
  OverflowAction: string;
  OverflowChannel: string;
  OverflowCondition: string;
  OverflowSourceQueueId: string;
  OverflowStage: string;
  PositionInQueue: number;
  QueueId: string;
  StartTimeOfNextOperatingHour: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityBeforeConversation response message
 *
 * `result` is the value the CCaaS_GetRepresentativeAvailabilityBeforeConversation action returns (see {@link CCaaS_GetRepresentativeAvailabilityBeforeConversationResult}).
 */
export class CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetRepresentativeAvailabilityBeforeConversationResult) {
    super("CCaaS_GetRepresentativeAvailabilityBeforeConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse {
    return new CCaaS_GetRepresentativeAvailabilityBeforeConversationResponse(
      data as CCaaS_GetRepresentativeAvailabilityBeforeConversationResult
    );
  }
}
