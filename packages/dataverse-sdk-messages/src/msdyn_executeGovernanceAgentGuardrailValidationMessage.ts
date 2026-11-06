import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_executeGovernanceAgentGuardrailValidationResponse as msdyn_executeGovernanceAgentGuardrailValidationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_executeGovernanceAgentGuardrailValidationResponse.fromResponse({});
    return msdyn_executeGovernanceAgentGuardrailValidationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_executeGovernanceAgentGuardrailValidation response message
 */
export class msdyn_executeGovernanceAgentGuardrailValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_executeGovernanceAgentGuardrailValidationResponseData) {
    super("msdyn_executeGovernanceAgentGuardrailValidation");
  }

  static fromResponse(data: unknown): msdyn_executeGovernanceAgentGuardrailValidationResponse {
    return new msdyn_executeGovernanceAgentGuardrailValidationResponse(
      responseObject<msdyn_executeGovernanceAgentGuardrailValidationResponseData>(data)
    );
  }
}
