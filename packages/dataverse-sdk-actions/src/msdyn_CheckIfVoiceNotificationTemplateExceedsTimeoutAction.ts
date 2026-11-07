import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout action
 *
 * Unbound action
 */
export class msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutAction implements Executable<msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse> {
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
    return (await response.json()) as msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse;
  }
}
