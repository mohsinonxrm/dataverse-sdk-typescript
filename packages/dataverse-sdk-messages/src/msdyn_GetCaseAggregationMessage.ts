import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCaseAggregationResponse as msdyn_GetCaseAggregationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCaseAggregation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseAggregationRequestParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetCaseAggregation request message
 *
 * Web API Action: msdyn_GetCaseAggregation
 */
export class msdyn_GetCaseAggregationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseAggregationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCaseAggregationRequestParameters>;

  constructor(parameters: msdyn_GetCaseAggregationRequestParameters) {
    super("msdyn_GetCaseAggregation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCaseAggregationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetCaseAggregationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetCaseAggregation response message
 */
export class msdyn_GetCaseAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseAggregationResponseData) {
    super("msdyn_GetCaseAggregation");
  }

  static fromResponse(data: unknown): msdyn_GetCaseAggregationResponse {
    return new msdyn_GetCaseAggregationResponse(
      responseObject<msdyn_GetCaseAggregationResponseData>(data)
    );
  }
}
