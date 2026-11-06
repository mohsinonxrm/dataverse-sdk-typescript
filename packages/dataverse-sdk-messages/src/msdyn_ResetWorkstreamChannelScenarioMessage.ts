import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ResetWorkstreamChannelScenario message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetWorkstreamChannelScenarioRequestParameters {
  LiveWorkStreamId: string;
}

/**
 * msdyn_ResetWorkstreamChannelScenario request message
 *
 * Web API Action: msdyn_ResetWorkstreamChannelScenario
 */
export class msdyn_ResetWorkstreamChannelScenarioRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetWorkstreamChannelScenarioResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResetWorkstreamChannelScenarioRequestParameters>;

  constructor(parameters: msdyn_ResetWorkstreamChannelScenarioRequestParameters) {
    super("msdyn_ResetWorkstreamChannelScenario", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkstreamChannelScenario`;

    const body = requestBody({
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
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

  parseResponse(_response: Response): Promise<msdyn_ResetWorkstreamChannelScenarioResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ResetWorkstreamChannelScenarioResponse());
  }
}

/**
 * msdyn_ResetWorkstreamChannelScenario response message
 */
export class msdyn_ResetWorkstreamChannelScenarioResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ResetWorkstreamChannelScenario");
  }

  static fromResponse(_data?: unknown): msdyn_ResetWorkstreamChannelScenarioResponse {
    return new msdyn_ResetWorkstreamChannelScenarioResponse();
  }
}
