import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AISummarizeRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRecordRequestParameters {
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
  EntityLogicalName: string;
  Id: string;
}

/**
 * AISummarizeRecord request message
 *
 * Web API Action: AISummarizeRecord
 */
export class AISummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<AISummarizeRecordResponse>
{
  declare readonly Parameters: Readonly<AISummarizeRecordRequestParameters>;

  constructor(parameters: AISummarizeRecordRequestParameters) {
    super("AISummarizeRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

    const body = requestBody({
      RecordContext: this.Parameters.RecordContext,
      IsMergedCatchupAndSummary: this.Parameters.IsMergedCatchupAndSummary,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    // The body is the complex value, with its @odata.context
    return AISummarizeRecordResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AISummarizeRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISummarizeRecordResult {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * AISummarizeRecord response message
 *
 * `result` is the value the AISummarizeRecord action returns (see {@link AISummarizeRecordResult}).
 */
export class AISummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: AISummarizeRecordResult) {
    super("AISummarizeRecord");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AISummarizeRecordResponse {
    return new AISummarizeRecordResponse(data as AISummarizeRecordResult);
  }
}
