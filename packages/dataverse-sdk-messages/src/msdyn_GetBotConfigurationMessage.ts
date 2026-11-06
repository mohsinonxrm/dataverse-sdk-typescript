import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetBotConfigurationResponse as msdyn_GetBotConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetBotConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBotConfigurationRequestParameters {
  BotApplicationId: string;
}

/**
 * msdyn_GetBotConfiguration request message
 *
 * Web API Action: msdyn_GetBotConfiguration
 */
export class msdyn_GetBotConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBotConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBotConfigurationRequestParameters>;

  constructor(parameters: msdyn_GetBotConfigurationRequestParameters) {
    super("msdyn_GetBotConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBotConfiguration`;

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

  async parseResponse(response: Response): Promise<msdyn_GetBotConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetBotConfigurationResponse.fromResponse({});
    return msdyn_GetBotConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetBotConfiguration response message
 */
export class msdyn_GetBotConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBotConfigurationResponseData) {
    super("msdyn_GetBotConfiguration");
  }

  static fromResponse(data: unknown): msdyn_GetBotConfigurationResponse {
    return new msdyn_GetBotConfigurationResponse(
      responseObject<msdyn_GetBotConfigurationResponseData>(data)
    );
  }
}
