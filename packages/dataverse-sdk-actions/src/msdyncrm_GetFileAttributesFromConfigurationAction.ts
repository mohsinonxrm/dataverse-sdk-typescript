import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyncrm_GetFileAttributesFromConfiguration action
 */
export interface msdyncrm_GetFileAttributesFromConfigurationResponse {
  MaxFileSizeInBytes: string;
  AllowedFileTypesRegularExpression: string;
  MaxAssetSizeInBytesConfig: string;
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyncrm_GetFileAttributesFromConfigurationResponse> {
    const data = await response.json();
    return data as msdyncrm_GetFileAttributesFromConfigurationResponse;
  }
}
