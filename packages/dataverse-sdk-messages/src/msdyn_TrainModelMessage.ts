import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TrainModel request message
 *
 * Web API Action: msdyn_TrainModel
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainModelResponse> {
    // No return value (204 No Content)
    return new msdyn_TrainModelResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocsimltrainingId,
    };
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
