import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfHasLegacySlaRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfHasLegacySlaRulesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfHasLegacySlaRulesResponse;
  }
}
