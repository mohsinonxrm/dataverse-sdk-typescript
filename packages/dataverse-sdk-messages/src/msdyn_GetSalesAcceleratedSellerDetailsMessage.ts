import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesAcceleratedSellerDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesAcceleratedSellerDetailsRequestParameters {
  FilterConditions?: string;
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails request message
 *
 * Web API Action: msdyn_GetSalesAcceleratedSellerDetails
 */
export class msdyn_GetSalesAcceleratedSellerDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAcceleratedSellerDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesAcceleratedSellerDetailsRequestParameters>;

  constructor(parameters: msdyn_GetSalesAcceleratedSellerDetailsRequestParameters = {}) {
    super("msdyn_GetSalesAcceleratedSellerDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSellerDetails`;

    const body = requestBody({
      FilterConditions: this.Parameters.FilterConditions,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesAcceleratedSellerDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesAcceleratedSellerDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesAcceleratedSellerDetailsResult {
  "@odata.context"?: string;
  SellerDetails: string;
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails response message
 *
 * `result` is the value the msdyn_GetSalesAcceleratedSellerDetails action returns (see {@link msdyn_GetSalesAcceleratedSellerDetailsResult}).
 */
export class msdyn_GetSalesAcceleratedSellerDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAcceleratedSellerDetailsResult) {
    super("msdyn_GetSalesAcceleratedSellerDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesAcceleratedSellerDetailsResponse {
    return new msdyn_GetSalesAcceleratedSellerDetailsResponse(
      data as msdyn_GetSalesAcceleratedSellerDetailsResult
    );
  }
}
