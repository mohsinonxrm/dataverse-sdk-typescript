import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpsertSellerAssignmentMap action
 */
export interface msdyn_UpsertSellerAssignmentMapResponse {
  UpdatedSellerAssignmentMaps: string;
  Error: string;
}

/**
 * msdyn_UpsertSellerAssignmentMap action
 *
 * Unbound action
 */
export class msdyn_UpsertSellerAssignmentMapAction implements Executable<msdyn_UpsertSellerAssignmentMapResponse> {
  constructor(public readonly sellerAssignmentMapArray: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertSellerAssignmentMap`;

    const body: Record<string, unknown> = {
      SellerAssignmentMapArray: this.sellerAssignmentMapArray,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertSellerAssignmentMapResponse> {
    const data = await response.json();
    return data as msdyn_UpsertSellerAssignmentMapResponse;
  }
}
