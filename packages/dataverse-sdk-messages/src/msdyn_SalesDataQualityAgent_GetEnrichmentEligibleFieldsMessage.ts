import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse as msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields
 */
export class msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequestParameters>;

  constructor(
    parameters: msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsRequestParameters
  ) {
    super("msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
  ): Promise<msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields response message
 */
export class msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponseData) {
    super("msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse {
    return new msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse(
      responseObject<msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponseData>(data)
    );
  }
}
