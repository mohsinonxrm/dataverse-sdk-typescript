import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfAutoNumberingIsOpted action
 */
export interface msdyn_CheckIfAutoNumberingIsOptedResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfAutoNumberingIsOpted action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfAutoNumberingIsOptedActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckIfAutoNumberingIsOpted action
 *
 * Unbound action
 */
export class msdyn_CheckIfAutoNumberingIsOptedAction implements Executable<msdyn_CheckIfAutoNumberingIsOptedResponse> {
  constructor(public readonly parameters: msdyn_CheckIfAutoNumberingIsOptedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoNumberingIsOpted`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfAutoNumberingIsOptedResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfAutoNumberingIsOptedResponse;
  }
}
