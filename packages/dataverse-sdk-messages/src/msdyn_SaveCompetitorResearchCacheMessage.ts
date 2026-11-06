import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SaveCompetitorResearchCacheResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SaveCompetitorResearchCache action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveCompetitorResearchCacheResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SaveCompetitorResearchCache response message
 *
 * `result` is the value the msdyn_SaveCompetitorResearchCache action returns (see {@link msdyn_SaveCompetitorResearchCacheResult}).
 */
export class msdyn_SaveCompetitorResearchCacheResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveCompetitorResearchCacheResult) {
    super("msdyn_SaveCompetitorResearchCache");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveCompetitorResearchCacheResponse {
    return new msdyn_SaveCompetitorResearchCacheResponse(
      data as msdyn_SaveCompetitorResearchCacheResult
    );
  }
}
