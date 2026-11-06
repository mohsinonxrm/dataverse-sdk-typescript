import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_generatePromptForGovernanceAgentGuardrail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_generatePromptForGovernanceAgentGuardrailResponse {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_policystatement: string;
  msdyn_prompt: string;
  msdyn_status: string;
}

/**
 * Parameters of the msdyn_generatePromptForGovernanceAgentGuardrail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generatePromptForGovernanceAgentGuardrailActionParameters {
  msdyn_ruledefinition: string;
  msdyn_executionmode?: number;
  msdyn_language?: number;
  msdyn_name: string;
  msdyn_guardrail_ruleid: string;
  msdyn_version: number;
}

/**
 * msdyn_generatePromptForGovernanceAgentGuardrail action
 *
 * Unbound action
 */
export class msdyn_generatePromptForGovernanceAgentGuardrailAction implements Executable<msdyn_generatePromptForGovernanceAgentGuardrailResponse> {
  constructor(
    public readonly parameters: msdyn_generatePromptForGovernanceAgentGuardrailActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generatePromptForGovernanceAgentGuardrail`;

    const body = requestBody({
      msdyn_ruledefinition: this.parameters.msdyn_ruledefinition,
      msdyn_executionmode: this.parameters.msdyn_executionmode,
      msdyn_language: this.parameters.msdyn_language,
      msdyn_name: this.parameters.msdyn_name,
      msdyn_guardrail_ruleid: this.parameters.msdyn_guardrail_ruleid,
      msdyn_version: this.parameters.msdyn_version,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_generatePromptForGovernanceAgentGuardrailResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_generatePromptForGovernanceAgentGuardrailResponse;
  }
}
