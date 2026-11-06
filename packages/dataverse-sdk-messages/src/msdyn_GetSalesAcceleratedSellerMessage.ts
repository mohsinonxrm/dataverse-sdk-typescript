import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_GetSalesAcceleratedSeller request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSeller
 */
export class msdyn_GetSalesAcceleratedSellerRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerResponse>
{
  constructor(
    public isTeamsRequest: boolean,
    public expandDetails?: boolean
  ) {
    super("msdyn_GetSalesAcceleratedSeller");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSeller`;

    const body: Record<string, unknown> = {
      IsTeamsRequest: this.isTeamsRequest,
      ExpandDetails: this.expandDetails,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerResponse> {
    const data = await response.json();
    return msdyn_GetSalesAcceleratedSellerResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSalesAcceleratedSeller response message
 */
export class msdyn_GetSalesAcceleratedSellerResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetSalesAcceleratedSeller");
  }

  static fromResponse(data: unknown): msdyn_GetSalesAcceleratedSellerResponse {
    return new msdyn_GetSalesAcceleratedSellerResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
