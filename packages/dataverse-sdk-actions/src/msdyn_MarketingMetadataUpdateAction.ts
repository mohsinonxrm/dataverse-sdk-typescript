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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingMetadataUpdateResponse> {
    const data = await response.json();
    return data as msdyn_MarketingMetadataUpdateResponse;
  }
}
