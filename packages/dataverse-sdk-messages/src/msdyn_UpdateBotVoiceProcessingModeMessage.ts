import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateBotVoiceProcessingModeResponse as msdyn_UpdateBotVoiceProcessingModeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateBotVoiceProcessingMode message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateBotVoiceProcessingModeRequestParameters {
  BotApplicationId: string;
  BotHandle: string;
  OwningEnvironmentId?: string;
  VoiceProcessingMode: string;
}

/**
 * msdyn_UpdateBotVoiceProcessingMode request message
 *
 * Web API Action: msdyn_UpdateBotVoiceProcessingMode
 */
export class msdyn_UpdateBotVoiceProcessingModeRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateBotVoiceProcessingModeResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateBotVoiceProcessingModeRequestParameters>;

  constructor(parameters: msdyn_UpdateBotVoiceProcessingModeRequestParameters) {
    super("msdyn_UpdateBotVoiceProcessingMode", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateBotVoiceProcessingMode`;

    const body = requestBody({
      BotApplicationId: this.Parameters.BotApplicationId,
      BotHandle: this.Parameters.BotHandle,
      OwningEnvironmentId: this.Parameters.OwningEnvironmentId,
      VoiceProcessingMode: this.Parameters.VoiceProcessingMode,
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
    if (response.status === 204) return msdyn_UpdateBotVoiceProcessingModeResponse.fromResponse({});
    return msdyn_UpdateBotVoiceProcessingModeResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateBotVoiceProcessingMode response message
 */
export class msdyn_UpdateBotVoiceProcessingModeResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateBotVoiceProcessingModeResponseData) {
    super("msdyn_UpdateBotVoiceProcessingMode");
  }

  static fromResponse(data: unknown): msdyn_UpdateBotVoiceProcessingModeResponse {
    return new msdyn_UpdateBotVoiceProcessingModeResponse(
      responseObject<msdyn_UpdateBotVoiceProcessingModeResponseData>(data)
    );
  }
}
