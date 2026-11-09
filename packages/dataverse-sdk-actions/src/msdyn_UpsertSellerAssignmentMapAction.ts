import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpsertSellerAssignmentMap action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpsertSellerAssignmentMapResponse {
  "@odata.context"?: string;
  Error: string;
  UpdatedSellerAssignmentMaps: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpsertSellerAssignmentMapResponse;
  }
}
