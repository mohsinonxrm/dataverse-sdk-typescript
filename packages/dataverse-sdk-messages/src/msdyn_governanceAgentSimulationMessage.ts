import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_governanceAgentSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_governanceAgentSimulationRequestParameters {
  msdyn_CallerSource?: string;
  msdyn_simulationRunId: string;
}

/**
 * msdyn_governanceAgentSimulation request message
 *
 * Web API Action: msdyn_governanceAgentSimulation
 */
export class msdyn_governanceAgentSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_governanceAgentSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_governanceAgentSimulationRequestParameters>;

  constructor(parameters: msdyn_governanceAgentSimulationRequestParameters) {
    super("msdyn_governanceAgentSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_governanceAgentSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
      msdyn_simulationRunId: this.Parameters.msdyn_simulationRunId,
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

  async parseResponse(response: Response): Promise<msdyn_governanceAgentSimulationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_governanceAgentSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_governanceAgentSimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_governanceAgentSimulationResult {
  "@odata.context"?: string;
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * msdyn_governanceAgentSimulation response message
 *
 * `result` is the value the msdyn_governanceAgentSimulation action returns (see {@link msdyn_governanceAgentSimulationResult}).
 */
export class msdyn_governanceAgentSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_governanceAgentSimulationResult) {
    super("msdyn_governanceAgentSimulation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_governanceAgentSimulationResponse {
    return new msdyn_governanceAgentSimulationResponse(
      data as msdyn_governanceAgentSimulationResult
    );
  }
}
