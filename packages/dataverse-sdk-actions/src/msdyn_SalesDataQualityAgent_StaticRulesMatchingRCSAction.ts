import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS action
 */
export interface msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse {
  msdyn_StaticRulesMatchingRCSResponse: string;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSActionParameters {
  msdyn_StaticRulesMatchingRCSRequest: string;
}

/**
 * msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSAction implements Executable<msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_StaticRulesMatchingRCS`;

    const body = requestBody({
      msdyn_StaticRulesMatchingRCSRequest: this.parameters.msdyn_StaticRulesMatchingRCSRequest,
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
      return {} as msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse;
    return (await response.json()) as msdyn_SalesDataQualityAgent_StaticRulesMatchingRCSResponse;
  }
}
