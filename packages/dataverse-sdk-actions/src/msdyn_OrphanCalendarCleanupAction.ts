import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OrphanCalendarCleanup action
 */
export interface msdyn_OrphanCalendarCleanupResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_OrphanCalendarCleanup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OrphanCalendarCleanupActionParameters {
  CalendarId: string;
}

/**
 * msdyn_OrphanCalendarCleanup action
 *
 * Unbound action
 */
export class msdyn_OrphanCalendarCleanupAction implements Executable<msdyn_OrphanCalendarCleanupResponse> {
  constructor(public readonly parameters: msdyn_OrphanCalendarCleanupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OrphanCalendarCleanup`;

    const body = requestBody({
      CalendarId: this.parameters.CalendarId,
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

  async parseResponse(response: Response): Promise<msdyn_OrphanCalendarCleanupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OrphanCalendarCleanupResponse;
    return (await response.json()) as msdyn_OrphanCalendarCleanupResponse;
  }
}
