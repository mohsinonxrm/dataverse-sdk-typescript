import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfHasLegacySlaRulesResponse as msdyn_CheckIfHasLegacySlaRulesResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfHasLegacySlaRules request message
 *
 * Web API Action: msdyn_CheckIfHasLegacySlaRules
 */
export class msdyn_CheckIfHasLegacySlaRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfHasLegacySlaRulesResponse>
{
  constructor() {
    super("msdyn_CheckIfHasLegacySlaRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfHasLegacySlaRules`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacySlaRulesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfHasLegacySlaRulesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckIfHasLegacySlaRules response message
 */
export class msdyn_CheckIfHasLegacySlaRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacySlaRulesResponseData) {
    super("msdyn_CheckIfHasLegacySlaRules");
  }

  static fromResponse(data: unknown): msdyn_CheckIfHasLegacySlaRulesResponse {
    return new msdyn_CheckIfHasLegacySlaRulesResponse(
      responseObject<msdyn_CheckIfHasLegacySlaRulesResponseData>(data)
    );
  }
}
