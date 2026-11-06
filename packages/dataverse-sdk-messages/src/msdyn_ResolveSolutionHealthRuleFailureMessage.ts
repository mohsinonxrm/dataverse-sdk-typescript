import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ResolveSolutionHealthRuleFailure message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveSolutionHealthRuleFailureRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ResolveSolutionHealthRuleFailure request message
 *
 * Web API Action: msdyn_ResolveSolutionHealthRuleFailure
 */
export class msdyn_ResolveSolutionHealthRuleFailureRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResolveSolutionHealthRuleFailureResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResolveSolutionHealthRuleFailureRequestParameters>;

  constructor(parameters: msdyn_ResolveSolutionHealthRuleFailureRequestParameters = {}) {
    super("msdyn_ResolveSolutionHealthRuleFailure", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveSolutionHealthRuleFailure`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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
