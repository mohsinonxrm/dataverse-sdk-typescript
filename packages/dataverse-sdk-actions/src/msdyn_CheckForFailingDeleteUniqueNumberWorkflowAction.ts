import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForFailingDeleteUniqueNumberWorkflow action
 */
export interface msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForFailingDeleteUniqueNumberWorkflow action
 *
 * Unbound action
 */
export class msdyn_CheckForFailingDeleteUniqueNumberWorkflowAction implements Executable<msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForFailingDeleteUniqueNumberWorkflow`;

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
  ): Promise<msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse;
    return (await response.json()) as msdyn_CheckForFailingDeleteUniqueNumberWorkflowResponse;
  }
}
