import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionActionParameters {
  RequestJson?: string;
}

/**
 * msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionAction implements Executable<msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollection`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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
    return (await response.json()) as msdyn_SalesDataQualityAgent_TriggerEnrichmentDataCollectionResponse;
  }
}
