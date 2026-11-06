import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSimulationEligibility request message
 *
 * Web API Action: msdyn_GetSimulationEligibility
 */
export class msdyn_GetSimulationEligibilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSimulationEligibilityResponse>
{
  constructor() {
    super("msdyn_GetSimulationEligibility");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimulationEligibility`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSimulationEligibilityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSimulationEligibilityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSimulationEligibility action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSimulationEligibilityResult {
  "@odata.context"?: string;
  msdyn_simulationenabled: boolean;
}

/**
 * msdyn_GetSimulationEligibility response message
 *
 * `result` is the value the msdyn_GetSimulationEligibility action returns (see {@link msdyn_GetSimulationEligibilityResult}).
 */
export class msdyn_GetSimulationEligibilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSimulationEligibilityResult) {
    super("msdyn_GetSimulationEligibility");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSimulationEligibilityResponse {
    return new msdyn_GetSimulationEligibilityResponse(data as msdyn_GetSimulationEligibilityResult);
  }
}
