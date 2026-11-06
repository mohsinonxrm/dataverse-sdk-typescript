import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetBookingDetailsByRequirementIds message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBookingDetailsByRequirementIdsRequestParameters {
  RequirementIds: string;
  Timescale?: number;
}

/**
 * msdyn_GetBookingDetailsByRequirementIds request message
 *
 * Web API Action: msdyn_GetBookingDetailsByRequirementIds
 */
export class msdyn_GetBookingDetailsByRequirementIdsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookingDetailsByRequirementIdsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBookingDetailsByRequirementIdsRequestParameters>;

  constructor(parameters: msdyn_GetBookingDetailsByRequirementIdsRequestParameters) {
    super("msdyn_GetBookingDetailsByRequirementIds", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookingDetailsByRequirementIds`;

    const body = requestBody({
      RequirementIds: this.Parameters.RequirementIds,
      Timescale: this.Parameters.Timescale,
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
  ): Promise<msdyn_GetBookingDetailsByRequirementIdsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetBookingDetailsByRequirementIdsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetBookingDetailsByRequirementIds action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBookingDetailsByRequirementIdsResult {
  "@odata.context"?: string;
  RequirementsBookingDetails: string;
}

/**
 * msdyn_GetBookingDetailsByRequirementIds response message
 *
 * `result` is the value the msdyn_GetBookingDetailsByRequirementIds action returns (see {@link msdyn_GetBookingDetailsByRequirementIdsResult}).
 */
export class msdyn_GetBookingDetailsByRequirementIdsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBookingDetailsByRequirementIdsResult) {
    super("msdyn_GetBookingDetailsByRequirementIds");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetBookingDetailsByRequirementIdsResponse {
    return new msdyn_GetBookingDetailsByRequirementIdsResponse(
      data as msdyn_GetBookingDetailsByRequirementIdsResult
    );
  }
}
