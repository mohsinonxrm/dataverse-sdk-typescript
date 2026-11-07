import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetPromoContentFromIris message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPromoContentFromIrisRequestParameters {
  msdyn_country?: string;
  msdyn_placementId?: number;
  msdyn_pageName?: string;
  msdyn_locale?: string;
  msdyn_pageType?: string;
  msdyn_isAdmin?: boolean;
  msdyn_irisUrl?: string;
}

/**
 * msdyn_GetPromoContentFromIris request message
 *
 * Web API Action: msdyn_GetPromoContentFromIris
 */
export class msdyn_GetPromoContentFromIrisRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPromoContentFromIrisResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPromoContentFromIrisRequestParameters>;

  constructor(parameters: msdyn_GetPromoContentFromIrisRequestParameters = {}) {
    super("msdyn_GetPromoContentFromIris", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPromoContentFromIris`;

    const body = requestBody({
      msdyn_country: this.Parameters.msdyn_country,
      msdyn_placementId: this.Parameters.msdyn_placementId,
      msdyn_pageName: this.Parameters.msdyn_pageName,
      msdyn_locale: this.Parameters.msdyn_locale,
      msdyn_pageType: this.Parameters.msdyn_pageType,
      msdyn_isAdmin: this.Parameters.msdyn_isAdmin,
      msdyn_irisUrl: this.Parameters.msdyn_irisUrl,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetPromoContentFromIrisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPromoContentFromIris action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPromoContentFromIrisResult {
  "@odata.context"?: string;
  msdyn_promoContent: string;
}

/**
 * msdyn_GetPromoContentFromIris response message
 *
 * `result` is the value the msdyn_GetPromoContentFromIris action returns (see {@link msdyn_GetPromoContentFromIrisResult}).
 */
export class msdyn_GetPromoContentFromIrisResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPromoContentFromIrisResult) {
    super("msdyn_GetPromoContentFromIris");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPromoContentFromIrisResponse {
    return new msdyn_GetPromoContentFromIrisResponse(data as msdyn_GetPromoContentFromIrisResult);
  }
}
