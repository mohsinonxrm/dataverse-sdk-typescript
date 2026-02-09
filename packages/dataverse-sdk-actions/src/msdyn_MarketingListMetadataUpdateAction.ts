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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingListMetadataUpdateResponse> {
    const data = await response.json();
    return data as msdyn_MarketingListMetadataUpdateResponse;
  }
}
