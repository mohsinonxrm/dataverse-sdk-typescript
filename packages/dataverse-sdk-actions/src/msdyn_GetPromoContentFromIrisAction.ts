import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetPromoContentFromIris action
 */
export interface msdyn_GetPromoContentFromIrisResponse {
  msdyn_promoContent: string;
}

/**
 * Parameters of the msdyn_GetPromoContentFromIris action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPromoContentFromIrisActionParameters {
  msdyn_country?: string;
  msdyn_placementId?: number;
  msdyn_pageName?: string;
  msdyn_locale?: string;
  msdyn_pageType?: string;
  msdyn_isAdmin?: boolean;
  msdyn_irisUrl?: string;
}

/**
 * msdyn_GetPromoContentFromIris action
 *
 * Unbound action
 */
export class msdyn_GetPromoContentFromIrisAction implements Executable<msdyn_GetPromoContentFromIrisResponse> {
  constructor(public readonly parameters: msdyn_GetPromoContentFromIrisActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPromoContentFromIris`;

    const body = requestBody({
      msdyn_country: this.parameters.msdyn_country,
      msdyn_placementId: this.parameters.msdyn_placementId,
      msdyn_pageName: this.parameters.msdyn_pageName,
      msdyn_locale: this.parameters.msdyn_locale,
      msdyn_pageType: this.parameters.msdyn_pageType,
      msdyn_isAdmin: this.parameters.msdyn_isAdmin,
      msdyn_irisUrl: this.parameters.msdyn_irisUrl,
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

  async parseResponse(response: Response): Promise<msdyn_GetPromoContentFromIrisResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetPromoContentFromIrisResponse;
    return (await response.json()) as msdyn_GetPromoContentFromIrisResponse;
  }
}
