import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCaseAggregation request message
 *
 * Web API Action: msdyn_GetCaseAggregation
 */
export class msdyn_GetCaseAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseAggregationResponse>
{
  constructor(
    public deviceId: string,
    public timeRangeValue: number,
    public timeRangeType: string
  ) {
    super("msdyn_GetCaseAggregation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCaseAggregationResponse> {
    const data = await response.json();
    return msdyn_GetCaseAggregationResponse.fromResponse(data);
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
 * msdyn_GetCaseAggregation response message
 */
export class msdyn_GetCaseAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseAggregationResponse) {
    super("msdyn_GetCaseAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetCaseAggregationResponse {
    return new msdyn_GetCaseAggregationResponse((data as any).value);
  }
}
