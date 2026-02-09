import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetIoTAlertAggregation request message
 *
 * Web API Action: msdyn_GetIoTAlertAggregation
 */
export class msdyn_GetIoTAlertAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTAlertAggregationResponse>
{
  constructor(
    public deviceId: string,
    public timeRangeValue: number,
    public timeRangeType: string
  ) {
    super("msdyn_GetIoTAlertAggregation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTAlertAggregation`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      TimeRangeValue: this.timeRangeValue,
      TimeRangeType: this.timeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTAlertAggregationResponse> {
    const data = await response.json();
    return msdyn_GetIoTAlertAggregationResponse.fromResponse(data);
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
 * msdyn_GetIoTAlertAggregation response message
 */
export class msdyn_GetIoTAlertAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTAlertAggregationResponse) {
    super("msdyn_GetIoTAlertAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetIoTAlertAggregationResponse {
    return new msdyn_GetIoTAlertAggregationResponse((data as any).value);
  }
}
