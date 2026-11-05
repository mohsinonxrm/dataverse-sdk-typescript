import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesCopilotM365SkillInfraSetupResponse as msdyn_SalesCopilotM365SkillInfraSetupResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
    const data = await response.json();
    return msdyn_SalesCopilotM365SkillInfraSetupResponse.fromResponse(data);
  }
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup response message
 */
export class msdyn_SalesCopilotM365SkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotM365SkillInfraSetupResponseData) {
    super("msdyn_SalesCopilotM365SkillInfraSetup");
  }

  static fromResponse(data: unknown): msdyn_SalesCopilotM365SkillInfraSetupResponse {
    return new msdyn_SalesCopilotM365SkillInfraSetupResponse(
      responseObject<msdyn_SalesCopilotM365SkillInfraSetupResponseData>(data)
    );
  }
}
