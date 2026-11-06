import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfActivityMonitorHasErrorLastSevenDays request message
 *
 * Web API Action: msdyn_CheckIfActivityMonitorHasErrorLastSevenDays
 */
export class msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse>
{
  constructor() {
    super("msdyn_CheckIfActivityMonitorHasErrorLastSevenDays");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorHasErrorLastSevenDays`;

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
  ): Promise<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse.fromResponse({});
    return msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckIfActivityMonitorHasErrorLastSevenDays response message
 */
export class msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponseData) {
    super("msdyn_CheckIfActivityMonitorHasErrorLastSevenDays");
  }

  static fromResponse(data: unknown): msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse {
    return new msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse(
      responseObject<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponseData>(data)
    );
  }
}
