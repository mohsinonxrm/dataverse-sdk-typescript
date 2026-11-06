import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesAcceleratedSeller message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesAcceleratedSellerRequestParameters {
  IsTeamsRequest: boolean;
  ExpandDetails?: boolean;
}

/**
 * msdyn_GetSalesAcceleratedSeller request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSeller
 */
export class msdyn_GetSalesAcceleratedSellerRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesAcceleratedSellerRequestParameters>;

  constructor(parameters: msdyn_GetSalesAcceleratedSellerRequestParameters) {
    super("msdyn_GetSalesAcceleratedSeller", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSeller`;

    const body = requestBody({
      IsTeamsRequest: this.Parameters.IsTeamsRequest,
      ExpandDetails: this.Parameters.ExpandDetails,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSalesAcceleratedSellerResponse.fromResponse(text ? JSON.parse(text) : {});
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
