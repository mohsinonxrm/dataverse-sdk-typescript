import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CascadeCrewBookings request message
 *
 * Web API Action: msdyn_CascadeCrewBookings
 */
export class msdyn_CascadeCrewBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeCrewBookingsResponse>
{
  constructor(
    public bookingsToCreate?: Record<string, unknown>[],
    public bookingsToUpdate?: Record<string, unknown>[],
    public parentBookingsToUpdate?: Record<string, unknown>[],
    public batchNumber?: number
  ) {
    super("msdyn_CascadeCrewBookings");
  }

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
    return new msdyn_CascadeCrewBookingsResponse();
  }
}

/**
 * msdyn_CascadeCrewBookings response message
 */
export class msdyn_CascadeCrewBookingsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CascadeCrewBookings");
  }

  static fromResponse(_data: unknown): msdyn_CascadeCrewBookingsResponse {
    return new msdyn_CascadeCrewBookingsResponse();
  }
}
