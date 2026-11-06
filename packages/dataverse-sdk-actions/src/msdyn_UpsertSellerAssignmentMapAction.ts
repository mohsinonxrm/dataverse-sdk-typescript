import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpsertSellerAssignmentMap action
 */
export interface msdyn_UpsertSellerAssignmentMapResponse {
  UpdatedSellerAssignmentMaps: string;
  Error: string;
}

/**
 * Parameters of the msdyn_UpsertSellerAssignmentMap action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertSellerAssignmentMapActionParameters {
  SellerAssignmentMapArray: string;
}

/**
 * msdyn_UpsertSellerAssignmentMap action
 *
 * Unbound action
 */
export class msdyn_UpsertSellerAssignmentMapAction implements Executable<msdyn_UpsertSellerAssignmentMapResponse> {
  constructor(public readonly parameters: msdyn_UpsertSellerAssignmentMapActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertSellerAssignmentMap`;

    const body = requestBody({
      SellerAssignmentMapArray: this.parameters.SellerAssignmentMapArray,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertSellerAssignmentMapResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpsertSellerAssignmentMapResponse;
  }
}
