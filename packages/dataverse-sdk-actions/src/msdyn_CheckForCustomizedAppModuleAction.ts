import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckForCustomizedAppModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForCustomizedAppModuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckForCustomizedAppModule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedAppModuleActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedAppModule action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedAppModuleAction implements Executable<msdyn_CheckForCustomizedAppModuleResponse> {
  constructor(public readonly parameters: msdyn_CheckForCustomizedAppModuleActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedAppModule`;

    const body = requestBody({
      EntityIds: this.parameters.EntityIds,
      SolutionId: this.parameters.SolutionId,
      ExcludeSolutionIds: this.parameters.ExcludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedAppModuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckForCustomizedAppModuleResponse;
  }
}
