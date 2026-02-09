import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ProvideConsentAndM365SetupAPI action
 */
export interface msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse {
  msdyn_ConnectionName: string;
  msdyn_NextScheduleRun: number;
}

/**
 * msdyn_SalesAgents_ProvideConsentAndM365SetupAPI action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ProvideConsentAndM365SetupAPIAction implements Executable<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ProvideConsentAndM365SetupAPI`;

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
  ): Promise<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse;
  }
}
