import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EmailResolutionAgentSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailResolutionAgentSimulationRequestParameters {
  msdyn_SimulationRunId: string;
  msdyn_CallerSource?: string;
}

/**
 * msdyn_EmailResolutionAgentSimulation request message
 *
 * Web API Action: msdyn_EmailResolutionAgentSimulation
 */
export class msdyn_EmailResolutionAgentSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailResolutionAgentSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailResolutionAgentSimulationRequestParameters>;

  constructor(parameters: msdyn_EmailResolutionAgentSimulationRequestParameters) {
    super("msdyn_EmailResolutionAgentSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailResolutionAgentSimulation`;

    const body = requestBody({
      msdyn_SimulationRunId: this.Parameters.msdyn_SimulationRunId,
      msdyn_CallerSource: this.Parameters.msdyn_CallerSource,
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

  async parseResponse(response: Response): Promise<msdyn_EmailResolutionAgentSimulationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EmailResolutionAgentSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EmailResolutionAgentSimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailResolutionAgentSimulationResult {
  "@odata.context"?: string;
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * msdyn_EmailResolutionAgentSimulation response message
 *
 * `result` is the value the msdyn_EmailResolutionAgentSimulation action returns (see {@link msdyn_EmailResolutionAgentSimulationResult}).
 */
export class msdyn_EmailResolutionAgentSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailResolutionAgentSimulationResult) {
    super("msdyn_EmailResolutionAgentSimulation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EmailResolutionAgentSimulationResponse {
    return new msdyn_EmailResolutionAgentSimulationResponse(
      data as msdyn_EmailResolutionAgentSimulationResult
    );
  }
}
