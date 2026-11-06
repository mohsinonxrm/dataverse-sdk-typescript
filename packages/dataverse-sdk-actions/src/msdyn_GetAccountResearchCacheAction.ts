import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAccountResearchCache action
 */
export interface msdyn_GetAccountResearchCacheResponse {
  AccountFinances: string;
  AccountNews: string;
  AccountOverview: string;
  IsHit: boolean;
  ProductIdsCacheKey: string;
}

/**
 * Parameters of the msdyn_GetAccountResearchCache action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAccountResearchCacheActionParameters {
  AccountId: string;
  ProductIds: string;
  LocaleCode: string;
}

/**
 * msdyn_GetAccountResearchCache action
 *
 * Unbound action
 */
export class msdyn_GetAccountResearchCacheAction implements Executable<msdyn_GetAccountResearchCacheResponse> {
  constructor(public readonly parameters: msdyn_GetAccountResearchCacheActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAccountResearchCache`;

    const body = requestBody({
      AccountId: this.parameters.AccountId,
      ProductIds: this.parameters.ProductIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetAccountResearchCacheResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAccountResearchCacheResponse;
    return (await response.json()) as msdyn_GetAccountResearchCacheResponse;
  }
}
