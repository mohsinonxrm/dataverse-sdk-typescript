import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CalculateAndUpdateBookingTravel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CalculateAndUpdateBookingTravelRequestParameters {
  Bookings: Record<string, unknown>[];
}

/**
 * msdyn_CalculateAndUpdateBookingTravel request message
 *
 * Web API Action: msdyn_CalculateAndUpdateBookingTravel
 */
export class msdyn_CalculateAndUpdateBookingTravelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CalculateAndUpdateBookingTravelResponse>
{
  declare readonly Parameters: Readonly<msdyn_CalculateAndUpdateBookingTravelRequestParameters>;

  constructor(parameters: msdyn_CalculateAndUpdateBookingTravelRequestParameters) {
    super("msdyn_CalculateAndUpdateBookingTravel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalculateAndUpdateBookingTravel`;

    const body = requestBody({
      Bookings: this.Parameters.Bookings,
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

  async parseResponse(response: Response): Promise<msdyn_CalculateAndUpdateBookingTravelResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CalculateAndUpdateBookingTravelResponse.fromResponse({});
    return msdyn_CalculateAndUpdateBookingTravelResponse.fromResponse(await response.json());
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
