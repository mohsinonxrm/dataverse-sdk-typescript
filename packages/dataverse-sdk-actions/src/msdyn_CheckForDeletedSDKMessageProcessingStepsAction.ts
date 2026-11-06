import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForDeletedSDKMessageProcessingSteps action
 */
export interface msdyn_CheckForDeletedSDKMessageProcessingStepsResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  HelpLink: string;
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsAction implements Executable<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
  constructor(
    public readonly entityIds?: string,
    public readonly solutionId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedSDKMessageProcessingSteps`;

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
  ): Promise<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
    const data = await response.json();
    return data as msdyn_CheckForDeletedSDKMessageProcessingStepsResponse;
  }
}
