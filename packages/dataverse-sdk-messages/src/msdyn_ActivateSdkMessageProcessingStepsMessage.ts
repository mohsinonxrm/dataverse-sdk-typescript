import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ActivateSdkMessageProcessingStepsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ActivateSdkMessageProcessingSteps action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateSdkMessageProcessingStepsResult {
  "@odata.context"?: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * msdyn_ActivateSdkMessageProcessingSteps response message
 *
 * `result` is the value the msdyn_ActivateSdkMessageProcessingSteps action returns (see {@link msdyn_ActivateSdkMessageProcessingStepsResult}).
 */
export class msdyn_ActivateSdkMessageProcessingStepsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateSdkMessageProcessingStepsResult) {
    super("msdyn_ActivateSdkMessageProcessingSteps");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ActivateSdkMessageProcessingStepsResponse {
    return new msdyn_ActivateSdkMessageProcessingStepsResponse(
      data as msdyn_ActivateSdkMessageProcessingStepsResult
    );
  }
}
