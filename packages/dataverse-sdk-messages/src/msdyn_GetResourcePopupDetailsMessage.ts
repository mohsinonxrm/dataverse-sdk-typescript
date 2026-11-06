import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetResourcePopupDetailsResponse as msdyn_GetResourcePopupDetailsResponseData } from "./types/index.js";

/**
 * msdyn_GetResourcePopupDetails request message
 *
 * Web API Action: msdyn_GetResourcePopupDetails
 */
export class msdyn_GetResourcePopupDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcePopupDetailsResponse>
{
  constructor(
    public startDate: string | undefined,
    public endDate: string | undefined,
    public resourceId: string
  ) {
    super("msdyn_GetResourcePopupDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourcePopupDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      ResourceId: this.resourceId,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcePopupDetailsResponse> {
    const data = await response.json();
    return msdyn_GetResourcePopupDetailsResponse.fromResponse(data);
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
