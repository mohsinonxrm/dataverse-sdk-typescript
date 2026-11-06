import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_setupsimulation request message
 *
 * Web API Action: msdyn_setupsimulation
 */
export class msdyn_setupsimulationRequest
  extends OrganizationRequest
  implements Executable<msdyn_setupsimulationResponse>
{
  constructor() {
    super("msdyn_setupsimulation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_setupsimulation`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_setupsimulationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_setupsimulationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_setupsimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_setupsimulationResult {
  "@odata.context"?: string;
  message: string;
  statuscode: number;
}

/**
 * msdyn_setupsimulation response message
 *
 * `result` is the value the msdyn_setupsimulation action returns (see {@link msdyn_setupsimulationResult}).
 */
export class msdyn_setupsimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_setupsimulationResult) {
    super("msdyn_setupsimulation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_setupsimulationResponse {
    return new msdyn_setupsimulationResponse(data as msdyn_setupsimulationResult);
  }
}
