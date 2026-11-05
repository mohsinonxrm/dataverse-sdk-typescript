import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DisableBotUser request message
 *
 * Web API Action: msdyn_DisableBotUser
 */
export class msdyn_DisableBotUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_DisableBotUserResponse>
{
  constructor(public botApplicationId: string) {
    super("msdyn_DisableBotUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableBotUser`;

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

  async parseResponse(response: Response): Promise<msdyn_DisableBotUserResponse> {
    // No return value (204 No Content)
    return new msdyn_DisableBotUserResponse();
  }
}

/**
 * msdyn_DisableBotUser response message
 */
export class msdyn_DisableBotUserResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DisableBotUser");
  }

  static fromResponse(_data: unknown): msdyn_DisableBotUserResponse {
    return new msdyn_DisableBotUserResponse();
  }
}
