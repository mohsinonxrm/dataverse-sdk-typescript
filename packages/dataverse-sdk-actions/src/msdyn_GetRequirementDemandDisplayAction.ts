import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetRequirementDemandDisplay action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementDemandDisplayResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRequirementDemandDisplayResponse;
  }
}
