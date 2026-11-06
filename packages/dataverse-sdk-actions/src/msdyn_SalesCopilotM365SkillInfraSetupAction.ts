import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesCopilotM365SkillInfraSetup action
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupResponse {
  msdyn_result: string;
}

/**
 * Parameters of the msdyn_SalesCopilotM365SkillInfraSetup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup action
 *
 * Unbound action
 */
export class msdyn_SalesCopilotM365SkillInfraSetupAction implements Executable<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
  constructor(public readonly parameters: msdyn_SalesCopilotM365SkillInfraSetupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotM365SkillInfraSetup`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesCopilotM365SkillInfraSetupResponse;
  }
}
