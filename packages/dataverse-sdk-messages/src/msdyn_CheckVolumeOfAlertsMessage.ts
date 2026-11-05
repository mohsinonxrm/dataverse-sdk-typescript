import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckVolumeOfAlerts request message
 *
 * Web API Action: msdyn_CheckVolumeOfAlerts
 */
export class msdyn_CheckVolumeOfAlertsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckVolumeOfAlertsResponse>
{
  constructor() {
    super("msdyn_CheckVolumeOfAlerts");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckVolumeOfAlerts`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckVolumeOfAlertsResponse> {
    const data = await response.json();
    return msdyn_CheckVolumeOfAlertsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckVolumeOfAlerts response message
 */
export class msdyn_CheckVolumeOfAlertsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckVolumeOfAlertsResponse) {
    super("msdyn_CheckVolumeOfAlerts");
  }

  static fromResponse(data: unknown): msdyn_CheckVolumeOfAlertsResponse {
    return new msdyn_CheckVolumeOfAlertsResponse((data as any).value);
  }
}
