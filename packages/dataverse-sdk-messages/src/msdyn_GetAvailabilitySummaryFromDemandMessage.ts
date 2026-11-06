import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAvailabilitySummaryFromDemand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAvailabilitySummaryFromDemandRequestParameters {
  RequirementIds: string;
  Timescale: number;
  TimeZoneCode: number;
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetAvailabilitySummaryFromDemand request message
 *
 * Web API Action: msdyn_GetAvailabilitySummaryFromDemand
 */
export class msdyn_GetAvailabilitySummaryFromDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAvailabilitySummaryFromDemandResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAvailabilitySummaryFromDemandRequestParameters>;

  constructor(parameters: msdyn_GetAvailabilitySummaryFromDemandRequestParameters) {
    super("msdyn_GetAvailabilitySummaryFromDemand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAvailabilitySummaryFromDemand`;

    const body = requestBody({
      RequirementIds: this.Parameters.RequirementIds,
      Timescale: this.Parameters.Timescale,
      TimeZoneCode: this.Parameters.TimeZoneCode,
      ResourceIds: this.Parameters.ResourceIds,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
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

  async parseResponse(response: Response): Promise<msdyn_GetAvailabilitySummaryFromDemandResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAvailabilitySummaryFromDemandResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAvailabilitySummaryFromDemand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAvailabilitySummaryFromDemandResult {
  "@odata.context"?: string;
  ResourceAvailabilitySummary: string;
}

/**
 * msdyn_GetAvailabilitySummaryFromDemand response message
 *
 * `result` is the value the msdyn_GetAvailabilitySummaryFromDemand action returns (see {@link msdyn_GetAvailabilitySummaryFromDemandResult}).
 */
export class msdyn_GetAvailabilitySummaryFromDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAvailabilitySummaryFromDemandResult) {
    super("msdyn_GetAvailabilitySummaryFromDemand");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAvailabilitySummaryFromDemandResponse {
    return new msdyn_GetAvailabilitySummaryFromDemandResponse(
      data as msdyn_GetAvailabilitySummaryFromDemandResult
    );
  }
}
