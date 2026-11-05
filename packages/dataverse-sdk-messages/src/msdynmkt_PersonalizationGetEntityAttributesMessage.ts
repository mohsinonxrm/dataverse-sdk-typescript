import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_PersonalizationGetEntityAttributes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityAttributes
 */
export class msdynmkt_PersonalizationGetEntityAttributesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse>
{
  constructor(public getEntityAttributesRequest: string) {
    super("msdynmkt_PersonalizationGetEntityAttributes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityAttributes`;

    const body: Record<string, unknown> = {
      GetEntityAttributesRequest: this.getEntityAttributesRequest,
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
  ): Promise<msdynmkt_PersonalizationGetEntityAttributesResponse> {
    const data = await response.json();
    return msdynmkt_PersonalizationGetEntityAttributesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      GetEntityAttributesRequest: this.getEntityAttributesRequest,
    };
  }
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes response message
 */
export class msdynmkt_PersonalizationGetEntityAttributesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityAttributesResponse) {
    super("msdynmkt_PersonalizationGetEntityAttributes");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityAttributesResponse {
    return new msdynmkt_PersonalizationGetEntityAttributesResponse((data as any).value);
  }
}
