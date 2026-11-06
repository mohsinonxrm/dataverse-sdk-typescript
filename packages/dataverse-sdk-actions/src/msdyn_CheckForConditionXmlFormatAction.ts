import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForConditionXmlFormat action
 */
export interface msdyn_CheckForConditionXmlFormatResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * Parameters of the msdyn_CheckForConditionXmlFormat action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForConditionXmlFormatActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForConditionXmlFormat action
 *
 * Unbound action
 */
export class msdyn_CheckForConditionXmlFormatAction implements Executable<msdyn_CheckForConditionXmlFormatResponse> {
  constructor(public readonly parameters: msdyn_CheckForConditionXmlFormatActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForConditionXmlFormat`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForConditionXmlFormatResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckForConditionXmlFormatResponse;
  }
}
