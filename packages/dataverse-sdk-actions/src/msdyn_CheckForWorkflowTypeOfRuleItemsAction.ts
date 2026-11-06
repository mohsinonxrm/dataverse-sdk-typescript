import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForWorkflowTypeOfRuleItems action
 */
export interface msdyn_CheckForWorkflowTypeOfRuleItemsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems action
 *
 * Unbound action
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsAction implements Executable<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
  constructor(public readonly solutionId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkflowTypeOfRuleItems`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
    const data = await response.json();
    return data as msdyn_CheckForWorkflowTypeOfRuleItemsResponse;
  }
}
