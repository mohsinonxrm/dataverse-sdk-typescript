import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetCopilotAgentStatusForEnvironmentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCopilotAgentStatusForEnvironment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCopilotAgentStatusForEnvironmentResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  msdyn_isAgentCapacityEnabled: boolean;
  msdyn_isAgentEnabled: boolean;
  msdyn_isBingChatEnabled: boolean;
  msdyn_isCopilotCrossGeoRequestEnabled: boolean;
  msdyn_isM365TenantEnabled: boolean;
}

/**
 * msdyn_GetCopilotAgentStatusForEnvironment response message
 *
 * `result` is the value the msdyn_GetCopilotAgentStatusForEnvironment action returns (see {@link msdyn_GetCopilotAgentStatusForEnvironmentResult}).
 */
export class msdyn_GetCopilotAgentStatusForEnvironmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotAgentStatusForEnvironmentResult) {
    super("msdyn_GetCopilotAgentStatusForEnvironment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCopilotAgentStatusForEnvironmentResponse {
    return new msdyn_GetCopilotAgentStatusForEnvironmentResponse(
      data as msdyn_GetCopilotAgentStatusForEnvironmentResult
    );
  }
}
