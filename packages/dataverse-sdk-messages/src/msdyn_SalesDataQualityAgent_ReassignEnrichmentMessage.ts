import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ReassignEnrichment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ReassignEnrichmentRequestParameters {
  RequestJson?: string;
}

/**
 * msdyn_SalesDataQualityAgent_ReassignEnrichment request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ReassignEnrichment
 */
export class msdyn_SalesDataQualityAgent_ReassignEnrichmentRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ReassignEnrichmentRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ReassignEnrichmentRequestParameters = {}) {
    super("msdyn_SalesDataQualityAgent_ReassignEnrichment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ReassignEnrichment`;

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
  ): Promise<msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_ReassignEnrichment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ReassignEnrichmentResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ReassignEnrichment response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_ReassignEnrichment action returns (see {@link msdyn_SalesDataQualityAgent_ReassignEnrichmentResult}).
 */
export class msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ReassignEnrichmentResult) {
    super("msdyn_SalesDataQualityAgent_ReassignEnrichment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse {
    return new msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse(
      data as msdyn_SalesDataQualityAgent_ReassignEnrichmentResult
    );
  }
}
