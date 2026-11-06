import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GenerateGeofenceEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateGeofenceEventRequestParameters {
  GeofenceId: string;
  BookableResourceId: string;
  Latitude: number;
  Longitude: number;
  Timestamp: string;
  UseTargetEntityLocation: boolean;
}

/**
 * msdyn_GenerateGeofenceEvent request message
 *
 * Web API Action: msdyn_GenerateGeofenceEvent
 */
export class msdyn_GenerateGeofenceEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateGeofenceEventResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateGeofenceEventRequestParameters>;

  constructor(parameters: msdyn_GenerateGeofenceEventRequestParameters) {
    super("msdyn_GenerateGeofenceEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateGeofenceEvent`;

    const body = requestBody({
      GeofenceId: this.Parameters.GeofenceId,
      BookableResourceId: this.Parameters.BookableResourceId,
      Latitude: this.Parameters.Latitude,
      Longitude: this.Parameters.Longitude,
      Timestamp: this.Parameters.Timestamp,
      UseTargetEntityLocation: this.Parameters.UseTargetEntityLocation,
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
