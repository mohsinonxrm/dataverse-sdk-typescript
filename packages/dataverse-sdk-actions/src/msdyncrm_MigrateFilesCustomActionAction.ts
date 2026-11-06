import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyncrm_MigrateFilesCustomAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyncrm_MigrateFilesCustomActionResponse = void;

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

  parseResponse(_response: Response): Promise<msdyncrm_MigrateFilesCustomActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
