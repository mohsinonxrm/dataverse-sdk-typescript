import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_CheckIfHasLegacyArcRulesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfHasLegacyArcRules response message
 */
export class msdyn_CheckIfHasLegacyArcRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacyArcRulesResponse) {
    super("msdyn_CheckIfHasLegacyArcRules");
  }

  static fromResponse(data: unknown): msdyn_CheckIfHasLegacyArcRulesResponse {
    return new msdyn_CheckIfHasLegacyArcRulesResponse((data as any).value);
  }
}
