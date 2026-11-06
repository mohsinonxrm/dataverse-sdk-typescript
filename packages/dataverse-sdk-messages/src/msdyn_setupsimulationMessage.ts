import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_setupsimulationResponse as msdyn_setupsimulationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_setupsimulationResponse.fromResponse({});
    return msdyn_setupsimulationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_setupsimulation response message
 */
export class msdyn_setupsimulationResponse extends OrganizationResponse {
  constructor(public result: msdyn_setupsimulationResponseData) {
    super("msdyn_setupsimulation");
  }

  static fromResponse(data: unknown): msdyn_setupsimulationResponse {
    return new msdyn_setupsimulationResponse(
      responseObject<msdyn_setupsimulationResponseData>(data)
    );
  }
}
