import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CascadeCrewBookings action
 */
export interface msdyn_CascadeCrewBookingsResponse {
  // No content returned
}

/**
 * msdyn_CascadeCrewBookings action
 *
 * Unbound action
 */
export class msdyn_CascadeCrewBookingsAction implements Executable<msdyn_CascadeCrewBookingsResponse> {
  constructor(
    public readonly bookingsToCreate: Record<string, unknown>[],
    public readonly bookingsToUpdate: Record<string, unknown>[],
    public readonly parentBookingsToUpdate: Record<string, unknown>[],
    public readonly batchNumber: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewBookings`;

    const body: Record<string, unknown> = {
      BookingsToCreate: this.bookingsToCreate,
      BookingsToUpdate: this.bookingsToUpdate,
      ParentBookingsToUpdate: this.parentBookingsToUpdate,
      BatchNumber: this.batchNumber,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeCrewBookingsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
