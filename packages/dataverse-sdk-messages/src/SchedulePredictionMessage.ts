import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SchedulePredictionResponse as SchedulePredictionResponseData } from "./types/index.js";

/**
 * Parameters of the SchedulePrediction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SchedulePredictionRequestParameters {
  version: string;
  predictImmediately?: boolean;
  cleanupRequired?: boolean;
}

/**
 * SchedulePrediction request message
 *
 * Web API Action: SchedulePrediction
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class SchedulePredictionRequest
  extends OrganizationRequest
  implements Executable<SchedulePredictionResponse>
{
  declare readonly Parameters: Readonly<SchedulePredictionRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: SchedulePredictionRequestParameters
  ) {
    super("SchedulePrediction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.SchedulePrediction`;

    const body = requestBody({
      version: this.Parameters.version,
      predictImmediately: this.Parameters.predictImmediately,
      cleanupRequired: this.Parameters.cleanupRequired,
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

  async parseResponse(response: Response): Promise<SchedulePredictionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SchedulePredictionResponse.fromResponse({});
    return SchedulePredictionResponse.fromResponse(await response.json());
  }
}

/**
 * SchedulePrediction response message
 */
export class SchedulePredictionResponse extends OrganizationResponse {
  constructor(public result: SchedulePredictionResponseData) {
    super("SchedulePrediction");
  }

  static fromResponse(data: unknown): SchedulePredictionResponse {
    return new SchedulePredictionResponse(responseObject<SchedulePredictionResponseData>(data));
  }
}
