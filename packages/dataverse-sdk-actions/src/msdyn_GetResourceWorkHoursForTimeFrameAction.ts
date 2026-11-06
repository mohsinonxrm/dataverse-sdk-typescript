import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetResourceWorkHoursForTimeFrame action
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameResponse {
  ResourceData: string;
}

/**
 * Parameters of the msdyn_GetResourceWorkHoursForTimeFrame action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameActionParameters {
  End: string;
  Start: string;
  ResourceIds: string;
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame action
 *
 * Unbound action
 */
export class msdyn_GetResourceWorkHoursForTimeFrameAction implements Executable<msdyn_GetResourceWorkHoursForTimeFrameResponse> {
  constructor(public readonly parameters: msdyn_GetResourceWorkHoursForTimeFrameActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceWorkHoursForTimeFrame`;

    const body = requestBody({
      End: this.parameters.End,
      Start: this.parameters.Start,
      ResourceIds: this.parameters.ResourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceWorkHoursForTimeFrameResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetResourceWorkHoursForTimeFrameResponse;
  }
}
