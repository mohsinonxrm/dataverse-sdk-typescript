import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CascadeCrewBookings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeCrewBookingsRequestParameters {
  BookingsToCreate?: Record<string, unknown>[];
  BookingsToUpdate?: Record<string, unknown>[];
  ParentBookingsToUpdate?: Record<string, unknown>[];
  BatchNumber?: number;
}

/**
 * msdyn_CascadeCrewBookings request message
 *
 * Web API Action: msdyn_CascadeCrewBookings
 */
export class msdyn_CascadeCrewBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeCrewBookingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CascadeCrewBookingsRequestParameters>;

  constructor(parameters: msdyn_CascadeCrewBookingsRequestParameters = {}) {
    super("msdyn_CascadeCrewBookings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewBookings`;

    const body = requestBody({
      BookingsToCreate: this.Parameters.BookingsToCreate,
      BookingsToUpdate: this.Parameters.BookingsToUpdate,
      ParentBookingsToUpdate: this.Parameters.ParentBookingsToUpdate,
      BatchNumber: this.Parameters.BatchNumber,
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

  parseResponse(_response: Response): Promise<msdyn_CascadeCrewBookingsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CascadeCrewBookingsResponse());
  }
}

/**
 * msdyn_CascadeCrewBookings response message
 */
export class msdyn_CascadeCrewBookingsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CascadeCrewBookings");
  }

  static fromResponse(_data?: unknown): msdyn_CascadeCrewBookingsResponse {
    return new msdyn_CascadeCrewBookingsResponse();
  }
}
