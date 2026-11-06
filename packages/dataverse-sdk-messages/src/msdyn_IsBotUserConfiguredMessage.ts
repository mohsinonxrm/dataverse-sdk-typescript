import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IsBotUserConfiguredResponse as msdyn_IsBotUserConfiguredResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IsBotUserConfigured message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IsBotUserConfiguredRequestParameters {
  BotApplicationId: string;
}

/**
 * msdyn_IsBotUserConfigured request message
 *
 * Web API Action: msdyn_IsBotUserConfigured
 */
export class msdyn_IsBotUserConfiguredRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsBotUserConfiguredResponse>
{
  declare readonly Parameters: Readonly<msdyn_IsBotUserConfiguredRequestParameters>;

  constructor(parameters: msdyn_IsBotUserConfiguredRequestParameters) {
    super("msdyn_IsBotUserConfigured", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsBotUserConfigured`;

    const body = requestBody({
      BotApplicationId: this.Parameters.BotApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_IsBotUserConfiguredResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_IsBotUserConfiguredResponse.fromResponse({});
    return msdyn_IsBotUserConfiguredResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IsBotUserConfigured response message
 */
export class msdyn_IsBotUserConfiguredResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsBotUserConfiguredResponseData) {
    super("msdyn_IsBotUserConfigured");
  }

  static fromResponse(data: unknown): msdyn_IsBotUserConfiguredResponse {
    return new msdyn_IsBotUserConfiguredResponse(
      responseObject<msdyn_IsBotUserConfiguredResponseData>(data)
    );
  }
}
