import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LoadCalendars action
 */
export interface msdyn_LoadCalendarsResponse {
  CalendarEvents: string;
}

/**
 * msdyn_LoadCalendars action
 *
 * Unbound action
 */
export class msdyn_LoadCalendarsAction implements Executable<msdyn_LoadCalendarsResponse> {
  constructor(public readonly loadCalendarsInput: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body: Record<string, unknown> = {
      LoadCalendarsInput: this.loadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    const data = await response.json();
    return data as msdyn_LoadCalendarsResponse;
  }
}
