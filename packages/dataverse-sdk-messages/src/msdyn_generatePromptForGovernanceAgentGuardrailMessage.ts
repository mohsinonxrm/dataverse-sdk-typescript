import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_generatePromptForGovernanceAgentGuardrailResponse as msdyn_generatePromptForGovernanceAgentGuardrailResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_generatePromptForGovernanceAgentGuardrailResponse.fromResponse({});
    return msdyn_generatePromptForGovernanceAgentGuardrailResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_generatePromptForGovernanceAgentGuardrail response message
 */
export class msdyn_generatePromptForGovernanceAgentGuardrailResponse extends OrganizationResponse {
  constructor(public result: msdyn_generatePromptForGovernanceAgentGuardrailResponseData) {
    super("msdyn_generatePromptForGovernanceAgentGuardrail");
  }

  static fromResponse(data: unknown): msdyn_generatePromptForGovernanceAgentGuardrailResponse {
    return new msdyn_generatePromptForGovernanceAgentGuardrailResponse(
      responseObject<msdyn_generatePromptForGovernanceAgentGuardrailResponseData>(data)
    );
  }
}
