import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_StoreSimulationResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StoreSimulationResultRequestParameters {
  EvaluationInsight: string;
  SimulationContext: string;
  EvaluationCriteria?: string;
}

/**
 * msdyn_StoreSimulationResult request message
 *
 * Web API Action: msdyn_StoreSimulationResult
 */
export class msdyn_StoreSimulationResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_StoreSimulationResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_StoreSimulationResultRequestParameters>;

  constructor(parameters: msdyn_StoreSimulationResultRequestParameters) {
    super("msdyn_StoreSimulationResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreSimulationResult`;

    const body = requestBody({
      EvaluationInsight: this.Parameters.EvaluationInsight,
      SimulationContext: this.Parameters.SimulationContext,
      EvaluationCriteria: this.Parameters.EvaluationCriteria,
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

  async parseResponse(response: Response): Promise<msdyn_StoreSimulationResultResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_StoreSimulationResultResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_StoreSimulationResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_StoreSimulationResultResult {
  "@odata.context"?: string;
  SimulationResult: string;
}

/**
 * msdyn_StoreSimulationResult response message
 *
 * `result` is the value the msdyn_StoreSimulationResult action returns (see {@link msdyn_StoreSimulationResultResult}).
 */
export class msdyn_StoreSimulationResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_StoreSimulationResultResult) {
    super("msdyn_StoreSimulationResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_StoreSimulationResultResponse {
    return new msdyn_StoreSimulationResultResponse(data as msdyn_StoreSimulationResultResult);
  }
}
