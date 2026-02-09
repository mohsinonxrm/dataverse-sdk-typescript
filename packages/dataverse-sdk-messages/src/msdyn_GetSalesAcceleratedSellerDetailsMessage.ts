import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSalesAcceleratedSellerDetails request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSellerDetails
 */
export class msdyn_GetSalesAcceleratedSellerDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerDetailsResponse>
{
  constructor(public filterConditions: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
    const data = await response.json();
    return msdyn_GetSalesAcceleratedSellerDetailsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FilterConditions: this.filterConditions,
    };
  }
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails response message
 */
export class msdyn_GetSalesAcceleratedSellerDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAcceleratedSellerDetailsResponse) {
    super("msdyn_GetSalesAcceleratedSellerDetails");
  }

  static fromResponse(data: unknown): msdyn_GetSalesAcceleratedSellerDetailsResponse {
    return new msdyn_GetSalesAcceleratedSellerDetailsResponse((data as any).value);
  }
}
