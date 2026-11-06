import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfHasLegacyArcRulesResponse as msdyn_CheckIfHasLegacyArcRulesResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfHasLegacyArcRules request message
 *
 * Web API Action: msdyn_CheckIfHasLegacyArcRules
 */
export class msdyn_CheckIfHasLegacyArcRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfHasLegacyArcRulesResponse>
{
  constructor() {
    super("msdyn_CheckIfHasLegacyArcRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfHasLegacyArcRules`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacyArcRulesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfHasLegacyArcRulesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckIfHasLegacyArcRules response message
 */
export class msdyn_CheckIfHasLegacyArcRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacyArcRulesResponseData) {
    super("msdyn_CheckIfHasLegacyArcRules");
  }

  static fromResponse(data: unknown): msdyn_CheckIfHasLegacyArcRulesResponse {
    return new msdyn_CheckIfHasLegacyArcRulesResponse(
      responseObject<msdyn_CheckIfHasLegacyArcRulesResponseData>(data)
    );
  }
}
