import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateSdkMessageProcessingStepState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSdkMessageProcessingStepStateRequestParameters {
  msdyn_IsEnabled: boolean;
}

/**
 * msdyn_UpdateSdkMessageProcessingStepState request message
 *
 * Web API Action: msdyn_UpdateSdkMessageProcessingStepState
 */
export class msdyn_UpdateSdkMessageProcessingStepStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateSdkMessageProcessingStepStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateSdkMessageProcessingStepStateRequestParameters>;

  constructor(parameters: msdyn_UpdateSdkMessageProcessingStepStateRequestParameters) {
    super("msdyn_UpdateSdkMessageProcessingStepState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSdkMessageProcessingStepState`;

    const body = requestBody({
      msdyn_IsEnabled: this.Parameters.msdyn_IsEnabled,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateSdkMessageProcessingStepStateResponse();
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
