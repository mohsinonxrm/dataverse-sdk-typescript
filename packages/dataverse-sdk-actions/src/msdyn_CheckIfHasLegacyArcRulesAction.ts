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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfHasLegacyArcRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfHasLegacyArcRulesResponse;
    return (await response.json()) as msdyn_CheckIfHasLegacyArcRulesResponse;
  }
}
