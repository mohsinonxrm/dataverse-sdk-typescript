import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SummarizeRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SummarizeRecordRequestParameters {
  Id: string;
  IsMergedCatchupAndSummary?: boolean;
  RecordContext?: string;
  EntityLogicalName: string;
}

/**
 * SummarizeRecord request message
 *
 * Web API Action: SummarizeRecord
 */
export class SummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<SummarizeRecordResponse>
{
  declare readonly Parameters: Readonly<SummarizeRecordRequestParameters>;

  constructor(parameters: SummarizeRecordRequestParameters) {
    super("SummarizeRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SummarizeRecord`;

    const body = requestBody({
      Id: this.Parameters.Id,
      IsMergedCatchupAndSummary: this.Parameters.IsMergedCatchupAndSummary,
      RecordContext: this.Parameters.RecordContext,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<SummarizeRecordResponse> {
    // The body is the complex value, with its @odata.context
    return SummarizeRecordResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SummarizeRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SummarizeRecordResult {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * SummarizeRecord response message
 *
 * `result` is the value the SummarizeRecord action returns (see {@link SummarizeRecordResult}).
 */
export class SummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: SummarizeRecordResult) {
    super("SummarizeRecord");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SummarizeRecordResponse {
    return new SummarizeRecordResponse(data as SummarizeRecordResult);
  }
}
