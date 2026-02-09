import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PredictiveScoringBackgroundJob request message
 *
 * Web API Action: msdyn_PredictiveScoringBackgroundJob
 */
export class msdyn_PredictiveScoringBackgroundJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictiveScoringBackgroundJobResponse>
{
  constructor(public inputData: string) {
    super("msdyn_PredictiveScoringBackgroundJob");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringBackgroundJob`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_PredictiveScoringBackgroundJobResponse> {
    // No return value (204 No Content)
    return new msdyn_PredictiveScoringBackgroundJobResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_PredictiveScoringBackgroundJob response message
 */
export class msdyn_PredictiveScoringBackgroundJobResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PredictiveScoringBackgroundJob");
  }

  static fromResponse(_data: unknown): msdyn_PredictiveScoringBackgroundJobResponse {
    return new msdyn_PredictiveScoringBackgroundJobResponse();
  }
}
