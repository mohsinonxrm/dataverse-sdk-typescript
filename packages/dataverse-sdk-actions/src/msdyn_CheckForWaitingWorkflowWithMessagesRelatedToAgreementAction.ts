import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement action
 */
export interface msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreement action
 *
 * Unbound action
 */
export class msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementAction implements Executable<msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse> {
  constructor(public readonly solutionId: string) {}

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
    return data as msdyn_CheckForWaitingWorkflowWithMessagesRelatedToAgreementResponse;
  }
}
