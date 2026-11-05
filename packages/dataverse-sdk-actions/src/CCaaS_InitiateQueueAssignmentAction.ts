import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateQueueAssignment action
 */
export interface CCaaS_InitiateQueueAssignmentResponse {
  // No content returned
}

/**
 * CCaaS_InitiateQueueAssignment action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateQueueAssignmentAction implements Executable<CCaaS_InitiateQueueAssignmentResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly queueId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueAssignment`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      QueueId: this.queueId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueAssignmentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
