import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_GetCallbackTimeSlots action
 */
export interface CCaaS_GetCallbackTimeSlotsResponse {
  TimeInfoJson: string;
}

/**
 * Parameters of the CCaaS_GetCallbackTimeSlots action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetCallbackTimeSlotsActionParameters {
  CalendarId: string;
  ApiVersion: string;
  TimeZoneId: string;
}

/**
 * CCaaS_GetCallbackTimeSlots action
 *
 * Unbound action
 */
export class CCaaS_GetCallbackTimeSlotsAction implements Executable<CCaaS_GetCallbackTimeSlotsResponse> {
  constructor(public readonly parameters: CCaaS_GetCallbackTimeSlotsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetCallbackTimeSlots`;

    const body = requestBody({
      CalendarId: this.parameters.CalendarId,
      ApiVersion: this.parameters.ApiVersion,
      TimeZoneId: this.parameters.TimeZoneId,
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

  async parseResponse(response: Response): Promise<CCaaS_GetCallbackTimeSlotsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetCallbackTimeSlotsResponse;
    return (await response.json()) as CCaaS_GetCallbackTimeSlotsResponse;
  }
}
