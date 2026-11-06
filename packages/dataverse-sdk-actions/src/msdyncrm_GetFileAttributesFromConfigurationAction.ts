import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyncrm_GetFileAttributesFromConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyncrm_GetFileAttributesFromConfigurationResponse {
  "@odata.context"?: string;
  AllowedFileTypesRegularExpression: string;
  MaxAssetSizeInBytesConfig: string;
  MaxFileSizeInBytes: string;
}

/**
 * msdyncrm_GetFileAttributesFromConfiguration action
 *
 * Unbound action
 */
export class msdyncrm_GetFileAttributesFromConfigurationAction implements Executable<msdyncrm_GetFileAttributesFromConfigurationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_GetFileAttributesFromConfiguration`;

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
  ): Promise<msdyncrm_GetFileAttributesFromConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyncrm_GetFileAttributesFromConfigurationResponse;
  }
}
