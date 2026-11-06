import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DisableBotUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_DisableBotUserResponse = void;

/**
 * Parameters of the msdyn_DisableBotUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DisableBotUserActionParameters {
  BotApplicationId: string;
}

/**
 * msdyn_DisableBotUser action
 *
 * Unbound action
 */
export class msdyn_DisableBotUserAction implements Executable<msdyn_DisableBotUserResponse> {
  constructor(public readonly parameters: msdyn_DisableBotUserActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DisableBotUser`;

    const body = requestBody({
      BotApplicationId: this.parameters.BotApplicationId,
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

  parseResponse(_response: Response): Promise<msdyn_DisableBotUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
