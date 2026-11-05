import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_StartMigrationCustomAction action
 */
export interface msdynmkt_StartMigrationCustomActionResponse {
  ErrorCodes: string;
}

/**
 * msdynmkt_StartMigrationCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_StartMigrationCustomActionAction implements Executable<msdynmkt_StartMigrationCustomActionResponse> {
  constructor(public readonly whatIf: boolean) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_StartMigrationCustomAction`;

    const body: Record<string, unknown> = {
      WhatIf: this.whatIf,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_StartMigrationCustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_StartMigrationCustomActionResponse;
  }
}
