import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_CheckForWorkflowTypeOfRuleItems action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForWorkflowTypeOfRuleItemsActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForWorkflowTypeOfRuleItems action
 *
 * Unbound action
 */
export class msdyn_CheckForWorkflowTypeOfRuleItemsAction implements Executable<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForWorkflowTypeOfRuleItemsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkflowTypeOfRuleItems`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkflowTypeOfRuleItemsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForWorkflowTypeOfRuleItemsResponse;
  }
}
