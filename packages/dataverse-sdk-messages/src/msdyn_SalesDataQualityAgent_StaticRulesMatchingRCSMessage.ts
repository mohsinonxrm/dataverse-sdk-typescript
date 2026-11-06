import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResult {
  "@odata.context"?: string;
  msdyn_StaticRulesMatchingRCSResponse: string;
}

/**
 * msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS action returns (see {@link msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResult}).
 */
export class msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResult) {
    super("msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse {
    return new msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse(
      data as msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResult
    );
  }
}
