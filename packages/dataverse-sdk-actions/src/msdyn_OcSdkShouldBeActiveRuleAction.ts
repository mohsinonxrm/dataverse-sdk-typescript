import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcSdkShouldBeActiveRule action
 */
export interface msdyn_OcSdkShouldBeActiveRuleResponse {
  ReturnStatus: number;
  Message: string;
  ResultEntities: string;
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
    const data = await response.json();
    return data as msdyn_OcSdkShouldBeActiveRuleResponse;
  }
}
