import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetMultipleResourceBookingDetailsResponse as msdyn_GetMultipleResourceBookingDetailsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetMultipleResourceBookingDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMultipleResourceBookingDetailsRequestParameters {
  StartDate: string;
  EndDate: string;
  Timescale: number;
  SchedulerSettings?: string;
  Targets: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetMultipleResourceBookingDetails request message
 *
 * Web API Action: msdyn_GetMultipleResourceBookingDetails
 */
export class msdyn_GetMultipleResourceBookingDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMultipleResourceBookingDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMultipleResourceBookingDetailsRequestParameters>;

  constructor(parameters: msdyn_GetMultipleResourceBookingDetailsRequestParameters) {
    super("msdyn_GetMultipleResourceBookingDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMultipleResourceBookingDetails`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      Timescale: this.Parameters.Timescale,
      SchedulerSettings: this.Parameters.SchedulerSettings,
      Targets: this.Parameters.Targets,
      ConsiderAppointments: this.Parameters.ConsiderAppointments,
      IgnoreTimeZone: this.Parameters.IgnoreTimeZone,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMultipleResourceBookingDetailsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetMultipleResourceBookingDetailsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetMultipleResourceBookingDetails response message
 */
export class msdyn_GetMultipleResourceBookingDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMultipleResourceBookingDetailsResponseData) {
    super("msdyn_GetMultipleResourceBookingDetails");
  }

  static fromResponse(data: unknown): msdyn_GetMultipleResourceBookingDetailsResponse {
    return new msdyn_GetMultipleResourceBookingDetailsResponse(
      responseObject<msdyn_GetMultipleResourceBookingDetailsResponseData>(data)
    );
  }
}
