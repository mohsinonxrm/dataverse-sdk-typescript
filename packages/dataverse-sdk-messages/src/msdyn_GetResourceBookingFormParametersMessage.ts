import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourceBookingFormParametersResponse as msdyn_GetResourceBookingFormParametersResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetResourceBookingFormParametersResponse.fromResponse({});
    return msdyn_GetResourceBookingFormParametersResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetResourceBookingFormParameters response message
 */
export class msdyn_GetResourceBookingFormParametersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceBookingFormParametersResponseData) {
    super("msdyn_GetResourceBookingFormParameters");
  }

  static fromResponse(data: unknown): msdyn_GetResourceBookingFormParametersResponse {
    return new msdyn_GetResourceBookingFormParametersResponse(
      responseObject<msdyn_GetResourceBookingFormParametersResponseData>(data)
    );
  }
}
