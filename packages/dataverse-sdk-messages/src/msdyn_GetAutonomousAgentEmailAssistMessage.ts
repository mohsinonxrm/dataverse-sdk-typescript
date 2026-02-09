import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousAgentEmailAssistResponse> {
    const data = await response.json();
    return msdyn_GetAutonomousAgentEmailAssistResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      emailAssistAdditionalInformation: this.emailAssistAdditionalInformation,
      emailAssistRequestPayload: this.emailAssistRequestPayload,
      emailAssistRequestHeader: this.emailAssistRequestHeader,
    };
  }
}

/**
 * msdyn_GetAutonomousAgentEmailAssist response message
 */
export class msdyn_GetAutonomousAgentEmailAssistResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutonomousAgentEmailAssistResponse) {
    super("msdyn_GetAutonomousAgentEmailAssist");
  }

  static fromResponse(data: unknown): msdyn_GetAutonomousAgentEmailAssistResponse {
    return new msdyn_GetAutonomousAgentEmailAssistResponse((data as any).value);
  }
}
