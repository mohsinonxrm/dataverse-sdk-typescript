import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action
 */
export interface msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * msdyn_CheckIfEmailResponseTemplateEntityTypeMatch action
 *
 * Unbound action
 */
export class msdyn_CheckIfEmailResponseTemplateEntityTypeMatchAction implements Executable<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
  constructor(public readonly solutionId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfEmailResponseTemplateEntityTypeMatch`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfEmailResponseTemplateEntityTypeMatchResponse;
  }
}
