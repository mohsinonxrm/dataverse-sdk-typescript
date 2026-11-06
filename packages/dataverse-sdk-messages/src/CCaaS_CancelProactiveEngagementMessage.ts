import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CancelProactiveEngagement message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CancelProactiveEngagementRequestParameters {
  ExternalContactId?: string;
  DeliveryTaskId?: string;
  CallbackConversationId?: string;
  ContactId?: string;
  ApiVersion: string;
  ProactiveEngagementConfigId?: string;
}

/**
 * CCaaS_CancelProactiveEngagement request message
 *
 * Web API Action: CCaaS_CancelProactiveEngagement
 */
export class CCaaS_CancelProactiveEngagementRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CancelProactiveEngagementResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CancelProactiveEngagementRequestParameters>;

  constructor(parameters: CCaaS_CancelProactiveEngagementRequestParameters) {
    super("CCaaS_CancelProactiveEngagement", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CancelProactiveEngagement`;

    const body = requestBody({
      ExternalContactId: this.Parameters.ExternalContactId,
      DeliveryTaskId: this.Parameters.DeliveryTaskId,
      CallbackConversationId: this.Parameters.CallbackConversationId,
      ContactId: this.Parameters.ContactId,
      ApiVersion: this.Parameters.ApiVersion,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
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

  parseResponse(_response: Response): Promise<CCaaS_CancelProactiveEngagementResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CancelProactiveEngagementResponse());
  }
}

/**
 * CCaaS_CancelProactiveEngagement response message
 */
export class CCaaS_CancelProactiveEngagementResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CancelProactiveEngagement");
  }

  static fromResponse(_data?: unknown): CCaaS_CancelProactiveEngagementResponse {
    return new CCaaS_CancelProactiveEngagementResponse();
  }
}
