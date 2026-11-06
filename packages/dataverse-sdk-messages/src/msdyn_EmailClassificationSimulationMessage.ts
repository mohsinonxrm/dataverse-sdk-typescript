import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EmailClassificationSimulationResponse as msdyn_EmailClassificationSimulationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_EmailClassificationSimulationResponse.fromResponse({});
    return msdyn_EmailClassificationSimulationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EmailClassificationSimulation response message
 */
export class msdyn_EmailClassificationSimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EmailClassificationSimulationResponseData) {
    super("msdyn_EmailClassificationSimulation");
  }

  static fromResponse(data: unknown): msdyn_EmailClassificationSimulationResponse {
    return new msdyn_EmailClassificationSimulationResponse(
      responseObject<msdyn_EmailClassificationSimulationResponseData>(data)
    );
  }
}
