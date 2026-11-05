import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_ContactabilitySnapshotCustomAction request message
 *
 * Web API Action: msdynmkt_ContactabilitySnapshotCustomAction
 */
export class msdynmkt_ContactabilitySnapshotCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ContactabilitySnapshotCustomActionResponse>
{
  constructor(public input: string) {
    super("msdynmkt_ContactabilitySnapshotCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ContactabilitySnapshotCustomAction`;

    const body: Record<string, unknown> = {
      Input: this.input,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
    const data = await response.json();
    return msdynmkt_ContactabilitySnapshotCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Input: this.input,
    };
  }
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction response message
 */
export class msdynmkt_ContactabilitySnapshotCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ContactabilitySnapshotCustomActionResponse) {
    super("msdynmkt_ContactabilitySnapshotCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ContactabilitySnapshotCustomActionResponse {
    return new msdynmkt_ContactabilitySnapshotCustomActionResponse((data as any).value);
  }
}
