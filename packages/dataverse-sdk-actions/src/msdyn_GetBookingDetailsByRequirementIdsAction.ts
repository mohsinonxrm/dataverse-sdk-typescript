import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetBookingDetailsByRequirementIds action
 */
export interface msdyn_GetBookingDetailsByRequirementIdsResponse {
  RequirementsBookingDetails: string;
}

/**
 * Parameters of the msdyn_GetBookingDetailsByRequirementIds action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBookingDetailsByRequirementIdsActionParameters {
  RequirementIds: string;
  Timescale?: number;
}

/**
 * msdyn_GetBookingDetailsByRequirementIds action
 *
 * Unbound action
 */
export class msdyn_GetBookingDetailsByRequirementIdsAction implements Executable<msdyn_GetBookingDetailsByRequirementIdsResponse> {
  constructor(
    public readonly parameters: msdyn_GetBookingDetailsByRequirementIdsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookingDetailsByRequirementIds`;

    const body = requestBody({
      RequirementIds: this.parameters.RequirementIds,
      Timescale: this.parameters.Timescale,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetBookingDetailsByRequirementIdsResponse;
  }
}
