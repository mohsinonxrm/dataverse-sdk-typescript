import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_MarketingMetadataUpdatePostImport action
 */
export interface msdyn_MarketingMetadataUpdatePostImportResponse {
  resultCode: number;
}

/**
 * msdyn_MarketingMetadataUpdatePostImport action
 *
 * Unbound action
 */
export class msdyn_MarketingMetadataUpdatePostImportAction implements Executable<msdyn_MarketingMetadataUpdatePostImportResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingMetadataUpdatePostImport`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_MarketingMetadataUpdatePostImportResponse> {
    const data = await response.json();
    return data as msdyn_MarketingMetadataUpdatePostImportResponse;
  }
}
