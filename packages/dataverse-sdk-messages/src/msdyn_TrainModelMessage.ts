import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TrainModel request message
 *
 * Web API Action: msdyn_TrainModel
 *
 * The first argument is the id of the msdyn_ocsimltraining record to call it on.
 */
export class msdyn_TrainModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainModelResponse>
{
  constructor(public msdyn_ocsimltrainingId: string) {
    super("msdyn_TrainModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_TrainModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainModelResponse> {
    // No return value (204 No Content)
    return new msdyn_TrainModelResponse();
  }
}

/**
 * msdyn_TrainModel response message
 */
export class msdyn_TrainModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_TrainModel");
  }

  static fromResponse(_data: unknown): msdyn_TrainModelResponse {
    return new msdyn_TrainModelResponse();
  }
}
