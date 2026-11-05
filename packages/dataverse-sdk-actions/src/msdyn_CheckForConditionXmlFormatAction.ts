import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckForConditionXmlFormat action
 *
 * Unbound action
 */
export class msdyn_CheckForConditionXmlFormatAction implements Executable<msdyn_CheckForConditionXmlFormatResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForConditionXmlFormat`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

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
    const data = await response.json();
    return data as msdyn_CheckForConditionXmlFormatResponse;
  }
}
