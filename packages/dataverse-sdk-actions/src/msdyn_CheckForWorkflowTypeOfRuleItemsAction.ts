import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckForWorkflowTypeOfRuleItems action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForWorkflowTypeOfRuleItemsResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckForWorkflowTypeOfRuleItemsResponse;
  }
}
