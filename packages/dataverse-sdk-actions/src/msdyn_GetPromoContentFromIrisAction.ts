import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetPromoContentFromIris action
 */
export interface msdyn_GetPromoContentFromIrisResponse {
  msdyn_promoContent: string;
}

/**
 * msdyn_GetPromoContentFromIris action
 *
 * Unbound action
 */
export class msdyn_GetPromoContentFromIrisAction implements Executable<msdyn_GetPromoContentFromIrisResponse> {
  constructor(
    public readonly msdyn_country: string,
    public readonly msdyn_placementId: number,
    public readonly msdyn_irisUrl: string,
    public readonly msdyn_pageType: string,
    public readonly msdyn_isAdmin: boolean,
    public readonly msdyn_pageName: string,
    public readonly msdyn_locale: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPromoContentFromIris`;

    const body: Record<string, unknown> = {
      msdyn_country: this.msdyn_country,
      msdyn_placementId: this.msdyn_placementId,
      msdyn_irisUrl: this.msdyn_irisUrl,
      msdyn_pageType: this.msdyn_pageType,
      msdyn_isAdmin: this.msdyn_isAdmin,
      msdyn_pageName: this.msdyn_pageName,
      msdyn_locale: this.msdyn_locale,
    };

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
    const data = await response.json();
    return data as msdyn_GetPromoContentFromIrisResponse;
  }
}
