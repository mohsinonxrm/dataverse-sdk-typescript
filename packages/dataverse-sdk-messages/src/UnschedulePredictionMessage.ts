import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    const url = `${baseUrl}/msdyn_aimodels(${odataLiteral.guid(this.msdyn_aimodelId)})/Microsoft.Dynamics.CRM.UnschedulePrediction`;

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
    // The body is the complex value, with its @odata.context
    return UnschedulePredictionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the UnschedulePrediction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UnschedulePredictionResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * UnschedulePrediction response message
 *
 * `result` is the value the UnschedulePrediction action returns (see {@link UnschedulePredictionResult}).
 */
export class UnschedulePredictionResponse extends OrganizationResponse {
  constructor(public result: UnschedulePredictionResult) {
    super("UnschedulePrediction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): UnschedulePredictionResponse {
    return new UnschedulePredictionResponse(data as UnschedulePredictionResult);
  }
}
