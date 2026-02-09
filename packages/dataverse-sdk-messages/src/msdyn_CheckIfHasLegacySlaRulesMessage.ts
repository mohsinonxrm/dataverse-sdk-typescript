import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacySlaRulesResponse> {
    const data = await response.json();
    return msdyn_CheckIfHasLegacySlaRulesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfHasLegacySlaRules response message
 */
export class msdyn_CheckIfHasLegacySlaRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacySlaRulesResponse) {
    super("msdyn_CheckIfHasLegacySlaRules");
  }

  static fromResponse(data: unknown): msdyn_CheckIfHasLegacySlaRulesResponse {
    return new msdyn_CheckIfHasLegacySlaRulesResponse((data as any).value);
  }
}
