import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConversationConductorEnabler action
 */
export interface msdyn_ConversationConductorEnablerResponse {
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * msdyn_ConversationConductorEnabler action
 *
 * Unbound action
 */
export class msdyn_ConversationConductorEnablerAction implements Executable<msdyn_ConversationConductorEnablerResponse> {
  constructor(
    public readonly botApplicationId: string,
    public readonly applicationId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly botHandle: string,
    public readonly owningEnvironmentId: string,
    public readonly properties: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConversationConductorEnabler`;

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

  async parseResponse(response: Response): Promise<msdyn_ConversationConductorEnablerResponse> {
    const data = await response.json();
    return data as msdyn_ConversationConductorEnablerResponse;
  }
}
