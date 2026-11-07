import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetCaseManagementAgentSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCaseManagementAgentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseManagementAgentSettingsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetCaseManagementAgentSettings response message
 *
 * `result` is the value the msdyn_GetCaseManagementAgentSettings action returns (see {@link msdyn_GetCaseManagementAgentSettingsResult}).
 */
export class msdyn_GetCaseManagementAgentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseManagementAgentSettingsResult) {
    super("msdyn_GetCaseManagementAgentSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCaseManagementAgentSettingsResponse {
    return new msdyn_GetCaseManagementAgentSettingsResponse(
      data as msdyn_GetCaseManagementAgentSettingsResult
    );
  }
}
