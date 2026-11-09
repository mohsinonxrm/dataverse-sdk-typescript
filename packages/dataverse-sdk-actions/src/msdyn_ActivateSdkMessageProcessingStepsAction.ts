import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ActivateSdkMessageProcessingSteps action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateSdkMessageProcessingStepsResponse {
  "@odata.context"?: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ActivateSdkMessageProcessingStepsResponse;
  }
}
