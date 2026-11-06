import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MarketingMetadataUpdate action
 */
export interface msdyn_MarketingMetadataUpdateResponse {
  resultCode: number;
}

/**
 * msdyn_MarketingMetadataUpdate action
 *
 * Unbound action
 */
export class msdyn_MarketingMetadataUpdateAction implements Executable<msdyn_MarketingMetadataUpdateResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingMetadataUpdate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingMetadataUpdateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MarketingMetadataUpdateResponse;
    return (await response.json()) as msdyn_MarketingMetadataUpdateResponse;
  }
}
