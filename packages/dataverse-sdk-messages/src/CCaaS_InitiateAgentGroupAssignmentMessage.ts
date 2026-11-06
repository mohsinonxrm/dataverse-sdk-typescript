import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_InitiateAgentGroupAssignment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_InitiateAgentGroupAssignmentRequestParameters {
  AgentGroupId: string;
  ApiVersion: string;
}

/**
 * CCaaS_InitiateAgentGroupAssignment request message
 *
 * Web API Action: CCaaS_InitiateAgentGroupAssignment
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_InitiateAgentGroupAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_InitiateAgentGroupAssignmentResponse>
{
  declare readonly Parameters: Readonly<CCaaS_InitiateAgentGroupAssignmentRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_InitiateAgentGroupAssignmentRequestParameters
  ) {
    super("CCaaS_InitiateAgentGroupAssignment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_InitiateAgentGroupAssignment`;

    const body = requestBody({
      AgentGroupId: this.Parameters.AgentGroupId,
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

  async parseResponse(response: Response): Promise<CCaaS_InitiateAgentGroupAssignmentResponse> {
    // No return value (204 No Content)
    return new CCaaS_InitiateAgentGroupAssignmentResponse();
  }
}

/**
 * CCaaS_InitiateAgentGroupAssignment response message
 */
export class CCaaS_InitiateAgentGroupAssignmentResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_InitiateAgentGroupAssignment");
  }

  static fromResponse(_data: unknown): CCaaS_InitiateAgentGroupAssignmentResponse {
    return new CCaaS_InitiateAgentGroupAssignmentResponse();
  }
}
