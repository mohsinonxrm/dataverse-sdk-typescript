import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckForConditionXmlFormat action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForConditionXmlFormatResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckForConditionXmlFormatResponse;
  }
}
