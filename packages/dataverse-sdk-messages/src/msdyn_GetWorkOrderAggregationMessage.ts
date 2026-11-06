import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetWorkOrderAggregationResponse as msdyn_GetWorkOrderAggregationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetWorkOrderAggregation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWorkOrderAggregationRequestParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetWorkOrderAggregation request message
 *
 * Web API Action: msdyn_GetWorkOrderAggregation
 */
export class msdyn_GetWorkOrderAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWorkOrderAggregationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetWorkOrderAggregationRequestParameters>;

  constructor(parameters: msdyn_GetWorkOrderAggregationRequestParameters) {
    super("msdyn_GetWorkOrderAggregation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkOrderAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetWorkOrderAggregationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetWorkOrderAggregationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetWorkOrderAggregation response message
 */
export class msdyn_GetWorkOrderAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWorkOrderAggregationResponseData) {
    super("msdyn_GetWorkOrderAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetWorkOrderAggregationResponse {
    return new msdyn_GetWorkOrderAggregationResponse(
      responseObject<msdyn_GetWorkOrderAggregationResponseData>(data)
    );
  }
}
