import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfHasLegacySlaRules action
 */
export interface msdyn_CheckIfHasLegacySlaRulesResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfHasLegacySlaRules action
 *
 * Unbound action
 */
export class msdyn_CheckIfHasLegacySlaRulesAction implements Executable<msdyn_CheckIfHasLegacySlaRulesResponse> {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfHasLegacySlaRulesResponse;
    return (await response.json()) as msdyn_CheckIfHasLegacySlaRulesResponse;
  }
}
