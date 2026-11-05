import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse as msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponseData } from "./types/index.js";

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
    const data = await response.json();
    return msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout response message
 */
export class msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponseData) {
    super("msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout");
  }

  static fromResponse(data: unknown): msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse {
    return new msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse(
      responseObject<msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponseData>(data)
    );
  }
}
