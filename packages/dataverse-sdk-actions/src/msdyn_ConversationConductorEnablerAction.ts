import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConversationConductorEnabler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConversationConductorEnablerResponse {
  "@odata.context"?: string;
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * Parameters of the msdyn_ConversationConductorEnabler action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConversationConductorEnablerActionParameters {
  BotApplicationId: string;
  ApplicationId?: string;
  FirstName: string;
  LastName: string;
  BotHandle?: string;
  OwningEnvironmentId?: string;
  Properties?: string;
}

/**
 * msdyn_ConversationConductorEnabler action
 *
 * Unbound action
 */
export class msdyn_ConversationConductorEnablerAction implements Executable<msdyn_ConversationConductorEnablerResponse> {
  constructor(public readonly parameters: msdyn_ConversationConductorEnablerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConversationConductorEnabler`;

    const body = requestBody({
      BotApplicationId: this.parameters.BotApplicationId,
      ApplicationId: this.parameters.ApplicationId,
      FirstName: this.parameters.FirstName,
      LastName: this.parameters.LastName,
      BotHandle: this.parameters.BotHandle,
      OwningEnvironmentId: this.parameters.OwningEnvironmentId,
      Properties: this.parameters.Properties,
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

  async parseResponse(response: Response): Promise<msdyn_ConversationConductorEnablerResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ConversationConductorEnablerResponse;
  }
}
