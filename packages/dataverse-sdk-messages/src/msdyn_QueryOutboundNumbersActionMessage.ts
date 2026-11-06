import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_QueryOutboundNumbersActionResponse as msdyn_QueryOutboundNumbersActionResponseData } from "./types/index.js";

/**
 * msdyn_QueryOutboundNumbersAction request message
 *
 * Web API Action: msdyn_QueryOutboundNumbersAction
 */
export class msdyn_QueryOutboundNumbersActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueryOutboundNumbersActionResponse>
{
  constructor() {
    super("msdyn_QueryOutboundNumbersAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryOutboundNumbersAction`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_QueryOutboundNumbersActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_QueryOutboundNumbersActionResponse.fromResponse({});
    return msdyn_QueryOutboundNumbersActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_QueryOutboundNumbersAction response message
 */
export class msdyn_QueryOutboundNumbersActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueryOutboundNumbersActionResponseData) {
    super("msdyn_QueryOutboundNumbersAction");
  }

  static fromResponse(data: unknown): msdyn_QueryOutboundNumbersActionResponse {
    return new msdyn_QueryOutboundNumbersActionResponse(
      responseObject<msdyn_QueryOutboundNumbersActionResponseData>(data)
    );
  }
}
