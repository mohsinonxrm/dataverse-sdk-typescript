import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourcePopupDetails action
 */
export interface msdyn_GetResourcePopupDetailsResponse {
  ResourceDetails: string;
}

/**
 * msdyn_GetResourcePopupDetails action
 *
 * Unbound action
 */
export class msdyn_GetResourcePopupDetailsAction implements Executable<msdyn_GetResourcePopupDetailsResponse> {
  constructor(
    public readonly startDate: string | undefined,
    public readonly endDate: string | undefined,
    public readonly resourceId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourcePopupDetails`;

    const body: Record<string, unknown> = {
      StartDate: this.startDate,
      EndDate: this.endDate,
      ResourceId: this.resourceId,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcePopupDetailsResponse> {
    const data = await response.json();
    return data as msdyn_GetResourcePopupDetailsResponse;
  }
}
