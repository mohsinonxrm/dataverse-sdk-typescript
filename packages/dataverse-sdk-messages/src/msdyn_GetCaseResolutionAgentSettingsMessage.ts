import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetCaseResolutionAgentSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseResolutionAgentSettingsRequestParameters {
  RunId?: string;
  Entity?: EntityReference | AnyEntityPayload;
  SkipEnablementChecks?: boolean;
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
      RunId: this.Parameters.RunId,
      Entity: this.Parameters.Entity,
      SkipEnablementChecks: this.Parameters.SkipEnablementChecks,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetCaseResolutionAgentSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCaseResolutionAgentSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCaseResolutionAgentSettingsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetCaseResolutionAgentSettings response message
 *
 * `result` is the value the msdyn_GetCaseResolutionAgentSettings action returns (see {@link msdyn_GetCaseResolutionAgentSettingsResult}).
 */
export class msdyn_GetCaseResolutionAgentSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCaseResolutionAgentSettingsResult) {
    super("msdyn_GetCaseResolutionAgentSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCaseResolutionAgentSettingsResponse {
    return new msdyn_GetCaseResolutionAgentSettingsResponse(
      data as msdyn_GetCaseResolutionAgentSettingsResult
    );
  }
}
