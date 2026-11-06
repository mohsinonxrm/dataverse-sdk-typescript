import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerIntegratedSearchProvisioningApi action
 */
export interface msdyn_TriggerIntegratedSearchProvisioningApiResponse {
  msdyn_TriggerProvisioningResponse: string;
}

/**
 * Parameters of the msdyn_TriggerIntegratedSearchProvisioningApi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerIntegratedSearchProvisioningApiActionParameters {
  msdyn_DegreeOfParallelism: string;
}

/**
 * msdyn_TriggerIntegratedSearchProvisioningApi action
 *
 * Unbound action
 */
export class msdyn_TriggerIntegratedSearchProvisioningApiAction implements Executable<msdyn_TriggerIntegratedSearchProvisioningApiResponse> {
  constructor(
    public readonly parameters: msdyn_TriggerIntegratedSearchProvisioningApiActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchProvisioningApi`;

    const body = requestBody({
      msdyn_DegreeOfParallelism: this.parameters.msdyn_DegreeOfParallelism,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TriggerIntegratedSearchProvisioningApiResponse;
    return (await response.json()) as msdyn_TriggerIntegratedSearchProvisioningApiResponse;
  }
}
