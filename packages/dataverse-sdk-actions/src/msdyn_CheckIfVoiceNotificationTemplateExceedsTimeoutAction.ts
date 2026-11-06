import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfVoiceNotificationTemplateExceedsTimeout action
 */
export interface msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse;
    return (await response.json()) as msdyn_CheckIfVoiceNotificationTemplateExceedsTimeoutResponse;
  }
}
