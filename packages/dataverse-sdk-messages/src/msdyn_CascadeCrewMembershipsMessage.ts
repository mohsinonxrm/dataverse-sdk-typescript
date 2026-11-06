import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CascadeCrewMembershipsResponse as msdyn_CascadeCrewMembershipsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CascadeCrewMemberships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeCrewMembershipsRequestParameters {
  Payload: string;
}

/**
 * msdyn_CascadeCrewMemberships request message
 *
 * Web API Action: msdyn_CascadeCrewMemberships
 */
export class msdyn_CascadeCrewMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeCrewMembershipsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CascadeCrewMembershipsRequestParameters>;

  constructor(parameters: msdyn_CascadeCrewMembershipsRequestParameters) {
    super("msdyn_CascadeCrewMemberships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewMemberships`;

    const body = requestBody({
      Payload: this.Parameters.Payload,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeCrewMembershipsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CascadeCrewMembershipsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CascadeCrewMemberships response message
 */
export class msdyn_CascadeCrewMembershipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CascadeCrewMembershipsResponseData) {
    super("msdyn_CascadeCrewMemberships");
  }

  static fromResponse(data: unknown): msdyn_CascadeCrewMembershipsResponse {
    return new msdyn_CascadeCrewMembershipsResponse(
      responseObject<msdyn_CascadeCrewMembershipsResponseData>(data)
    );
  }
}
