import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_LookupCompetitorResearchCacheResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_LookupCompetitorResearchCache action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LookupCompetitorResearchCacheResult {
  "@odata.context"?: string;
  CachedResult: string;
  IsHit: boolean;
}

/**
 * msdyn_LookupCompetitorResearchCache response message
 *
 * `result` is the value the msdyn_LookupCompetitorResearchCache action returns (see {@link msdyn_LookupCompetitorResearchCacheResult}).
 */
export class msdyn_LookupCompetitorResearchCacheResponse extends OrganizationResponse {
  constructor(public result: msdyn_LookupCompetitorResearchCacheResult) {
    super("msdyn_LookupCompetitorResearchCache");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LookupCompetitorResearchCacheResponse {
    return new msdyn_LookupCompetitorResearchCacheResponse(
      data as msdyn_LookupCompetitorResearchCacheResult
    );
  }
}
