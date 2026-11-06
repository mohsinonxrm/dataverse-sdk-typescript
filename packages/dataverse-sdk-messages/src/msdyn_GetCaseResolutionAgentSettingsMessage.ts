import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetCaseResolutionAgentSettingsResponse as msdyn_GetCaseResolutionAgentSettingsResponseData } from "./types/index.js";

/**
 * msdyn_GetCaseResolutionAgentSettings request message
 *
 * Web API Action: msdyn_GetCaseResolutionAgentSettings
 */
export class msdyn_GetCaseResolutionAgentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseResolutionAgentSettingsResponse>
{
  constructor(public entity?: EntityReference | AnyEntityPayload) {
    super("msdyn_GetCaseResolutionAgentSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseResolutionAgentSettings`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseResolutionAgentSettingsResponse> {
    const data = await response.json();
    return msdyn_GetCaseResolutionAgentSettingsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetCaseResolutionAgentSettings response message
 */
export class msdyn_GetCaseResolutionAgentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseResolutionAgentSettingsResponseData) {
    super("msdyn_GetCaseResolutionAgentSettings");
  }

  static fromResponse(data: unknown): msdyn_GetCaseResolutionAgentSettingsResponse {
    return new msdyn_GetCaseResolutionAgentSettingsResponse(
      responseObject<msdyn_GetCaseResolutionAgentSettingsResponseData>(data)
    );
  }
}
