import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse as msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection response message
 */
export class msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponseData
  ) {
    super("msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse {
    return new msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse(
      responseObject<msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponseData>(data)
    );
  }
}
