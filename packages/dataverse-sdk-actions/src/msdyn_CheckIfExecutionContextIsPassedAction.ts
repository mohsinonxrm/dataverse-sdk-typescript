import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfExecutionContextIsPassed action
 */
export interface msdyn_CheckIfExecutionContextIsPassedResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfExecutionContextIsPassed action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfExecutionContextIsPassedActionParameters {
  SolutionId: string;
  ExcludeFormIds: string;
}

/**
 * msdyn_CheckIfExecutionContextIsPassed action
 *
 * Unbound action
 */
export class msdyn_CheckIfExecutionContextIsPassedAction implements Executable<msdyn_CheckIfExecutionContextIsPassedResponse> {
  constructor(public readonly parameters: msdyn_CheckIfExecutionContextIsPassedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfExecutionContextIsPassed`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
      ExcludeFormIds: this.parameters.ExcludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfExecutionContextIsPassedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfExecutionContextIsPassedResponse;
    return (await response.json()) as msdyn_CheckIfExecutionContextIsPassedResponse;
  }
}
