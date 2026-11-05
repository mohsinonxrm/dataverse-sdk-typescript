import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_PersonalizationGetEntityProviders request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityProviders
 */
export class msdynmkt_PersonalizationGetEntityProvidersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityProvidersResponse>
{
  constructor(public getProvidersRequest: string) {
    super("msdynmkt_PersonalizationGetEntityProviders");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityProviders`;

    const body: Record<string, unknown> = {
      GetProvidersRequest: this.getProvidersRequest,
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
  ): Promise<msdynmkt_PersonalizationGetEntityProvidersResponse> {
    const data = await response.json();
    return msdynmkt_PersonalizationGetEntityProvidersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      GetProvidersRequest: this.getProvidersRequest,
    };
  }
}

/**
 * msdynmkt_PersonalizationGetEntityProviders response message
 */
export class msdynmkt_PersonalizationGetEntityProvidersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityProvidersResponse) {
    super("msdynmkt_PersonalizationGetEntityProviders");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityProvidersResponse {
    return new msdynmkt_PersonalizationGetEntityProvidersResponse((data as any).value);
  }
}
