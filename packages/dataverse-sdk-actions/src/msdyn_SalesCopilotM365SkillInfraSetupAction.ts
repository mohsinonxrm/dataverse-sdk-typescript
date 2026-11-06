import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesCopilotM365SkillInfraSetup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesCopilotM365SkillInfraSetupResponse;
  }
}
