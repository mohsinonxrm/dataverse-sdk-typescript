import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DeletePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DeletePredictionRequestParameters {
  ModelId?: string;
  IsCrmDeleteOnly?: boolean;
  PredictionName?: string;
  IsActiveModel?: boolean;
}

/**
 * msdyn_DeletePrediction request message
 *
 * Web API Action: msdyn_DeletePrediction
 */
export class msdyn_DeletePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeletePredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_DeletePredictionRequestParameters>;

  constructor(parameters: msdyn_DeletePredictionRequestParameters = {}) {
    super("msdyn_DeletePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeletePrediction`;

    const body = requestBody({
      ModelId: this.Parameters.ModelId,
      IsCrmDeleteOnly: this.Parameters.IsCrmDeleteOnly,
      PredictionName: this.Parameters.PredictionName,
      IsActiveModel: this.Parameters.IsActiveModel,
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

  parseResponse(_response: Response): Promise<msdyn_DeletePredictionResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_DeletePredictionResponse());
  }
}

/**
 * msdyn_DeletePrediction response message
 */
export class msdyn_DeletePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DeletePrediction");
  }

  static fromResponse(_data?: unknown): msdyn_DeletePredictionResponse {
    return new msdyn_DeletePredictionResponse();
  }
}
