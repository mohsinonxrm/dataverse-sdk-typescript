import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_LookupCompetitorResearchCacheResponse as msdyn_LookupCompetitorResearchCacheResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_LookupCompetitorResearchCache message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LookupCompetitorResearchCacheRequestParameters {
  CompetitorName?: string;
  AccountId?: string;
  SellerProductsList?: string;
  CacheTier: number;
  SellerDomain?: string;
  LocaleCode: string;
}

/**
 * msdyn_LookupCompetitorResearchCache request message
 *
 * Web API Action: msdyn_LookupCompetitorResearchCache
 */
export class msdyn_LookupCompetitorResearchCacheRequest
  extends OrganizationRequest
  implements Executable<msdyn_LookupCompetitorResearchCacheResponse>
{
  declare readonly Parameters: Readonly<msdyn_LookupCompetitorResearchCacheRequestParameters>;

  constructor(parameters: msdyn_LookupCompetitorResearchCacheRequestParameters) {
    super("msdyn_LookupCompetitorResearchCache", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LookupCompetitorResearchCache`;

    const body = requestBody({
      CompetitorName: this.Parameters.CompetitorName,
      AccountId: this.Parameters.AccountId,
      SellerProductsList: this.Parameters.SellerProductsList,
      CacheTier: this.Parameters.CacheTier,
      SellerDomain: this.Parameters.SellerDomain,
      LocaleCode: this.Parameters.LocaleCode,
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

  async parseResponse(response: Response): Promise<msdyn_LookupCompetitorResearchCacheResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_LookupCompetitorResearchCacheResponse.fromResponse({});
    return msdyn_LookupCompetitorResearchCacheResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_LookupCompetitorResearchCache response message
 */
export class msdyn_LookupCompetitorResearchCacheResponse extends OrganizationResponse {
  constructor(public result: msdyn_LookupCompetitorResearchCacheResponseData) {
    super("msdyn_LookupCompetitorResearchCache");
  }

  static fromResponse(data: unknown): msdyn_LookupCompetitorResearchCacheResponse {
    return new msdyn_LookupCompetitorResearchCacheResponse(
      responseObject<msdyn_LookupCompetitorResearchCacheResponseData>(data)
    );
  }
}
