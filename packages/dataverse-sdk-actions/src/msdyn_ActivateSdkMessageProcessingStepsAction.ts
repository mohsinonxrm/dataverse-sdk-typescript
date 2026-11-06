import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ActivateSdkMessageProcessingSteps action
 */
export interface msdyn_ActivateSdkMessageProcessingStepsResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * Parameters of the msdyn_ActivateSdkMessageProcessingSteps action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateSdkMessageProcessingStepsActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps action
 *
 * Unbound action
 */
export class msdyn_ActivateSdkMessageProcessingStepsAction implements Executable<msdyn_ActivateSdkMessageProcessingStepsResponse> {
  constructor(
    public readonly parameters: msdyn_ActivateSdkMessageProcessingStepsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateSdkMessageProcessingSteps`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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
  ): Promise<msdyn_ActivateSdkMessageProcessingStepsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ActivateSdkMessageProcessingStepsResponse;
    return (await response.json()) as msdyn_ActivateSdkMessageProcessingStepsResponse;
  }
}
