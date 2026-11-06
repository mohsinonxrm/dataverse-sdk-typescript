import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CascadeCrewMembershipsResponse as msdyn_CascadeCrewMembershipsResponseData } from "./types/index.js";

/**
 * msdyn_CascadeCrewMemberships request message
 *
 * Web API Action: msdyn_CascadeCrewMemberships
 */
export class msdyn_CascadeCrewMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeCrewMembershipsResponse>
{
  constructor(public payload: string) {
    super("msdyn_CascadeCrewMemberships");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewMemberships`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeCrewMembershipsResponse> {
    const data = await response.json();
    return msdyn_CascadeCrewMembershipsResponse.fromResponse(data);
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
