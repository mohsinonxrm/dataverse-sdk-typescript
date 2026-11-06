import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse as msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequestParameters {
  msdyn_StaticRulesMatchingRCSRequest: string;
}

/**
 * msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS
 */
export class msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSRequestParameters) {
    super("msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS`;

    const body = requestBody({
      msdyn_StaticRulesMatchingRCSRequest: this.Parameters.msdyn_StaticRulesMatchingRCSRequest,
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
  ): Promise<msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS response message
 */
export class msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponseData) {
    super("msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse {
    return new msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse(
      responseObject<msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponseData>(data)
    );
  }
}
