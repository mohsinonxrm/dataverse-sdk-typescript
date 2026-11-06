import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ResolveSolutionHealthRuleFailure request message
 *
 * Web API Action: msdyn_ResolveSolutionHealthRuleFailure
 */
export class msdyn_ResolveSolutionHealthRuleFailureRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResolveSolutionHealthRuleFailureResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_ResolveSolutionHealthRuleFailure");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveSolutionHealthRuleFailure`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ResolveSolutionHealthRuleFailureResponse> {
    // No return value (204 No Content)
    return new msdyn_ResolveSolutionHealthRuleFailureResponse();
  }
}

/**
 * msdyn_ResolveSolutionHealthRuleFailure response message
 */
export class msdyn_ResolveSolutionHealthRuleFailureResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ResolveSolutionHealthRuleFailure");
  }

  static fromResponse(_data: unknown): msdyn_ResolveSolutionHealthRuleFailureResponse {
    return new msdyn_ResolveSolutionHealthRuleFailureResponse();
  }
}
