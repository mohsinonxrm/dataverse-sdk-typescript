import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAutonomousAgentEmailAssistResponse as msdyn_GetAutonomousAgentEmailAssistResponseData } from "./types/index.js";

/**
 * msdyn_GetAutonomousAgentEmailAssist request message
 *
 * Web API Action: msdyn_GetAutonomousAgentEmailAssist
 */
export class msdyn_GetAutonomousAgentEmailAssistRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutonomousAgentEmailAssistResponse>
{
  constructor(
    public emailAssistAdditionalInformation: string,
    public emailAssistRequestPayload: string,
    public emailAssistRequestHeader: string
  ) {
    super("msdyn_GetAutonomousAgentEmailAssist");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousAgentEmailAssist`;

    const body: Record<string, unknown> = {
      emailAssistAdditionalInformation: this.emailAssistAdditionalInformation,
      emailAssistRequestPayload: this.emailAssistRequestPayload,
      emailAssistRequestHeader: this.emailAssistRequestHeader,
    };

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
    const data = await response.json();
    return msdyn_GetAutonomousAgentEmailAssistResponse.fromResponse(data);
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
