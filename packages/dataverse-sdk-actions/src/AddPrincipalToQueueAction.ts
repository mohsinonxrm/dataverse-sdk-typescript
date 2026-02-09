import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from AddPrincipalToQueue action
 */
export interface AddPrincipalToQueueResponse {
  // No content returned
}

/**
 * AddPrincipalToQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queue)
 */
export class AddPrincipalToQueueAction implements Executable<AddPrincipalToQueueResponse> {
  constructor(
    public readonly queueId: string,
    public readonly principal: EntityReference
  ) {}

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
    return {};
  }
}
