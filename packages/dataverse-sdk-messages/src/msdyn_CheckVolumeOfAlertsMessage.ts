import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckVolumeOfAlertsResponse as msdyn_CheckVolumeOfAlertsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckVolumeOfAlertsResponse.fromResponse({});
    return msdyn_CheckVolumeOfAlertsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckVolumeOfAlerts response message
 */
export class msdyn_CheckVolumeOfAlertsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckVolumeOfAlertsResponseData) {
    super("msdyn_CheckVolumeOfAlerts");
  }

  static fromResponse(data: unknown): msdyn_CheckVolumeOfAlertsResponse {
    return new msdyn_CheckVolumeOfAlertsResponse(
      responseObject<msdyn_CheckVolumeOfAlertsResponseData>(data)
    );
  }
}
