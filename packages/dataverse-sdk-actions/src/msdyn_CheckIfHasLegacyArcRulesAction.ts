import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfHasLegacyArcRules action
 */
export interface msdyn_CheckIfHasLegacyArcRulesResponse {
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacyArcRulesResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfHasLegacyArcRulesResponse;
  }
}
