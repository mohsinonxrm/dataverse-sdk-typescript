import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_AddBotUserResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AddBotUser action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AddBotUserResult {
  "@odata.context"?: string;
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * msdyn_AddBotUser response message
 *
 * `result` is the value the msdyn_AddBotUser action returns (see {@link msdyn_AddBotUserResult}).
 */
export class msdyn_AddBotUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_AddBotUserResult) {
    super("msdyn_AddBotUser");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AddBotUserResponse {
    return new msdyn_AddBotUserResponse(data as msdyn_AddBotUserResult);
  }
}
