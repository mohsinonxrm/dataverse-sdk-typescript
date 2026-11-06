import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AddBotUser action
 */
export interface msdyn_AddBotUserResponse {
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * msdyn_AddBotUser action
 *
 * Unbound action
 */
export class msdyn_AddBotUserAction implements Executable<msdyn_AddBotUserResponse> {
  constructor(
    public readonly botApplicationId: string,
    public readonly applicationId: string | undefined,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly botHandle?: string,
    public readonly owningEnvironmentId?: string,
    public readonly properties?: string
  ) {}

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
    return data as msdyn_AddBotUserResponse;
  }
}
