import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.SchedulePrediction`;

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
    // The body is the complex value, with its @odata.context
    return SchedulePredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SchedulePrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SchedulePredictionResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * SchedulePrediction response message
 *
 * `result` is the value the SchedulePrediction action returns (see {@link SchedulePredictionResult}).
 */
export class SchedulePredictionResponse extends OrganizationResponse {
  constructor(public result: SchedulePredictionResult) {
    super("SchedulePrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SchedulePredictionResponse {
    return new SchedulePredictionResponse(data as SchedulePredictionResult);
  }
}
