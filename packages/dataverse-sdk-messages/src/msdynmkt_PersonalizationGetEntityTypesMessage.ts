import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_PersonalizationGetEntityTypesResponse as msdynmkt_PersonalizationGetEntityTypesResponseData } from "./types/index.js";

/**
 * msdynmkt_PersonalizationGetEntityTypes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityTypes
 */
export class msdynmkt_PersonalizationGetEntityTypesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityTypesResponse>
{
  constructor(public getEntityTypesRequest?: string) {
    super("msdynmkt_PersonalizationGetEntityTypes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityTypes`;

    const body: Record<string, unknown> = {
      GetEntityTypesRequest: this.getEntityTypesRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationGetEntityTypesResponse> {
    const data = await response.json();
    return msdynmkt_PersonalizationGetEntityTypesResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_PersonalizationGetEntityTypes response message
 */
export class msdynmkt_PersonalizationGetEntityTypesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityTypesResponseData) {
    super("msdynmkt_PersonalizationGetEntityTypes");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityTypesResponse {
    return new msdynmkt_PersonalizationGetEntityTypesResponse(
      responseObject<msdynmkt_PersonalizationGetEntityTypesResponseData>(data)
    );
  }
}
