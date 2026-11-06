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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyncrm_GetFileAttributesFromConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyncrm_GetFileAttributesFromConfigurationResponse;
  }
}
