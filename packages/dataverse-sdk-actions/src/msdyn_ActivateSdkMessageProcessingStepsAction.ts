import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ActivateSdkMessageProcessingSteps action
 */
export interface msdyn_ActivateSdkMessageProcessingStepsResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps action
 *
 * Unbound action
 */
export class msdyn_ActivateSdkMessageProcessingStepsAction implements Executable<msdyn_ActivateSdkMessageProcessingStepsResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateSdkMessageProcessingSteps`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
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
  ): Promise<msdyn_ActivateSdkMessageProcessingStepsResponse> {
    const data = await response.json();
    return data as msdyn_ActivateSdkMessageProcessingStepsResponse;
  }
}
