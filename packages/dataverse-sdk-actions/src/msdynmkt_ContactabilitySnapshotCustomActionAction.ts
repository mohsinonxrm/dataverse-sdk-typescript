import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_ContactabilitySnapshotCustomAction action
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionResponse {
  Output: string;
}

/**
 * Parameters of the msdynmkt_ContactabilitySnapshotCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionActionParameters {
  Input?: string;
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction action
 *
 * Unbound action
 */
export class msdynmkt_ContactabilitySnapshotCustomActionAction implements Executable<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
  constructor(
    public readonly parameters: msdynmkt_ContactabilitySnapshotCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ContactabilitySnapshotCustomAction`;

    const body = requestBody({
      Input: this.parameters.Input,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_ContactabilitySnapshotCustomActionResponse;
    return (await response.json()) as msdynmkt_ContactabilitySnapshotCustomActionResponse;
  }
}
