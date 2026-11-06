import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PredictiveScoringBackgroundJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictiveScoringBackgroundJobRequestParameters {
  InputData?: string;
}

/**
 * msdyn_PredictiveScoringBackgroundJob request message
 *
 * Web API Action: msdyn_PredictiveScoringBackgroundJob
 */
export class msdyn_PredictiveScoringBackgroundJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictiveScoringBackgroundJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_PredictiveScoringBackgroundJobRequestParameters>;

  constructor(parameters: msdyn_PredictiveScoringBackgroundJobRequestParameters = {}) {
    super("msdyn_PredictiveScoringBackgroundJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictiveScoringBackgroundJob`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_PredictiveScoringBackgroundJobResponse> {
    // No return value (204 No Content)
    return new msdyn_PredictiveScoringBackgroundJobResponse();
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
