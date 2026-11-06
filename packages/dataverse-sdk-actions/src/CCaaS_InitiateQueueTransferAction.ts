import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateQueueTransfer action
 */
export interface CCaaS_InitiateQueueTransferResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateQueueTransfer action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueTransferActionParameters {
  QueueId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateQueueTransfer action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueTransferAction implements Executable<CCaaS_InitiateQueueTransferResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateQueueTransferActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueTransfer`;

    const body = requestBody({
      QueueId: this.parameters.QueueId,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueTransferResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_InitiateQueueTransferResponse;
  }
}
