import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesCopilotNBASkillInfraSetup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesCopilotNBASkillInfraSetupResponse {
  "@odata.context"?: string;
  msdyn_result: string;
}

/**
 * Parameters of the msdyn_SalesCopilotNBASkillInfraSetup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesCopilotNBASkillInfraSetupActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup action
 *
 * Unbound action
 */
export class msdyn_SalesCopilotNBASkillInfraSetupAction implements Executable<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
  constructor(public readonly parameters: msdyn_SalesCopilotNBASkillInfraSetupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotNBASkillInfraSetup`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesCopilotNBASkillInfraSetupResponse;
  }
}
