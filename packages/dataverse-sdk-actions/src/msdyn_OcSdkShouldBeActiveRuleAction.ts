import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcSdkShouldBeActiveRule action
 */
export interface msdyn_OcSdkShouldBeActiveRuleResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OcSdkShouldBeActiveRuleResponse;
    return (await response.json()) as msdyn_OcSdkShouldBeActiveRuleResponse;
  }
}
