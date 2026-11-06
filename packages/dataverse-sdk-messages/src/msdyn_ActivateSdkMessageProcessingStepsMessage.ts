import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ActivateSdkMessageProcessingStepsResponse as msdyn_ActivateSdkMessageProcessingStepsResponseData } from "./types/index.js";

/**
 * msdyn_ActivateSdkMessageProcessingSteps request message
 *
 * Web API Action: msdyn_ActivateSdkMessageProcessingSteps
 */
export class msdyn_ActivateSdkMessageProcessingStepsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateSdkMessageProcessingStepsResponse>
{
  constructor(public analysisResult?: EntityReference | AnyEntityPayload) {
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
        "content-type": "application/json",
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
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps response message
 */
export class msdyn_ActivateSdkMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateSdkMessageProcessingStepsResponseData) {
    super("msdyn_ActivateSdkMessageProcessingSteps");
  }

  static fromResponse(data: unknown): msdyn_ActivateSdkMessageProcessingStepsResponse {
    return new msdyn_ActivateSdkMessageProcessingStepsResponse(
      responseObject<msdyn_ActivateSdkMessageProcessingStepsResponseData>(data)
    );
  }
}
