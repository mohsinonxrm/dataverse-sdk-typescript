import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GenerateGeofenceEvent action
 */
export interface msdyn_GenerateGeofenceEventResponse {
  // No content returned
}

/**
 * msdyn_GenerateGeofenceEvent action
 *
 * Unbound action
 */
export class msdyn_GenerateGeofenceEventAction implements Executable<msdyn_GenerateGeofenceEventResponse> {
  constructor(
    public readonly geofenceId: string,
    public readonly bookableResourceId: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly timestamp: string,
    public readonly useTargetEntityLocation: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateGeofenceEvent`;

    const body: Record<string, unknown> = {
      GeofenceId: this.geofenceId,
      BookableResourceId: this.bookableResourceId,
      Latitude: this.latitude,
      Longitude: this.longitude,
      Timestamp: this.timestamp,
      UseTargetEntityLocation: this.useTargetEntityLocation,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateGeofenceEventResponse> {
    // No return value (204 No Content)
    return {};
  }
}
