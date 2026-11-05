import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_CalculateAndUpdateBookingTravel request message
 *
 * Web API Action: msdyn_CalculateAndUpdateBookingTravel
 */
export class msdyn_CalculateAndUpdateBookingTravelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CalculateAndUpdateBookingTravelResponse>
{
  constructor(public bookings: Record<string, unknown>[]) {
    super("msdyn_CalculateAndUpdateBookingTravel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalculateAndUpdateBookingTravel`;

    const body: Record<string, unknown> = {
      Bookings: this.bookings,
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

  async parseResponse(response: Response): Promise<msdyn_CalculateAndUpdateBookingTravelResponse> {
    const data = await response.json();
    return msdyn_CalculateAndUpdateBookingTravelResponse.fromResponse(data);
  }
}

/**
 * msdyn_CalculateAndUpdateBookingTravel response message
 */
export class msdyn_CalculateAndUpdateBookingTravelResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_CalculateAndUpdateBookingTravel");
  }

  static fromResponse(data: unknown): msdyn_CalculateAndUpdateBookingTravelResponse {
    return new msdyn_CalculateAndUpdateBookingTravelResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
