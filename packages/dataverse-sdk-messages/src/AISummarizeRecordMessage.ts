import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AISummarizeRecordResponse as AISummarizeRecordResponseData } from "./types/index.js";

/**
 * AISummarizeRecord request message
 *
 * Web API Action: AISummarizeRecord
 */
export class AISummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<AISummarizeRecordResponse>
{
  constructor(
    public id: string,
    public entityLogicalName: string,
    public recordContext?: string,
    public isMergedCatchupAndSummary?: boolean
  ) {
    super("AISummarizeRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

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

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    const data = await response.json();
    return AISummarizeRecordResponse.fromResponse(data);
  }
}

/**
 * AISummarizeRecord response message
 */
export class AISummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: AISummarizeRecordResponseData) {
    super("AISummarizeRecord");
  }

  static fromResponse(data: unknown): AISummarizeRecordResponse {
    return new AISummarizeRecordResponse(responseObject<AISummarizeRecordResponseData>(data));
  }
}
