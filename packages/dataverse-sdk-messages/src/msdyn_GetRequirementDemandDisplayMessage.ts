import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRequirementDemandDisplayResponse as msdyn_GetRequirementDemandDisplayResponseData } from "./types/index.js";

/**
 * msdyn_GetRequirementDemandDisplay request message
 *
 * Web API Action: msdyn_GetRequirementDemandDisplay
 */
export class msdyn_GetRequirementDemandDisplayRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDemandDisplayResponse>
{
  constructor(
    public requirementIds: string,
    public timescale: number,
    public timeZoneCode: number,
    public ignoreTimeZone: boolean
  ) {
    super("msdyn_GetRequirementDemandDisplay");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemandDisplay`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
      TimeZoneCode: this.timeZoneCode,
      IgnoreTimeZone: this.ignoreTimeZone,
    };

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
    const data = await response.json();
    return msdyn_GetRequirementDemandDisplayResponse.fromResponse(data);
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
