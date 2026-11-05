import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesCopilotM365SkillInfraSetup action
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupResponse {
  msdyn_result: string;
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup action
 *
 * Unbound action
 */
export class msdyn_SalesCopilotM365SkillInfraSetupAction implements Executable<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
  constructor(public readonly msdyn_payload: string) {}

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
    return data as msdyn_SalesCopilotM365SkillInfraSetupResponse;
  }
}
