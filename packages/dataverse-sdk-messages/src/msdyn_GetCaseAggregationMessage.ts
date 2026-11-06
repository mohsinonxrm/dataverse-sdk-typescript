import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetCaseAggregationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCaseAggregation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseAggregationResult {
  "@odata.context"?: string;
  AggregateOutput: string;
  DialogUniqueName: string;
  EntityLogicalName: string;
}

/**
 * msdyn_GetCaseAggregation response message
 *
 * `result` is the value the msdyn_GetCaseAggregation action returns (see {@link msdyn_GetCaseAggregationResult}).
 */
export class msdyn_GetCaseAggregationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseAggregationResult) {
    super("msdyn_GetCaseAggregation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCaseAggregationResponse {
    return new msdyn_GetCaseAggregationResponse(data as msdyn_GetCaseAggregationResult);
  }
}
