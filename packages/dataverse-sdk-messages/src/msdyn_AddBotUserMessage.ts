import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AddBotUserResponse as msdyn_AddBotUserResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_AddBotUser message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddBotUserRequestParameters {
  BotApplicationId: string;
  ApplicationId?: string;
  FirstName: string;
  LastName: string;
  BotHandle?: string;
  OwningEnvironmentId?: string;
  Properties?: string;
}

/**
 * msdyn_AddBotUser request message
 *
 * Web API Action: msdyn_AddBotUser
 */
export class msdyn_AddBotUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddBotUserResponse>
{
  declare readonly Parameters: Readonly<msdyn_AddBotUserRequestParameters>;

  constructor(parameters: msdyn_AddBotUserRequestParameters) {
    super("msdyn_AddBotUser", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddBotUser`;

    const body = requestBody({
      BotApplicationId: this.Parameters.BotApplicationId,
      ApplicationId: this.Parameters.ApplicationId,
      FirstName: this.Parameters.FirstName,
      LastName: this.Parameters.LastName,
      BotHandle: this.Parameters.BotHandle,
      OwningEnvironmentId: this.Parameters.OwningEnvironmentId,
      Properties: this.Parameters.Properties,
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

  async parseResponse(response: Response): Promise<msdyn_AddBotUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AddBotUserResponse.fromResponse({});
    return msdyn_AddBotUserResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AddBotUser response message
 */
export class msdyn_AddBotUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_AddBotUserResponseData) {
    super("msdyn_AddBotUser");
  }

  static fromResponse(data: unknown): msdyn_AddBotUserResponse {
    return new msdyn_AddBotUserResponse(responseObject<msdyn_AddBotUserResponseData>(data));
  }
}
