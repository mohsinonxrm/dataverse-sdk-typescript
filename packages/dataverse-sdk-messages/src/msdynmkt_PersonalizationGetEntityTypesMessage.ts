import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_PersonalizationGetEntityTypesResponse as msdynmkt_PersonalizationGetEntityTypesResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityTypes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityTypesRequestParameters {
  GetEntityTypesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityTypes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityTypes
 */
export class msdynmkt_PersonalizationGetEntityTypesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityTypesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityTypesRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityTypesRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityTypes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityTypes`;

    const body = requestBody({
      GetEntityTypesRequest: this.Parameters.GetEntityTypesRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationGetEntityTypesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_PersonalizationGetEntityTypesResponse.fromResponse({});
    return msdynmkt_PersonalizationGetEntityTypesResponse.fromResponse(await response.json());
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
