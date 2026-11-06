import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EmailClassificationSimulation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailClassificationSimulationRequestParameters {
  msdyn_CallerSource?: string;
  msdyn_SimulationRunId: string;
}

/**
 * msdyn_EmailClassificationSimulation request message
 *
 * Web API Action: msdyn_EmailClassificationSimulation
 */
export class msdyn_EmailClassificationSimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EmailClassificationSimulationResponse>
{
  declare readonly Parameters: Readonly<msdyn_EmailClassificationSimulationRequestParameters>;

  constructor(parameters: msdyn_EmailClassificationSimulationRequestParameters) {
    super("msdyn_EmailClassificationSimulation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailClassificationSimulation`;

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

  async parseResponse(response: Response): Promise<msdyn_EmailClassificationSimulationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EmailClassificationSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EmailClassificationSimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailClassificationSimulationResult {
  "@odata.context"?: string;
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * msdyn_EmailClassificationSimulation response message
 *
 * `result` is the value the msdyn_EmailClassificationSimulation action returns (see {@link msdyn_EmailClassificationSimulationResult}).
 */
export class msdyn_EmailClassificationSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailClassificationSimulationResult) {
    super("msdyn_EmailClassificationSimulation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EmailClassificationSimulationResponse {
    return new msdyn_EmailClassificationSimulationResponse(
      data as msdyn_EmailClassificationSimulationResult
    );
  }
}
