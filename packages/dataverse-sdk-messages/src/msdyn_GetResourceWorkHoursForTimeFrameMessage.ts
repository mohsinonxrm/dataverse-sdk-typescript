import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourceWorkHoursForTimeFrameResponse as msdyn_GetResourceWorkHoursForTimeFrameResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetResourceWorkHoursForTimeFrameResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame response message
 */
export class msdyn_GetResourceWorkHoursForTimeFrameResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceWorkHoursForTimeFrameResponseData) {
    super("msdyn_GetResourceWorkHoursForTimeFrame");
  }

  static fromResponse(data: unknown): msdyn_GetResourceWorkHoursForTimeFrameResponse {
    return new msdyn_GetResourceWorkHoursForTimeFrameResponse(
      responseObject<msdyn_GetResourceWorkHoursForTimeFrameResponseData>(data)
    );
  }
}
