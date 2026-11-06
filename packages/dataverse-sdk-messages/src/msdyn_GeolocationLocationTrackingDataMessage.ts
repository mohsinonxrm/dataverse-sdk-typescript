import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GeolocationLocationTrackingData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeolocationLocationTrackingDataRequestParameters {
  Locations: string;
}

/**
 * msdyn_GeolocationLocationTrackingData request message
 *
 * Web API Action: msdyn_GeolocationLocationTrackingData
 */
export class msdyn_GeolocationLocationTrackingDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeolocationLocationTrackingDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GeolocationLocationTrackingDataRequestParameters>;

  constructor(parameters: msdyn_GeolocationLocationTrackingDataRequestParameters) {
    super("msdyn_GeolocationLocationTrackingData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeolocationLocationTrackingData`;

    const body = requestBody({
      Locations: this.Parameters.Locations,
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
