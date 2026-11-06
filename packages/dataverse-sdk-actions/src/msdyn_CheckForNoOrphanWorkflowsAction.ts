import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckForNoOrphanWorkflows action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForNoOrphanWorkflowsResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckForNoOrphanWorkflows action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForNoOrphanWorkflowsActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForNoOrphanWorkflows action
 *
 * Unbound action
 */
export class msdyn_CheckForNoOrphanWorkflowsAction implements Executable<msdyn_CheckForNoOrphanWorkflowsResponse> {
  constructor(public readonly parameters: msdyn_CheckForNoOrphanWorkflowsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForNoOrphanWorkflows`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForNoOrphanWorkflowsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckForNoOrphanWorkflowsResponse;
  }
}
