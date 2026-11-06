import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getsimulationstatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getsimulationstatusRequestParameters {
  simulationid: string;
}

/**
 * msdyn_getsimulationstatus request message
 *
 * Web API Action: msdyn_getsimulationstatus
 */
export class msdyn_getsimulationstatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_getsimulationstatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_getsimulationstatusRequestParameters>;

  constructor(parameters: msdyn_getsimulationstatusRequestParameters) {
    super("msdyn_getsimulationstatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getsimulationstatus`;

    const body = requestBody({
      simulationid: this.Parameters.simulationid,
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

  async parseResponse(response: Response): Promise<msdyn_getsimulationstatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getsimulationstatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getsimulationstatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getsimulationstatusResult {
  "@odata.context"?: string;
  endtime: string;
  starttime: string;
  status: string;
}

/**
 * msdyn_getsimulationstatus response message
 *
 * `result` is the value the msdyn_getsimulationstatus action returns (see {@link msdyn_getsimulationstatusResult}).
 */
export class msdyn_getsimulationstatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_getsimulationstatusResult) {
    super("msdyn_getsimulationstatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getsimulationstatusResponse {
    return new msdyn_getsimulationstatusResponse(data as msdyn_getsimulationstatusResult);
  }
}
