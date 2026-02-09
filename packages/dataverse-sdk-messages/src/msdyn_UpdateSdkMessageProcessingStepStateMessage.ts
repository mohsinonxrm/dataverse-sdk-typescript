import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateSdkMessageProcessingStepState request message
 *
 * Web API Action: msdyn_UpdateSdkMessageProcessingStepState
 */
export class msdyn_UpdateSdkMessageProcessingStepStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSdkMessageProcessingStepStateResponse>
{
  constructor(public msdyn_IsEnabled: boolean) {
    super("msdyn_UpdateSdkMessageProcessingStepState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSdkMessageProcessingStepState`;

    const body: Record<string, unknown> = {
      msdyn_IsEnabled: this.msdyn_IsEnabled,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateSdkMessageProcessingStepStateResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_IsEnabled: this.msdyn_IsEnabled,
    };
  }
}

/**
 * msdyn_UpdateSdkMessageProcessingStepState response message
 */
export class msdyn_UpdateSdkMessageProcessingStepStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateSdkMessageProcessingStepState");
  }

  static fromResponse(_data: unknown): msdyn_UpdateSdkMessageProcessingStepStateResponse {
    return new msdyn_UpdateSdkMessageProcessingStepStateResponse();
  }
}
