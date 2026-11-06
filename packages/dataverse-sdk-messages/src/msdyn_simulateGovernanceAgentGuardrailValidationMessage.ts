import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_simulateGovernanceAgentGuardrailValidationResponse as msdyn_simulateGovernanceAgentGuardrailValidationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_simulateGovernanceAgentGuardrailValidation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulateGovernanceAgentGuardrailValidationRequestParameters {
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
 * msdyn_simulateGovernanceAgentGuardrailValidation request message
 *
 * Web API Action: msdyn_simulateGovernanceAgentGuardrailValidation
 */
export class msdyn_simulateGovernanceAgentGuardrailValidationRequest
  extends OrganizationRequest
  implements Executable<msdyn_simulateGovernanceAgentGuardrailValidationResponse>
{
  declare readonly Parameters: Readonly<msdyn_simulateGovernanceAgentGuardrailValidationRequestParameters>;

  constructor(parameters: msdyn_simulateGovernanceAgentGuardrailValidationRequestParameters) {
    super("msdyn_simulateGovernanceAgentGuardrailValidation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulateGovernanceAgentGuardrailValidation`;

    const body = requestBody({
      msdyn_objectid: this.Parameters.msdyn_objectid,
      msdyn_regardingid: this.Parameters.msdyn_regardingid,
      msdyn_additionalInformation: this.Parameters.msdyn_additionalInformation,
      msdyn_executionmode: this.Parameters.msdyn_executionmode,
      msdyn_simulationdatasource: this.Parameters.msdyn_simulationdatasource,
      msdyn_validationContent: this.Parameters.msdyn_validationContent,
      msdyn_guardrail_ruleids: this.Parameters.msdyn_guardrail_ruleids,
      msdyn_regardingtype: this.Parameters.msdyn_regardingtype,
      msdyn_referenceContext: this.Parameters.msdyn_referenceContext,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_simulateGovernanceAgentGuardrailValidationResponse.fromResponse({});
    return msdyn_simulateGovernanceAgentGuardrailValidationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_simulateGovernanceAgentGuardrailValidation response message
 */
export class msdyn_simulateGovernanceAgentGuardrailValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_simulateGovernanceAgentGuardrailValidationResponseData) {
    super("msdyn_simulateGovernanceAgentGuardrailValidation");
  }

  static fromResponse(data: unknown): msdyn_simulateGovernanceAgentGuardrailValidationResponse {
    return new msdyn_simulateGovernanceAgentGuardrailValidationResponse(
      responseObject<msdyn_simulateGovernanceAgentGuardrailValidationResponseData>(data)
    );
  }
}
