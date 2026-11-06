import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSalesAcceleratedSellerDetailsResponse as msdyn_GetSalesAcceleratedSellerDetailsResponseData } from "./types/index.js";

/**
 * msdyn_GetSalesAcceleratedSellerDetails request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSellerDetails
 */
export class msdyn_GetSalesAcceleratedSellerDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerDetailsResponse>
{
  constructor(public filterConditions?: string) {
    super("msdyn_GetSalesAcceleratedSellerDetails");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSellerDetails`;

    const body: Record<string, unknown> = {
      FilterConditions: this.filterConditions,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
    const data = await response.json();
    return msdyn_GetSalesAcceleratedSellerDetailsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails response message
 */
export class msdyn_GetSalesAcceleratedSellerDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAcceleratedSellerDetailsResponseData) {
    super("msdyn_GetSalesAcceleratedSellerDetails");
  }

  static fromResponse(data: unknown): msdyn_GetSalesAcceleratedSellerDetailsResponse {
    return new msdyn_GetSalesAcceleratedSellerDetailsResponse(
      responseObject<msdyn_GetSalesAcceleratedSellerDetailsResponseData>(data)
    );
  }
}
