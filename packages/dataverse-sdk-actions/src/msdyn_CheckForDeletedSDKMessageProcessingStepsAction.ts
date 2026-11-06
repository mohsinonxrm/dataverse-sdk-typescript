import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForDeletedSDKMessageProcessingSteps action
 */
export interface msdyn_CheckForDeletedSDKMessageProcessingStepsResponse {
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckForDeletedSDKMessageProcessingSteps action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedSDKMessageProcessingStepsActionParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckForDeletedSDKMessageProcessingSteps action
 *
 * Unbound action
 */
export class msdyn_CheckForDeletedSDKMessageProcessingStepsAction implements Executable<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForDeletedSDKMessageProcessingStepsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedSDKMessageProcessingSteps`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForDeletedSDKMessageProcessingStepsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckForDeletedSDKMessageProcessingStepsResponse;
    return (await response.json()) as msdyn_CheckForDeletedSDKMessageProcessingStepsResponse;
  }
}
