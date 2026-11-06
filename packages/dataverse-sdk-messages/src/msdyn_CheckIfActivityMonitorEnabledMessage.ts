import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfActivityMonitorEnabledResponse as msdyn_CheckIfActivityMonitorEnabledResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfActivityMonitorEnabled request message
 *
 * Web API Action: msdyn_CheckIfActivityMonitorEnabled
 */
export class msdyn_CheckIfActivityMonitorEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfActivityMonitorEnabledResponse>
{
  constructor(public solutionId?: string) {
    super("msdyn_CheckIfActivityMonitorEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorEnabled`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfActivityMonitorEnabledResponse> {
    const data = await response.json();
    return msdyn_CheckIfActivityMonitorEnabledResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfActivityMonitorEnabled response message
 */
export class msdyn_CheckIfActivityMonitorEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfActivityMonitorEnabledResponseData) {
    super("msdyn_CheckIfActivityMonitorEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckIfActivityMonitorEnabledResponse {
    return new msdyn_CheckIfActivityMonitorEnabledResponse(
      responseObject<msdyn_CheckIfActivityMonitorEnabledResponseData>(data)
    );
  }
}
