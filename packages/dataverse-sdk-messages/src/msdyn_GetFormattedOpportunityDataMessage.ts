import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFormattedOpportunityDataResponse as msdyn_GetFormattedOpportunityDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFormattedOpportunityData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFormattedOpportunityDataRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetFormattedOpportunityData request message
 *
 * Web API Action: msdyn_GetFormattedOpportunityData
 */
export class msdyn_GetFormattedOpportunityDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFormattedOpportunityDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFormattedOpportunityDataRequestParameters>;

  constructor(parameters: msdyn_GetFormattedOpportunityDataRequestParameters) {
    super("msdyn_GetFormattedOpportunityData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFormattedOpportunityData`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFormattedOpportunityDataResponse.fromResponse({});
    return msdyn_GetFormattedOpportunityDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFormattedOpportunityData response message
 */
export class msdyn_GetFormattedOpportunityDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFormattedOpportunityDataResponseData) {
    super("msdyn_GetFormattedOpportunityData");
  }

  static fromResponse(data: unknown): msdyn_GetFormattedOpportunityDataResponse {
    return new msdyn_GetFormattedOpportunityDataResponse(
      responseObject<msdyn_GetFormattedOpportunityDataResponseData>(data)
    );
  }
}
