import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSDeletePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSDeletePredictionRequestParameters {
  ModelId?: string;
  IsCrmDeleteOnly?: boolean;
  PredictionName?: string;
  IsActiveModel?: boolean;
}

/**
 * msdyn_OSDeletePrediction request message
 *
 * Web API Action: msdyn_OSDeletePrediction
 */
export class msdyn_OSDeletePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSDeletePredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSDeletePredictionRequestParameters>;

  constructor(parameters: msdyn_OSDeletePredictionRequestParameters = {}) {
    super("msdyn_OSDeletePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSDeletePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSDeletePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_OSDeletePredictionResponse();
  }
}

/**
 * msdyn_OSDeletePrediction response message
 */
export class msdyn_OSDeletePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OSDeletePrediction");
  }

  static fromResponse(_data: unknown): msdyn_OSDeletePredictionResponse {
    return new msdyn_OSDeletePredictionResponse();
  }
}
