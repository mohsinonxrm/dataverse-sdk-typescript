import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { UnschedulePredictionResponse as UnschedulePredictionResponseData } from "./types/index.js";

/**
 * Parameters of the UnschedulePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnschedulePredictionRequestParameters {
  version: string;
  skipStatusUpdate?: boolean;
}

/**
 * UnschedulePrediction request message
 *
 * Web API Action: UnschedulePrediction
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class UnschedulePredictionRequest
  extends OrganizationRequest
  implements Executable<UnschedulePredictionResponse>
{
  declare readonly Parameters: Readonly<UnschedulePredictionRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: UnschedulePredictionRequestParameters
  ) {
    super("UnschedulePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.UnschedulePrediction`;

    const body = requestBody({
      version: this.Parameters.version,
      skipStatusUpdate: this.Parameters.skipStatusUpdate,
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

  async parseResponse(response: Response): Promise<UnschedulePredictionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return UnschedulePredictionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * UnschedulePrediction response message
 */
export class UnschedulePredictionResponse extends OrganizationResponse {
  constructor(public result: UnschedulePredictionResponseData) {
    super("UnschedulePrediction");
  }

  static fromResponse(data: unknown): UnschedulePredictionResponse {
    return new UnschedulePredictionResponse(responseObject<UnschedulePredictionResponseData>(data));
  }
}
