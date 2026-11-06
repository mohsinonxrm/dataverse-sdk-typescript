import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRequirementDemandDisplay action
 */
export interface msdyn_GetRequirementDemandDisplayResponse {
  RequirementDemandDisplay: string;
}

/**
 * Parameters of the msdyn_GetRequirementDemandDisplay action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDemandDisplayActionParameters {
  RequirementIds: string;
  Timescale: number;
  TimeZoneCode: number;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetRequirementDemandDisplay action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDemandDisplayAction implements Executable<msdyn_GetRequirementDemandDisplayResponse> {
  constructor(public readonly parameters: msdyn_GetRequirementDemandDisplayActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemandDisplay`;

    const body = requestBody({
      RequirementIds: this.parameters.RequirementIds,
      Timescale: this.parameters.Timescale,
      TimeZoneCode: this.parameters.TimeZoneCode,
      IgnoreTimeZone: this.parameters.IgnoreTimeZone,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandDisplayResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRequirementDemandDisplayResponse;
  }
}
