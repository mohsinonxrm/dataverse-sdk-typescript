import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions request message
 *
 * Web API Action: msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions
 */
export class msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse>
{
  constructor() {
    super("msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions response message
 *
 * `result` is the value the msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions action returns (see {@link msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResult}).
 */
export class msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResult) {
    super("msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse {
    return new msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse(
      data as msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResult
    );
  }
}
