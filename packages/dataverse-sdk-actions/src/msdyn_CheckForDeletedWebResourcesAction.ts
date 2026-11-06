import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForDeletedWebResources action
 */
export interface msdyn_CheckForDeletedWebResourcesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckForDeletedWebResources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedWebResourcesActionParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForDeletedWebResources action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedWebResourcesAction implements Executable<msdyn_CheckForDeletedWebResourcesResponse> {
  constructor(public readonly parameters: msdyn_CheckForDeletedWebResourcesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedWebResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForDeletedWebResourcesResponse;
  }
}
