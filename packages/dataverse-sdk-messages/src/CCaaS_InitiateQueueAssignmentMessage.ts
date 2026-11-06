import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateQueueAssignment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateQueueAssignmentRequestParameters {
  QueueId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateQueueAssignment request message
 *
 * Web API Action: CCaaS_InitiateQueueAssignment
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateQueueAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateQueueAssignmentResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateQueueAssignmentRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateQueueAssignmentRequestParameters
  ) {
    super("CCaaS_InitiateQueueAssignment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateQueueAssignment`;

    const body = requestBody({
      QueueId: this.Parameters.QueueId,
      ApiVersion: this.Parameters.ApiVersion,
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
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_InitiateQueueAssignmentResponse());
  }
}

/**
 * CCaaS_InitiateQueueAssignment response message
 */
export class CCaaS_InitiateQueueAssignmentResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateQueueAssignment");
  }

  static fromResponse(_data?: unknown): CCaaS_InitiateQueueAssignmentResponse {
    return new CCaaS_InitiateQueueAssignmentResponse();
  }
}
