import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfProcessesOwnedByDisabledUsers action
 */
export interface msdyn_CheckIfProcessesOwnedByDisabledUsersResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfProcessesOwnedByDisabledUsers action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfProcessesOwnedByDisabledUsersActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfProcessesOwnedByDisabledUsers action
 *
 * Unbound action
 */
export class msdyn_CheckIfProcessesOwnedByDisabledUsersAction implements Executable<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfProcessesOwnedByDisabledUsersActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesOwnedByDisabledUsers`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfProcessesOwnedByDisabledUsersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfProcessesOwnedByDisabledUsersResponse;
  }
}
