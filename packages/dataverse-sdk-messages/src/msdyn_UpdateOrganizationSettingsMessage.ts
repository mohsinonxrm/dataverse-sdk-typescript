import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateOrganizationSettingsResponse as msdyn_UpdateOrganizationSettingsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpdateOrganizationSettingsResponse.fromResponse({});
    return msdyn_UpdateOrganizationSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateOrganizationSettings response message
 */
export class msdyn_UpdateOrganizationSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateOrganizationSettingsResponseData) {
    super("msdyn_UpdateOrganizationSettings");
  }

  static fromResponse(data: unknown): msdyn_UpdateOrganizationSettingsResponse {
    return new msdyn_UpdateOrganizationSettingsResponse(
      responseObject<msdyn_UpdateOrganizationSettingsResponseData>(data)
    );
  }
}
