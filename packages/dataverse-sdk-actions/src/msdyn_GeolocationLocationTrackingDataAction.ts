import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GeolocationLocationTrackingData action
 */
export interface msdyn_GeolocationLocationTrackingDataResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GeolocationLocationTrackingData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeolocationLocationTrackingDataActionParameters {
  Locations: string;
}

/**
 * msdyn_GeolocationLocationTrackingData action
 *
 * Unbound action
 */
export class msdyn_GeolocationLocationTrackingDataAction implements Executable<msdyn_GeolocationLocationTrackingDataResponse> {
  constructor(public readonly parameters: msdyn_GeolocationLocationTrackingDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeolocationLocationTrackingData`;

    const body = requestBody({
      Locations: this.parameters.Locations,
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

  async parseResponse(response: Response): Promise<msdyn_GeolocationLocationTrackingDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GeolocationLocationTrackingDataResponse;
    return (await response.json()) as msdyn_GeolocationLocationTrackingDataResponse;
  }
}
