import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_PersonalizationGetEntityAttributesResponse as msdynmkt_PersonalizationGetEntityAttributesResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityAttributes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityAttributesRequestParameters {
  GetEntityAttributesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityAttributes
 */
export class msdynmkt_PersonalizationGetEntityAttributesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityAttributesRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityAttributesRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityAttributes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityAttributes`;

    const body = requestBody({
      GetEntityAttributesRequest: this.Parameters.GetEntityAttributesRequest,
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
  ): Promise<msdynmkt_PersonalizationGetEntityAttributesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_PersonalizationGetEntityAttributesResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
