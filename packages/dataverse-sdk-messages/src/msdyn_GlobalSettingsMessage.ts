import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GlobalSettingsResponse as msdyn_GlobalSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GlobalSettingsResponse.fromResponse({});
    return msdyn_GlobalSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GlobalSettings response message
 */
export class msdyn_GlobalSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GlobalSettingsResponseData) {
    super("msdyn_GlobalSettings");
  }

  static fromResponse(data: unknown): msdyn_GlobalSettingsResponse {
    return new msdyn_GlobalSettingsResponse(responseObject<msdyn_GlobalSettingsResponseData>(data));
  }
}
