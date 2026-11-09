import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckIfSDKMessageProcessingStepsAreActive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfSDKMessageProcessingStepsAreActiveResponse;
  }
}
