import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GeolocationLocationTrackingData action
 */
export interface msdyn_GeolocationLocationTrackingDataResponse {
  // No content returned
}

/**
 * msdyn_GeolocationLocationTrackingData action
 *
 * Unbound action
 */
export class msdyn_GeolocationLocationTrackingDataAction implements Executable<msdyn_GeolocationLocationTrackingDataResponse> {
  constructor(public readonly locations: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeolocationLocationTrackingData`;

    const body: Record<string, unknown> = {
      Locations: this.locations,
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

  async parseResponse(response: Response): Promise<msdyn_GeolocationLocationTrackingDataResponse> {
    // No return value (204 No Content)
    return {};
  }
}
