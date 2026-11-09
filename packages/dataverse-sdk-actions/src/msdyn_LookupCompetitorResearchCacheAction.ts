import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_LookupCompetitorResearchCache action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LookupCompetitorResearchCacheResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_LookupCompetitorResearchCacheResponse;
  }
}
