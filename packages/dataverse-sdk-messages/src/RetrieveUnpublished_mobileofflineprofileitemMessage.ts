import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofileitem } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the mobileofflineprofileitem record to call it on.
 */
export class RetrieveUnpublished_mobileofflineprofileitemRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_mobileofflineprofileitemResponse>
{
  constructor(public mobileofflineprofileitemId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/mobileofflineprofileitems(${odataLiteral.guid(this.mobileofflineprofileitemId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_mobileofflineprofileitemResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_mobileofflineprofileitemResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_mobileofflineprofileitemResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_mobileofflineprofileitemResult =
  | (mobileofflineprofileitem & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_mobileofflineprofileitemResult}).
 */
export class RetrieveUnpublished_mobileofflineprofileitemResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_mobileofflineprofileitemResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_mobileofflineprofileitemResponse {
    return new RetrieveUnpublished_mobileofflineprofileitemResponse(
      (data ?? null) as RetrieveUnpublished_mobileofflineprofileitemResult
    );
  }
}
