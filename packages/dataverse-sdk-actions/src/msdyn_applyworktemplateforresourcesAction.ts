import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_applyworktemplateforresources action
 */
export interface msdyn_applyworktemplateforresourcesResponse {
  // No content returned
}

/**
 * msdyn_applyworktemplateforresources action
 *
 * Unbound action
 */
export class msdyn_applyworktemplateforresourcesAction implements Executable<msdyn_applyworktemplateforresourcesResponse> {
  constructor(
    public readonly calendarIds: string,
    public readonly templateCalendarId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_applyworktemplateforresources`;

    const body: Record<string, unknown> = {
      calendarIds: this.calendarIds,
      templateCalendarId: this.templateCalendarId,
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

  async parseResponse(response: Response): Promise<msdyn_applyworktemplateforresourcesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
