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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForFailingWorkflowRelatedToAgreementResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckForFailingWorkflowRelatedToAgreementResponse;
    return (await response.json()) as msdyn_CheckForFailingWorkflowRelatedToAgreementResponse;
  }
}
