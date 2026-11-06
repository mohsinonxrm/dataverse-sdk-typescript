import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsBotUserConfiguredResponse as msdyn_IsBotUserConfiguredResponseData } from "./types/index.js";

/**
 * msdyn_IsBotUserConfigured request message
 *
 * Web API Action: msdyn_IsBotUserConfigured
 */
export class msdyn_IsBotUserConfiguredRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsBotUserConfiguredResponse>
{
  constructor(public botApplicationId: string) {
    super("msdyn_IsBotUserConfigured");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsBotUserConfigured`;

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

  async parseResponse(response: Response): Promise<msdyn_IsBotUserConfiguredResponse> {
    const data = await response.json();
    return msdyn_IsBotUserConfiguredResponse.fromResponse(data);
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
