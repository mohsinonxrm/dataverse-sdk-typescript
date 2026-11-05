import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetCaseResolutionAgentSettings request message
 *
 * Web API Action: msdyn_GetCaseResolutionAgentSettings
 */
export class msdyn_GetCaseResolutionAgentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseResolutionAgentSettingsResponse>
{
  constructor(public entity: EntityReference) {
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

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
    };
  }
}

/**
 * msdyn_GetCaseResolutionAgentSettings response message
 */
export class msdyn_GetCaseResolutionAgentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseResolutionAgentSettingsResponse) {
    super("msdyn_GetCaseResolutionAgentSettings");
  }

  static fromResponse(data: unknown): msdyn_GetCaseResolutionAgentSettingsResponse {
    return new msdyn_GetCaseResolutionAgentSettingsResponse((data as any).value);
  }
}
