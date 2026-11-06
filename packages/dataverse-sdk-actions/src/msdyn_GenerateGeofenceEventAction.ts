import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GenerateGeofenceEvent action
 */
export interface msdyn_GenerateGeofenceEventResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GenerateGeofenceEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateGeofenceEventActionParameters {
  GeofenceId: string;
  BookableResourceId: string;
  Latitude: number;
  Longitude: number;
  Timestamp: string;
  UseTargetEntityLocation: boolean;
}

/**
 * msdyn_GenerateGeofenceEvent action
 *
 * Unbound action
 */
export class msdyn_GenerateGeofenceEventAction implements Executable<msdyn_GenerateGeofenceEventResponse> {
  constructor(public readonly parameters: msdyn_GenerateGeofenceEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateGeofenceEvent`;

    const body = requestBody({
      GeofenceId: this.parameters.GeofenceId,
      BookableResourceId: this.parameters.BookableResourceId,
      Latitude: this.parameters.Latitude,
      Longitude: this.parameters.Longitude,
      Timestamp: this.parameters.Timestamp,
      UseTargetEntityLocation: this.parameters.UseTargetEntityLocation,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateGeofenceEventResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GenerateGeofenceEventResponse;
    return (await response.json()) as msdyn_GenerateGeofenceEventResponse;
  }
}
