import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      BotApplicationId: this.botApplicationId,
    };
  }
}

/**
 * msdyn_IsBotUserConfigured response message
 */
export class msdyn_IsBotUserConfiguredResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsBotUserConfiguredResponse) {
    super("msdyn_IsBotUserConfigured");
  }

  static fromResponse(data: unknown): msdyn_IsBotUserConfiguredResponse {
    return new msdyn_IsBotUserConfiguredResponse((data as any).value);
  }
}
