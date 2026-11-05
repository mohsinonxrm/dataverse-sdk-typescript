import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerIntegratedSearchProvisioningApi action
 */
export interface msdyn_TriggerIntegratedSearchProvisioningApiResponse {
  msdyn_TriggerProvisioningResponse: string;
}

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi action
 *
 * Unbound action
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiAction implements Executable<msdyn_TriggerIntegratedSearchProvisioningApiResponse> {
  constructor(public readonly msdyn_DegreeOfParallelism: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchProvisioningApi`;

    const body: Record<string, unknown> = {
      msdyn_DegreeOfParallelism: this.msdyn_DegreeOfParallelism,
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
  ): Promise<msdyn_TriggerIntegratedSearchProvisioningApiResponse> {
    const data = await response.json();
    return data as msdyn_TriggerIntegratedSearchProvisioningApiResponse;
  }
}
