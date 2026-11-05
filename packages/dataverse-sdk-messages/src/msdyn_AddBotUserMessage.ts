import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AddBotUser request message
 *
 * Web API Action: msdyn_AddBotUser
 */
export class msdyn_AddBotUserRequest
  extends OrganizationRequest
  implements Executable<msdyn_AddBotUserResponse>
{
  constructor(
    public botApplicationId: string,
    public applicationId: string,
    public firstName: string,
    public lastName: string,
    public botHandle: string,
    public owningEnvironmentId: string,
    public properties: string
  ) {
    super("msdyn_AddBotUser");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddBotUser`;

    const body: Record<string, unknown> = {
      BotApplicationId: this.botApplicationId,
      ApplicationId: this.applicationId,
      FirstName: this.firstName,
      LastName: this.lastName,
      BotHandle: this.botHandle,
      OwningEnvironmentId: this.owningEnvironmentId,
      Properties: this.properties,
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

  async parseResponse(response: Response): Promise<msdyn_AddBotUserResponse> {
    const data = await response.json();
    return msdyn_AddBotUserResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      BotApplicationId: this.botApplicationId,
      ApplicationId: this.applicationId,
      FirstName: this.firstName,
      LastName: this.lastName,
      BotHandle: this.botHandle,
      OwningEnvironmentId: this.owningEnvironmentId,
      Properties: this.properties,
    };
  }
}

/**
 * msdyn_AddBotUser response message
 */
export class msdyn_AddBotUserResponse extends OrganizationResponse {
  constructor(public result: msdyn_AddBotUserResponse) {
    super("msdyn_AddBotUser");
  }

  static fromResponse(data: unknown): msdyn_AddBotUserResponse {
    return new msdyn_AddBotUserResponse((data as any).value);
  }
}
