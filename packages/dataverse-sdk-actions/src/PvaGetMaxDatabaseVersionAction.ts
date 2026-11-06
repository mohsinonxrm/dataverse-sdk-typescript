import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaGetMaxDatabaseVersion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetMaxDatabaseVersionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaGetMaxDatabaseVersionResponse;
  }
}
