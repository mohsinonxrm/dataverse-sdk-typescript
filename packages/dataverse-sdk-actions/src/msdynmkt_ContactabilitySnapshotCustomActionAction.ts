import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_ContactabilitySnapshotCustomAction action
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionResponse {
  Output: string;
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ContactabilitySnapshotCustomActionAction implements Executable<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ContactabilitySnapshotCustomAction`;

    const body: Record<string, unknown> = {
      Input: this.input,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
    const data = await response.json();
    return data as msdynmkt_ContactabilitySnapshotCustomActionResponse;
  }
}
