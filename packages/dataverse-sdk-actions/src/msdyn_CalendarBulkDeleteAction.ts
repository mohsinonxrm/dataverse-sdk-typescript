import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CalendarBulkDelete action
 */
export interface msdyn_CalendarBulkDeleteResponse {
  // No content returned
}

/**
 * msdyn_CalendarBulkDelete action
 *
 * Unbound action
 */
export class msdyn_CalendarBulkDeleteAction implements Executable<msdyn_CalendarBulkDeleteResponse> {
  constructor(public readonly calendarIds: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalendarBulkDelete`;

    const body: Record<string, unknown> = {
      CalendarIds: this.calendarIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CalendarBulkDeleteResponse> {
    // No return value (204 No Content)
    return {};
  }
}
