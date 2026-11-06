import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForCustomizedWebResources action
 */
export interface msdyn_CheckForCustomizedWebResourcesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckForCustomizedWebResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedWebResourcesActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedWebResources action
 *
 * Unbound action
 */
export class msdyn_CheckForCustomizedWebResourcesAction implements Executable<msdyn_CheckForCustomizedWebResourcesResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForCustomizedWebResourcesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedWebResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForCustomizedWebResourcesResponse;
  }
}
