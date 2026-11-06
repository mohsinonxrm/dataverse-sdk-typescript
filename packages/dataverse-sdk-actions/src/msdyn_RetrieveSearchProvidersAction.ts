import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveSearchProviders action
 */
export interface msdyn_RetrieveSearchProvidersResponse {
  Result: string;
}

/**
 * msdyn_RetrieveSearchProviders action
 *
 * Unbound action
 */
export class msdyn_RetrieveSearchProvidersAction implements Executable<msdyn_RetrieveSearchProvidersResponse> {
  constructor(public readonly applicationId?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSearchProviders`;

    const body: Record<string, unknown> = {
      ApplicationId: this.applicationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveSearchProvidersResponse;
  }
}
