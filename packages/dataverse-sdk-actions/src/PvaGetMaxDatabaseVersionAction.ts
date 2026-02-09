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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetMaxDatabaseVersionResponse> {
    const data = await response.json();
    return data as PvaGetMaxDatabaseVersionResponse;
  }
}
