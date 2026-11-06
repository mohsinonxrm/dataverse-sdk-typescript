import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForCustomizedWebResources action
 */
export interface msdyn_CheckForCustomizedWebResourcesResponse {
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckForCustomizedWebResourcesResponse;
    return (await response.json()) as msdyn_CheckForCustomizedWebResourcesResponse;
  }
}
