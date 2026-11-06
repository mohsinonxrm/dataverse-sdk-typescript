import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfSDKMessageProcessingStepsAreActive action
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckIfSDKMessageProcessingStepsAreActive action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveActionParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckIfSDKMessageProcessingStepsAreActive action
 *
 * Unbound action
 */
export class msdyn_CheckIfSDKMessageProcessingStepsAreActiveAction implements Executable<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfSDKMessageProcessingStepsAreActiveActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSDKMessageProcessingStepsAreActive`;

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
  ): Promise<msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse;
    return (await response.json()) as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse;
  }
}
