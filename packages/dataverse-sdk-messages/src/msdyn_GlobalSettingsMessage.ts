import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GlobalSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GlobalSettingsRequestParameters {
  BotConversationId?: string;
}

/**
 * msdyn_GlobalSettings request message
 *
 * Web API Action: msdyn_GlobalSettings
 */
export class msdyn_GlobalSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GlobalSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GlobalSettingsRequestParameters>;

  constructor(parameters: msdyn_GlobalSettingsRequestParameters = {}) {
    super("msdyn_GlobalSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GlobalSettings`;

    const body = requestBody({
      BotConversationId: this.Parameters.BotConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_GlobalSettingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GlobalSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GlobalSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GlobalSettingsResult {
  "@odata.context"?: string;
  SettingsLink: string;
}

/**
 * msdyn_GlobalSettings response message
 *
 * `result` is the value the msdyn_GlobalSettings action returns (see {@link msdyn_GlobalSettingsResult}).
 */
export class msdyn_GlobalSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GlobalSettingsResult) {
    super("msdyn_GlobalSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GlobalSettingsResponse {
    return new msdyn_GlobalSettingsResponse(data as msdyn_GlobalSettingsResult);
  }
}
