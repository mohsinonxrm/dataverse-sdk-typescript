import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AddBotUser action
 */
export interface msdyn_AddBotUserResponse {
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * Parameters of the msdyn_AddBotUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddBotUserActionParameters {
  BotApplicationId: string;
  ApplicationId?: string;
  FirstName: string;
  LastName: string;
  BotHandle?: string;
  OwningEnvironmentId?: string;
  Properties?: string;
}

/**
 * msdyn_AddBotUser action
 *
 * Unbound action
 */
export class msdyn_AddBotUserAction implements Executable<msdyn_AddBotUserResponse> {
  constructor(public readonly parameters: msdyn_AddBotUserActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddBotUser`;

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

  async parseResponse(response: Response): Promise<msdyn_AddBotUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AddBotUserResponse;
    return (await response.json()) as msdyn_AddBotUserResponse;
  }
}
