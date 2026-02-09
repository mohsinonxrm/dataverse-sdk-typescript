import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFeatureControlStatus action
 */
export interface msdyn_GetFeatureControlStatusResponse {
  msdyn_isFeatureEnabled: boolean;
}

/**
 * msdyn_GetFeatureControlStatus action
 *
 * Unbound action
 */
export class msdyn_GetFeatureControlStatusAction implements Executable<msdyn_GetFeatureControlStatusResponse> {
  constructor(public readonly msdyn_featureName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureControlStatus`;

    const body: Record<string, unknown> = {
      msdyn_featureName: this.msdyn_featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetFeatureControlStatusResponse;
  }
}
