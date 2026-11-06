import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CaseSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CaseSimulationRequestParameters {
  msdyn_CallerSource?: string;
  msdyn_SimulationRunId: string;
}

/**
 * msdyn_CaseSimulation request message
 *
 * Web API Action: msdyn_CaseSimulation
 */
export class msdyn_CaseSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CaseSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_CaseSimulationRequestParameters>;

  constructor(parameters: msdyn_CaseSimulationRequestParameters) {
    super("msdyn_CaseSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
      msdyn_SimulationRunId: this.Parameters.msdyn_SimulationRunId,
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

  async parseResponse(response: Response): Promise<msdyn_CaseSimulationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CaseSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CaseSimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CaseSimulationResult {
  "@odata.context"?: string;
  msdyn_AccuracyPercentage: number;
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
  msdyn_Predictions: string;
}

/**
 * msdyn_CaseSimulation response message
 *
 * `result` is the value the msdyn_CaseSimulation action returns (see {@link msdyn_CaseSimulationResult}).
 */
export class msdyn_CaseSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CaseSimulationResult) {
    super("msdyn_CaseSimulation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CaseSimulationResponse {
    return new msdyn_CaseSimulationResponse(data as msdyn_CaseSimulationResult);
  }
}
