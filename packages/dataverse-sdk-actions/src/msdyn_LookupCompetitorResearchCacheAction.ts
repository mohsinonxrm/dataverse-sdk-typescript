import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_LookupCompetitorResearchCache action
 */
export interface msdyn_LookupCompetitorResearchCacheResponse {
  CachedResult: string;
  IsHit: boolean;
}

/**
 * Parameters of the msdyn_LookupCompetitorResearchCache action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LookupCompetitorResearchCacheActionParameters {
  CompetitorName?: string;
  AccountId?: string;
  SellerProductsList?: string;
  CacheTier: number;
  SellerDomain?: string;
  LocaleCode: string;
}

/**
 * msdyn_LookupCompetitorResearchCache action
 *
 * Unbound action
 */
export class msdyn_LookupCompetitorResearchCacheAction implements Executable<msdyn_LookupCompetitorResearchCacheResponse> {
  constructor(public readonly parameters: msdyn_LookupCompetitorResearchCacheActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LookupCompetitorResearchCache`;

    const body = requestBody({
      CompetitorName: this.parameters.CompetitorName,
      AccountId: this.parameters.AccountId,
      SellerProductsList: this.parameters.SellerProductsList,
      CacheTier: this.parameters.CacheTier,
      SellerDomain: this.parameters.SellerDomain,
      LocaleCode: this.parameters.LocaleCode,
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
    if (response.status === 204) return {} as msdyn_LookupCompetitorResearchCacheResponse;
    return (await response.json()) as msdyn_LookupCompetitorResearchCacheResponse;
  }
}
