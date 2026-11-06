import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_GetRepresentativeAvailabilityForConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters {
  CustomContextItems?: string;
  ConversationId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_GetRepresentativeAvailabilityForConversation request message
 *
 * Web API Action: CCaaS_GetRepresentativeAvailabilityForConversation
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetRepresentativeAvailabilityForConversationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters>;

  constructor(parameters: CCaaS_GetRepresentativeAvailabilityForConversationRequestParameters) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetRepresentativeAvailabilityForConversation`;

    const body = requestBody({
      CustomContextItems: this.Parameters.CustomContextItems,
      ConversationId: this.Parameters.ConversationId,
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
  ): Promise<CCaaS_GetRepresentativeAvailabilityForConversationResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_GetRepresentativeAvailabilityForConversationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the CCaaS_GetRepresentativeAvailabilityForConversation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetRepresentativeAvailabilityForConversationResult {
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
 * CCaaS_GetRepresentativeAvailabilityForConversation response message
 *
 * `result` is the value the CCaaS_GetRepresentativeAvailabilityForConversation action returns (see {@link CCaaS_GetRepresentativeAvailabilityForConversationResult}).
 */
export class CCaaS_GetRepresentativeAvailabilityForConversationResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetRepresentativeAvailabilityForConversationResult) {
    super("CCaaS_GetRepresentativeAvailabilityForConversation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_GetRepresentativeAvailabilityForConversationResponse {
    return new CCaaS_GetRepresentativeAvailabilityForConversationResponse(
      data as CCaaS_GetRepresentativeAvailabilityForConversationResult
    );
  }
}
