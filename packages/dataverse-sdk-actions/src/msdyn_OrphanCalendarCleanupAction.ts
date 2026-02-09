import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OrphanCalendarCleanup action
 */
export interface msdyn_OrphanCalendarCleanupResponse {
  // No content returned
}

/**
 * msdyn_OrphanCalendarCleanup action
 *
 * Unbound action
 */
export class msdyn_OrphanCalendarCleanupAction implements Executable<msdyn_OrphanCalendarCleanupResponse> {
  constructor(public readonly calendarId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OrphanCalendarCleanup`;

    const body: Record<string, unknown> = {
      CalendarId: this.calendarId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OrphanCalendarCleanupResponse> {
    // No return value (204 No Content)
    return {};
  }
}
