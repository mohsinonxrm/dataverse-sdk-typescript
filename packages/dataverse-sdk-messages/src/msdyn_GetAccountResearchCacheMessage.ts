import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAccountResearchCache message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAccountResearchCacheRequestParameters {
  AccountId: string;
  ProductIds: string;
  LocaleCode: string;
}

/**
 * msdyn_GetAccountResearchCache request message
 *
 * Web API Action: msdyn_GetAccountResearchCache
 */
export class msdyn_GetAccountResearchCacheRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAccountResearchCacheResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAccountResearchCacheRequestParameters>;

  constructor(parameters: msdyn_GetAccountResearchCacheRequestParameters) {
    super("msdyn_GetAccountResearchCache", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAccountResearchCache`;

    const body = requestBody({
      AccountId: this.Parameters.AccountId,
      ProductIds: this.Parameters.ProductIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAccountResearchCacheResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAccountResearchCacheResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAccountResearchCache action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAccountResearchCacheResult {
  "@odata.context"?: string;
  AccountFinances: string;
  AccountNews: string;
  AccountOverview: string;
  IsHit: boolean;
  ProductIdsCacheKey: string;
}

/**
 * msdyn_GetAccountResearchCache response message
 *
 * `result` is the value the msdyn_GetAccountResearchCache action returns (see {@link msdyn_GetAccountResearchCacheResult}).
 */
export class msdyn_GetAccountResearchCacheResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAccountResearchCacheResult) {
    super("msdyn_GetAccountResearchCache");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAccountResearchCacheResponse {
    return new msdyn_GetAccountResearchCacheResponse(data as msdyn_GetAccountResearchCacheResult);
  }
}
