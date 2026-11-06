import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourceWorkHoursForTimeFrame message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameRequestParameters {
  End: string;
  Start: string;
  ResourceIds: string;
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame request message
 *
 * Web API Action: msdyn_GetResourceWorkHoursForTimeFrame
 */
export class msdyn_GetResourceWorkHoursForTimeFrameRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceWorkHoursForTimeFrameResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceWorkHoursForTimeFrameRequestParameters>;

  constructor(parameters: msdyn_GetResourceWorkHoursForTimeFrameRequestParameters) {
    super("msdyn_GetResourceWorkHoursForTimeFrame", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceWorkHoursForTimeFrame`;

    const body = requestBody({
      End: this.Parameters.End,
      Start: this.Parameters.Start,
      ResourceIds: this.Parameters.ResourceIds,
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
    return msdyn_GetResourceWorkHoursForTimeFrameResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourceWorkHoursForTimeFrame action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameResult {
  "@odata.context"?: string;
  ResourceData: string;
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame response message
 *
 * `result` is the value the msdyn_GetResourceWorkHoursForTimeFrame action returns (see {@link msdyn_GetResourceWorkHoursForTimeFrameResult}).
 */
export class msdyn_GetResourceWorkHoursForTimeFrameResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceWorkHoursForTimeFrameResult) {
    super("msdyn_GetResourceWorkHoursForTimeFrame");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourceWorkHoursForTimeFrameResponse {
    return new msdyn_GetResourceWorkHoursForTimeFrameResponse(
      data as msdyn_GetResourceWorkHoursForTimeFrameResult
    );
  }
}
