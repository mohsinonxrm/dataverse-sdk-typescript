import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ActivateSdkMessageProcessingStepsResponse as msdyn_ActivateSdkMessageProcessingStepsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ActivateSdkMessageProcessingSteps message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateSdkMessageProcessingStepsRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps request message
 *
 * Web API Action: msdyn_ActivateSdkMessageProcessingSteps
 */
export class msdyn_ActivateSdkMessageProcessingStepsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateSdkMessageProcessingStepsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActivateSdkMessageProcessingStepsRequestParameters>;

  constructor(parameters: msdyn_ActivateSdkMessageProcessingStepsRequestParameters = {}) {
    super("msdyn_ActivateSdkMessageProcessingSteps", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateSdkMessageProcessingSteps`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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
    if (response.status === 204)
      return msdyn_ActivateSdkMessageProcessingStepsResponse.fromResponse({});
    return msdyn_ActivateSdkMessageProcessingStepsResponse.fromResponse(await response.json());
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
