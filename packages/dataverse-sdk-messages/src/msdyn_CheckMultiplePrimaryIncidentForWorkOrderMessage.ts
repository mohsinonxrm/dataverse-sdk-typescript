import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse as msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponseData } from "./types/index.js";

/**
 * msdyn_CheckMultiplePrimaryIncidentForWorkOrder request message
 *
 * Web API Action: msdyn_CheckMultiplePrimaryIncidentForWorkOrder
 */
export class msdyn_CheckMultiplePrimaryIncidentForWorkOrderRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse>
{
  constructor() {
    super("msdyn_CheckMultiplePrimaryIncidentForWorkOrder");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckMultiplePrimaryIncidentForWorkOrder`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse.fromResponse({});
    return msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckMultiplePrimaryIncidentForWorkOrder response message
 */
export class msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponseData) {
    super("msdyn_CheckMultiplePrimaryIncidentForWorkOrder");
  }

  static fromResponse(data: unknown): msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse {
    return new msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse(
      responseObject<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponseData>(data)
    );
  }
}
