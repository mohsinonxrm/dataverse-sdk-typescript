import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_fetchEntityMetadata action
 */
export interface msdyn_fetchEntityMetadataResponse {
  fetchEntityMetadataResponse: string;
}

/**
 * msdyn_fetchEntityMetadata action
 *
 * Unbound action
 */
export class msdyn_fetchEntityMetadataAction implements Executable<msdyn_fetchEntityMetadataResponse> {
  constructor(public readonly fetchEntityMetadataRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchEntityMetadata`;

    const body: Record<string, unknown> = {
      fetchEntityMetadataRequest: this.fetchEntityMetadataRequest,
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

  async parseResponse(response: Response): Promise<msdyn_fetchEntityMetadataResponse> {
    const data = await response.json();
    return data as msdyn_fetchEntityMetadataResponse;
  }
}
