import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSalesSuggestedActionsResponse as msdyn_GetSalesSuggestedActionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSalesSuggestedActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesSuggestedActionsRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetSalesSuggestedActions request message
 *
 * Web API Action: msdyn_GetSalesSuggestedActions
 */
export class msdyn_GetSalesSuggestedActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesSuggestedActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesSuggestedActionsRequestParameters>;

  constructor(parameters: msdyn_GetSalesSuggestedActionsRequestParameters = {}) {
    super("msdyn_GetSalesSuggestedActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesSuggestedActions`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesSuggestedActionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSalesSuggestedActionsResponse.fromResponse({});
    return msdyn_GetSalesSuggestedActionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSalesSuggestedActions response message
 */
export class msdyn_GetSalesSuggestedActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesSuggestedActionsResponseData) {
    super("msdyn_GetSalesSuggestedActions");
  }

  static fromResponse(data: unknown): msdyn_GetSalesSuggestedActionsResponse {
    return new msdyn_GetSalesSuggestedActionsResponse(
      responseObject<msdyn_GetSalesSuggestedActionsResponseData>(data)
    );
  }
}
