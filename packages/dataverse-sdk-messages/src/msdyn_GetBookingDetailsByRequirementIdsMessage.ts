import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetBookingDetailsByRequirementIdsResponse as msdyn_GetBookingDetailsByRequirementIdsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetBookingDetailsByRequirementIdsResponse.fromResponse({});
    return msdyn_GetBookingDetailsByRequirementIdsResponse.fromResponse(await response.json());
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
