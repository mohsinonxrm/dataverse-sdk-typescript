import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement response message
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse) {
    super("msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse {
    return new msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse(
      (data as any).value
    );
  }
}
