import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetBookingDetailsByRequirementIdsResponse as msdyn_GetBookingDetailsByRequirementIdsResponseData } from "./types/index.js";

/**
 * msdyn_GetBookingDetailsByRequirementIds request message
 *
 * Web API Action: msdyn_GetBookingDetailsByRequirementIds
 */
export class msdyn_GetBookingDetailsByRequirementIdsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookingDetailsByRequirementIdsResponse>
{
  constructor(
    public requirementIds: string,
    public timescale: number
  ) {
    super("msdyn_GetBookingDetailsByRequirementIds");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookingDetailsByRequirementIds`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetBookingDetailsByRequirementIdsResponse> {
    const data = await response.json();
    return msdyn_GetBookingDetailsByRequirementIdsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetBookingDetailsByRequirementIds response message
 */
export class msdyn_GetBookingDetailsByRequirementIdsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBookingDetailsByRequirementIdsResponseData) {
    super("msdyn_GetBookingDetailsByRequirementIds");
  }

  static fromResponse(data: unknown): msdyn_GetBookingDetailsByRequirementIdsResponse {
    return new msdyn_GetBookingDetailsByRequirementIdsResponse(
      responseObject<msdyn_GetBookingDetailsByRequirementIdsResponseData>(data)
    );
  }
}
