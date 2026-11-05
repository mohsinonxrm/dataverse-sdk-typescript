import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GenerateGeofenceEvent request message
 *
 * Web API Action: msdyn_GenerateGeofenceEvent
 */
export class msdyn_GenerateGeofenceEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateGeofenceEventResponse>
{
  constructor(
    public geofenceId: string,
    public bookableResourceId: string,
    public latitude: number,
    public longitude: number,
    public timestamp: string,
    public useTargetEntityLocation: boolean
  ) {
    super("msdyn_GenerateGeofenceEvent");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GenerateGeofenceEventResponse> {
    // No return value (204 No Content)
    return new msdyn_GenerateGeofenceEventResponse();
  }
}

/**
 * msdyn_GenerateGeofenceEvent response message
 */
export class msdyn_GenerateGeofenceEventResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GenerateGeofenceEvent");
  }

  static fromResponse(_data: unknown): msdyn_GenerateGeofenceEventResponse {
    return new msdyn_GenerateGeofenceEventResponse();
  }
}
