import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequestParameters {
  RequestJson?: string;
}

/**
 * msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection
 */
export class msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequestParameters>;

  constructor(
    parameters: msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionRequestParameters = {}
  ) {
    super("msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection`;

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
  ): Promise<msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection action returns (see {@link msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResult}).
 */
export class msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResult) {
    super("msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse {
    return new msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse(
      data as msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResult
    );
  }
}
