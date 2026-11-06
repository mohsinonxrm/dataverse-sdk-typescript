import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_PersonalizationGetEntityAttributesResponse as msdynmkt_PersonalizationGetEntityAttributesResponseData } from "./types/index.js";

/**
 * msdynmkt_PersonalizationGetEntityAttributes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityAttributes
 */
export class msdynmkt_PersonalizationGetEntityAttributesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse>
{
  constructor(public getEntityAttributesRequest?: string) {
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
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes response message
 */
export class msdynmkt_PersonalizationGetEntityAttributesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityAttributesResponseData) {
    super("msdynmkt_PersonalizationGetEntityAttributes");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityAttributesResponse {
    return new msdynmkt_PersonalizationGetEntityAttributesResponse(
      responseObject<msdynmkt_PersonalizationGetEntityAttributesResponseData>(data)
    );
  }
}
