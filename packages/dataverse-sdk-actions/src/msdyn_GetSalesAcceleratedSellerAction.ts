import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetSalesAcceleratedSeller action
 */
export interface msdyn_GetSalesAcceleratedSellerResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetSalesAcceleratedSeller action
 *
 * Unbound action
 */
export class msdyn_GetSalesAcceleratedSellerAction implements Executable<msdyn_GetSalesAcceleratedSellerResponse> {
  constructor(
    public readonly isTeamsRequest: boolean,
    public readonly expandDetails?: boolean
  ) {}

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
    return data as msdyn_GetSalesAcceleratedSellerResponse;
  }
}
