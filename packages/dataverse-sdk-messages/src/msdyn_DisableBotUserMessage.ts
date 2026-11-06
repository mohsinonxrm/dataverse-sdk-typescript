import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DisableBotUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DisableBotUserRequestParameters {
  BotApplicationId: string;
}

/**
 * msdyn_DisableBotUser request message
 *
 * Web API Action: msdyn_DisableBotUser
 */
export class msdyn_DisableBotUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_DisableBotUserResponse>
{
  declare readonly Parameters: Readonly<msdyn_DisableBotUserRequestParameters>;

  constructor(parameters: msdyn_DisableBotUserRequestParameters) {
    super("msdyn_DisableBotUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableBotUser`;

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
