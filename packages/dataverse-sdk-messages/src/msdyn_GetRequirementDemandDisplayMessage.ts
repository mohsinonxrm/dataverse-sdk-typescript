import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRequirementDemandDisplay message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDemandDisplayRequestParameters {
  RequirementIds: string;
  Timescale: number;
  TimeZoneCode: number;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_GetRequirementDemandDisplay request message
 *
 * Web API Action: msdyn_GetRequirementDemandDisplay
 */
export class msdyn_GetRequirementDemandDisplayRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDemandDisplayResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementDemandDisplayRequestParameters>;

  constructor(parameters: msdyn_GetRequirementDemandDisplayRequestParameters) {
    super("msdyn_GetRequirementDemandDisplay", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemandDisplay`;

    const body = requestBody({
      RequirementIds: this.Parameters.RequirementIds,
      Timescale: this.Parameters.Timescale,
      TimeZoneCode: this.Parameters.TimeZoneCode,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandDisplayResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRequirementDemandDisplayResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRequirementDemandDisplay action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementDemandDisplayResult {
  "@odata.context"?: string;
  RequirementDemandDisplay: string;
}

/**
 * msdyn_GetRequirementDemandDisplay response message
 *
 * `result` is the value the msdyn_GetRequirementDemandDisplay action returns (see {@link msdyn_GetRequirementDemandDisplayResult}).
 */
export class msdyn_GetRequirementDemandDisplayResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDemandDisplayResult) {
    super("msdyn_GetRequirementDemandDisplay");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRequirementDemandDisplayResponse {
    return new msdyn_GetRequirementDemandDisplayResponse(
      data as msdyn_GetRequirementDemandDisplayResult
    );
  }
}
