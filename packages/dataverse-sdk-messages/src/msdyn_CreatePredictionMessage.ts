import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreatePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreatePredictionRequestParameters {
  ModelState?: string;
}

/**
 * msdyn_CreatePrediction request message
 *
 * Web API Action: msdyn_CreatePrediction
 */
export class msdyn_CreatePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreatePredictionRequestParameters>;

  constructor(parameters: msdyn_CreatePredictionRequestParameters = {}) {
    super("msdyn_CreatePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreatePrediction`;

    const body = requestBody({
      ModelState: this.Parameters.ModelState,
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

  async parseResponse(response: Response): Promise<msdyn_CreatePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_CreatePredictionResponse();
  }
}

/**
 * msdyn_CreatePrediction response message
 */
export class msdyn_CreatePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreatePrediction");
  }

  static fromResponse(_data: unknown): msdyn_CreatePredictionResponse {
    return new msdyn_CreatePredictionResponse();
  }
}
