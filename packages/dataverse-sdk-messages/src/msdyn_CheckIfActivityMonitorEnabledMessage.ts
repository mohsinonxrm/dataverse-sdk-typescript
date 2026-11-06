import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfActivityMonitorEnabledResponse as msdyn_CheckIfActivityMonitorEnabledResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfActivityMonitorEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfActivityMonitorEnabledRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfActivityMonitorEnabled request message
 *
 * Web API Action: msdyn_CheckIfActivityMonitorEnabled
 */
export class msdyn_CheckIfActivityMonitorEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfActivityMonitorEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfActivityMonitorEnabledRequestParameters>;

  constructor(parameters: msdyn_CheckIfActivityMonitorEnabledRequestParameters = {}) {
    super("msdyn_CheckIfActivityMonitorEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorEnabled`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfActivityMonitorEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfActivityMonitorEnabledResponse.fromResponse(text ? JSON.parse(text) : {});
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
