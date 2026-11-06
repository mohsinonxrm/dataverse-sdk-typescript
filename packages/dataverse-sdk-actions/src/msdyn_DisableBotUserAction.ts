import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DisableBotUser action
 */
export interface msdyn_DisableBotUserResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_DisableBotUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DisableBotUserResponse;
    return (await response.json()) as msdyn_DisableBotUserResponse;
  }
}
