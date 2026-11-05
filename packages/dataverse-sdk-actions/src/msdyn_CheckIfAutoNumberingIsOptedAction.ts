import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckIfAutoNumberingIsOpted action
 *
 * Unbound action
 */
export class msdyn_CheckIfAutoNumberingIsOptedAction implements Executable<msdyn_CheckIfAutoNumberingIsOptedResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoNumberingIsOpted`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfAutoNumberingIsOptedResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfAutoNumberingIsOptedResponse;
  }
}
