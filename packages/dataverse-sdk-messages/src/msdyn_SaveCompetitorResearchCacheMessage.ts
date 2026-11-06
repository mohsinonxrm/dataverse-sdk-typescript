import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SaveCompetitorResearchCacheResponse as msdyn_SaveCompetitorResearchCacheResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SaveCompetitorResearchCache message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveCompetitorResearchCacheRequestParameters {
  SellerProductsList?: string;
  LocaleCode: string;
  CacheTier: number;
  SellerDomain?: string;
  CachedResult: string;
  CompetitorName?: string;
  AccountId?: string;
}

/**
 * msdyn_SaveCompetitorResearchCache request message
 *
 * Web API Action: msdyn_SaveCompetitorResearchCache
 */
export class msdyn_SaveCompetitorResearchCacheRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveCompetitorResearchCacheResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveCompetitorResearchCacheRequestParameters>;

  constructor(parameters: msdyn_SaveCompetitorResearchCacheRequestParameters) {
    super("msdyn_SaveCompetitorResearchCache", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCompetitorResearchCache`;

    const body = requestBody({
      SellerProductsList: this.Parameters.SellerProductsList,
      LocaleCode: this.Parameters.LocaleCode,
      CacheTier: this.Parameters.CacheTier,
      SellerDomain: this.Parameters.SellerDomain,
      CachedResult: this.Parameters.CachedResult,
      CompetitorName: this.Parameters.CompetitorName,
      AccountId: this.Parameters.AccountId,
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

  async parseResponse(response: Response): Promise<msdyn_SaveCompetitorResearchCacheResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SaveCompetitorResearchCacheResponse.fromResponse({});
    return msdyn_SaveCompetitorResearchCacheResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SaveCompetitorResearchCache response message
 */
export class msdyn_SaveCompetitorResearchCacheResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveCompetitorResearchCacheResponseData) {
    super("msdyn_SaveCompetitorResearchCache");
  }

  static fromResponse(data: unknown): msdyn_SaveCompetitorResearchCacheResponse {
    return new msdyn_SaveCompetitorResearchCacheResponse(
      responseObject<msdyn_SaveCompetitorResearchCacheResponseData>(data)
    );
  }
}
