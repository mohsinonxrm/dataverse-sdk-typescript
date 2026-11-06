import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SalesAgents_ProvideConsentAndM365SetupAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse {
  "@odata.context"?: string;
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_ProvideConsentAndM365SetupAPIResponse;
  }
}
