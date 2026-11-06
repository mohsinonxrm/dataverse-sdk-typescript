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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfActivityMonitorHasErrorLastSevenDays action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfActivityMonitorHasErrorLastSevenDays response message
 *
 * `result` is the value the msdyn_CheckIfActivityMonitorHasErrorLastSevenDays action returns (see {@link msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResult}).
 */
export class msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResult) {
    super("msdyn_CheckIfActivityMonitorHasErrorLastSevenDays");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse {
    return new msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResponse(
      data as msdyn_CheckIfActivityMonitorHasErrorLastSevenDaysResult
    );
  }
}
