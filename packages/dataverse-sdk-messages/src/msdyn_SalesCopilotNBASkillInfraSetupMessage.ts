import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesCopilotNBASkillInfraSetup request message
 *
 * Web API Action: msdyn_SalesCopilotNBASkillInfraSetup
 */
export class msdyn_SalesCopilotNBASkillInfraSetupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesCopilotNBASkillInfraSetupResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_SalesCopilotNBASkillInfraSetup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotNBASkillInfraSetup`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
    const data = await response.json();
    return msdyn_SalesCopilotNBASkillInfraSetupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup response message
 */
export class msdyn_SalesCopilotNBASkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotNBASkillInfraSetupResponse) {
    super("msdyn_SalesCopilotNBASkillInfraSetup");
  }

  static fromResponse(data: unknown): msdyn_SalesCopilotNBASkillInfraSetupResponse {
    return new msdyn_SalesCopilotNBASkillInfraSetupResponse((data as any).value);
  }
}
