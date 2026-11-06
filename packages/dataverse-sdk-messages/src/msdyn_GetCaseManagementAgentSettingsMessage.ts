import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetCaseManagementAgentSettingsResponse as msdyn_GetCaseManagementAgentSettingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCaseManagementAgentSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseManagementAgentSettingsRequestParameters {
  RefreshIntentFamily?: boolean;
  Entity: EntityReference | AnyEntityPayload;
  Actions?: string;
  RunId?: string;
}

/**
 * msdyn_GetCaseManagementAgentSettings request message
 *
 * Web API Action: msdyn_GetCaseManagementAgentSettings
 */
export class msdyn_GetCaseManagementAgentSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCaseManagementAgentSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCaseManagementAgentSettingsRequestParameters>;

  constructor(parameters: msdyn_GetCaseManagementAgentSettingsRequestParameters) {
    super("msdyn_GetCaseManagementAgentSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseManagementAgentSettings`;

    const body = requestBody({
      RefreshIntentFamily: this.Parameters.RefreshIntentFamily,
      Entity: this.Parameters.Entity,
      Actions: this.Parameters.Actions,
      RunId: this.Parameters.RunId,
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

  async parseResponse(response: Response): Promise<msdyn_GetCaseManagementAgentSettingsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetCaseManagementAgentSettingsResponse.fromResponse({});
    return msdyn_GetCaseManagementAgentSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetCaseManagementAgentSettings response message
 */
export class msdyn_GetCaseManagementAgentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseManagementAgentSettingsResponseData) {
    super("msdyn_GetCaseManagementAgentSettings");
  }

  static fromResponse(data: unknown): msdyn_GetCaseManagementAgentSettingsResponse {
    return new msdyn_GetCaseManagementAgentSettingsResponse(
      responseObject<msdyn_GetCaseManagementAgentSettingsResponseData>(data)
    );
  }
}
