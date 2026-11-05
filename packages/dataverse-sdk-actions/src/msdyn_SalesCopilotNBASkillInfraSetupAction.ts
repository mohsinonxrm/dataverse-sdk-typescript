import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesCopilotNBASkillInfraSetup action
 */
export interface msdyn_SalesCopilotNBASkillInfraSetupResponse {
  msdyn_result: string;
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup action
 *
 * Unbound action
 */
export class msdyn_SalesCopilotNBASkillInfraSetupAction implements Executable<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
  constructor(public readonly msdyn_payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotNBASkillInfraSetup`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
    const data = await response.json();
    return data as msdyn_SalesCopilotNBASkillInfraSetupResponse;
  }
}
