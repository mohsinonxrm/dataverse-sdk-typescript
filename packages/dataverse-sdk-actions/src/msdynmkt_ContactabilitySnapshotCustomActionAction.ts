import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_ContactabilitySnapshotCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_ContactabilitySnapshotCustomActionResponse;
  }
}
