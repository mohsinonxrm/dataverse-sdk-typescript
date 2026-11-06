import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetIoTAlertAggregationResponse as msdyn_GetIoTAlertAggregationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetIoTAlertAggregation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTAlertAggregationRequestParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetIoTAlertAggregation request message
 *
 * Web API Action: msdyn_GetIoTAlertAggregation
 */
export class msdyn_GetIoTAlertAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTAlertAggregationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIoTAlertAggregationRequestParameters>;

  constructor(parameters: msdyn_GetIoTAlertAggregationRequestParameters) {
    super("msdyn_GetIoTAlertAggregation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTAlertAggregation`;

    const body = requestBody({
      DeviceId: this.Parameters.DeviceId,
      TimeRangeValue: this.Parameters.TimeRangeValue,
      TimeRangeType: this.Parameters.TimeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTAlertAggregationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetIoTAlertAggregationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetIoTAlertAggregation response message
 */
export class msdyn_GetIoTAlertAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTAlertAggregationResponseData) {
    super("msdyn_GetIoTAlertAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetIoTAlertAggregationResponse {
    return new msdyn_GetIoTAlertAggregationResponse(
      responseObject<msdyn_GetIoTAlertAggregationResponseData>(data)
    );
  }
}
