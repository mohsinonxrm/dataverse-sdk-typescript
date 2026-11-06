import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForCustomizedAppModule action
 */
export interface msdyn_CheckForCustomizedAppModuleResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForCustomizedAppModuleResponse;
  }
}
