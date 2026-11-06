import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return msdyn_CalculateAndUpdateBookingTravelResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_CalculateAndUpdateBookingTravelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CalculateAndUpdateBookingTravel action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_CalculateAndUpdateBookingTravelResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_CalculateAndUpdateBookingTravel response message
 *
 * `result` is the value the msdyn_CalculateAndUpdateBookingTravel action returns (see {@link msdyn_CalculateAndUpdateBookingTravelResult}).
 */
export class msdyn_CalculateAndUpdateBookingTravelResponse extends OrganizationResponse {
  constructor(public result: msdyn_CalculateAndUpdateBookingTravelResult) {
    super("msdyn_CalculateAndUpdateBookingTravel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CalculateAndUpdateBookingTravelResponse {
    return new msdyn_CalculateAndUpdateBookingTravelResponse(
      data === undefined
        ? []
        : (data as { value: msdyn_CalculateAndUpdateBookingTravelResult }).value
    );
  }
}
