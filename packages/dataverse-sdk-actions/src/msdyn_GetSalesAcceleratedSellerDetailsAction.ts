import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesAcceleratedSellerDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesAcceleratedSellerDetailsResponse {
  "@odata.context"?: string;
  SellerDetails: string;
}

/**
 * Parameters of the msdyn_GetSalesAcceleratedSellerDetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesAcceleratedSellerDetailsActionParameters {
  FilterConditions?: string;
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails action
 *
 * Unbound action
 */
export class msdyn_GetSalesAcceleratedSellerDetailsAction implements Executable<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
  constructor(
    public readonly parameters: msdyn_GetSalesAcceleratedSellerDetailsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSellerDetails`;

    const body = requestBody({
      FilterConditions: this.parameters.FilterConditions,
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
    return (await response.json()) as msdyn_GetSalesAcceleratedSellerDetailsResponse;
  }
}
