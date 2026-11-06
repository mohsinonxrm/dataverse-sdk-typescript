import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GeolocationLocationTrackingEnabledResponse as msdyn_GeolocationLocationTrackingEnabledResponseData } from "./types/index.js";

/**
 * msdyn_GeolocationLocationTrackingEnabled request message
 *
 * Web API Action: msdyn_GeolocationLocationTrackingEnabled
 */
export class msdyn_GeolocationLocationTrackingEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeolocationLocationTrackingEnabledResponse>
{
  constructor() {
    super("msdyn_GeolocationLocationTrackingEnabled");
  }

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
    if (response.status === 204)
      return msdyn_GeolocationLocationTrackingEnabledResponse.fromResponse({});
    return msdyn_GeolocationLocationTrackingEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GeolocationLocationTrackingEnabled response message
 */
export class msdyn_GeolocationLocationTrackingEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeolocationLocationTrackingEnabledResponseData) {
    super("msdyn_GeolocationLocationTrackingEnabled");
  }

  static fromResponse(data: unknown): msdyn_GeolocationLocationTrackingEnabledResponse {
    return new msdyn_GeolocationLocationTrackingEnabledResponse(
      responseObject<msdyn_GeolocationLocationTrackingEnabledResponseData>(data)
    );
  }
}
