import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateAutoScheduledTrainingStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAutoScheduledTrainingStatusRequestParameters {
  AutoScheduledTraining: boolean;
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_UpdateAutoScheduledTrainingStatus request message
 *
 * Web API Action: msdyn_UpdateAutoScheduledTrainingStatus
 */
export class msdyn_UpdateAutoScheduledTrainingStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAutoScheduledTrainingStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateAutoScheduledTrainingStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateAutoScheduledTrainingStatusRequestParameters) {
    super("msdyn_UpdateAutoScheduledTrainingStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoScheduledTrainingStatus`;

    const body = requestBody({
      AutoScheduledTraining: this.Parameters.AutoScheduledTraining,
      PredictionName: this.Parameters.PredictionName,
      PredictionType: this.Parameters.PredictionType,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateAutoScheduledTrainingStatusResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateAutoScheduledTrainingStatusResponse());
  }
}

/**
 * msdyn_UpdateAutoScheduledTrainingStatus response message
 */
export class msdyn_UpdateAutoScheduledTrainingStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateAutoScheduledTrainingStatus");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateAutoScheduledTrainingStatusResponse {
    return new msdyn_UpdateAutoScheduledTrainingStatusResponse();
  }
}
