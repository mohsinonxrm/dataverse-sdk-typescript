import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourceBookingFormParameters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceBookingFormParametersRequestParameters {
  BookingContext: string;
  TimeZoneCode?: number;
}

/**
 * msdyn_GetResourceBookingFormParameters request message
 *
 * Web API Action: msdyn_GetResourceBookingFormParameters
 */
export class msdyn_GetResourceBookingFormParametersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceBookingFormParametersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceBookingFormParametersRequestParameters>;

  constructor(parameters: msdyn_GetResourceBookingFormParametersRequestParameters) {
    super("msdyn_GetResourceBookingFormParameters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceBookingFormParameters`;

    const body = requestBody({
      BookingContext: this.Parameters.BookingContext,
      TimeZoneCode: this.Parameters.TimeZoneCode,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingFormParametersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourceBookingFormParametersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourceBookingFormParameters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceBookingFormParametersResult {
  "@odata.context"?: string;
  ResourceBookingFormParameters: string;
}

/**
 * msdyn_GetResourceBookingFormParameters response message
 *
 * `result` is the value the msdyn_GetResourceBookingFormParameters action returns (see {@link msdyn_GetResourceBookingFormParametersResult}).
 */
export class msdyn_GetResourceBookingFormParametersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceBookingFormParametersResult) {
    super("msdyn_GetResourceBookingFormParameters");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourceBookingFormParametersResponse {
    return new msdyn_GetResourceBookingFormParametersResponse(
      data as msdyn_GetResourceBookingFormParametersResult
    );
  }
}
