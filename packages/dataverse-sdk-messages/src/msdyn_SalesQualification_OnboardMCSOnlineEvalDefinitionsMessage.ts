import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse as msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse.fromResponse({});
    return msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions response message
 */
export class msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponseData) {
    super("msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitions");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse {
    return new msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponse(
      responseObject<msdyn_SalesQualification_OnboardMCSOnlineEvalDefinitionsResponseData>(data)
    );
  }
}
