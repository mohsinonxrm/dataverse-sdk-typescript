import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateBotVoiceProcessingMode action
 */
export interface msdyn_UpdateBotVoiceProcessingModeResponse {
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * Parameters of the msdyn_UpdateBotVoiceProcessingMode action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateBotVoiceProcessingModeActionParameters {
  BotApplicationId: string;
  BotHandle: string;
  OwningEnvironmentId?: string;
  VoiceProcessingMode: string;
}

/**
 * msdyn_UpdateBotVoiceProcessingMode action
 *
 * Unbound action
 */
export class msdyn_UpdateBotVoiceProcessingModeAction implements Executable<msdyn_UpdateBotVoiceProcessingModeResponse> {
  constructor(public readonly parameters: msdyn_UpdateBotVoiceProcessingModeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateBotVoiceProcessingMode`;

    const body = requestBody({
      BotApplicationId: this.parameters.BotApplicationId,
      BotHandle: this.parameters.BotHandle,
      OwningEnvironmentId: this.parameters.OwningEnvironmentId,
      VoiceProcessingMode: this.parameters.VoiceProcessingMode,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateBotVoiceProcessingModeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateBotVoiceProcessingModeResponse;
    return (await response.json()) as msdyn_UpdateBotVoiceProcessingModeResponse;
  }
}
