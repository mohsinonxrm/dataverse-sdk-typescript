import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetCaseResolutionAgentSettingsResponse as msdyn_GetCaseResolutionAgentSettingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCaseResolutionAgentSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseResolutionAgentSettingsRequestParameters {
  Entity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetCaseResolutionAgentSettings request message
 *
 * Web API Action: msdyn_GetCaseResolutionAgentSettings
 */
export class msdyn_GetCaseResolutionAgentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseResolutionAgentSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCaseResolutionAgentSettingsRequestParameters>;

  constructor(parameters: msdyn_GetCaseResolutionAgentSettingsRequestParameters = {}) {
    super("msdyn_GetCaseResolutionAgentSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseResolutionAgentSettings`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseResolutionAgentSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetCaseResolutionAgentSettingsResponse.fromResponse({});
    return msdyn_GetCaseResolutionAgentSettingsResponse.fromResponse(await response.json());
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
