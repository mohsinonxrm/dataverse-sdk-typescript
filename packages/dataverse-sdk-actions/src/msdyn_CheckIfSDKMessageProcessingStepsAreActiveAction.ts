import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfSDKMessageProcessingStepsAreActive action
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive action
 *
 * Unbound action
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveAction implements Executable<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly solutionId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSDKMessageProcessingStepsAreActive`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
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
  ): Promise<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse;
  }
}
