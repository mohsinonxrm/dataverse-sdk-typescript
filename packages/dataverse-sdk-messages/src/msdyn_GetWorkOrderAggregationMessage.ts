import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetWorkOrderAggregation request message
 *
 * Web API Action: msdyn_GetWorkOrderAggregation
 */
export class msdyn_GetWorkOrderAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWorkOrderAggregationResponse>
{
  constructor(
    public deviceId: string,
    public timeRangeValue: number,
    public timeRangeType: string
  ) {
    super("msdyn_GetWorkOrderAggregation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkOrderAggregation`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      TimeRangeValue: this.timeRangeValue,
      TimeRangeType: this.timeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkOrderAggregationResponse> {
    const data = await response.json();
    return msdyn_GetWorkOrderAggregationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      DeviceId: this.deviceId,
      TimeRangeValue: this.timeRangeValue,
      TimeRangeType: this.timeRangeType,
    };
  }
}

/**
 * msdyn_GetWorkOrderAggregation response message
 */
export class msdyn_GetWorkOrderAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWorkOrderAggregationResponse) {
    super("msdyn_GetWorkOrderAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetWorkOrderAggregationResponse {
    return new msdyn_GetWorkOrderAggregationResponse((data as any).value);
  }
}
