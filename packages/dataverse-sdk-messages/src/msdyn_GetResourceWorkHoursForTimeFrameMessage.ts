import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetResourceWorkHoursForTimeFrame request message
 *
 * Web API Action: msdyn_GetResourceWorkHoursForTimeFrame
 */
export class msdyn_GetResourceWorkHoursForTimeFrameRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceWorkHoursForTimeFrameResponse>
{
  constructor(
    public end: string,
    public start: string,
    public resourceIds: string
  ) {
    super("msdyn_GetResourceWorkHoursForTimeFrame");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceWorkHoursForTimeFrame`;

    const body: Record<string, unknown> = {
      End: this.end,
      Start: this.start,
      ResourceIds: this.resourceIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetResourceWorkHoursForTimeFrameResponse> {
    const data = await response.json();
    return msdyn_GetResourceWorkHoursForTimeFrameResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      End: this.end,
      Start: this.start,
      ResourceIds: this.resourceIds,
    };
  }
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame response message
 */
export class msdyn_GetResourceWorkHoursForTimeFrameResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceWorkHoursForTimeFrameResponse) {
    super("msdyn_GetResourceWorkHoursForTimeFrame");
  }

  static fromResponse(data: unknown): msdyn_GetResourceWorkHoursForTimeFrameResponse {
    return new msdyn_GetResourceWorkHoursForTimeFrameResponse((data as any).value);
  }
}
