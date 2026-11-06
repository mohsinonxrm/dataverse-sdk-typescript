import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaGetMaxDatabaseVersion action
 */
export interface PvaGetMaxDatabaseVersionResponse {
  VersionInfo: string;
}

/**
 * PvaGetMaxDatabaseVersion action
 *
 * Unbound action
 */
export class PvaGetMaxDatabaseVersionAction implements Executable<PvaGetMaxDatabaseVersionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetMaxDatabaseVersion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetMaxDatabaseVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaGetMaxDatabaseVersionResponse;
    return (await response.json()) as PvaGetMaxDatabaseVersionResponse;
  }
}
