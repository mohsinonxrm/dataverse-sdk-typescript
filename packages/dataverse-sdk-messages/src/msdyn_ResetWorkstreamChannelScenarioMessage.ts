import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ResetWorkstreamChannelScenario request message
 *
 * Web API Action: msdyn_ResetWorkstreamChannelScenario
 */
export class msdyn_ResetWorkstreamChannelScenarioRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResetWorkstreamChannelScenarioResponse>
{
  constructor(public liveWorkStreamId: string) {
    super("msdyn_ResetWorkstreamChannelScenario");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkstreamChannelScenario`;

    const body: Record<string, unknown> = {
      LiveWorkStreamId: this.liveWorkStreamId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ResetWorkstreamChannelScenarioResponse> {
    // No return value (204 No Content)
    return new msdyn_ResetWorkstreamChannelScenarioResponse();
  }
}

/**
 * msdyn_ResetWorkstreamChannelScenario response message
 */
export class msdyn_ResetWorkstreamChannelScenarioResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ResetWorkstreamChannelScenario");
  }

  static fromResponse(_data: unknown): msdyn_ResetWorkstreamChannelScenarioResponse {
    return new msdyn_ResetWorkstreamChannelScenarioResponse();
  }
}
