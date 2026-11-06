import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getsimulationstatusResponse as msdyn_getsimulationstatusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_getsimulationstatusResponse.fromResponse({});
    return msdyn_getsimulationstatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_getsimulationstatus response message
 */
export class msdyn_getsimulationstatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_getsimulationstatusResponseData) {
    super("msdyn_getsimulationstatus");
  }

  static fromResponse(data: unknown): msdyn_getsimulationstatusResponse {
    return new msdyn_getsimulationstatusResponse(
      responseObject<msdyn_getsimulationstatusResponseData>(data)
    );
  }
}
