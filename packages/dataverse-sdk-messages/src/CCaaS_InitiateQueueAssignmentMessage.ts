import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_InitiateQueueAssignment request message
 *
 * Web API Action: CCaaS_InitiateQueueAssignment
 */
export class CCaaS_InitiateQueueAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueAssignmentResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public queueId: string
  ) {
    super("CCaaS_InitiateQueueAssignment");
  }

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
    return new CCaaS_InitiateQueueAssignmentResponse();
  }
}

/**
 * CCaaS_InitiateQueueAssignment response message
 */
export class CCaaS_InitiateQueueAssignmentResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueAssignment");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateQueueAssignmentResponse {
    return new CCaaS_InitiateQueueAssignmentResponse();
  }
}
