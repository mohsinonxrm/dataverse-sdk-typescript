import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MarketingListMetadataUpdate action
 */
export interface msdyn_MarketingListMetadataUpdateResponse {
  resultCode: number;
}

/**
 * msdyn_MarketingListMetadataUpdate action
 *
 * Unbound action
 */
export class msdyn_MarketingListMetadataUpdateAction implements Executable<msdyn_MarketingListMetadataUpdateResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingListMetadataUpdate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingListMetadataUpdateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_MarketingListMetadataUpdateResponse;
  }
}
