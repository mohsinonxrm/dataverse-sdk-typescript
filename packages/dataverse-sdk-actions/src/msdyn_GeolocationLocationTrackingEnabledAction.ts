import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GeolocationLocationTrackingEnabled action
 */
export interface msdyn_GeolocationLocationTrackingEnabledResponse {
  Result: string;
}

/**
 * msdyn_GeolocationLocationTrackingEnabled action
 *
 * Unbound action
 */
export class msdyn_GeolocationLocationTrackingEnabledAction implements Executable<msdyn_GeolocationLocationTrackingEnabledResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeolocationLocationTrackingEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeolocationLocationTrackingEnabledResponse> {
    const data = await response.json();
    return data as msdyn_GeolocationLocationTrackingEnabledResponse;
  }
}
