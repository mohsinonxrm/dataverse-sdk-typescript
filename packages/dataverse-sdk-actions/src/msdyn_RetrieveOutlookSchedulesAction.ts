import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveOutlookSchedules action
 */
export interface msdyn_RetrieveOutlookSchedulesResponse {
  Result: string;
  ExceptionMessage: string;
}

/**
 * msdyn_RetrieveOutlookSchedules action
 *
 * Unbound action
 */
export class msdyn_RetrieveOutlookSchedulesAction implements Executable<msdyn_RetrieveOutlookSchedulesResponse> {
  constructor(
    public readonly version: string | undefined,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly bookableResourceEmails: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOutlookSchedules`;

    const body: Record<string, unknown> = {
      Version: this.version,
      StartDate: this.startDate,
      EndDate: this.endDate,
      BookableResourceEmails: this.bookableResourceEmails,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOutlookSchedulesResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveOutlookSchedulesResponse;
  }
}
