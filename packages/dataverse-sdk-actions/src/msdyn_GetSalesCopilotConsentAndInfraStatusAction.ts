import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesCopilotConsentAndInfraStatus action
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
  msdyn_result: string;
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus action
 *
 * Unbound action
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusAction implements Executable<msdyn_GetSalesCopilotConsentAndInfraStatusResponse> {
  constructor(public readonly msdyn_payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotConsentAndInfraStatus`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesCopilotConsentAndInfraStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetSalesCopilotConsentAndInfraStatusResponse;
  }
}
