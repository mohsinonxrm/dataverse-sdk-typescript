import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetIoTAlertAggregationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetIoTAlertAggregation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIoTAlertAggregationResult {
  "@odata.context"?: string;
  AggregateOutput: string;
  DialogUniqueName: string;
  EntityLogicalName: string;
}

/**
 * msdyn_GetIoTAlertAggregation response message
 *
 * `result` is the value the msdyn_GetIoTAlertAggregation action returns (see {@link msdyn_GetIoTAlertAggregationResult}).
 */
export class msdyn_GetIoTAlertAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTAlertAggregationResult) {
    super("msdyn_GetIoTAlertAggregation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetIoTAlertAggregationResponse {
    return new msdyn_GetIoTAlertAggregationResponse(data as msdyn_GetIoTAlertAggregationResult);
  }
}
