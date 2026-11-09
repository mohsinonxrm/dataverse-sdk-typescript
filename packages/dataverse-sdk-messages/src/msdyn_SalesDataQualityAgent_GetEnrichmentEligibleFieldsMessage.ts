import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields action returns (see {@link msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResult}).
 */
export class msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResult) {
    super("msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFields");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse {
    return new msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResponse(
      data as msdyn_SalesDataQualityAgent_GetEnrichmentEligibleFieldsResult
    );
  }
}
