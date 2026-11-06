import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesAcceleratedSellerDetails action
 */
export interface msdyn_GetSalesAcceleratedSellerDetailsResponse {
  SellerDetails: string;
}

/**
 * msdyn_GetSalesAcceleratedSellerDetails action
 *
 * Unbound action
 */
export class msdyn_GetSalesAcceleratedSellerDetailsAction implements Executable<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
  constructor(public readonly filterConditions?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAcceleratedSellerDetails`;

    const body: Record<string, unknown> = {
      FilterConditions: this.filterConditions,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesAcceleratedSellerDetailsResponse> {
    const data = await response.json();
    return data as msdyn_GetSalesAcceleratedSellerDetailsResponse;
  }
}
