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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeolocationLocationTrackingEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GeolocationLocationTrackingEnabledResponse;
    return (await response.json()) as msdyn_GeolocationLocationTrackingEnabledResponse;
  }
}
