import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * TriggerServiceEndpointCheck request message
 *
 * Web API Action: TriggerServiceEndpointCheck
 *
 * The first argument is the id of the serviceendpoint record to call it on.
 */
export class TriggerServiceEndpointCheckRequest
  extends OrganizationRequest
  implements Executable<TriggerServiceEndpointCheckResponse>
{
  constructor(public serviceendpointId: string) {
    super("TriggerServiceEndpointCheck");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/serviceendpoints(${this.serviceendpointId})/Microsoft.Dynamics.CRM.TriggerServiceEndpointCheck`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<TriggerServiceEndpointCheckResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new TriggerServiceEndpointCheckResponse());
  }
}

/**
 * TriggerServiceEndpointCheck response message
 */
export class TriggerServiceEndpointCheckResponse extends OrganizationResponse {
  constructor() {
    super("TriggerServiceEndpointCheck");
  }

  static fromResponse(_data?: unknown): TriggerServiceEndpointCheckResponse {
    return new TriggerServiceEndpointCheckResponse();
  }
}
