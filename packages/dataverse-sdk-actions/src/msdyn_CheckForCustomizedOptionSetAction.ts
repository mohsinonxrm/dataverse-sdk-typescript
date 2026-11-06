import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForCustomizedOptionSet action
 */
export interface msdyn_CheckForCustomizedOptionSetResponse {
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckForCustomizedOptionSet action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedOptionSetActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedOptionSet action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedOptionSetAction implements Executable<msdyn_CheckForCustomizedOptionSetResponse> {
  constructor(public readonly parameters: msdyn_CheckForCustomizedOptionSetActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedOptionSet`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedOptionSetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckForCustomizedOptionSetResponse;
    return (await response.json()) as msdyn_CheckForCustomizedOptionSetResponse;
  }
}
