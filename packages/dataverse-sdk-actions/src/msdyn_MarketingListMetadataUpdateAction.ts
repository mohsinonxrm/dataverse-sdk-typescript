import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_MarketingListMetadataUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingListMetadataUpdateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MarketingListMetadataUpdateResponse;
  }
}
