import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetCallbackTimeSlots action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetCallbackTimeSlotsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetCallbackTimeSlotsResponse;
  }
}
