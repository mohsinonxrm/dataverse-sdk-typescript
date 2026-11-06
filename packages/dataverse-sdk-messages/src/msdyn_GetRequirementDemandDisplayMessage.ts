import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRequirementDemandDisplayResponse as msdyn_GetRequirementDemandDisplayResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetRequirementDemandDisplayResponse.fromResponse({});
    return msdyn_GetRequirementDemandDisplayResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetRequirementDemandDisplay response message
 */
export class msdyn_GetRequirementDemandDisplayResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDemandDisplayResponseData) {
    super("msdyn_GetRequirementDemandDisplay");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementDemandDisplayResponse {
    return new msdyn_GetRequirementDemandDisplayResponse(
      responseObject<msdyn_GetRequirementDemandDisplayResponseData>(data)
    );
  }
}
