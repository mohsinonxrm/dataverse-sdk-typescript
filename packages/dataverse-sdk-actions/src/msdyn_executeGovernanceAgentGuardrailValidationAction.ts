import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_executeGovernanceAgentGuardrailValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_executeGovernanceAgentGuardrailValidationResponse {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_status: string;
}

/**
 * Parameters of the msdyn_executeGovernanceAgentGuardrailValidation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeGovernanceAgentGuardrailValidationActionParameters {
  msdyn_scenarioname: string;
  msdyn_guardrail_runid?: string;
  msdyn_objectid?: string;
  msdyn_validationContent: string;
  msdyn_executionmode?: number;
  msdyn_regardingid?: string;
  msdyn_regardingtype?: string;
  msdyn_referenceContext?: string;
  msdyn_channel: number;
  msdyn_additionalInformation?: string;
}

/**
 * msdyn_executeGovernanceAgentGuardrailValidation action
 *
 * Unbound action
 */
export class msdyn_executeGovernanceAgentGuardrailValidationAction implements Executable<msdyn_executeGovernanceAgentGuardrailValidationResponse> {
  constructor(
    public readonly parameters: msdyn_executeGovernanceAgentGuardrailValidationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeGovernanceAgentGuardrailValidation`;

    const body = requestBody({
      msdyn_scenarioname: this.parameters.msdyn_scenarioname,
      msdyn_guardrail_runid: this.parameters.msdyn_guardrail_runid,
      msdyn_objectid: this.parameters.msdyn_objectid,
      msdyn_validationContent: this.parameters.msdyn_validationContent,
      msdyn_executionmode: this.parameters.msdyn_executionmode,
      msdyn_regardingid: this.parameters.msdyn_regardingid,
      msdyn_regardingtype: this.parameters.msdyn_regardingtype,
      msdyn_referenceContext: this.parameters.msdyn_referenceContext,
      msdyn_channel: this.parameters.msdyn_channel,
      msdyn_additionalInformation: this.parameters.msdyn_additionalInformation,
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
  ): Promise<msdyn_executeGovernanceAgentGuardrailValidationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_executeGovernanceAgentGuardrailValidationResponse;
  }
}
