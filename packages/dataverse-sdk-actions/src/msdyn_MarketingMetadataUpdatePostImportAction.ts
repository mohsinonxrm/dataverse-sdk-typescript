import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_MarketingMetadataUpdatePostImport action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingMetadataUpdatePostImportResponse {
  "@odata.context"?: string;
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_MarketingMetadataUpdatePostImportResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_MarketingMetadataUpdatePostImportResponse;
  }
}
