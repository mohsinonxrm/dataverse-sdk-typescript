import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyncrm_MigrateFilesCustomAction action
 */
export interface msdyncrm_MigrateFilesCustomActionResponse {
  // No content returned
}

/**
 * msdyncrm_MigrateFilesCustomAction action
 *
 * Unbound action
 */
export class msdyncrm_MigrateFilesCustomActionAction implements Executable<msdyncrm_MigrateFilesCustomActionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_MigrateFilesCustomAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyncrm_MigrateFilesCustomActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
