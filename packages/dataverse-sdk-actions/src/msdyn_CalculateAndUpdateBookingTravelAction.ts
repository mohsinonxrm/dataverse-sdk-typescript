import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CalculateAndUpdateBookingTravel action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_CalculateAndUpdateBookingTravelResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the msdyn_CalculateAndUpdateBookingTravel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CalculateAndUpdateBookingTravelActionParameters {
  Bookings: Record<string, unknown>[];
}

/**
 * msdyn_CalculateAndUpdateBookingTravel action
 *
 * Unbound action
 */
export class msdyn_CalculateAndUpdateBookingTravelAction implements Executable<msdyn_CalculateAndUpdateBookingTravelResponse> {
  constructor(public readonly parameters: msdyn_CalculateAndUpdateBookingTravelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalculateAndUpdateBookingTravel`;

    const body = requestBody({
      Bookings: this.parameters.Bookings,
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: msdyn_CalculateAndUpdateBookingTravelResponse })
      .value;
  }
}
