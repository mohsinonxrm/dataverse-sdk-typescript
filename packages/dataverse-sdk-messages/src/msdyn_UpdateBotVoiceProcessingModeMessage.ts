import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateBotVoiceProcessingModeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateBotVoiceProcessingMode action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateBotVoiceProcessingModeResult {
  "@odata.context"?: string;
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * msdyn_UpdateBotVoiceProcessingMode response message
 *
 * `result` is the value the msdyn_UpdateBotVoiceProcessingMode action returns (see {@link msdyn_UpdateBotVoiceProcessingModeResult}).
 */
export class msdyn_UpdateBotVoiceProcessingModeResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateBotVoiceProcessingModeResult) {
    super("msdyn_UpdateBotVoiceProcessingMode");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateBotVoiceProcessingModeResponse {
    return new msdyn_UpdateBotVoiceProcessingModeResponse(
      data as msdyn_UpdateBotVoiceProcessingModeResult
    );
  }
}
