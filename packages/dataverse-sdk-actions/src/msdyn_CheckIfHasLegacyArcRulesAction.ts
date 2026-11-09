import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfHasLegacyArcRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfHasLegacyArcRulesResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfHasLegacyArcRules action
 *
 * Unbound action
 */
export class msdyn_CheckIfHasLegacyArcRulesAction implements Executable<msdyn_CheckIfHasLegacyArcRulesResponse> {
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
    return (await response.json()) as msdyn_CheckIfHasLegacyArcRulesResponse;
  }
}
