import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OcServiceEndpointShouldBeConfiguredRule action
 */
export interface msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_OcServiceEndpointShouldBeConfiguredRule action
 *
 * Unbound action
 */
export class msdyn_OcServiceEndpointShouldBeConfiguredRuleAction implements Executable<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OcServiceEndpointShouldBeConfiguredRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse;
  }
}
