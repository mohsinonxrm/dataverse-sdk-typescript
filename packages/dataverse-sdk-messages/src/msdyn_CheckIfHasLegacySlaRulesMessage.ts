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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacySlaRulesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfHasLegacySlaRulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfHasLegacySlaRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfHasLegacySlaRulesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfHasLegacySlaRules response message
 *
 * `result` is the value the msdyn_CheckIfHasLegacySlaRules action returns (see {@link msdyn_CheckIfHasLegacySlaRulesResult}).
 */
export class msdyn_CheckIfHasLegacySlaRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacySlaRulesResult) {
    super("msdyn_CheckIfHasLegacySlaRules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfHasLegacySlaRulesResponse {
    return new msdyn_CheckIfHasLegacySlaRulesResponse(data as msdyn_CheckIfHasLegacySlaRulesResult);
  }
}
