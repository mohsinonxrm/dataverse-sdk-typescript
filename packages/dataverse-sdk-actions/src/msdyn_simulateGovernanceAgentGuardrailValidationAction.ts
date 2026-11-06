import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_simulateGovernanceAgentGuardrailValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_simulateGovernanceAgentGuardrailValidationResponse {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_status: string;
}

/**
 * Parameters of the msdyn_simulateGovernanceAgentGuardrailValidation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulateGovernanceAgentGuardrailValidationActionParameters {
  msdyn_objectid?: string;
  msdyn_regardingid?: string;
  msdyn_additionalInformation?: string;
  msdyn_executionmode?: number;
  msdyn_simulationdatasource?: number;
  msdyn_validationContent: string;
  msdyn_guardrail_ruleids: string[];
  msdyn_regardingtype?: string;
  msdyn_referenceContext?: string;
}

/**
 * msdyn_simulateGovernanceAgentGuardrailValidation action
 *
 * Unbound action
 */
export class msdyn_simulateGovernanceAgentGuardrailValidationAction implements Executable<msdyn_simulateGovernanceAgentGuardrailValidationResponse> {
  constructor(
    public readonly parameters: msdyn_simulateGovernanceAgentGuardrailValidationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulateGovernanceAgentGuardrailValidation`;

    const body = requestBody({
      msdyn_objectid: this.parameters.msdyn_objectid,
      msdyn_regardingid: this.parameters.msdyn_regardingid,
      msdyn_additionalInformation: this.parameters.msdyn_additionalInformation,
      msdyn_executionmode: this.parameters.msdyn_executionmode,
      msdyn_simulationdatasource: this.parameters.msdyn_simulationdatasource,
      msdyn_validationContent: this.parameters.msdyn_validationContent,
      msdyn_guardrail_ruleids: this.parameters.msdyn_guardrail_ruleids,
      msdyn_regardingtype: this.parameters.msdyn_regardingtype,
      msdyn_referenceContext: this.parameters.msdyn_referenceContext,
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
  ): Promise<msdyn_simulateGovernanceAgentGuardrailValidationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_simulateGovernanceAgentGuardrailValidationResponse;
  }
}
