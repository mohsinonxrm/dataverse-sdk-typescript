import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse as msdyn_SalesDataQualityAgent_ReassignEnrichmentResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_ReassignEnrichment response message
 */
export class msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ReassignEnrichmentResponseData) {
    super("msdyn_SalesDataQualityAgent_ReassignEnrichment");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse {
    return new msdyn_SalesDataQualityAgent_ReassignEnrichmentResponse(
      responseObject<msdyn_SalesDataQualityAgent_ReassignEnrichmentResponseData>(data)
    );
  }
}
