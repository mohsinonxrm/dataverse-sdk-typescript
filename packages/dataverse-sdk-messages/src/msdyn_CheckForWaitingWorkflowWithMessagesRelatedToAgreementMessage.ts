import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse as msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData } from "./types/index.js";

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement request message
 *
 * Web API Action: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse> {
    const data = await response.json();
    return msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement response message
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData
  ) {
    super("msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse {
    return new msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse(
      responseObject<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponseData>(data)
    );
  }
}
