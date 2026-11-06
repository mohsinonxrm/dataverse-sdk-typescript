import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetPrecannedIndustriesResponse as msdyn_GetPrecannedIndustriesResponseData } from "./types/index.js";

/**
 * msdyn_GetPrecannedIndustries request message
 *
 * Web API Action: msdyn_GetPrecannedIndustries
 */
export class msdyn_GetPrecannedIndustriesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPrecannedIndustriesResponse>
{
  constructor() {
    super("msdyn_GetPrecannedIndustries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPrecannedIndustries`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPrecannedIndustriesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetPrecannedIndustriesResponse.fromResponse({});
    return msdyn_GetPrecannedIndustriesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetPrecannedIndustries response message
 */
export class msdyn_GetPrecannedIndustriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPrecannedIndustriesResponseData) {
    super("msdyn_GetPrecannedIndustries");
  }

  static fromResponse(data: unknown): msdyn_GetPrecannedIndustriesResponse {
    return new msdyn_GetPrecannedIndustriesResponse(
      responseObject<msdyn_GetPrecannedIndustriesResponseData>(data)
    );
  }
}
