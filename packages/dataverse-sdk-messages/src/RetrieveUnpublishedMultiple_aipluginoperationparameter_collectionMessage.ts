import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationparameter } from "./types/index.js";

/**
 * RetrieveUnpublishedMultiple request message
 *
 * Web API Function: RetrieveUnpublishedMultiple
 */
export class RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse>
{
  constructor() {
    super("RetrieveUnpublishedMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/aipluginoperationparameters/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse.fromResponse(
        undefined
      );
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveUnpublishedMultiple function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResult = Array<
  aipluginoperationparameter & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveUnpublishedMultiple response message
 *
 * `result` is the value the RetrieveUnpublishedMultiple function returns (see {@link RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResult}).
 */
export class RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse extends OrganizationResponse {
  constructor(
    public result: RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResult
  ) {
    super("RetrieveUnpublishedMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse {
    return new RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResponse(
      data === undefined
        ? []
        : (
            data as {
              value: RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionResult;
            }
          ).value
    );
  }
}
