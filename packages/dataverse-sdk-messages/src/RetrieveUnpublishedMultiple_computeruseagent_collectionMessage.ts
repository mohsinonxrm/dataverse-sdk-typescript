import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { computeruseagent } from "./types/index.js";

/**
 * RetrieveUnpublishedMultiple request message
 *
 * Web API Function: RetrieveUnpublishedMultiple
 */
export class RetrieveUnpublishedMultiple_computeruseagent_collectionRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublishedMultiple_computeruseagent_collectionResponse>
{
  constructor() {
    super("RetrieveUnpublishedMultiple");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/computeruseagents/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

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
  ): Promise<RetrieveUnpublishedMultiple_computeruseagent_collectionResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveUnpublishedMultiple_computeruseagent_collectionResponse.fromResponse(
        undefined
      );
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveUnpublishedMultiple_computeruseagent_collectionResponse.fromResponse(
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
export type RetrieveUnpublishedMultiple_computeruseagent_collectionResult = Array<
  computeruseagent & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveUnpublishedMultiple response message
 *
 * `result` is the value the RetrieveUnpublishedMultiple function returns (see {@link RetrieveUnpublishedMultiple_computeruseagent_collectionResult}).
 */
export class RetrieveUnpublishedMultiple_computeruseagent_collectionResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublishedMultiple_computeruseagent_collectionResult) {
    super("RetrieveUnpublishedMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): RetrieveUnpublishedMultiple_computeruseagent_collectionResponse {
    return new RetrieveUnpublishedMultiple_computeruseagent_collectionResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveUnpublishedMultiple_computeruseagent_collectionResult }).value
    );
  }
}
