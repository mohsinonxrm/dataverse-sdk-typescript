import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetPromoContentFromIrisResponse as msdyn_GetPromoContentFromIrisResponseData } from "./types/index.js";

/**
 * msdyn_GetPromoContentFromIris request message
 *
 * Web API Action: msdyn_GetPromoContentFromIris
 */
export class msdyn_GetPromoContentFromIrisRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPromoContentFromIrisResponse>
{
  constructor(
    public msdyn_country: string,
    public msdyn_placementId: number,
    public msdyn_irisUrl: string,
    public msdyn_pageType: string,
    public msdyn_isAdmin: boolean,
    public msdyn_pageName: string,
    public msdyn_locale: string
  ) {
    super("msdyn_GetPromoContentFromIris");
  }

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
    return msdyn_GetPromoContentFromIrisResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetPromoContentFromIris response message
 */
export class msdyn_GetPromoContentFromIrisResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPromoContentFromIrisResponseData) {
    super("msdyn_GetPromoContentFromIris");
  }

  static fromResponse(data: unknown): msdyn_GetPromoContentFromIrisResponse {
    return new msdyn_GetPromoContentFromIrisResponse(
      responseObject<msdyn_GetPromoContentFromIrisResponseData>(data)
    );
  }
}
