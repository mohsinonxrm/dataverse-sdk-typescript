import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfProcessesAreActive action
 */
export interface msdyn_CheckIfProcessesAreActiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfProcessesAreActive action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfProcessesAreActiveActionParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckIfProcessesAreActive action
 *
 * Unbound action
 */
export class msdyn_CheckIfProcessesAreActiveAction implements Executable<msdyn_CheckIfProcessesAreActiveResponse> {
  constructor(public readonly parameters: msdyn_CheckIfProcessesAreActiveActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesAreActive`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfProcessesAreActiveResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfProcessesAreActiveResponse;
  }
}
