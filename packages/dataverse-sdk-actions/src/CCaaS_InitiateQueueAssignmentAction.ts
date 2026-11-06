import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_InitiateQueueAssignment action
 */
export interface CCaaS_InitiateQueueAssignmentResponse {
  // No content returned
}

/**
 * Parameters of the CCaaS_InitiateQueueAssignment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueAssignmentActionParameters {
  ApiVersion: string;
  QueueId: string;
}

/**
 * CCaaS_InitiateQueueAssignment action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueAssignmentAction implements Executable<CCaaS_InitiateQueueAssignmentResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly parameters: CCaaS_InitiateQueueAssignmentActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueAssignment`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
      QueueId: this.parameters.QueueId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateQueueAssignmentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CCaaS_InitiateQueueAssignmentResponse;
  }
}
