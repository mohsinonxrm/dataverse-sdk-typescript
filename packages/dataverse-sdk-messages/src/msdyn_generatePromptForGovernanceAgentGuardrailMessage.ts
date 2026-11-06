import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_generatePromptForGovernanceAgentGuardrail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generatePromptForGovernanceAgentGuardrailRequestParameters {
  msdyn_ruledefinition: string;
  msdyn_executionmode?: number;
  msdyn_language?: number;
  msdyn_name: string;
  msdyn_guardrail_ruleid: string;
  msdyn_version: number;
}

/**
 * msdyn_generatePromptForGovernanceAgentGuardrail request message
 *
 * Web API Action: msdyn_generatePromptForGovernanceAgentGuardrail
 */
export class msdyn_generatePromptForGovernanceAgentGuardrailRequest
  extends OrganizationRequest
  implements Executable<msdyn_generatePromptForGovernanceAgentGuardrailResponse>
{
  declare readonly Parameters: Readonly<msdyn_generatePromptForGovernanceAgentGuardrailRequestParameters>;

  constructor(parameters: msdyn_generatePromptForGovernanceAgentGuardrailRequestParameters) {
    super("msdyn_generatePromptForGovernanceAgentGuardrail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generatePromptForGovernanceAgentGuardrail`;

    const body = requestBody({
      msdyn_ruledefinition: this.Parameters.msdyn_ruledefinition,
      msdyn_executionmode: this.Parameters.msdyn_executionmode,
      msdyn_language: this.Parameters.msdyn_language,
      msdyn_name: this.Parameters.msdyn_name,
      msdyn_guardrail_ruleid: this.Parameters.msdyn_guardrail_ruleid,
      msdyn_version: this.Parameters.msdyn_version,
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
    return msdyn_generatePromptForGovernanceAgentGuardrailResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_generatePromptForGovernanceAgentGuardrail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_generatePromptForGovernanceAgentGuardrailResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_policystatement: string;
  msdyn_prompt: string;
  msdyn_status: string;
}

/**
 * msdyn_generatePromptForGovernanceAgentGuardrail response message
 *
 * `result` is the value the msdyn_generatePromptForGovernanceAgentGuardrail action returns (see {@link msdyn_generatePromptForGovernanceAgentGuardrailResult}).
 */
export class msdyn_generatePromptForGovernanceAgentGuardrailResponse extends OrganizationResponse {
  constructor(public result: msdyn_generatePromptForGovernanceAgentGuardrailResult) {
    super("msdyn_generatePromptForGovernanceAgentGuardrail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_generatePromptForGovernanceAgentGuardrailResponse {
    return new msdyn_generatePromptForGovernanceAgentGuardrailResponse(
      data as msdyn_generatePromptForGovernanceAgentGuardrailResult
    );
  }
}
