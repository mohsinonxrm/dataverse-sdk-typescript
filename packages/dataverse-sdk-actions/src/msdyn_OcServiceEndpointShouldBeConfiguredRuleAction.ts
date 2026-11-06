import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OcServiceEndpointShouldBeConfiguredRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OcServiceEndpointShouldBeConfiguredRuleResponse;
  }
}
