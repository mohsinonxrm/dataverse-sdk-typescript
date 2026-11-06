import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesRoutingIdentifyAttributesResponse as msdyn_SalesRoutingIdentifyAttributesResponseData } from "./types/index.js";

/**
 * msdyn_SalesRoutingIdentifyAttributes request message
 *
 * Web API Action: msdyn_SalesRoutingIdentifyAttributes
 */
export class msdyn_SalesRoutingIdentifyAttributesRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesRoutingIdentifyAttributesResponse>
{
  constructor() {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesRoutingIdentifyAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesRoutingIdentifyAttributesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesRoutingIdentifyAttributesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesRoutingIdentifyAttributes response message
 */
export class msdyn_SalesRoutingIdentifyAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesRoutingIdentifyAttributesResponseData) {
    super("msdyn_SalesRoutingIdentifyAttributes");
  }

  static fromResponse(data: unknown): msdyn_SalesRoutingIdentifyAttributesResponse {
    return new msdyn_SalesRoutingIdentifyAttributesResponse(
      responseObject<msdyn_SalesRoutingIdentifyAttributesResponseData>(data)
    );
  }
}
