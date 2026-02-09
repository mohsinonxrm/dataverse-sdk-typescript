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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse> {
    const data = await response.json();
    return data as msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse;
  }
}
