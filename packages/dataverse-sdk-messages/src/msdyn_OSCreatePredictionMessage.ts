import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSCreatePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSCreatePredictionRequestParameters {
  ModelState?: string;
}

/**
 * msdyn_OSCreatePrediction request message
 *
 * Web API Action: msdyn_OSCreatePrediction
 */
export class msdyn_OSCreatePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSCreatePredictionResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSCreatePredictionRequestParameters>;

  constructor(parameters: msdyn_OSCreatePredictionRequestParameters = {}) {
    super("msdyn_OSCreatePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSCreatePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSCreatePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_OSCreatePredictionResponse();
  }
}

/**
 * msdyn_OSCreatePrediction response message
 */
export class msdyn_OSCreatePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OSCreatePrediction");
  }

  static fromResponse(_data: unknown): msdyn_OSCreatePredictionResponse {
    return new msdyn_OSCreatePredictionResponse();
  }
}
