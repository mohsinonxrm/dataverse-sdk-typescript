import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfSLAOwnerIsActiveOrInactive action
 */
export interface msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckIfSLAOwnerIsActiveOrInactive action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfSLAOwnerIsActiveOrInactiveActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive action
 *
 * Unbound action
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveAction implements Executable<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfSLAOwnerIsActiveOrInactiveActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAOwnerIsActiveOrInactive`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse;
    return (await response.json()) as msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse;
  }
}
