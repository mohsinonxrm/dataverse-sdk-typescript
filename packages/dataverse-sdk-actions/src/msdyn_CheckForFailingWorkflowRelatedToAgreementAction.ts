import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForFailingWorkflowRelatedToAgreement action
 */
export interface msdyn_CheckForFailingWorkflowRelatedToAgreementResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForFailingWorkflowRelatedToAgreement action
 *
 * Unbound action
 */
export class msdyn_CheckForFailingWorkflowRelatedToAgreementAction implements Executable<msdyn_CheckForFailingWorkflowRelatedToAgreementResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFailingWorkflowRelatedToAgreement`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForFailingWorkflowRelatedToAgreementResponse> {
    const data = await response.json();
    return data as msdyn_CheckForFailingWorkflowRelatedToAgreementResponse;
  }
}
