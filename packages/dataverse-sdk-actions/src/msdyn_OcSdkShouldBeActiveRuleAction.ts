import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcSdkShouldBeActiveRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcSdkShouldBeActiveRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_OcSdkShouldBeActiveRule action
 *
 * Unbound action
 */
export class msdyn_OcSdkShouldBeActiveRuleAction implements Executable<msdyn_OcSdkShouldBeActiveRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcSdkShouldBeActiveRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OcSdkShouldBeActiveRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcSdkShouldBeActiveRuleResponse;
  }
}
