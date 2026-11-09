import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_MarketingMetadataUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingMetadataUpdateResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MarketingMetadataUpdateResponse;
  }
}
