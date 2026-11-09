import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout request message
 *
 * Web API Action: msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout
 */
export class msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse>
{
  constructor() {
    super("msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout response message
 *
 * `result` is the value the msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout action returns (see {@link msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResult}).
 */
export class msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResult) {
    super("msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse {
    return new msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse(
      data as msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResult
    );
  }
}
