import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeolocationLocationTrackingEnabledResponse> {
    const data = await response.json();
    return msdyn_GeolocationLocationTrackingEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GeolocationLocationTrackingEnabled response message
 */
export class msdyn_GeolocationLocationTrackingEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeolocationLocationTrackingEnabledResponse) {
    super("msdyn_GeolocationLocationTrackingEnabled");
  }

  static fromResponse(data: unknown): msdyn_GeolocationLocationTrackingEnabledResponse {
    return new msdyn_GeolocationLocationTrackingEnabledResponse((data as any).value);
  }
}
