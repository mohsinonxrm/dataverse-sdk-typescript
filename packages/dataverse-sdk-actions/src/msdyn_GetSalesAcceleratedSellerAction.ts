import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSalesAcceleratedSeller action
 */
export interface msdyn_GetSalesAcceleratedSellerResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_GetSalesAcceleratedSeller action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesAcceleratedSellerActionParameters {
  IsTeamsRequest: boolean;
  ExpandDetails?: boolean;
}

/**
 * msdyn_GetSalesAcceleratedSeller action
 *
 * Unbound action
 */
export class msdyn_GetSalesAcceleratedSellerAction implements Executable<msdyn_GetSalesAcceleratedSellerResponse> {
  constructor(public readonly parameters: msdyn_GetSalesAcceleratedSellerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSeller`;

    const body = requestBody({
      IsTeamsRequest: this.parameters.IsTeamsRequest,
      ExpandDetails: this.parameters.ExpandDetails,
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
    return (text ? JSON.parse(text) : {}) as msdyn_GetSalesAcceleratedSellerResponse;
  }
}
