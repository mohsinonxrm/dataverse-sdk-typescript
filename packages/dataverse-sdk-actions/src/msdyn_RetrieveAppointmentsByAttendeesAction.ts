import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveAppointmentsByAttendees action
 */
export interface msdyn_RetrieveAppointmentsByAttendeesResponse {
  Result: string;
  HasChanges: boolean;
  ExceptionMessage: string;
}

/**
 * msdyn_RetrieveAppointmentsByAttendees action
 *
 * Unbound action
 */
export class msdyn_RetrieveAppointmentsByAttendeesAction implements Executable<msdyn_RetrieveAppointmentsByAttendeesResponse> {
  constructor(
    public readonly version: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly bookableResourceIds: string,
    public readonly onlyRetrieveCompletedOrScheduled: boolean,
    public readonly modifiedOnDate: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveAppointmentsByAttendees`;

    const body: Record<string, unknown> = {
      Version: this.version,
      StartDate: this.startDate,
      EndDate: this.endDate,
      BookableResourceIds: this.bookableResourceIds,
      OnlyRetrieveCompletedOrScheduled: this.onlyRetrieveCompletedOrScheduled,
      ModifiedOnDate: this.modifiedOnDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveAppointmentsByAttendeesResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveAppointmentsByAttendeesResponse;
  }
}
