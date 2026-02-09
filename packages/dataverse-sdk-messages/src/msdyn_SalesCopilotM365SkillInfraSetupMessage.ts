import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesCopilotM365SkillInfraSetup request message
 *
 * Web API Action: msdyn_SalesCopilotM365SkillInfraSetup
 */
export class msdyn_SalesCopilotM365SkillInfraSetupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesCopilotM365SkillInfraSetupResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_SalesCopilotM365SkillInfraSetup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotM365SkillInfraSetup`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
    const data = await response.json();
    return msdyn_SalesCopilotM365SkillInfraSetupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup response message
 */
export class msdyn_SalesCopilotM365SkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotM365SkillInfraSetupResponse) {
    super("msdyn_SalesCopilotM365SkillInfraSetup");
  }

  static fromResponse(data: unknown): msdyn_SalesCopilotM365SkillInfraSetupResponse {
    return new msdyn_SalesCopilotM365SkillInfraSetupResponse((data as any).value);
  }
}
