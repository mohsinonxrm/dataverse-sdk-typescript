import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { SummarizeRecordResponse as SummarizeRecordResponseData } from "./types/index.js";

/**
 * SummarizeRecord request message
 *
 * Web API Action: SummarizeRecord
 */
export class SummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<SummarizeRecordResponse>
{
  constructor(
    public id: string,
    public entityLogicalName: string,
    public recordContext: string,
    public isMergedCatchupAndSummary: boolean
  ) {
    super("SummarizeRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SummarizeRecord`;

    const body: Record<string, unknown> = {
      Id: this.id,
      EntityLogicalName: this.entityLogicalName,
      RecordContext: this.recordContext,
      IsMergedCatchupAndSummary: this.isMergedCatchupAndSummary,
    };

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
    const data = await response.json();
    return SummarizeRecordResponse.fromResponse(data);
  }
}

/**
 * SummarizeRecord response message
 */
export class SummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: SummarizeRecordResponseData) {
    super("SummarizeRecord");
  }

  static fromResponse(data: unknown): SummarizeRecordResponse {
    return new SummarizeRecordResponse(responseObject<SummarizeRecordResponseData>(data));
  }
}
