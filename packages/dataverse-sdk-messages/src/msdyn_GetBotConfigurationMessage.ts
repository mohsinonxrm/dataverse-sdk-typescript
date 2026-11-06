import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetBotConfigurationResponse as msdyn_GetBotConfigurationResponseData } from "./types/index.js";

/**
 * msdyn_GetBotConfiguration request message
 *
 * Web API Action: msdyn_GetBotConfiguration
 */
export class msdyn_GetBotConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBotConfigurationResponse>
{
  constructor(public botApplicationId: string) {
    super("msdyn_GetBotConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBotConfiguration`;

    const body: Record<string, unknown> = {
      BotApplicationId: this.botApplicationId,
    };

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
    const data = await response.json();
    return msdyn_GetBotConfigurationResponse.fromResponse(data);
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
