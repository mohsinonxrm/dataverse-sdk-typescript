import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_InitiateQueueAssignment action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_InitiateQueueAssignmentResponse = void;

/**
 * Parameters of the CCaaS_InitiateQueueAssignment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueAssignmentActionParameters {
  QueueId: string;
  ApiVersion: string;
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

  parseResponse(_response: Response): Promise<CCaaS_InitiateQueueAssignmentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
