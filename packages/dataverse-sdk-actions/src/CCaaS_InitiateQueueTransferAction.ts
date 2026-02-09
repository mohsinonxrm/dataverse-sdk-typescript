import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_InitiateQueueTransfer action
 */
export interface CCaaS_InitiateQueueTransferResponse {
  // No content returned
}

/**
 * CCaaS_InitiateQueueTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_InitiateQueueTransferAction implements Executable<CCaaS_InitiateQueueTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly queueId: string,
    public readonly apiVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueTransfer`;

    const body: Record<string, unknown> = {
      QueueId: this.queueId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueTransferResponse> {
    // No return value (204 No Content)
    return {};
  }
}
