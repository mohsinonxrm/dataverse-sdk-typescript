import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ActivateSdkMessageProcessingSteps request message
 *
 * Web API Action: msdyn_ActivateSdkMessageProcessingSteps
 */
export class msdyn_ActivateSdkMessageProcessingStepsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateSdkMessageProcessingStepsResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_ActivateSdkMessageProcessingSteps");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateSdkMessageProcessingSteps`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ActivateSdkMessageProcessingStepsResponse> {
    const data = await response.json();
    return msdyn_ActivateSdkMessageProcessingStepsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps response message
 */
export class msdyn_ActivateSdkMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateSdkMessageProcessingStepsResponse) {
    super("msdyn_ActivateSdkMessageProcessingSteps");
  }

  static fromResponse(data: unknown): msdyn_ActivateSdkMessageProcessingStepsResponse {
    return new msdyn_ActivateSdkMessageProcessingStepsResponse((data as any).value);
  }
}
