import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveCompetitorResearchCache action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveCompetitorResearchCacheResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SaveCompetitorResearchCache action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveCompetitorResearchCacheActionParameters {
  SellerProductsList?: string;
  LocaleCode: string;
  CacheTier: number;
  SellerDomain?: string;
  CachedResult: string;
  CompetitorName?: string;
  AccountId?: string;
}

/**
 * msdyn_SaveCompetitorResearchCache action
 *
 * Unbound action
 */
export class msdyn_SaveCompetitorResearchCacheAction implements Executable<msdyn_SaveCompetitorResearchCacheResponse> {
  constructor(public readonly parameters: msdyn_SaveCompetitorResearchCacheActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveCompetitorResearchCache`;

    const body = requestBody({
      SellerProductsList: this.parameters.SellerProductsList,
      LocaleCode: this.parameters.LocaleCode,
      CacheTier: this.parameters.CacheTier,
      SellerDomain: this.parameters.SellerDomain,
      CachedResult: this.parameters.CachedResult,
      CompetitorName: this.parameters.CompetitorName,
      AccountId: this.parameters.AccountId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveCompetitorResearchCacheResponse;
  }
}
