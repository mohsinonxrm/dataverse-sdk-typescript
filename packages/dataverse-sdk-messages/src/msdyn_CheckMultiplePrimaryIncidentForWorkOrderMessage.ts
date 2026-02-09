import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse> {
    const data = await response.json();
    return msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckMultiplePrimaryIncidentForWorkOrder response message
 */
export class msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse) {
    super("msdyn_CheckMultiplePrimaryIncidentForWorkOrder");
  }

  static fromResponse(data: unknown): msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse {
    return new msdyn_CheckMultiplePrimaryIncidentForWorkOrderResponse((data as any).value);
  }
}
