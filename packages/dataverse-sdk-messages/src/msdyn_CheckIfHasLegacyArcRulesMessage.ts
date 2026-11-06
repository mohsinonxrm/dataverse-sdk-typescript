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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfHasLegacyArcRulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfHasLegacyArcRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfHasLegacyArcRulesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfHasLegacyArcRules response message
 *
 * `result` is the value the msdyn_CheckIfHasLegacyArcRules action returns (see {@link msdyn_CheckIfHasLegacyArcRulesResult}).
 */
export class msdyn_CheckIfHasLegacyArcRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfHasLegacyArcRulesResult) {
    super("msdyn_CheckIfHasLegacyArcRules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfHasLegacyArcRulesResponse {
    return new msdyn_CheckIfHasLegacyArcRulesResponse(data as msdyn_CheckIfHasLegacyArcRulesResult);
  }
}
