import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetKeyOpportunityStakeholdersResponse as msdyn_GetKeyOpportunityStakeholdersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetKeyOpportunityStakeholders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityStakeholdersRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityStakeholders request message
 *
 * Web API Action: msdyn_GetKeyOpportunityStakeholders
 */
export class msdyn_GetKeyOpportunityStakeholdersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeyOpportunityStakeholdersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeyOpportunityStakeholdersRequestParameters>;

  constructor(parameters: msdyn_GetKeyOpportunityStakeholdersRequestParameters) {
    super("msdyn_GetKeyOpportunityStakeholders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityStakeholders`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityStakeholdersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetKeyOpportunityStakeholdersResponse.fromResponse({});
    return msdyn_GetKeyOpportunityStakeholdersResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetKeyOpportunityStakeholders response message
 */
export class msdyn_GetKeyOpportunityStakeholdersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunityStakeholdersResponseData) {
    super("msdyn_GetKeyOpportunityStakeholders");
  }

  static fromResponse(data: unknown): msdyn_GetKeyOpportunityStakeholdersResponse {
    return new msdyn_GetKeyOpportunityStakeholdersResponse(
      responseObject<msdyn_GetKeyOpportunityStakeholdersResponseData>(data)
    );
  }
}
