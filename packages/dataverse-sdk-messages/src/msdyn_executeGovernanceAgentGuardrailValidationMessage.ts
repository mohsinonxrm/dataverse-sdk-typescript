import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_executeGovernanceAgentGuardrailValidation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_executeGovernanceAgentGuardrailValidationRequestParameters {
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
 * msdyn_executeGovernanceAgentGuardrailValidation request message
 *
 * Web API Action: msdyn_executeGovernanceAgentGuardrailValidation
 */
export class msdyn_executeGovernanceAgentGuardrailValidationRequest
  extends OrganizationRequest
  implements Executable<msdyn_executeGovernanceAgentGuardrailValidationResponse>
{
  declare readonly Parameters: Readonly<msdyn_executeGovernanceAgentGuardrailValidationRequestParameters>;

  constructor(parameters: msdyn_executeGovernanceAgentGuardrailValidationRequestParameters) {
    super("msdyn_executeGovernanceAgentGuardrailValidation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeGovernanceAgentGuardrailValidation`;

    const body = requestBody({
      msdyn_scenarioname: this.Parameters.msdyn_scenarioname,
      msdyn_guardrail_runid: this.Parameters.msdyn_guardrail_runid,
      msdyn_objectid: this.Parameters.msdyn_objectid,
      msdyn_validationContent: this.Parameters.msdyn_validationContent,
      msdyn_executionmode: this.Parameters.msdyn_executionmode,
      msdyn_regardingid: this.Parameters.msdyn_regardingid,
      msdyn_regardingtype: this.Parameters.msdyn_regardingtype,
      msdyn_referenceContext: this.Parameters.msdyn_referenceContext,
      msdyn_channel: this.Parameters.msdyn_channel,
      msdyn_additionalInformation: this.Parameters.msdyn_additionalInformation,
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
    return msdyn_executeGovernanceAgentGuardrailValidationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_executeGovernanceAgentGuardrailValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_executeGovernanceAgentGuardrailValidationResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_status: string;
}

/**
 * msdyn_executeGovernanceAgentGuardrailValidation response message
 *
 * `result` is the value the msdyn_executeGovernanceAgentGuardrailValidation action returns (see {@link msdyn_executeGovernanceAgentGuardrailValidationResult}).
 */
export class msdyn_executeGovernanceAgentGuardrailValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeGovernanceAgentGuardrailValidationResult) {
    super("msdyn_executeGovernanceAgentGuardrailValidation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_executeGovernanceAgentGuardrailValidationResponse {
    return new msdyn_executeGovernanceAgentGuardrailValidationResponse(
      data as msdyn_executeGovernanceAgentGuardrailValidationResult
    );
  }
}
