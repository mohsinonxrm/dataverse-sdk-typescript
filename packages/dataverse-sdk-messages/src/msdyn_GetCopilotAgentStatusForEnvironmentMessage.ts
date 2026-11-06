import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCopilotAgentStatusForEnvironmentResponse as msdyn_GetCopilotAgentStatusForEnvironmentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCopilotAgentStatusForEnvironment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentRequestParameters {
  msdyn_salesAgentType?: number;
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment request message
 *
 * Web API Action: msdyn_GetCopilotAgentStatusForEnvironment
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotAgentStatusForEnvironmentResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCopilotAgentStatusForEnvironmentRequestParameters>;

  constructor(parameters: msdyn_GetCopilotAgentStatusForEnvironmentRequestParameters = {}) {
    super("msdyn_GetCopilotAgentStatusForEnvironment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotAgentStatusForEnvironment`;

    const body = requestBody({
      msdyn_salesAgentType: this.Parameters.msdyn_salesAgentType,
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
  ): Promise<msdyn_GetCopilotAgentStatusForEnvironmentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetCopilotAgentStatusForEnvironmentResponse.fromResponse({});
    return msdyn_GetCopilotAgentStatusForEnvironmentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment response message
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotAgentStatusForEnvironmentResponseData) {
    super("msdyn_GetCopilotAgentStatusForEnvironment");
  }

  static fromResponse(data: unknown): msdyn_GetCopilotAgentStatusForEnvironmentResponse {
    return new msdyn_GetCopilotAgentStatusForEnvironmentResponse(
      responseObject<msdyn_GetCopilotAgentStatusForEnvironmentResponseData>(data)
    );
  }
}
