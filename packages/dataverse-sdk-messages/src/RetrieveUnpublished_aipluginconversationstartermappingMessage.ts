import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginconversationstartermapping } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the aipluginconversationstartermapping record to call it on.
 */
export class RetrieveUnpublished_aipluginconversationstartermappingRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_aipluginconversationstartermappingResponse>
{
  constructor(public aipluginconversationstartermappingId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginconversationstartermappings(${odataLiteral.guid(this.aipluginconversationstartermappingId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_aipluginconversationstartermappingResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return RetrieveUnpublished_aipluginconversationstartermappingResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_aipluginconversationstartermappingResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_aipluginconversationstartermappingResult =
  | (aipluginconversationstartermapping & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_aipluginconversationstartermappingResult}).
 */
export class RetrieveUnpublished_aipluginconversationstartermappingResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_aipluginconversationstartermappingResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): RetrieveUnpublished_aipluginconversationstartermappingResponse {
    return new RetrieveUnpublished_aipluginconversationstartermappingResponse(
      (data ?? null) as RetrieveUnpublished_aipluginconversationstartermappingResult
    );
  }
}
