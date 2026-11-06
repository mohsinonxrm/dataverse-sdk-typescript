import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateOrganizationSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateOrganizationSettingsRequestParameters {
  BotConversationId?: string;
  UniqueName: string;
  Value: string;
}

/**
 * msdyn_UpdateOrganizationSettings request message
 *
 * Web API Action: msdyn_UpdateOrganizationSettings
 */
export class msdyn_UpdateOrganizationSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateOrganizationSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateOrganizationSettingsRequestParameters>;

  constructor(parameters: msdyn_UpdateOrganizationSettingsRequestParameters) {
    super("msdyn_UpdateOrganizationSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateOrganizationSettings`;

    const body = requestBody({
      BotConversationId: this.Parameters.BotConversationId,
      UniqueName: this.Parameters.UniqueName,
      Value: this.Parameters.Value,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateOrganizationSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateOrganizationSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateOrganizationSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateOrganizationSettingsResult {
  "@odata.context"?: string;
  SettingsLink: string;
}

/**
 * msdyn_UpdateOrganizationSettings response message
 *
 * `result` is the value the msdyn_UpdateOrganizationSettings action returns (see {@link msdyn_UpdateOrganizationSettingsResult}).
 */
export class msdyn_UpdateOrganizationSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateOrganizationSettingsResult) {
    super("msdyn_UpdateOrganizationSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateOrganizationSettingsResponse {
    return new msdyn_UpdateOrganizationSettingsResponse(
      data as msdyn_UpdateOrganizationSettingsResult
    );
  }
}
