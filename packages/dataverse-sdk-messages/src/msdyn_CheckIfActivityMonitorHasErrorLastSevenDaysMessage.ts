import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
    const data = await response.json();
    return msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfActivityMonitorHasErrorLastSevenDays response message
 */
export class msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse) {
    super("msdyn_CheckIfActivityMonitorHasErrorLastSevenDays");
  }

  static fromResponse(data: unknown): msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse {
    return new msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse((data as any).value);
  }
}
