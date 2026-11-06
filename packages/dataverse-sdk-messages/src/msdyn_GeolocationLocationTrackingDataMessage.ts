import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GeolocationLocationTrackingData request message
 *
 * Web API Action: msdyn_GeolocationLocationTrackingData
 */
export class msdyn_GeolocationLocationTrackingDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeolocationLocationTrackingDataResponse>
{
  constructor(public locations: string) {
    super("msdyn_GeolocationLocationTrackingData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeolocationLocationTrackingData`;

    const body: Record<string, unknown> = {
      Locations: this.locations,
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

  async parseResponse(response: Response): Promise<msdyn_GeolocationLocationTrackingDataResponse> {
    // No return value (204 No Content)
    return new msdyn_GeolocationLocationTrackingDataResponse();
  }
}

/**
 * msdyn_GeolocationLocationTrackingData response message
 */
export class msdyn_GeolocationLocationTrackingDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GeolocationLocationTrackingData");
  }

  static fromResponse(_data: unknown): msdyn_GeolocationLocationTrackingDataResponse {
    return new msdyn_GeolocationLocationTrackingDataResponse();
  }
}
