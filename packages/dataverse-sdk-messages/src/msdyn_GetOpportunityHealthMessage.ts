import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOpportunityHealthResponse as msdyn_GetOpportunityHealthResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOpportunityHealth message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityHealthRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityHealth request message
 *
 * Web API Action: msdyn_GetOpportunityHealth
 */
export class msdyn_GetOpportunityHealthRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityHealthResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityHealthRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityHealthRequestParameters) {
    super("msdyn_GetOpportunityHealth", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityHealth`;

    const body = requestBody({
      msdyn_OpportunityId: this.Parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityHealthResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetOpportunityHealthResponse.fromResponse({});
    return msdyn_GetOpportunityHealthResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOpportunityHealth response message
 */
export class msdyn_GetOpportunityHealthResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityHealthResponseData) {
    super("msdyn_GetOpportunityHealth");
  }

  static fromResponse(data: unknown): msdyn_GetOpportunityHealthResponse {
    return new msdyn_GetOpportunityHealthResponse(
      responseObject<msdyn_GetOpportunityHealthResponseData>(data)
    );
  }
}
