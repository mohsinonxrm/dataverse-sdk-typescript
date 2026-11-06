import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForDeletedProcess action
 */
export interface msdyn_CheckForDeletedProcessResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckForDeletedProcess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedProcessActionParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckForDeletedProcess action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedProcessAction implements Executable<msdyn_CheckForDeletedProcessResponse> {
  constructor(public readonly parameters: msdyn_CheckForDeletedProcessActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedProcess`;

    const body = requestBody({
      EntityIds: this.parameters.EntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedProcessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckForDeletedProcessResponse;
    return (await response.json()) as msdyn_CheckForDeletedProcessResponse;
  }
}
