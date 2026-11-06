import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAutonomousAgentEmailAssistResponse as msdyn_GetAutonomousAgentEmailAssistResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAutonomousAgentEmailAssist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousAgentEmailAssistRequestParameters {
  emailAssistRequestPayload: string;
  emailAssistAdditionalInformation: string;
  emailAssistRequestHeader: string;
}

/**
 * msdyn_GetAutonomousAgentEmailAssist request message
 *
 * Web API Action: msdyn_GetAutonomousAgentEmailAssist
 */
export class msdyn_GetAutonomousAgentEmailAssistRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutonomousAgentEmailAssistResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAutonomousAgentEmailAssistRequestParameters>;

  constructor(parameters: msdyn_GetAutonomousAgentEmailAssistRequestParameters) {
    super("msdyn_GetAutonomousAgentEmailAssist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousAgentEmailAssist`;

    const body = requestBody({
      emailAssistRequestPayload: this.Parameters.emailAssistRequestPayload,
      emailAssistAdditionalInformation: this.Parameters.emailAssistAdditionalInformation,
      emailAssistRequestHeader: this.Parameters.emailAssistRequestHeader,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousAgentEmailAssistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetAutonomousAgentEmailAssistResponse.fromResponse({});
    return msdyn_GetAutonomousAgentEmailAssistResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAutonomousAgentEmailAssist response message
 */
export class msdyn_GetAutonomousAgentEmailAssistResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutonomousAgentEmailAssistResponseData) {
    super("msdyn_GetAutonomousAgentEmailAssist");
  }

  static fromResponse(data: unknown): msdyn_GetAutonomousAgentEmailAssistResponse {
    return new msdyn_GetAutonomousAgentEmailAssistResponse(
      responseObject<msdyn_GetAutonomousAgentEmailAssistResponseData>(data)
    );
  }
}
