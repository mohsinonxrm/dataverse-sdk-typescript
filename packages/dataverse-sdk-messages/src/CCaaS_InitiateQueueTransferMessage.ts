import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateQueueTransfer request message
 *
 * Web API Action: CCaaS_InitiateQueueTransfer
 */
export class CCaaS_InitiateQueueTransferRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueTransferResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public queueId: string,
    public apiVersion: string
  ) {
    super("CCaaS_InitiateQueueTransfer");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueTransferResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateQueueTransferResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocliveworkitemId,
      QueueId: this.queueId,
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_InitiateQueueTransfer response message
 */
export class CCaaS_InitiateQueueTransferResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueTransfer");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateQueueTransferResponse {
    return new CCaaS_InitiateQueueTransferResponse();
  }
}
