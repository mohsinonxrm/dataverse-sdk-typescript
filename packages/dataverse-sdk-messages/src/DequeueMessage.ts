import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * Dequeue request message
 *
 * Web API Action: Dequeue
 */
export class DequeueRequest extends OrganizationRequest implements Executable<DequeueResponse> {
  constructor(
    public workqueueId: string,
    public request: string
  ) {
    super("Dequeue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.Dequeue`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<DequeueResponse> {
    const data = await response.json();
    return DequeueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workqueueId,
      request: this.request,
    };
  }
}

/**
 * Dequeue response message
 */
export class DequeueResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("Dequeue");
  }

  static fromResponse(data: unknown): DequeueResponse {
    return new DequeueResponse((data as any).value);
  }
}
