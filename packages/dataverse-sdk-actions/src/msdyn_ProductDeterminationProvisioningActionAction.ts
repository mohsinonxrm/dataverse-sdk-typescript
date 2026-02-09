import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProductDeterminationProvisioningAction action
 */
export interface msdyn_ProductDeterminationProvisioningActionResponse {
  Result: string;
}

/**
 * msdyn_ProductDeterminationProvisioningAction action
 *
 * Unbound action
 */
export class msdyn_ProductDeterminationProvisioningActionAction implements Executable<msdyn_ProductDeterminationProvisioningActionResponse> {
  constructor(public readonly requestPayload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationProvisioningAction`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ProductDeterminationProvisioningActionResponse> {
    const data = await response.json();
    return data as msdyn_ProductDeterminationProvisioningActionResponse;
  }
}
