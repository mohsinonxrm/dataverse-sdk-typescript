import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_DiscoverPlaceholders request message
 *
 * Web API Action: msdynmkt_DiscoverPlaceholders
 */
export class msdynmkt_DiscoverPlaceholdersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_DiscoverPlaceholdersResponse>
{
  constructor(public discoverPlaceholdersRequest: string) {
    super("msdynmkt_DiscoverPlaceholders");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DiscoverPlaceholders`;

    const body: Record<string, unknown> = {
      DiscoverPlaceholdersRequest: this.discoverPlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_DiscoverPlaceholdersResponse> {
    const data = await response.json();
    return msdynmkt_DiscoverPlaceholdersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      DiscoverPlaceholdersRequest: this.discoverPlaceholdersRequest,
    };
  }
}

/**
 * msdynmkt_DiscoverPlaceholders response message
 */
export class msdynmkt_DiscoverPlaceholdersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_DiscoverPlaceholdersResponse) {
    super("msdynmkt_DiscoverPlaceholders");
  }

  static fromResponse(data: unknown): msdynmkt_DiscoverPlaceholdersResponse {
    return new msdynmkt_DiscoverPlaceholdersResponse((data as any).value);
  }
}
