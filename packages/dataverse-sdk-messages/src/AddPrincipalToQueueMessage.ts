import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * AddPrincipalToQueue request message
 *
 * Web API Action: AddPrincipalToQueue
 */
export class AddPrincipalToQueueRequest
  extends OrganizationRequest
  implements Executable<AddPrincipalToQueueResponse>
{
  constructor(
    public queueId: string,
    public principal: EntityReference
  ) {
    super("AddPrincipalToQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queues(${this.queueId})/Microsoft.Dynamics.CRM.AddPrincipalToQueue`;

    const body: Record<string, unknown> = {
      Principal: this.principal,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AddPrincipalToQueueResponse> {
    // No return value (204 No Content)
    return new AddPrincipalToQueueResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.queueId,
      Principal: this.principal,
    };
  }
}

/**
 * AddPrincipalToQueue response message
 */
export class AddPrincipalToQueueResponse extends OrganizationResponse {
  constructor() {
    super("AddPrincipalToQueue");
  }

  static fromResponse(_data: unknown): AddPrincipalToQueueResponse {
    return new AddPrincipalToQueueResponse();
  }
}
