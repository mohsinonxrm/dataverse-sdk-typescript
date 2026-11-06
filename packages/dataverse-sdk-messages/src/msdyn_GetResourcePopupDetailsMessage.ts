import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourcePopupDetailsResponse as msdyn_GetResourcePopupDetailsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetResourcePopupDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcePopupDetailsRequestParameters {
  StartDate?: string;
  EndDate?: string;
  ResourceId: string;
}

/**
 * msdyn_GetResourcePopupDetails request message
 *
 * Web API Action: msdyn_GetResourcePopupDetails
 */
export class msdyn_GetResourcePopupDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcePopupDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourcePopupDetailsRequestParameters>;

  constructor(parameters: msdyn_GetResourcePopupDetailsRequestParameters) {
    super("msdyn_GetResourcePopupDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourcePopupDetails`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      ResourceId: this.Parameters.ResourceId,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcePopupDetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetResourcePopupDetailsResponse.fromResponse({});
    return msdyn_GetResourcePopupDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetResourcePopupDetails response message
 */
export class msdyn_GetResourcePopupDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourcePopupDetailsResponseData) {
    super("msdyn_GetResourcePopupDetails");
  }

  static fromResponse(data: unknown): msdyn_GetResourcePopupDetailsResponse {
    return new msdyn_GetResourcePopupDetailsResponse(
      responseObject<msdyn_GetResourcePopupDetailsResponseData>(data)
    );
  }
}
