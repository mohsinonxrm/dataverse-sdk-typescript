import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourceWorkHoursForTimeFrame action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourceWorkHoursForTimeFrameResponse;
  }
}
